import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth"
import { useState } from "react"
import { useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ChangePass from "../changePassword/changePassword.component"
const ReAuth = ({ isOpen, onOpen, onClose }) => {
  const toast = useToast()
  const authSelector = useSelector((state) => state.auth)
  const focusRef = useRef()
  const auth = getAuth()
  const user = auth.currentUser
  const [reAuth, setReAuth] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [closeModal, setCloseModal] = useState(true)
  const [modalClose, setModalClose] = useState()
  const [rePassword, setRePassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credential = EmailAuthProvider.credential(
      authSelector?.email,
      rePassword
    )

    try {
      const reAtuhResponse = await reauthenticateWithCredential(
        user,
        credential
      )
      onClose(closeModal)
      setReAuth(reAtuhResponse.user)
      if (reAtuhResponse) {
        toast({
          title: "Success re enter your password",
          description: "Please enter your new password",
          status: "success",
        })
        setOpenModal(true)
        setModalClose(false)
      } else {
        throw e
      }
    } catch (err) {
      console.log(err)
      toast({
        title: "Wrong password",
        description: "Please re-check your password",
        status: "error",
      })
    }
  }

  return (
    <>
      <Modal
        initialFocusRef={focusRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent height="fit-content" borderRadius="10px" width="350px">
          <ModalHeader borderRadius="10px">
            <Text>Re Enter Your Password</Text>
          </ModalHeader>

          <ModalCloseButton border="none" color="black" />
          <ModalBody mt="10px">
            <form onSubmit={handleSubmit}>
              <FormLabel>Email</FormLabel>
              <FormLabel>{authSelector.email}</FormLabel>
              <FormLabel>Enter your password</FormLabel>
              <Input
                ref={focusRef}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                type="password"
              />
              <Button
                mt="20px"
                type="submit"
                bg="linkedin.500"
                color="white"
                _hover={{ bg: "linkedin.400" }}
                width="130px"
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ChangePass
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeModal={closeModal}
      />
    </>
  )
}

export default ReAuth
