import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://nginep-f1ba2-default-rtdb.firebaseio.com",
})
export { axiosInstance }
