import React from "react"
import {
  Box,
  Button,
  Container,
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

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"
import { Link, useNavigate } from "react-router-dom"
import { GrLinkPrevious } from "react-icons/gr"

const RegisterTenant = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone_number: "",
      username: "",
      role: "tenant",
      ktp: "",
      loginWith: "email",
    },

    onSubmit: async (values) => {
      try {
        //ADD THE EMAIL TO FIREBASE
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )

        const user = userCredential.user
        // console.log(user)

        let newAcc = new FormData()

        newAcc.append("email", values.email)
        newAcc.append("password", values.password)
        newAcc.append("username", values.username)
        newAcc.append("phone_number", values.phone_number)
        newAcc.append("role", values.role)
        newAcc.append("ktp", values.ktp)
        newAcc.append("loginWith", values.loginWith)
        // const userData = {
        //   email: values.email,
        //   password: values.password,
        //   username: values.username,
        //   phone_number: values.phone_number,
        //   role: values.role,
        //   ktp: values.ktp,
        //   loginWith: values.loginWith,
        // }

        const response = await axiosInstance.post(
          "/auth/register-tenant",
          newAcc
        )

        navigate("/check-email")

        toast({
          title: "Registration successful",
          description: response.data.message,
          status: "success",
        })
        // }).catch((error) => {
        //   const errorCode = error.code
        //   const errorMessage = error.message
        //   if (error.code === "auth/email-already-in-use") {
        //     toast({
        //       title: "Another account is using the same email",
        //       status: "error",
        //     })
        //   }
        // })
      } catch (err) {
        toast({
          title: "Registration failed",
          //   description: err.response.data.message,
          status: "error",
        })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email address").email(),
      username: Yup.string().required("Please enter your username"),
      phone_number: Yup.number().required("Please enter your phone number"),
      ktp: Yup.mixed().required("Please upload your KTP"),
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
    <Box h="100vh" display={"flex"} alignItems="center">
      <Container border={"2px solid white"} boxShadow="2xl">
        <Box p="8">
          <HStack mb="8">
            <Link to="/">
              <GrLinkPrevious size={"25px"} />
            </Link>
            <Text
              fontWeight="bold"
              fontSize={{ md: "2xl", sm: "20px" }}
              paddingLeft="10"
            >
              Create New Tenant Account
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
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>KTP</FormLabel>
                <Input
                  borderColor={"blackAlpha.500"}
                  name="ktp"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue("ktp", event.target.files[0])
                  }}
                  marginBottom="20px"
                />
              </FormControl>
              <Button type="submit" colorScheme="whatsapp" cursor={"pointer"}>
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

export default RegisterTenant
