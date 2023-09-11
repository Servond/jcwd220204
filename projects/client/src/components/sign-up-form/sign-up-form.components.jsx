import React from "react"
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../../api"
import { GrLinkPrevious } from "react-icons/gr"

//===================firebase=====================
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"
import { Link, useNavigate } from "react-router-dom"
//===================firebase=====================

const RegisterUser = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone_number: "",
      role: "user",
      username: "",
      loginWith: "email",
    },
    onSubmit: async ({
      email,
      password,
      username,
      phone_number,
      role,
      loginWith,
    }) => {
      try {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user
            // console.log(user)

            const response = await axiosInstance.post("/auth/register-user", {
              email,
              password,
              username,
              phone_number,
              role,
              loginWith,
            })

            toast({
              title: "Registration successful",
              description: response.data.message,
              status: "success",
            })
            navigate("/login")
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            if ((error.code = "auth/email-already-in-use")) {
              toast({
                title: "Another account is using the same email",
                status: "error",
              })
            }
          })
      } catch (err) {
        toast({
          title: "Registration failed",
          description: err.response.data.message,
          status: "error",
        })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email address").email(),
      username: Yup.string().required("Please enter your username"),
      phone_number: Yup.number().required("Please enter your phone number"),
      password: Yup.string()
        .required("Please enter your new password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Box
      h="fit-content"
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Container boxShadow={"2xl"}>
        <Box p="8">
          <HStack mb="8">
            <Link to="/">
              <GrLinkPrevious size={"35px"} />
            </Link>
            <Text fontWeight="bold" fontSize="3xl" paddingLeft="10">
              Create New User Account
            </Text>
          </HStack>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <FormControl isInvalid={formik.errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  borderColor={"blackAlpha.500"}
                  value={formik.values.username}
                  name="username"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.phone_number}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  borderColor={"blackAlpha.500"}
                  value={formik.values.phone_number}
                  name="phone_number"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formik.errors.phone_number}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  borderColor={"blackAlpha.500"}
                  value={formik.values.email}
                  name="email"
                  onChange={formChangeHandler}
                  type="email"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  borderColor={"blackAlpha.500"}
                  value={formik.values.password}
                  name="password"
                  onChange={formChangeHandler}
                  type="password"
                  marginBottom="20px"
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="whatsapp"
                color="white"
                cursor={"pointer"}
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

export default RegisterUser
