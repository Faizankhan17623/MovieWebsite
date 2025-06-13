import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null,
  isLoggedIn: false,
  loading: false,
  image:''
};


const authSlice = createSlice({
    name: "auth",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
        setToken(state,value){
            state.token = value.payload
        },
        setliggenin(state,value){
            state.isLoggedIn = value.payload
        },
        setUserImage(state,value){
            state.image = value.payload
        }
    }
})

export const {setUser,setLoading,setToken,setliggenin,setUserImage} = authSlice.actions
export default authSlice.reducer