import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import RegisterTenant from "./pages/RegisterTenant"
import RegisterUser from "./pages/RegisterUser"

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
      <Route path="/RegisterUser" element={<RegisterUser />} />
      <Route path="/RegisterTenant" element={<RegisterTenant />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  )
}

export default App
