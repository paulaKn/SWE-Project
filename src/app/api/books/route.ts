import { NextResponse } from "next/server";

const BASEURL = "https://localhost:3000"; // Keep HTTPS here
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(request: Request) {
  try {
    console.log("Request received:", request);
    const { book, token } = await request.json(); // Parse book and token from the client request

    if (!book.isbn || !book.rating || !book.rabatt || !book.lieferbar || !book.datum || !book.homepage || !book.schlagwoerter || !book.titel.titel) {
      return NextResponse.json({ error: "Fehler beim Hinzufügen des Buches keine vollständigen Daten" }, { status: 400 });
    }

    console.log("Book preis:", book.preis);

    // Fetch the GraphQL endpoint
    const response = await fetch(`${BASEURL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          mutation {
            create(input: {
                isbn: "${book.isbn}",
                rating: ${book.rating},
                art: ${book.art},
                preis: ${book.preis},
                rabatt: ${book.rabatt},
                lieferbar: ${book.lieferbar},
                datum: "${book.datum}",
                homepage: "${book.homepage}",
                schlagwoerter: ${JSON.stringify(book.schlagwoerter)},
                titel: {
                    titel: "${book.titel.titel}",
                },
            }) {
              id
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("GraphQL Error Response:", errorMessage);
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    const result = await response.json();
    console.log("Result in API:", result);
    return NextResponse.json({ data: result.data.create });
  } catch (error) {
    console.error("Error in addBook API route:", error);
    return NextResponse.json({ error: "Fehler beim Hinzufügen des Buches" }, { status: 500 });
  }
}
