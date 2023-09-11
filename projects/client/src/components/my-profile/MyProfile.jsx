import React from "react"
import "./MyProfile.scss"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import ReAuth from "../reAuthUser/reAuth.component"
import moment from "moment"

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth)
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState({})
  const params = useParams()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modal2 = useDisclosure()

  return (
    <>
      <Center padding="25px" height="100vh">
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "640px" }}
          height={{ sm: "546px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex
            flex={5}
            justifyContent={"center"}
            maxHeight={{ base: "500px", md: "280px" }}
            maxW={"300px"}
          >
            <Image
              height={"266px"}
              width={"278px"}
              bg={useColorModeValue("white", "gray.900")}
              // src={authSelector?.profile_picture}
              src={`http://localhost:8204/public/${authSelector?.profile_picture}`}
              boxShadow={"2xl"}
              mt="10px"
            />
          </Flex>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {authSelector.username || "username"}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {authSelector.email || "email"}
            </Text>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #{authSelector.role}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #{authSelector.phone_number}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #{moment(authSelector.birthdate).format("LL")}
              </Badge>
            </Stack>

            <ButtonGroup
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/* <Link to={"/editprofile"}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"lg"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  colorScheme="whatsapp"
                  cursor={"pointer"}
                >
                  Edit Profile
                </Button>
              </Link> */}
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"lg"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                colorScheme="whatsapp"
                cursor={"pointer"}
              >
                Edit Profile
              </Button>
              {authSelector.loginWith === "email" ? (
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"lg"}
                  bg={"blue.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                  cursor={"pointer"}
                  onClick={onOpen}
                >
                  Change Password
                </Button>
              ) : null}
            </ButtonGroup>
          </Stack>
        </Stack>
        <ReAuth isOpen={isOpen} onClose={onClose} />
      </Center>
    </>
  )
}

export default MyProfile
