import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import Moment from "react-moment"

const PaymentApproval = () => {
  const [paymentProof, setPaymentProof] = useState("")
  const [price, setPrice] = useState("")
  const [getStartDate, setGetStartDate] = useState("")
  const [getEndDate, setGetEndDate] = useState("")
  const [propertyName, setPropertyName] = useState("")
  const [roomType, setRoomType] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const navigate = useNavigate()

  const toast = useToast()
  const params = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalApprove = useDisclosure()
  const modalReject = useDisclosure()
  const modalCanceled = useDisclosure()
  // ========================= Get Data Transaction ============================
  const getDataTransaction = async () => {
    try {
      const responseDataTransaction = await axiosInstance.get(
        `/transaction/user-data/${params.id}`
      )

      console.log(responseDataTransaction)
      setPaymentProof(responseDataTransaction.data.data.payment_proof)
      setPrice(responseDataTransaction.data.data.price)
      setGetStartDate(responseDataTransaction.data.data.start_date)
      setGetEndDate(responseDataTransaction.data.data.end_date)
      setPropertyName(responseDataTransaction.data.data.Property.name)
      setRoomType(responseDataTransaction.data.data.PropertyItem.item_name)
      setUserEmail(responseDataTransaction.data.data.User.email)
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(paymentProof)

  // ========================= Approve Payment ============================
  const acceptPayment = async () => {
    try {
      await axiosInstance.patch(`/transaction/approve/${params.id}`)
      navigate(-1)
      toast({
        status: "success",
        title: "Accept payment",
      })
      // onClose(modalApprove.onClose)
    } catch (err) {
      console.log(err)
    }
  }

  // ========================= Reject Payment ============================
  const rejectPayment = async () => {
    try {
      await axiosInstance.patch(`/transaction/reject/${params.id}`)
      navigate(-1)
      toast({
        status: "success",
        title: "Reject payment",
      })
    } catch (err) {
      console.log(err)
    }
  }

  const canceledPayment = async () => {
    try {
      await axiosInstance.patch(`/transaction/canceled/${params.id}`)
      navigate(-1)
      toast({
        status: "success",
        title: "Cancel this payment",
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDataTransaction()
  }, [])
  return (
    <Center>
      <Box
        mt="100px"
        // border="1px solid black"
        padding="25px"
        textAlign="center"
        w={{ base: "380px", md: "fit-content" }}
      >
        <Text
          color="black"
          textAlign="center"
          fontSize="55px"
          fontWeight="bold"
          mb="20px"
        >
          Payment Approval
        </Text>
        <Text fontWeight="bold" fontSize="30px">
          From User :
        </Text>
        <Text fontSize="20px" mb="20px" textTransform="uppercase">
          {userEmail}
        </Text>
        <Image
          src={`http://localhost:8000/public/${paymentProof}`}
          width="100%"
          height="100%"
          mb="15px"
        />
        <Flex mb="25px" borderBottom="1px solid black">
          <Text fontSize={{ md: "25px", base: "20px" }}>Property Name : </Text>
          <Spacer />
          <Text
            fontSize={{ md: "25px", base: "20px" }}
            textTransform="capitalize"
          >
            {" "}
            {propertyName}
          </Text>
        </Flex>

        <Flex mb="25px" borderBottom="1px solid black">
          <Text fontSize={{ md: "25px", base: "20px" }}>Room Type : </Text>
          <Spacer />

          <Text fontSize={{ md: "25px", base: "20px" }}>{roomType}</Text>
        </Flex>

        <Flex mb="25px" borderBottom="1px solid black">
          <Text fontSize={{ md: "25px", base: "20px" }}>Check in time :</Text>
          <Spacer />
          <Text fontSize={{ md: "25px", base: "20px" }}>
            <Moment format="D MMM YYYY" add={{ hours: -7 }}>
              {getStartDate}
            </Moment>
          </Text>
        </Flex>

        <Flex mb="25px" borderBottom="1px solid black">
          <Text fontSize={{ md: "25px", base: "20px" }}>Check out time :</Text>
          <Spacer />
          <Text fontSize={{ md: "25px", base: "20px" }}>
            <Moment format="D MMM YYYY" add={{ hours: -7 }}>
              {getEndDate}
            </Moment>
          </Text>
        </Flex>

        <Flex mb="40px" borderBottom="1px solid black">
          <Text fontSize={{ md: "25px", base: "20px" }}>Total Price :</Text>
          <Spacer />
          <Text fontSize={{ md: "25px", base: "20px" }}>{price}</Text>
        </Flex>

        <Flex mt={{ md: "100px", base: "50px" }}>
          <Text fontSize={{ md: "25px", base: "20px" }}>
            Accept this payment
          </Text>
          <Spacer />
          <Button
            onClick={modalApprove.onOpen}
            backgroundColor="linkedin.600"
            color="white"
            _hover={{ backgroundColor: "linkedin.500" }}
            mr="10px"
            w={{ md: "120px", base: "80px" }}
            h={{ base: "30px", md: "35px" }}
            border="none"
          >
            Accept
          </Button>
        </Flex>

        <Flex mt="20px">
          <Text fontSize={{ md: "25px", base: "20px" }}>
            Reject this payment
          </Text>
          <Spacer />
          <Button
            onClick={modalReject.onOpen}
            backgroundColor="red.600"
            color="white"
            _hover={{ backgroundColor: "red.500" }}
            mr="10px"
            w={{ md: "120px", base: "80px" }}
            h={{ base: "30px", md: "35px" }}
            border="none"
          >
            Reject
          </Button>
        </Flex>

        <Flex mt="20px">
          <Text fontSize={{ md: "25px", base: "20px" }}>
            {" "}
            Cancel this payment
          </Text>
          <Spacer />
          <Button
            onClick={modalCanceled.onOpen}
            backgroundColor="red.600"
            color="white"
            _hover={{ backgroundColor: "red.500" }}
            mr="10px"
            w={{ md: "120px", base: "80px" }}
            h={{ base: "30px", md: "35px" }}
            border="none"
          >
            Cancel
          </Button>
        </Flex>

        <AlertDialog
          motionPreset="slideInBottom"
          // leastDestructiveRef={cancelRef}
          onClose={modalApprove.onClose}
          isOpen={modalApprove.isOpen}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent h={{ md: "18vh", base: "30vh" }}>
              <AlertDialogHeader
                fontSize="30px"
                fontWeight="bold"
                borderRadius="10px"
              >
                Accept Payment
              </AlertDialogHeader>
              <AlertDialogCloseButton border="none" />
              <AlertDialogBody fontSize="18px">
                Are you sure you want to accept this payment?
              </AlertDialogBody>
              <AlertDialogFooter gap="10px">
                <Button
                  onClick={acceptPayment}
                  width="80px"
                  backgroundColor="linkedin.600"
                  _hover={{ backgroundColor: "linkedin.500" }}
                  textColor="white"
                  border="none"
                >
                  Yes
                </Button>
                <Button
                  onClick={modalApprove.onClose}
                  width="80px"
                  backgroundColor="red.600"
                  textColor="white"
                  _hover={{ backgroundColor: "red.500" }}
                  border="none"
                >
                  No
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <AlertDialog
          motionPreset="slideInBottom"
          // leastDestructiveRef={cancelRef}
          onClose={modalReject.onClose}
          isOpen={modalReject.isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent h={{ md: "18vh", base: "30vh" }}>
            <AlertDialogHeader
              fontSize="30px"
              borderRadius="10px"
              fontWeight="bold"
            >
              Reject Payment
            </AlertDialogHeader>
            <AlertDialogCloseButton border="none" />
            <AlertDialogBody fontSize="18px">
              Are you sure you want to reject this payment?
            </AlertDialogBody>
            <AlertDialogFooter gap="10px">
              <Button
                backgroundColor="linkedin.600"
                _hover={{ backgroundColor: "linkedin.500" }}
                textColor="white"
                onClick={rejectPayment}
                width="80px"
                border="none"
              >
                Yes
              </Button>
              <Button
                onClick={modalReject.onClose}
                width="80px"
                backgroundColor="red.600"
                textColor="white"
                _hover={{ backgroundColor: "red.500" }}
                border="none"
              >
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          motionPreset="slideInBottom"
          // leastDestructiveRef={cancelRef}
          onClose={modalCanceled.onClose}
          isOpen={modalCanceled.isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent h={{ md: "18vh", base: "30vh" }}>
            <AlertDialogHeader
              fontSize="30px"
              borderRadius="10px"
              fontWeight="bold"
            >
              Cancel Payment
            </AlertDialogHeader>
            <AlertDialogCloseButton border="none" />
            <AlertDialogBody fontSize="18px">
              Are you sure you want to cancel this payment?
            </AlertDialogBody>
            <AlertDialogFooter gap="10px">
              <Button
                backgroundColor="linkedin.600"
                _hover={{ backgroundColor: "linkedin.500" }}
                textColor="white"
                onClick={canceledPayment}
                width="80px"
                border="none"
              >
                Yes
              </Button>
              <Button
                onClick={modalCanceled.onClose}
                width="80px"
                backgroundColor="red.600"
                textColor="white"
                _hover={{ backgroundColor: "red.500" }}
                border="none"
              >
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    </Center>
  )
}

export default PaymentApproval
