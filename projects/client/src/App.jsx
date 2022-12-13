import axios from "axios"
import logo from "./logo.svg"
import "./App.css"
import { useEffect, useState } from "react"
import Home from "./components/home/Home"

import { Route, Router, Routes, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import SignUpForm from "./components/sign-up-form/sign-up-form.components"
import MyProfile from "./components/my-profile/MyProfile"
import EditProfile from "./components/edit-profile/EditProfile"
import Tenant from "./components/Tenant/Tenant"
import NotFoundPage from "./components/404"

import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api/index"
import { login } from "./redux/features/authSlice"

import Dashboard from "./components/Tenant/Dashboard"
import About from "./components/Tenant/About"
import Comment from "./components/Tenant/Comment"
import Analytics from "./components/Tenant/Analytics"
import OrderList from "./components/Tenant/OrderList"
import Listing from "./pages/listing/Listing"
import ListingDetails from "./pages/listing/ListingDetails"
import AddRoom from "./components/room/AddRoom"
import SignIn from "./components/sign-in-form/sign-in.component"
import SignInTenant from "./components/sign-in-form-Tenant/sign-in.component"
import Property from "./components/Tenant/Property"
import Loader from "./components/loader/Loader"
// import Sidebar from "./components/sidebar/Sidebar"
// import { useDispatch } from "react-redux"
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "./utils/firebase/firebase.utils"

function App() {
  // const [loaded, setLoaded] = useState(false)

  const authSelector = useSelector((state) => state.auth)
  console.log(authSelector, "test")
  const [message, setMessage] = useState("")
  const location = useLocation()

  console.log(location, "test2")

  const renderTenaantRoutes = () => {
    if (authSelector.role === "tenant") {
      return (
        <>
          <Route path="/tenant" element={<Tenant />} />
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
  // useEffect(() => {
  //   let timer = setTimeout(() => setLoaded(true), 2000)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [])

  return (
    <main>
      {/* {
        location.pathname.match("tenant") ? : 
        <Navbar />} */}
      <Navbar />
      {/* {!loaded ? <Loader /> : <ListingDetails />} */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/login-tenant" element={<SignInTenant />} />

        <Route path="/register" element={<SignUpForm />} />
        <Route
          path="/myprofile"
          element={authSelector.id === 0 ? <SignIn /> : <MyProfile />}
        />
        <Route path="/notfound" element={<NotFoundPage />} />

        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/inputroom" element={<AddRoom />} />

        {/* ========== Tenant Area =========== */}
        <Route
          path="/tenant/:id"
          element={
            authSelector.role === "tenant" ? <Tenant /> : <NotFoundPage />
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/property" element={<Property />} />
        <Route path="/orderlist" element={<OrderList />} />
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        <Route path="/listing" element={<Listing />} />

        <Route path="/listing/details/:id" element={<ListingDetails />} />
      </Routes>
      {/* <Footer /> */}
    </main>
  )
}

export default App
