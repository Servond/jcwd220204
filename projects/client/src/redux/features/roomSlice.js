import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  item_name: "",

  description: "",

  capacity: "",
  price: "",
  PropertyId: "",
}

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    roommate: (state, action) => {
      state.id = action.payload.id
      state.item_name = action.payload.item_name
      state.description = action.payload.description
      state.capacity = action.payload.capacity
      state.price = action.payload.price

      state.PropertyId = action.payload.PropertyId

      // state.first_name = action.payload.first_name
      // state.last_name = action.payload.last_name
      console.log(action.payload)
    },
  },
})

export const { roommate } = roomSlice.actions

export default roomSlice.reducer
