"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Input, Button} from '@chakra-ui/react';
import { RiArrowRightLine} from "react-icons/ri"
import { Heading } from "@chakra-ui/react"
import { Center} from "@chakra-ui/react";
import { Stack, StackSeparator } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false, // Verhindert automatische Weiterleitung
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard"); 
      return null;// Weiterleitung nach erfolgreicher Anmeldung
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <Center h="100vh" bg="purple.100">
    <Box >
      <Stack gap="4" separator={<StackSeparator />} justifyContent="center"
        alignItems="center">
      <Avatar src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" colorPalette="white" />
        <Heading size="3xl">Login</Heading>
      {error && <p style={{ color: "red" }}>{error}</p>}

        <Box width={300}>
          Benutzername:
          <Input placeholder="Username" variant="subtle" size="md"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Box>

        <Box width={300}>
          Passwort:   
          <Input placeholder="Password" variant="subtle" size="md" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>

        <Box>
        <Button  variant="surface" color="black" type="submit">Einloggen  <RiArrowRightLine /> </Button>
        </Box>
      </Stack>
    </Box>
    </Center>
  </form>


  );
}
