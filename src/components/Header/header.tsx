"use client";
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from "../../../public/Hka_Logo_Transparent.png"
import { NavigationType } from './types'
import { Box, Button, Flex } from "@chakra-ui/react"

const navigation: NavigationType[] = [
    { name: "Suchen", href: "#", id: 1},
    { name: "Bearbeiten", href: "#", id: 2},
]
 
const Header = () => {
  return (
    <header>
        <Flex 
        direction="row" 
        justifyContent="space-between" 
        align="center" 
        padding="10px" 
        backgroundColor="white"
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
                            variant="ghost" 
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
            {/* LOGIN BUTTON */}
            <Flex align="center">
                <Link href="/login">
                    <Button 
                    variant="ghost" 
                    size="sm" 
                    fontWeight="normal" 
                    fontSize="14px" 
                    padding="0px 10px" 
                    borderRadius="10px"
                    >
                        Login
                    </Button>
                </Link>
            </Flex>
        </Flex>
    </header>
  )
}
export default Header