import { Button, Box, useToast, Text, Center } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { axiosInstance } from "../../api"

const DummyTransaction = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const authSelector = useSelector((state) => state.auth)

  const dummyTrans = async () => {
    try {
      const dummyResponse = await axiosInstance.post("/transaction/")

      if (authSelector.role === "user") {
        navigate(`/payment-proof/${dummyResponse.data.data.id}`)
      } else {
        navigate("/login")
      }

      if (dummyResponse.name === "AxiosError") {
        throw new Error(dummyResponse.message)
      }

      toast({
        status: "success",
        title: "dummy transaction created",
      })
    } catch (err) {
      console.log(err)
      toast({
        status: "error",
        description: "you must became a member to booking this property",
        title: "Your not a User",
      })
    }
  }
  //   console.log(getTransactionId)

  return (
    <Box mt="50vh">
      <Center display="block" textAlign="center">
        <Text fontSize="30px" fontWeight="bold" mb="30px">
          Ceritanaya ini dummy checkout, hehe {":))"}
        </Text>
        <Center>
          <Button
            onClick={dummyTrans}
            backgroundColor="blue.600"
            _hover={{ backgroundColor: "blue.500" }}
          >
            Check Out
          </Button>
        </Center>
      </Center>
    </Box>
  )
}

export default DummyTransaction
