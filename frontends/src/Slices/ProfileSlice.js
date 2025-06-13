import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    likes:0,
    dislikes:0,
    user:null
}


const ProfileSlice = createSlice({
    name:"Profile",
    initialState:initialState,
    reducers:{
        setloading:(state,value)=>{
            state.loading  = value.payload
        },
        setlikes:(state,value)=>{
            state.likes = value.payload
        },
        setdislikes:(state,value)=>{
            state.dislikes = value.payload
        },
        setuser:(state,value)=>{
            state.user = value.payload
        }
    }
})



export const{setuser,setloading,setlikes,setdislikes} = ProfileSlice.actions


export default ProfileSlice.reducer