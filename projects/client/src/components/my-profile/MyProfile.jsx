import React from "react"
import "./MyProfile.scss"
import { useState } from "react"
import image from "../../assets/Foto_Danar_Sadan_Bastian_4x6-removebg-preview.jpg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Avatar, Button, useDisclosure, useToast } from "@chakra-ui/react"
import { axiosInstance } from "../../api/index"
import { useEffect } from "react"
import { useFormik } from "formik"
import { auth } from "../../config/firebase"
import Navbar from "../navbar/Navbar"
import ReAuth from "../reAuthUser/reAuth.component"
// import { Avatar } from "@chakra-ui/react"

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth)
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState({})
  const params = useParams()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log(authSelector)

  return (
    <>
      <div className="box-container">
        <div className="card-container">
          <div className="upper-container">
            <div className="image-container">
              {/* <img src={image} class="card-image" /> */}
              <img
                alt=""
                height="100px"
                weight="100px"
                src={authSelector?.profile_picture}
              />
            </div>
          </div>
          <div className="lower-container">
            <h3>{authSelector.username || "username"}</h3>
            <span
              style={{
                fontStyle: "italic",
                color: "red",
              }}
            >
              {authSelector.role}
            </span>
            <h4>{authSelector.email || "email"}</h4>
            <h4>{authSelector.gender}</h4>
            <h4>{authSelector.phone_number}</h4>

            <h4>{authSelector.birthdate}</h4>

            {authSelector.loginWith === "email" ? (
              <h4 onClick={onOpen}>Change Password</h4>
            ) : null}

            <Link to={"/editprofile"}>
              <button type="submit">Edit Profile</button>
            </Link>
            {authSelector.loginWith === "email" ? (
              <li className="navbar-li">
                <Link
                  className="login-transform"
                  // to="/reauth"
                  onClick={onOpen}
                >
                  Change Password
                </Link>
              </li>
            ) : null}
          </div>
        </div>
        <ReAuth isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  )
}

export default MyProfile
