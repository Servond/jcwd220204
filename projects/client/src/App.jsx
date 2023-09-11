import axios from "axios"

import { useEffect, useState } from "react"

import { Route, Router, Routes, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api/index"
import { login } from "./redux/features/authSlice"
import ListingDetails from "./pages/listing/ListingDetails"
import Navbar from "./components/navbar/Navbar"

import OrderList from "./components/order/OrderList"
import Listing from "./pages/listing/Listing"
import NotFoundPage from "./components/404"
import EditProfile from "./components/edit-profile/EditProfile"
import MyProfile from "./components/my-profile/MyProfile"

import Home from "./components/home/Home"
import AddRoom from "./components/room/AddRoom"
import SignIn from "./components/sign-in-form/sign-in.component"
import SignInTenant from "./components/sign-in-form-Tenant/sign-in.component"
import SignUpForm from "./components/sign-up-form/sign-up-form.components"

import Loader from "./components/loader/Loader"
import PropertyForm from "./components/property-form/property-form.component"
import PostPropImg from "./components/postPropImg/post-prop-img.component"
import EditProperty from "./components/editProperty/edit-property.component"
import PaymentProof from "./components/proofPayment/proofPayment.component"
import PaymentApproval from "./components/paymentApproval/paymentApproval"
import UserPage from "./components/user/User"
import DetailProperty from "./components/user/DetailProperty"
import LoginUserTenant from "./components/home/LoginUserTenant"

import DummyTransaction from "./components/dummyTransaction/dummyTransaction"
import Footer from "./components/Footer/Footer"
import UserOrderList from "./pages/UserOrderList"
import Finances from "./components/finances/Finances"
import { Spacer } from "@chakra-ui/react"
import RegisterTenant from "./components/sign-up-form-tenant/sign-up-form-tenant.component"
import CheckEmailVerif from "./components/check-email/CheckEmailVerif"

function App() {
  const authSelector = useSelector((state) => state.auth)
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
        // `http://localhost:8204/api/greetings`
      )
      setMessage(data?.message || "")
    })()
  }, [])

  return (
    <main>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/inputroom" element={<AddRoom />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="login/tenant" element={<SignInTenant />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/register-tenant" element={<RegisterTenant />} />

        <Route
          path="/myprofile"
          element={authSelector.id === 0 ? <LoginUserTenant /> : <MyProfile />}
        />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route
          path="/tenant/:id"
          element={
            authSelector.role === "tenant" ? <Listing /> : <NotFoundPage />
          }
        />

        <Route path="/property/edit/:id" element={<EditProperty />} />
        <Route path="/property-form" element={<PropertyForm />} />
        <Route path="/property/image/:id" element={<PostPropImg />} />
        <Route
          path="/tenant/:id"
          element={
            authSelector.role === "tenant" ? <Listing /> : <NotFoundPage />
          }
        />
        <Route path="/payment-proof/:id" element={<PaymentProof />} />
        <Route path="/payment-approval/:id" element={<PaymentApproval />} />
        <Route path="/dummy-transaction/" element={<DummyTransaction />} />
        <Route path="/listing/details/:id" element={<ListingDetails />} />
        {/* <Route path="/user/:id" element={<UserPage />} /> */}
        <Route path="/roomdetail/:id" element={<DetailProperty />} />
        <Route
          path="/userpage/:id"
          element={
            authSelector.role === "user" || authSelector.id !== 0 ? (
              <UserOrderList />
            ) : (
              <NotFoundPage />
            )
          }
        />
        <Route path="/startpage" element={<LoginUserTenant />} />
        <Route path="/notfoundpage" element={<NotFoundPage />} />
        <Route path="/roomdetail/:id" element={<DetailProperty />} />
        <Route path="/userpage/:id" element={<UserOrderList />} />
        <Route path="/finances/:id" element={<Finances />} />

        <Route path="/check-email" element={<CheckEmailVerif />} />
      </Routes>
      <Spacer />
      <Footer />
    </main>
  )
}

export default App
