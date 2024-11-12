import { createSlice } from "@reduxjs/toolkit";

const universalSlice = createSlice({
   name: 'universal',
   initialState: {
      data: []
   },
   reducers: {
      addUserData: (state, {payload}) => {
          console.log(payload)
      }
   }
})

export const {addUserData} = universalSlice.actions

export default universalSlice.reducer