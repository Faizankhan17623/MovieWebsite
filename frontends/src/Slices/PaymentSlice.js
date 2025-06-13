import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'



const initialState = {
    user:null,
    loading:false
}

const PaymentSlice = ({
    name:"Payment",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        }
    }
})



export const {setUser,setLoading} = PaymentSlice.actions
export default  PaymentSlice.reducers