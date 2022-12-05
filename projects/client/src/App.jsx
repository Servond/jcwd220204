import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import RegisterTenant from "./pages/RegisterTenant"
import RegisterUser from "./pages/RegisterUser"
import "./App.css"
import { useEffect, useState } from "react"
import Home from "./components/home/Home"
import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import Navbar from "./components/navbar/Navbar"
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
import Property from "./components/Tenant/Property"
import SignInTenant from "./components/sign-in-form-Tenant/sign-in.component"
import SignIn from "./components/sign-in-form/sign-in.component"
// import Sidebar from "./components/sidebar/Sidebar"
// import { useDispatch } from "react-redux"
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "./utils/firebase/firebase.utils"

function App() {
  const authSelector = useSelector((state) => state.auth)
  console.log(authSelector, "test")
  const [message, setMessage] = useState("")
  const location = useLocation()

  console.log(location, "test2")

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
      {/* {
        location.pathname.match("tenant") ? : 
        <Navbar />} */}
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Navbar />}> */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
      <Route path="/RegisterTenant" element={<RegisterTenant />} />
        <Route
          path="/myprofile"
          element={authSelector.id === 0 ? <Login /> : <MyProfile />}
        />
        <Route path="/notfound" element={<NotFoundPage />} />
  <Route path="/login" element={<SignIn />} />
      <Route path="/logintenant" element={<SignInTenant />} />
        <Route path="/editprofile" element={<EditProfile />} />

        {/* ========== Tenant Area =========== */}
        <Route
          path="/tenant"
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

        {/* {renderTenaantRoutes()} */}
      </Routes>
    </main>
  )
}

export default App
