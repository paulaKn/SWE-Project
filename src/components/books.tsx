import { Book } from "@/types/bookType";
import { Flex, Box, Link, Separator, Badge, Text } from "@chakra-ui/react";
import { IoStar } from "react-icons/io5";

export default function Books({ books }: { books: Book[] }) {
    return (
        <div>
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
            {books.map((book: Book) => (
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
        </div>
    );
}