"use client"

import { Card , Stack, Input, Button, Flex, HStack, Text } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
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

const initialValue = [0];


function isISBN(isbn: string) {
    const isbn13Pattern = /^\d{13}$/;  

    // Remove any dashes or spaces from the input
    const sanitizedInput = isbn.replace(/[-\s]/g, '');

    // Check if the sanitized input matches the ISBN-13 pattern
    return isbn13Pattern.test(sanitizedInput);
}

export default function Edit() {

    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [isIsbnValid, setIsIsbnValid] = useState(true);
    const [art, setArt] = useState("1");
    const [price, setPrice] = useState("100");
    const [discountValue, setDiscountValue] = useState(initialValue);
    const [discountSwitch, setDiscountSwitch] = useState(false);
    const [delivery, setDelivery] = useState("1");
    const [date, setDate] = useState(new Date());


    const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setIsbn(input);
        setIsIsbnValid(isISBN(input));
    }

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
                                <Radio value="1"> EPUB </Radio>
                                <Radio value="2"> HARDCOVER </Radio>
                                <Radio value="3"> PAPERBACK </Radio>
                            </HStack>
                        </RadioGroup>
                    </Field>
                    <Field label="Preis">
                    <NumberInputRoot
                        value={price}
                        onValueChange={(e) => setPrice(e.value)}
                        defaultValue="100"
                        formatOptions={{
                            style: "currency",
                            currency: "EUR",
                            currencyDisplay: "code",
                            currencySign: "accounting",
                        }}
                        min={0}
                        allowMouseWheel
                    >
                        <NumberInputField />
                    </NumberInputRoot>
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
                            <Input ps="4.75em"/>
                        </InputGroup>
                    </Field>
                    <Field label="Schlagwoerter">
                        <Input 
                        padding="1"
                        />
                    </Field>
                    <Field label="Rating">
                        <Rating defaultValue={0} size="lg" />
                    </Field>
                    <Button> Hinzufügen </Button>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}