import React from "react"
import { useState } from "react"
import "./Navbar.scss"
import { IoIosHome } from "react-icons/io"
import { HiX, HiMenu } from "react-icons/hi"
import Login from "../../pages/Login"
import { Link, Outlet } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [active, setActive] = useState("navBar")
  const showNav = () => {
    setActive("navBar activeNavbar")
  }
  const removeNav = () => {
    setActive("navBar")
  }

  const [transparent, setTransparent] = useState("header")
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader")
    } else {
      setTransparent("header")
    }
  }
  window.addEventListener("scroll", addBg)

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
            {/* <li className="navItem">
              <a href="#popular" className="navLink">
                Popular
              </a>
            </li> */}
            <li className="navItem">
              <a href="#" className="navLink">
                Resources
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Blog
              </a>
            </li>
            <li className="navItem">
              <a href="/myprofile" className="navLink">
                My Profile
              </a>
            </li>
            <li className="navItem">
              <a href="/tenant" className="navLink">
                Tenant Page
              </a>
            </li>
            <div className="headerBtns flex">
              {/* <Link className="btn loginBtn" to="/login">
                Login/Signup
              </Link> */}
              <button className="btn loginBtn">
                <Link to="/login">
                  <a href="/login">Login/Logout</a>
                </Link>
              </button>
              <button className="btn">
                <a href="/register">Sign Up</a>
              </button>
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
