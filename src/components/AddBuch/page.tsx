"use client";
import { useState } from "react";

export default function InputForm() {
  // State für die Formulardaten
  const [buch, setBuch] = useState({
    version: 1,
    isbn: "",
    rating: 0,
    art: "DRUCKAUSGABE",
    preis: 0.0,
    lieferbar: false,
    datum: "",
    homepage: "",
    schlagwoerter: [],
    titel: { name: "" },
  });

  // Fehlerstate
  const [errors, setErrors] = useState<string | null>(null);

  // Funktion zum Senden der Mutation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clientseitige Validierung
    if (!buch.titel.name) {
      setErrors("Titel ist erforderlich.");
      return;
    }
    if (!buch.isbn.match(/^\d{13}$/)) {
      setErrors("ISBN muss 13 Ziffern haben.");
      return;
    }
    if (buch.preis <= 0) {
      setErrors("Preis muss größer als 0 sein.");
      return;
    }

    // GraphQL-Mutation
    const query = `
      mutation AddBuch($buch: BuchInput!) {
        addBuch(buch: $buch) {
          id
          titel {
            name
          }
          isbn
          preis
          lieferbar
        }
      }
    `;

    try {
      const response = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { buch },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        setErrors(result.errors[0].message);
        return;
      }

      alert("Buch erfolgreich hinzugefügt!");
      setBuch({
        version: 1,
        isbn: "",
        rating: 0,
        art: "DRUCKAUSGABE",
        preis: 0.0,
        lieferbar: false,
        datum: "",
        homepage: "",
        schlagwoerter: [],
        titel: { name: "" },
      });
      setErrors(null);
    } catch (err) {
      setErrors("Ein Fehler ist aufgetreten.");
      console.error(err);
    }
  };

  // Handler zum Aktualisieren der Formulardaten
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuch({
      ...buch,
      [name]: name === "preis" || name === "rating" ? parseFloat(value) : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Neues Buch hinzufügen</h2>

      <label htmlFor="titel">Titel:</label>
      <input
        type="text"
        id="titel"
        name="titel"
        value={buch.titel.name}
        onChange={(e) => setBuch({ ...buch, titel: { name: e.target.value } })}
        required
      />
      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <label htmlFor="isbn">ISBN:</label>
      <input
        type="text"
        id="isbn"
        name="isbn"
        value={buch.isbn}
        onChange={handleChange}
        required
      />

      <label htmlFor="preis">Preis:</label>
      <input
        type="number"
        id="preis"
        name="preis"
        value={buch.preis}
        onChange={handleChange}
        required
      />

      <label htmlFor="lieferbar">Lieferbar:</label>
      <input
        type="checkbox"
        id="lieferbar"
        name="lieferbar"
        checked={buch.lieferbar}
        onChange={(e) => setBuch({ ...buch, lieferbar: e.target.checked })}
      />

      <button type="submit">Buch hinzufügen</button>
    </form>
  );
}
