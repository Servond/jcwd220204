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
      backgroundColor={"whiteAlpha.700"}
      width="100vw"
      padding="20px"
      bgColor={"blackAlpha.100"}
    >
      <Stack
        spacing="8"
        direction={{
          base: "column",
          md: "row",
        }}
        justify="space-between"
        py={{
          base: "12",
          md: "16",
        }}
      >
        <Stack
          direction={{
            base: "column-reverse",
            md: "column",
            lg: "row",
          }}
          spacing={{
            base: "12",
            md: "8",
          }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Product
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Text variant="link" cursor={"pointer"}>
                  How it works
                </Text>
                <Text variant="link" cursor={"pointer"}>
                  Pricing
                </Text>
                <Text variant="link" cursor={"pointer"}>
                  Use Cases
                </Text>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Legal
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Text variant="link" cursor={"pointer"}>
                  Privacy
                </Text>
                <Text variant="link" cursor={"pointer"}>
                  Terms
                </Text>
                <Text variant="link" cursor={"pointer"}>
                  License
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Stay up to date
            </Text>
            <Stack
              spacing="4"
              direction={{
                base: "column",
                sm: "row",
              }}
              maxW={{
                lg: "360px",
              }}
            >
              <Input placeholder="Enter your email" type="email" required />
              <Button2
                variant="primary"
                type="submit"
                flexShrink={0}
                cursor={"pointer"}
              >
                Subscribe
              </Button2>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        pt="8"
        pb="12"
        justify="space-between"
        direction={{
          base: "column-reverse",
          md: "row",
        }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
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
