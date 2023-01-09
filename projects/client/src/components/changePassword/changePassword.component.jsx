import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { getAuth, updatePassword } from "firebase/auth"
import { useFormik } from "formik"
import { useRef } from "react"
import { useState } from "react"
import * as Yup from "yup"

const ChangePass = ({ openModal, setOpenModal }) => {
  const auth = getAuth()
  const user = auth.currentUser

  const { onClose } = useDisclosure()
  const focusRef = useRef(null)
  const toast = useToast()
  const [closeModal, setCloseModal] = useState(true)

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async () => {
      try {
        await updatePassword(user, formik.values.password)
        setOpenModal(false)

        onClose(closeModal)
        toast({
          title: "Password has been change",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Change password failed",
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmpassword: Yup.string()
        .required("Re type your new password")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    validateOnChange: true,
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Modal
      isOpen={openModal}
      // onClose={modalClose}
      onClose={() => setOpenModal(false)}
      isCentered
      initialFocusRef={focusRef}
    >
      <ModalOverlay />
      <ModalContent height={{ base: "fit-content", md: "fit-content" }}>
        <ModalHeader borderRadius="10px">
          <Text>Enter your new password</Text>
        </ModalHeader>
        <ModalCloseButton border="none" />
        <ModalBody mt="0px" borderRadius="10px">
          <form onSubmit={formik.handleSubmit}>
            <Text mb="10px" fontSize="16px">
              New Password
            </Text>
            <FormControl isInvalid={formik.errors.password}>
              <Input
                // value={password}
                ref={focusRef}
                width="30vh"
                minW={"fit-content"}
                onChange={formChangeHandler}
                name="password"
                value={formik.values.password}
                mb="20px"
                type="password"
              />
              <FormErrorMessage mb="20px" mt="-10px">
                {formik.errors.password}
              </FormErrorMessage>
            </FormControl>
            <Text mb="10px" fontSize="16px">
              Confirm Password
            </Text>
            <FormControl isInvalid={formik.errors.confirmpassword}>
              <Input
                width="30vh"
                minW={"fit-content"}
                onChange={formChangeHandler}
                name="confirmpassword"
                value={formik.values.confirmPassword}
                type="password"
              />
              <FormErrorMessage>
                {formik.errors.confirmpassword}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt="20px"
              type="submit"
              bg="linkedin.500"
              color="white"
              _hover={{ bg: "linkedin.400" }}
              w="140px"
            >
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ChangePass
