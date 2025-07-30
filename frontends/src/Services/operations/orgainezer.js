import toast from 'react-hot-toast'
import {apiConnector} from '../apiConnector'
import {CreateOrgainezer,Ticket,AllotTheatre,GetAllSHowsDetails,GetAllTheatreDetails} from "../Apis/OranizaerApi"
import { setLoading} from '../../Slices/orgainezerSlice'
import {setToken,setLogin,setUserImage} from '../../Slices/authSlice.js'

const {createorgainezer,orgainezerlogin} = CreateOrgainezer


export function Creation(name,password,email,number,otp){
    return async (dispatch) => {
        dispatch(setLoading(true));
        const ToastId = toast.loading("Creating the orgainezer, please wait...");
        try{
            if (!name || !password || !email || !number || !otp) {
        throw new Error('Missing required fields');
      }

            const response = await apiConnector("POST",createorgainezer,{
                name:name,
                password: password,
                email: email,
                number: number,
                otp: otp
            })
            //  console.log("This is the responsee data",response)

            if(!response.data.success){
                throw new Error(response.data.message || "Failed to create orgainezer");
            }
             // toast.success("Signup Successful")
            return { success: true, data: response.data };
        }catch(error){
            console.log("Error in Creating the orgainezer",error)
            console.log("Error in Creating the orgainezer",error.message)
            return { success: false, error: error.message };
        }
        finally {
            dispatch(setLoading(false));
            toast.dismiss(ToastId);
        }
    }    
}


export function OrgainezerLogin(email,password){
    return async (dispatch) => {
        dispatch(setLoading(true));
        const ToastId = toast.loading("Logging in, please wait...");
        try{
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            const response = await apiConnector("POST",orgainezerlogin,{
                email:email,
                password:password
            })
           console.log("User is been logged in ")
                      toast.success('Congragulations you are logged in')
                      dispatch(setToken(response.data.token))
                      const userimage = response.data.image
                      dispatch(setUserImage(userimage))
                      dispatch(setLogin(true))
                      localStorage.setItem('token',JSON.stringify(response.data.token))
                      if(!response.data.success){
                          toast.error(response.response.data.message)
                      }
        }catch(error){
           toast.error(error.response.data.message)
                      console.log(error.response.data.message)
                      console.log("There is an error in the login process",error)
                      console.log("unable to log in")
        }
        finally {
            dispatch(setLoading(false));
            toast.dismiss(ToastId);
        }
    }    
}