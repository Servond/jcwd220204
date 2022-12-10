import axios from "axios"
import logo from "./logo.svg"
import "./App.css"
import { useEffect, useState } from "react"
import Home from "./components/home/Home"

import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { Link } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import SignUpForm from "./components/sign-up-form/sign-up-form.components"
import SignInForm from "./components/sign-in-form/sign-in-form.components"
import MyProfile from "./components/my-profile/MyProfile"
import EditProfile from "./components/edit-profile/EditProfile"
import Tenant from "./components/Tenant/Tenan"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./components/Unauthorized"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api/index"
import { login } from "./redux/features/authSlice"
// import { useDispatch } from "react-redux"
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "./utils/firebase/firebase.utils"

function App() {
  const authSelector = useSelector((state) => state.auth)
  const [message, setMessage] = useState("")
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user)
  //     }

  //     dispatch(setCurrentUser(user))
  //   })

  //   return unsubscribe
  // }, [dispatch])
  const renderTenaantRoutes = () => {
    if (authSelector.role === "tenant") {
      return (
        <>
          <Route path="tenan/dashboard" element={<Tenant />} />
        </>
      )
    }
    return null
  }

  const [authCheck, setAuthCheck] = useState(false)
  const dispatch = useDispatch()
  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token", {
        headers: {
          authorization: `Bearer ${auth_token}`,
        },
      })
      console.log(response)

      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }
  useEffect(() => {
    keepUserLoggedIn()
  }, [])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      )
      setMessage(data?.message || "")
    })()
  }, [])
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     {message}
    //   </header>
    // </div>

    <main>
      {/* <Navbar />
      <Home />
      <Popular /> */}

      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          {/* <Route index element={<Popular />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpForm />} />
          {/* <Route path="/login" element={<SignInForm />} /> */}
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/tenant" element={<Tenant />} />

          {/* {renderTenaantRoutes()} */}
          {/* <Route path="/popular" element={<Popular />} /> */}
        </Route>
      </Routes>
    </main>
  )
}

export default App
