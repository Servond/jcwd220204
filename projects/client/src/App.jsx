import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import Listing from "./pages/Listing"
import ListingDetails from "./pages/ListingDetails"

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      )
      setMessage(data?.message || "")
    })()
  }, [])

  return (
    <Routes>
      <Route path="/listing" element={<Listing />} />
      <Route path="/listing/details/:id" element={<ListingDetails />} />
    </Routes>
  )
}

export default App
