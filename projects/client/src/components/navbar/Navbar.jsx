import React from "react"
import { useState } from "react"
import "./Navbar.scss"
import { IoIosHome } from "react-icons/io"
import { HiX, HiMenu } from "react-icons/hi"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Popular from "../popular/Popular"
import { useDispatch, useSelector } from "react-redux"
import SignIn from "../sign-in-form/sign-in.component"
import { logout } from "../../redux/features/authSlice"
import { Text } from "@chakra-ui/react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [active, setActive] = useState("navBar")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const showNav = () => {
    setActive("navBar activeNavbar")
  }
  const removeNav = () => {
    setActive("navBar")
  }
  const authSelector = useSelector((state) => state.auth)

  const [transparent, setTransparent] = useState("header")
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader")
    } else {
      setTransparent("header")
    }
  }
  window.addEventListener("scroll", addBg)

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout())
    navigate("/")
  }
  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="logoDiv">
          <a href="/" className="logo">
            <h1>
              <IoIosHome className="icon" />
              Nginep.com
            </h1>
          </a>
        </div>
        <div
          className={active}
          onClick={() => {
            setOpenOption(!openOption)
          }}
        >
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>

            <li className="navItem">
              {authSelector.role === "tenant" ? (
                <a href={`/tenant/${authSelector.id}`} className="navLink">
                  Tenant Page
                </a>
              ) : (
                <a href={`/userpage/${authSelector.id}`} className="navLink">
                  User Page
                </a>
              )}
            </li>
            <li className="navItem">
              <a href="/myprofile" className="navLink">
                My Profile
              </a>
            </li>

            <div className="headerBtns flex">
              {authSelector.id === 0 ? (
                <button className="btn loginBtn">
                  <Link to="/startpage">
                    <a href="/startpage">Login</a>
                  </Link>
                </button>
              ) : (
                <button className="btn loginBtn" onClick={logoutBtnHandler}>
                  <Link to="/login">
                    <a href="/login">Logout</a>
                  </Link>
                </button>
              )}
              {/* <button className="btn">
                <a href="/register">Sign Up</a>
              </button> */}
            </div>
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <HiX className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <HiMenu
            className="icon"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          />
        </div>
      </div>
      <Outlet />
    </section>
  )
}

export default Navbar
