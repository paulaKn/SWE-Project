"use client";
import { useState } from "react";
import { Stack, StackSeparator } from "@chakra-ui/react"
import { Center} from "@chakra-ui/react";
import {Input, Button, Box} from '@chakra-ui/react';
import { Heading } from "@chakra-ui/react"
import { User } from "next-auth";
import { useSession } from "next-auth/react";




export default function AddBuch() {

  const { data: session } = useSession();

  console.log("hallo");
  
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
    titel: { titel: "" },
  });

  // Fehlerstate
  const [errors, setErrors] = useState<string | null>(null);

  // Funktion zum Senden der Mutation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  console.log("handlesubmitFunction");

    // Clientseitige Validierung
    if (!buch.titel.titel) {
      setErrors("Titel ist erforderlich.");
    }
    if (!buch.isbn.match(/^\d{13}$/)) {
      setErrors("ISBN muss 13 Ziffern haben.");
    }
    /*if (buch.preis <= 0) {
      setErrors("Preis muss größer als 0 sein.");
    }*/

    // GraphQL-Mutation
    const query = `
     mutation {
  create(
    input: {
      isbn: "978-0-321-19368-1",
      rating: 1,
      art: HARDCOVER,
      preis: 99.99,
      rabatt: 0.123,
      lieferbar: true,
      datum: "2022-01-31",
      homepage: "https://create.mutation",
      schlagwoerter: ["JAVASCRIPT", "TYPESCRIPT"],
      titel: {
        titel: "Titelcreatemutation",
        untertitel: "untertitelcreatemutation"
      },
      abbildungen: [{
        beschriftung: "Abb. 1",
        contentType: "img/png"
      }]
    }
  ) {
      id
  }
}
    `;

   

    try {
      
      const token = (session?.user as User).accessToken

     /* const queryToken = `
      mutation {
        token(username: "admin", password: "p") {
          access_token
        }
      }
      `;

      // fetch the token from the GraphQL endpoint
      const data = await fetch("https://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryToken }),
        cache: "no-store",
      });*/

      //const token = await data.json();



      const response = await fetch("https://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables: { buch },
        }),
      });


      const result = await response.json();
      if (result.errors) {
        setErrors(result.errors[0].message);
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
        titel: { titel: "" },
      });
      setErrors(null);
    } catch (err) {
      console.log("zuerst")
      setErrors("Ein Fehler ist entstanden.");
      console.log("danach")
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
       
      <Heading>Neues Buch hinzufügen</Heading>
      <Center h="100vh" bg="purple.100">
      <Stack gap="2" separator={<StackSeparator />} justifyContent="center"
        alignItems="center">
      <label htmlFor="titel">Titel:</label>
      <Input
        type="text"
        id="titel"
        name="titel"
        variant="subtle"
        placeholder="Titel"
        value={buch.titel.titel}
        onChange={(e) => setBuch({ ...buch, titel: { titel: e.target.value } })}
        required
      />
      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <label htmlFor="isbn">ISBN:</label>
      <Input
        type="text"
        id="isbn"
        name="isbn"
        variant="subtle"
        placeholder="ISBN"
        value={buch.isbn}
        onChange={handleChange}
        required
      />

 {/*     <label htmlFor="preis">Preis:</label>
      <Input
        type="text"
        id="preis"
        name="preis"
        variant="subtle"
        placeholder="Preis"
        value={buch.preis}
        onChange={handleChange}
        required
      />*/}

      <label htmlFor="lieferbar">Lieferbar:</label>
      <input
        type="checkbox"
        id="lieferbar"
        name="lieferbar"
        checked={buch.lieferbar}
        onChange={(e) => setBuch({ ...buch, lieferbar: e.target.checked })}
      />
      <Box width={300}>
      <Button variant="surface" color="black" size="lg" type="submit">Buch hinzufügen</Button>
      </Box>
      </Stack>
      </Center>
    </form>
  );
}
