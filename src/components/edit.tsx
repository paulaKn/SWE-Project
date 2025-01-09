"use client"

import { Card , Stack, Input, Flex, HStack, Text } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Field } from "@/components/ui/field"
import { InputGroup } from "@/components/ui/input-group"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Rating } from "./ui/rating";
import { useState } from "react"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { de } from "date-fns/locale";
import { Book } from "@/types/bookType"
import { useSession } from "next-auth/react"
import { User } from "next-auth";

const initialValue = [0];


function isISBN(isbn: string) {
    const isbn13Pattern = /^\d{13}$/;  

    // Remove any dashes or spaces from the input
    const sanitizedInput = isbn.replace(/[-\s]/g, '');

    // Check if the sanitized input matches the ISBN-13 pattern
    return isbn13Pattern.test(sanitizedInput);
}

function isHomepage(homepage: string) {
    const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return urlPattern.test(homepage);
}

export default function Edit() {
    const {data: session} = useSession();

    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [isIsbnValid, setIsIsbnValid] = useState(true);
    const [art, setArt] = useState("1");
    const [price, setPrice] = useState(0);
    const [discountValue, setDiscountValue] = useState(initialValue);
    const [discountSwitch, setDiscountSwitch] = useState(false);
    const [delivery, setDelivery] = useState("1");
    const [date, setDate] = useState(new Date());
    const [homepage, setHomepage] = useState("");
    const [isHomepageValid, setIsHomepageValid] = useState(true);
    const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setIsbn(input);
        setIsIsbnValid(isISBN(input));
    }

    const handleHomepageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setHomepage(input);
        setIsHomepageValid(isHomepage(input));
    }

    const handleAddBook = async () => {
        if (!session) {
            setMessage("You must be logged in to add a book.");
            return;
        }
        
        if (!isIsbnValid || !isHomepageValid || !title || !art || !price || !discountValue || !delivery || !date || !homepage || !schlagwoerter || !rating) {
            setMessage("Bitte füllen Sie alle Felder korrekt aus.");
            return;
        }

        const book: Book = {
            id: "",
            isbn: isbn,
            rating: rating,
            art: art,
            preis: Number(price),
            rabatt: discountValue[0] / 100,
            lieferbar: delivery === "1" ? true : false,
            datum: "2022-01-31",
            homepage,
            schlagwoerter,
            titel: {
                titel: title,
            },
        };

        try {
            setIsLoading(true);
            setMessage("");

            //call API route
            const response = await fetch("/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ book, token: (session.user as User).accessToken }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Fehler beim Hinzufügen des Buches");
            }

            const result = await response.json();
            console.log("Buch erfolgreich hinzugefügt: " + result);
            setMessage("Buch erfolgreich hinzugefügt!");
        } catch (error) {
            setMessage("Fehler beim Hinzufügen des Buches. Bitte versuche es erneut.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card.Root 
        maxW="sm" 
        padding="4"
        marginX="auto"
        marginY="4"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="md"
        >
            <Card.Header>
                <Card.Title> Hinzufügen </Card.Title>
            </Card.Header>
            <Card.Body>
                <Stack> 
                    <Field label="Titel">
                        <Input
                        padding="1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </Field>
                    <Field label="ISBN">
                        <Input 
                        padding="1"
                        value={isbn}
                        onChange={handleIsbnChange}
                        />
                        <Text color="red"> {isIsbnValid ? "" : "Ungültige ISBN"} </Text>

                    </Field>
                    <Field label="Art">
                        <RadioGroup 
                        defaultValue="1"
                        onValueChange={(e) => setArt(e.value)}
                        >
                            <HStack>
                                <Radio value="EPUB"> EPUB </Radio>
                                <Radio value="HARDCOVER"> HARDCOVER </Radio>
                                <Radio value="PAPERBACK"> PAPERBACK </Radio>
                            </HStack>
                        </RadioGroup>
                    </Field>
                    <Field label="Preis">
                        <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </Field>
                    <Field label="Rabatt">
                        <Flex 
                        direction="row" 
                        align="center" 
                        gap="8"
                        >
                            <Switch 
                            checked={discountSwitch}
                            onCheckedChange={(e) => setDiscountSwitch(e.checked)}
                            />
                            <Slider
                                size="md"
                                width="200px"
                                colorPalette="black"
                                value={discountValue}
                                onValueChange={(e) => setDiscountValue(e.value)}
                                defaultValue={initialValue}
                                marks={[
                                    { value: 0, label: "0%" },
                                    { value: 50, label: "50%" },
                                    { value: 100, label: "100%" },
                                ]}
                                disabled={!discountSwitch}
                            />
                            <Text> {discountValue[0]}% </Text>
                            
                        </Flex>
                    </Field>
                    <Field label="Lieferbar">
                        <RadioGroup 
                        defaultValue="1"
                        onValueChange={(e) => setDelivery(e.value)}
                        >
                            <HStack>
                                <Radio value="1"> Ja </Radio>
                                <Radio value="2"> Nein </Radio>
                            </HStack>
                        </RadioGroup>
                    </Field>
                    <Field label="Datum">
                        {/* https://www.npmjs.com/package/react-datepicker */}
                        <DatePicker 
                        selected={date}
                        onChange={(date: Date | null) => date && setDate(date)}
                        maxDate={new Date()}
                        locale={de}
                        />
                    </Field>
                    <Field label="Homepage">
                        <InputGroup 
                        flex="1"
                        startElement="https://"
                        maxW="100%"
                        > 
                            <Input 
                            ps="4.75em"
                            value={homepage}
                            onChange={handleHomepageChange}
                            />
                        </InputGroup>
                        <Text color="red"> {isHomepageValid ? "" : "Ungültige Homepage"} </Text>
                    </Field>
                    <Field label="Schlagwoerter">
                        <Stack flex="1" direction="row" gap="4">
                            <Checkbox
                            checked={schlagwoerter.includes("Javascript")}
                            onCheckedChange={(e) => setSchlagwoerter(e.checked ? [...schlagwoerter, "Javascript"] : schlagwoerter.filter(word => word !== "Javascript"))}
                            >
                                Javascript
                            </Checkbox>
                            <Checkbox
                            checked={schlagwoerter.includes("Typescript")}
                            onCheckedChange={(e) => setSchlagwoerter(e.checked ? [...schlagwoerter, "Typescript"] : schlagwoerter.filter(word => word !== "Typescript"))}
                            >
                                Typescript
                            </Checkbox>
                            <Checkbox
                            checked={schlagwoerter.includes("Python")}
                            onCheckedChange={(e) => setSchlagwoerter(e.checked ? [...schlagwoerter, "Python"] : schlagwoerter.filter(word => word !== "Python"))}
                            >
                                Python
                            </Checkbox>
                        </Stack>
                    </Field>
                    <Field label="Rating">
                        <Rating 
                        defaultValue={rating} 
                        size="lg" 
                        onValueChange={(e) => setRating(e.value)}
                        />
                    </Field>
                    <Button onClick={handleAddBook} loading={isLoading} > 
                        Hinzufügen 
                    </Button>
                    {message && <Text color="green"> {message} </Text>}
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}