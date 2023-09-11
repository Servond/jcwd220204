import React from "react"
import { Link } from "react-router-dom"
import { FaFacebook } from "react-icons/fa"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

import {
  Button as Button2,
  ButtonGroup,
  Center,
  Container,
  IconButton,
  Stack,
  Text,
  Input,
  Divider,
  Box,
} from "@chakra-ui/react"
import { Button } from "antd"

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      width="100vw"
      padding="20px"
      bg="white"
      bottom={"0"}
      zIndex={"20"}
      position="fixed"
      justifyContent={"space-around"}
    >
      <Divider />
      <Stack
        pt="5"
        pb="8"
        justify="space-between"
        direction={{
          base: "column-reverse",
          md: "row",
        }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Nginep.com, Inc. All rights
          reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="2.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="2.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="2.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Box>
  )
}

export default Footer
