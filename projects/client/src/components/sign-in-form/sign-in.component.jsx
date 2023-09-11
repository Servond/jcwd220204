import React from "react"
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../redux/features/authSlice"

import { logout } from "../../redux/features/authSlice"

//===================firebase=====================
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../config/firebase"
import { useEffect } from "react"
import FormInput from "../input/from-input.component"
//import { useContext } from "react"
//import { AuthContext } from "../context/AuthContext"
//===================firebase=====================

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authSelector = useSelector((state) => state.auth)
  const toast = useToast()
  const selector = useSelector((state) => state.auth)

  // LOGOUT

  //const {dispatch} = useContext(AuthContext)

  // LOGIN GOOGLE
  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup()
    const idToken = await result.user.getIdToken()
    const response = await axiosInstance.post("/auth/login-user", {
      googleToken: idToken,
      // is_verified: true,
    })

    if (response.name === "AxiosError") {
      throw new Error(
        response.message,
        toast({
          title: "Login failed",
          description: "User not Found",
          status: "error",
        })
      )
    }

    localStorage.setItem("auth_token", response.data.token)
    dispatch(
      login({
        id: response.data.data.id,
        email: response.data.data.email,
        role: response.data.data.role,
        is_verified: response.data.data.is_verified,
        // first_name: response.data.data.first_name,
        // last_name: response.data.data.last_name,
      })
    )
    toast({
      title: "Login success",
      description: response.data.message,
      status: "success",
    })
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // role: "user",
      // loginWith: "google",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const signInResult = await signInAuthUserWithEmailAndPassword(
          email,
          password
        )

        const idToken = await signInResult.user.getIdToken()

        const response = await axiosInstance.post("/auth/login-user", {
          googleToken: idToken,
          role: "user",
        })
        localStorage.setItem("auth_token", response.data.token)

        dispatch(
          login({
            id: response.data.data.id,
            email: response.data.data.email,
            role: response.data.data.role,
            is_verified: response.data.data.is_verified,
            loginWith: response.data.data.loginWith,
            // first_name: response.data.data.first_name,
            // last_name: response.data.data.last_name,
          })
        )
        // console.log(response)

        toast({
          title: "Login success",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Login Failed",
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  if (authSelector.role === "user") {
    navigate("/")
  }
  return (
    <Box
      display="flex"
      flexDir="column"
      width={{ base: "355px", sm: "450px" }}
      alignSelf="center"
      h={{ base: "550px", sm: "650px" }}
      justifyContent="center"
      boxShadow="0px 1px 10px 0px black"
      borderRadius="10px"
      textAlign="center"
      alignItems="center"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      // margin="auto"
    >
      <Box margin="auto">
        <VStack>
          <Text fontSize="3xl" fontWeight="bold">
            LOGIN USER
          </Text>
          <Text fontSize="xl" fontWeight="bold" mb="10px">
            Already have an account?
          </Text>
          <Text>Sign in with your email and password</Text>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <FormControl
                isInvalid={formik.errors.email}
                style={{ marginLeft: "10px" }}
              >
                <FormInput
                  label="Email"
                  type="email"
                  // required
                  onChange={formChangeHandler}
                  name="email"
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.password}
                style={{ marginLeft: "10px" }}
              >
                <FormInput
                  label="Password"
                  type="password"
                  // required
                  onChange={formChangeHandler}
                  name="password"
                  value={formik.values.password}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
            </Box>

            {/* <Box display="grid" border="1px solid red" > */}
            <Button
              type="submit"
              width="fit-content"
              minW="330px"
              color="white"
              backgroundColor="linkedin.500"
              _hover={{ backgroundColor: "linkedin.400" }}
              h="45px"
              cursor={"pointer"}
            >
              Sign In
            </Button>
            <br />
            <br />
            <Button
              width="fit-content"
              minW="330px"
              type="button"
              onClick={signInWithGoogle}
              bottom="5"
              h="45px"
              color="white"
              backgroundColor="red.500"
              _hover={{ backgroundColor: "red.400" }}
              cursor={"pointer"}
            >
              Sign In With Google
            </Button>
            {/* <Button buttonType="inverted" onClick={logoutBtnHandler}>
            Logout
          </Button> */}

            <Text fontSize="20px" mr="20px">
              Not a user?{" "}
              <Link
                to="/register"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Sign Up
              </Link>
            </Text>
          </form>
        </VStack>
      </Box>
    </Box>
  )
}

export default SignIn
