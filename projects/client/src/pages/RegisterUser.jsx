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
import { axiosInstance } from "../api"
import { FcGoogle  } from "react-icons/fc"
import { GrLinkPrevious } from "react-icons/gr";



//===================firebase=====================
import { createUserWithEmailAndPassword } from "firebase/auth"
import {
  auth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../config/firebase"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../redux/features/authSlice"
import { useDispatch } from "react-redux"
//===================firebase=====================

const RegisterUser = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup()
    const idToken = await result.user.getIdToken()

    const response = await axiosInstance.post("/auth/login/google", {
      googleToken: idToken,
    })

    dispatch(
      login({
        id: response.data.data.id,
        email: response.data.data.email
      })
    )

    navigate("/login")

    toast({
      title: "Registration successful",
      description: response.data.message,
      status: "success",
    })
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      role: "user",
    },
    onSubmit: async ({
      email,
      password,
      first_name,
      last_name,
      phone_number,
      role,
    }) => {
      try {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log(user)

            const response = await axiosInstance.post("/auth/register", {
              email,
              password,
              first_name,
              last_name,
              phone_number,
              role,
            })

            navigate("/login")

            toast({
              title: "Registration successful",
              description: response.data.message,
              status: "success",
            })
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            if (error.code = "auth/email-already-in-use") {
              toast({
                title: "Another account is using the same email",
                status: "error",
              })
            }
          })

        //=========================== sign in with google================
        const signInResult = await signInAuthUserWithEmailAndPassword(
          email,
          password
        )

        const idToken = await signInResult.user.getIdToken()

        const response = await axiosInstance.post("/auth/login/google", {
          googleToken: idToken,
        })

        localStorage.setItem("googleToken", response.data.token)

        dispatch(
          login({
            id: response.data.data.id,
            email: response.data.data.email
          })
        )

        //=========================== sign in with google================
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
      first_name: Yup.string().required("Please enter your first name"),
      last_name: Yup.string().required("Please enter your last name"),
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
    <Box h="100vh" display={"flex"} alignItems="center">
      <Container>
        <Box p="8">
          <HStack mb="8">
            <Link to="/">
            <GrLinkPrevious size={"35px"}/>
            </Link>
          <Text fontWeight="bold" fontSize="3xl" paddingLeft="10" >
            Create New User Account
          </Text>
          </HStack>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <FormControl isInvalid={formik.errors.first_name}>
                <FormLabel>First Name</FormLabel>
                <Input
                  borderColor={"blackAlpha.500"}
                  value={formik.values.first_name}
                  name="first_name"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.last_name}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  borderColor={"blackAlpha.500"}
                  value={formik.values.last_name}
                  name="last_name"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
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
              <Button type="submit" colorScheme="purple">
                Sign up
              </Button>
              <Flex align="center">
                <Divider borderColor={"blackAlpha.500"}/>
                <Text marginLeft={"4"} marginRight={"4"}>or</Text>
                <Divider borderColor={"blackAlpha.500"}/>
              </Flex>
              <Button
                type="button"
                onClick={signInWithGoogle}
                leftIcon={<FcGoogle />}
              >
                Sign up with Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

export default RegisterUser
