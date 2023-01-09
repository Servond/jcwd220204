import { Heading, Text, Box, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Error from "../assets/error.jpg"
import { Button, Result } from "antd"

const NotFoundPage = () => {
  return (
    <>
      <Box
        textAlign="center"
        mt={{ base: "100px", md: "500px" }}
        height="100vh"
      >
        {/* <Image src={Error} alt="" /> */}
        <Text color="gray.500" mb="6">
          Please login/register to use this feature
        </Text>
        <Link to="/startpage">
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button type="primary" size="large" style={{ width: "170px" }}>
                Login/Register
              </Button>
            }
          />
        </Link>
      </Box>
    </>
  )
}

export default NotFoundPage
