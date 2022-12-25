import axios from "axios"
import { useEffect, useState } from "react"

import { Route, Router, Routes, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api/index"
import { login } from "./redux/features/authSlice"

import OrderList from "./components/order/OrderList"
import Listing from "./pages/listing/Listing"

import AddRoom from "./components/room/AddRoom"
import SignIn from "./components/sign-in-form/sign-in.component"
import SignInTenant from "./components/sign-in-form-Tenant/sign-in.component"
import Property from "./components/Tenant/Property"
import Loader from "./components/loader/Loader"
import PropertyForm from "./components/property-form/property-form.component"
import PostPropImg from "./components/postPropImg/post-prop-img.component"
import EditProperty from "./components/editProperty/edit-property.component"
import PaymentProof from "./components/proofPayment/proofPayment.component"
import PaymentApproval from "./components/paymentApproval/paymentApproval"

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
        <Route path="/inputroom" element={<AddRoom />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route
          path="/tenant/:id"
          element={authSelector.role === "tenant" ? <Listing /> : null}
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/property" element={<Property />} />
        <Route path="/orderlist" element={<OrderList />} />

        <Route path="/property/edit/:id" element={<EditProperty />} />
        <Route path="/property-form" element={<PropertyForm />} />
        <Route path="/property/image/:id" element={<PostPropImg />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/payment-proof/:id" element={<PaymentProof />} />
        <Route path="/payment-approval/:id" element={<PaymentApproval />} />

        <Route path="/listing/details/:id" element={<ListingDetails />} />
      </Routes>
    </main>
  )
}

export default App
