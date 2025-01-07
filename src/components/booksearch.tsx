"use client";

import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { Provider } from "./ui/provider";
import { InputGroup } from "@/components/ui/input-group";
import { Book } from "@/types/bookType";
import { 
    Flex, 
    Link, 
    HStack, 
    Input, 
    Badge, 
    Box, 
    Separator, 
    Text,
} from "@chakra-ui/react";

export default function BookSearch({ books }: { books: Book[] }) {
    const [search, setSearch] = useState("");

    const filteredBooks = books.filter((book: Book) =>
        book.titel.titel.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn.toLowerCase().includes(search.toLowerCase()) ||
        book.art.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Provider>
        <HStack 
        gap={4}
        width="full"
        marginTop={10}
        paddingX={8}
        >
             <InputGroup
            flex="1"
            startElement={<LuSearch />}
            >
                <Input 
                placeholder="ISBN, Titel, Art" 
                variant="subtle"
                colorScheme="purple"
                borderRadius="10px"
                width="100%"
                height="50px"
                paddingX={4}
                paddingY={2}
                size="md"
                onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
        </HStack>

        <Flex
        direction="row"
        flexWrap="wrap"
        gap={4}
        margin="auto"
        marginTop={10}
        paddingY={6}
        paddingX={8}
        width="100%"
        >
            {filteredBooks.map((book: Book) => (
                <Link 
                href={`/buch/${book.id}`} 
                key={book.id}
                >
                    <Flex
                    className="card"
                    direction="column"
                    alignItems="center"
                    backgroundColor="white"
                    borderRadius="10px"
                    width="300px"
                    padding={5}
                    transition="transform 0.2s ease-in-out"
                    _hover={{
                        transform: "scale(1.05)",
                    }}
                    >
                        <Box
                        className="titel"
                        paddingBottom={2}
                        textStyle="lg"
                        fontWeight="semibold"
                        width="100%"
                        >
                            {book.titel.titel}
                        </Box>
                        <Separator />
                        <Box
                        className="homepage"
                        textStyle="sm"
                        color="gray.600"
                        width="100%"
                        paddingTop={2}
                        >
                            {book.homepage}
                        </Box>
                        <Flex
                        className="CardBottom"
                        justifyContent="space-between"
                        width="100%"
                        >
                            <Badge
                            className="art"
                            textStyle="xs"
                            variant="subtle"
                            size="sm"
                            marginTop={2}
                            paddingX={2}
                            >
                                {book.art}
                            </Badge>
                            <Flex
                            alignItems="center"
                            gap={1}
                            >
                                <IoStar />
                                <Text fontSize="sm" color="gray.500">
                                    {book.rating}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Link>
            ))}
        </Flex>
        </Provider>
    )
}