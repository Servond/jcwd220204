import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  email: "",
  // first_name: "",
  // last_name: ""
  gender: "",
  birthdate: "",
  profile_picture: "",
  role: "",
  phone_number: "",
  ktp: "",
  loginWith: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.email = action.payload.email
      state.gender = action.payload.gender
      state.birthdate = action.payload.birthdate
      state.profile_picture = action.payload.profile_picture
      state.role = action.payload.role
      state.phone_number = action.payload.phone_number
      state.ktp = action.payload.ktp
      state.loginWith = action.payload.loginWith
    },
    logout: (state) => {
      state.id = 0
      state.email = ""
      state.gender = ""
      state.birthdate = ""
      state.profile_picture = ""
      state.role = ""
      state.phone_number = ""
      state.ktp = ""
      state.loginWith = ""
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
