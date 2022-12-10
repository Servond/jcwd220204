// import { useState } from "react"
// import FormInput from "../form-input/form-input.component"
// import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"

// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils"

// import "./sign-up-form.styles.scss"

// const defaultFormFields = {
//   displayName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// }

// const SignUpForm = () => {
//   const [formFields, setFormFields] = useState(defaultFormFields)
//   const { displayName, email, password, confirmPassword } = formFields

//   // console.log("hit")

//   const resetFormFields = () => {
//     setFormFields(defaultFormFields)
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     if (password !== confirmPassword) {
//       alert("passwords do not match")
//       return
//     }
//     try {
//       const { user } = await createAuthUserWithEmailAndPassword(email, password)
//       // setCurrentUser(user)
//       await createUserDocumentFromAuth(user, { displayName })
//       resetFormFields()
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         alert("Cannot create user, email already in use")
//       } else {
//         console.log("user creation encountered an error", error)
//       }
//     }
//   }

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setFormFields({ ...formFields, [name]: value })
//   }

//   return (
//     <div className="sign-up-container">
//       <h2>Don't have an account?</h2>
//       <span>Sign up with your email and password</span>
//       <form onSubmit={handleSubmit}>
//         <FormInput
//           label="Display Name"
//           type="text"
//           required
//           onChange={handleChange}
//           name="displayName"
//           value={displayName}
//         />

//         <FormInput
//           label="Email"
//           type="email"
//           required
//           onChange={handleChange}
//           name="email"
//           value={email}
//         />

//         <FormInput
//           label="Password"
//           type="password"
//           required
//           onChange={handleChange}
//           name="password"
//           value={password}
//         />

//         <FormInput
//           label="Confirm Password"
//           type="password"
//           required
//           onChange={handleChange}
//           name="confirmPassword"
//           value={confirmPassword}
//         />
//         <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
//           Sign Up
//         </Button>
//       </form>
//     </div>
//   )
// }

// export default SignUpForm

import React from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../../api/index"

//===================firebase=====================
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
//===================firebase=====================

const SignUpForm = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        //===================firebase=====================

        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log(user)

            const response = await axiosInstance.post("/auth/register", {
              email,
              password,
              //role: "tenant"
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
            // ..
          })

        //===================firebase=====================
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
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
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
          <Text fontWeight="bold" fontSize="4xl" mb="8">
            Register
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
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
                  value={formik.values.password}
                  name="password"
                  onChange={formChangeHandler}
                  type="password"
                  marginBottom="20px"
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple">
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

export default SignUpForm
