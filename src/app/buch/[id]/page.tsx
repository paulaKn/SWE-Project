import { Provider } from "@/components/ui/provider";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Rating } from "@/components/ui/rating";

const BASEURL = "https://localhost:3000";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function getBuch(id: string) {
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
  const variables = { id: id };

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

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }> ;
}) {
    const data = await getBuch((await params).id);
    return (
      <Provider>
        <Flex
        direction="column"
        alignItems="center"
        maxWidth="4xl"
        margin="auto"
        marginTop={10}
        paddingY={6}
        paddingX={8}
        width="100%"
        backgroundColor="white"
        borderRadius="10px"
        > 
          <Box mb={8} width="100%">
             <Box
             className="Title"
             textStyle="3xl"
             fontWeight="bold"
             textAlign="left"
             >
             {data.titel.titel}
             </Box>
             <Box 
             className="Homepage"
             textStyle="x1"
             color="gray.600"
             >
               {data.homepage}
             </Box>
          </Box>
          <Flex className="Description"
          gap={4}
          mb={4}
          width="100%"
          >
            <Flex className="DescriptionLeft"
            direction="column"
            textStyle="sm"
            color="gray.500"
            gap={4}
            flex={1}
            >
              <Box>
                <Text>Art</Text>
                <Text fontWeight="semibold">{data.art}</Text>
              </Box>
              <Box>
                <Text>ISBN</Text>
                <Text fontWeight="semibold">{data.isbn}</Text>
              </Box>
              <Box>
                <Text>Version</Text>
                <Text fontWeight="semibold">{data.version}</Text>
              </Box>
            </Flex>
            <Flex className="DescriptionRight"
            direction="column"
            textStyle="sm"
            color="gray.500"
            gap={4}
            flex={1}
            >
              <Box>
                <Text>Schlagwörter</Text>
                <Text fontWeight="semibold">{data.schlagwoerter}</Text>
              </Box>
              <Box>
                <Text>Lieferbar</Text>
                <Text fontWeight="semibold">{data.lieferbar ? 'Ja' : 'Nein'}</Text>
              </Box>
              <Box>
                <Text>Erscheinungsdatum</Text>
                <Text fontWeight="semibold">{new Date(data.datum).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}</Text>
              </Box>
            </Flex>
          </Flex>
          <Flex className="RatingPrice"
          gap={4}
          justify="space-between"
          mb={4}
          width="100%"
          >
            <Box className="Rating"
            justifyItems="left"
            flex={1}
            display="flex"
            alignItems="center"
            gap={2}
            >
              <Rating readOnly defaultValue={data.rating} />
              <Text fontSize="sm" color="gray.500">
                {data.rating} von 5
              </Text>
            </Box>
            <Box 
            className="Price" 
            flex={1} 
            textAlign="right"
            fontWeight="semibold"
            fontSize="lg"
            color="gray.900"
            >
              Preis: {data.preis.toFixed(2)}€
            </Box>
          </Flex>
        </Flex>
      </Provider>
    )
}