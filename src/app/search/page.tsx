import Header from "@/components/Header/header";
import BookSearch from "@/components/booksearch";
import { Provider } from "@/components/ui/provider";

const BASEURL = "https://localhost:3000";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

export default async function Page() {
    const books = await getAllBooks();
    
    return (
        <Provider>
            <Header />
            <BookSearch books={books} />
        </Provider>
    );
}