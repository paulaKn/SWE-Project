"use client";

import { useEffect, useState } from "react";
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
import { Tag } from "@/components/ui/tag";

export default function BookSearch({ books }: { books: Book[] }) {
    const [search, setSearch] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

    // Add a tag when pressing Enter
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && search.trim() !== "") {
          if (!tags.includes(search)) {
            setTags((prevTags) => [...prevTags, search]);
            setSearch("");
          }
        }
    };

    // Remove a tag
    const handleRemoveTag = (tagToRemove: string) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    // Filter books based on tags
    useEffect(() => {
        const lowerCaseTags = tags.map((tag: string) => tag.toLowerCase());
        const result = books.filter((book: Book) => {
            return lowerCaseTags.every((tag) =>
                book.titel.titel.toLowerCase().includes(tag) ||
                book.isbn.toLowerCase().includes(tag) ||
                book.art.toLowerCase().includes(tag) ||
                book.schlagwoerter.some(schlagwort =>
                    schlagwort.toLowerCase().includes(tag)
                )
            );
        });
        setFilteredBooks(result);
    }, [tags, books]);

    return (
        <Provider>
        <HStack 
        gap={4}
        width="full"
        marginTop={10}
        paddingX={8}
        >
            {/* Search */}
            <InputGroup    
            flex="1"
            startElement={<LuSearch />}
            >
                <Input 
                placeholder="ISBN, Titel, Art, Schlagwort" 
                variant="subtle"
                colorScheme="purple"
                borderRadius="10px"
                width="100%"
                height="50px"
                paddingX={4}
                paddingY={2}
                size="md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleAddTag}
                />
            </InputGroup>
        </HStack>

        {/* Tags  -- npx @chakra-ui/cli snippet add tag*/}
        <HStack
        marginTop={4}
        paddingX={8}
        wrap="wrap"
        gap={2}
        >
            {tags.map((tag, index) => (
                <Tag 
                size="lg"
                key={index} 
                colorScheme="purple"
                borderRadius="full"
                variant="subtle"
                paddingX={2}
                paddingY={1}
                fontSize="sm"
                fontWeight="medium"
                onClose={() => handleRemoveTag(tag)}
                >
                    {tag}
                </Tag>
            ))}
        </HStack>

        {/* Books */}
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
            {filteredBooks.length > 0 ? (
            filteredBooks.map((book: Book) => (
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
            ))
            ) : (
                <Text
                fontSize="lg"
                fontWeight="semibold"
                color="gray.600"
                marginTop={6}
                textAlign="center"
                width="100%"
                >
                    Keine Suchergebnisse
                </Text>
            )}
        </Flex>
        </Provider>
    )
}