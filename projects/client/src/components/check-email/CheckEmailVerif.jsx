import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react"
import { BsCheckCircleFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const CheckEmailVerif = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      py={12}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        boxShadow={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={10}
        spacing={8}
        align={"center"}
      >
        <Icon as={BsCheckCircleFill} w={24} h={24} color="green.400" />
        <Stack align={"center"} spacing={2}>
          <Heading
            textTransform={"uppercase"}
            fontSize={"3xl"}
            color={useColorModeValue("gray.800", "gray.200")}
          >
            Verify e-mail address
          </Heading>
          <Text>
            In order to start using your Nginep.com account, you need to confirm
            your email address.
          </Text>
          <Button cursor={"pointer"} colorScheme="linkedin">
            Open Email Application
          </Button>
          <Text>
            Issues with the verification process or entered the wrong email?
          </Text>
          <Text>
            Please {""}
            <Link
              to="/register-tenant"
              style={{
                color: "blue",
              }}
            >
              Sign up
            </Link>
            {""} with another email address
          </Text>
        </Stack>
      </Stack>
    </Flex>
  )
}
export default CheckEmailVerif
