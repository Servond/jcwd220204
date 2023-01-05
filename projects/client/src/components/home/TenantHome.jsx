import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { IoIosHome } from "react-icons/io"
import Reveal from "react-reveal/Reveal"
import Slide from "react-reveal/Slide"

export default function TenantHome() {
  const authSelector = useSelector((state) => state.auth)
  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      mt={{ base: "75px", md: "10px" }}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Slide left cascade>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "120%", md: "100%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "orange",
                  zIndex: -1,
                }}
                textShadow={"2xl"}
                color="white"
              >
                <IoIosHome className="icon" size={"50px"} color="white" />
                Nginep.com
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                Join and grow with us
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              The project board is an exclusive resource for client. Don't
              worry, we will grow together
            </Text>

            <Stack direction={{ base: "column", md: "row" }} spacing={2}>
              <Link to="/property-form">
                <Button
                  rounded={"xl"}
                  width="200px"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  cursor={"pointer"}
                >
                  Create Properties
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Slide>
      </Flex>
      <Flex flex={1} padding="5">
        <Image
          mt={{ md: "20vh" }}
          alt={"Login Image"}
          objectFit={"contain"}
          src={
            "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          }
        />
      </Flex>
    </Stack>
  )
}
