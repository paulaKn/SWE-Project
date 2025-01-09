
import Header from "@/components/Header/header";
import Books from "@/components/books";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const BASEURL = "https://localhost:3000";

async function getAllBooks() {
  const query = `
  {
      buecher {
          id
          version
          homepage
          rating
          art
          schlagwoerter
          isbn
          titel {
              titel
          }
      }
  }
  `
  const response = await fetch(BASEURL + '/graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
  });

  if (!response.ok) {
      throw new Error('Failed to fetch GraphQL data');
  }

  const result = await response.json();
  return result.data.buecher;
}

export default async function HomePage() {

  const books = await getAllBooks();
  
  return (
    <div>
      <Header />
      <Books books={books} />
    </div>
  );
}