import React from 'react'

//import link
import { Link } from 'react-router-dom'
//import logo
import Logo from '../assets/img/logo-Nginep.jpg'

const Header = () => {
  return (
    <header className="py-6 mb-12 border-b">
      <div className="container mx-auto flex justify-between item-center">
        {/* logo */}
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        {/* buttons */}
        <div className="flex items-center gap-6">
          <Link className="hover:text-blue-900 transition" to="">
            Log in
          </Link>
          <Link className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition" to="">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
