import { Button, Heading, Text, Box, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Error from "../assets/error.jpg"

const NotFoundPage = () => {
  return (
    <>
      <Box textAlign="center" py="50" px="6">
        <Image src={Error} alt="" />
        <Text color="gray.500" mb="6">
          Please register as a tenant to use this feature
        </Text>
        <Link to="/register">
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            color="white"
            variant="solid"
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default NotFoundPage
