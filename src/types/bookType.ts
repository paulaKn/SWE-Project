export type Book = {
    id: string;
    homepage: string;
    rating: number;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    art: string;
    isbn: string;
    schlagwoerter: string[];
    titel: {
        titel: string;
    };
}