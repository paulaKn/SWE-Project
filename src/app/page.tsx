import Header from '@/components/Header/page';
import { Provider } from '@/components/ui/provider';


const BASEURL = "https://localhost:3000";

async function fetchGraphQLData() {
  const query = `
    query ($id: ID! = "1") {
      buch(id: $id) {
        isbn
        version
        rating
        art
        preis
        lieferbar
        datum
        homepage
        schlagwoerter
        titel {
          titel
        }
        rabatt(short: true)
      }
    }
  `;

  const variables = { id: "1" };

  const response = await fetch(BASEURL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GraphQL data');
  }

  const result = await response.json();
  return result.data.buch;
}


export default function Home() {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Header />
        </Provider>
      </body>
    </html>
  );
}