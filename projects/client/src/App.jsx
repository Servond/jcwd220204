import axios from "axios"
import logo from "./logo.svg"
import { useEffect, useState } from "react"

import { Route, Router, Routes, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import { Link } from "react-router-dom"

import SignUpForm from "./components/sign-up-form/sign-up-form.components"

import NotFoundPage from "./components/404"

import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api/index"
import { login } from "./redux/features/authSlice"

import OrderList from "./components/order/OrderList"
import Listing from "./pages/listing/Listing"

import UserPage from "./components/user/User"

function App() {
  const authSelector = useSelector((state) => state.auth)
  console.log(authSelector, "test")
  const [message, setMessage] = useState("")
  const location = useLocation()

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
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUpForm />} />

        <Route path="/notfound" element={<NotFoundPage />} />

        {/* ========== Tenant Area =========== */}

        <Route path="/orderlist" element={<OrderList />} />

        <Route
          path="/tenant/:id"
          element={
            authSelector.role === "tenant" ? <Listing /> : <NotFoundPage />
          }
        />
        <Route
          path="/user/:id"
          element={
            authSelector.role === "user" ? <UserPage /> : <NotFoundPage />
          }
        />
      </Routes>
      {/* <Footer /> */}
    </main>
  )
}

export default App
