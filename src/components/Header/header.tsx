"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from "../../../public/Hka_Logo_Transparent.png"
import { NavigationType } from '../../types/headerType'
import { Box, Button, Flex } from "@chakra-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"

const navigation: NavigationType[] = [
    { name: "Suchen", href: "/search", id: 1},
    { name: "Bearbeiten", href: "#", id: 2},
]


function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <Button 
                variant="subtle"
                size="sm" 
                fontWeight="normal" 
                fontSize="14px" 
                padding="0px 10px" 
                borderRadius="10px"
                onClick={() => signOut()}>Logout</Button>
            </>
        );
    }
    return (
        <>
            <Button 
            variant="subtle" 
            size="sm" 
            fontWeight="normal" 
            fontSize="14px" 
            padding="0px 10px" 
            borderRadius="10px"
            onClick={() => signIn()}>Login</Button>
        </>
    );
}



const Header = () => {
  return (
    <header>
        <Flex 
        direction="row" 
        justifyContent="space-between" 
        align="center" 
        padding="10px" 
        backgroundColor="gray.100"
        >
            {/* LOGO */}
            <Flex>
                <Link href="/">
                    <Image
                        height={100}
                        width={100}
                        src={logo}
                        alt="Logo"
                    />
                </Link>
            </Flex>
            {/* NAVIGATION */}
            <Flex 
            direction="row" 
            align="center" 
            gap="10px"
            >
                {navigation.map((item) => (
                    <Box key={item.id}>
                        <Link href={item.href}>
                            <Button 
                            variant="subtle" 
                            size="sm" 
                            fontWeight="normal" 
                            fontSize="14px" 
                            padding="0px 10px" 
                            borderRadius="10px"
                            >
                                {item.name}
                            </Button>
                        </Link>
                    </Box>
                ))}
            </Flex>
            {/* LOGOUT BUTTON */}
            <Flex align="center">
                <Link href="/">
                    <AuthButton />
                </Link>
            </Flex>
        </Flex>
    </header>
  )
}
export default Header