import React from "react"
import { FormControl, FormErrorMessage, useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../redux/features/authSlice"
import "./sign-in.styles.css"

//===================firebase=====================
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../config/firebase"

import FormInput from "../input/from-input.component"
import Button from "../button/button.component"

//===================firebase=====================

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authSelector = useSelector((state) => state.auth)
  const toast = useToast()
  const selector = useSelector((state) => state.auth)

  // LOGIN GOOGLE
  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup()
    const idToken = await result.user.getIdToken()
    const response = await axiosInstance.post("/auth/login/google", {
      googleToken: idToken,
    })

    console.log(response)
    localStorage.setItem("auth_token", response.data.token)
    dispatch(
      login({
        id: response.data.data.id,
        email: response.data.data.email,
        role: response.data.data.role,
        is_verified: response.data.data.is_verified,
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
      role: "user",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const signInResult = await signInAuthUserWithEmailAndPassword(
          email,
          password
        )

        const idToken = await signInResult.user.getIdToken()

        const response = await axiosInstance.post("/auth/login/google", {
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
          description: err.response.data.message,
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
  } else if (authSelector.role === "tenant") {
    navigate("/tenant")
  }

  return (
    <div className="sign-in-container">
      <h1>LOGIN</h1>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={formik.errors.email}
          style={{ marginLeft: "10px" }}
        >
          <FormInput
            label="Email"
            type="email"
            required
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
            required
            onChange={formChangeHandler}
            name="password"
            value={formik.values.password}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>

          <div>
            <br />
            <h3>
              Not a user? <Link to="/register">Sign Up</Link>
            </h3>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn
