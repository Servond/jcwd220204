import { configureStore } from "@reduxjs/toolkit"

import authSlice from "./features/authSlice"
import roomSlice from "./features/roomSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    room: roomSlice,
  },
})
