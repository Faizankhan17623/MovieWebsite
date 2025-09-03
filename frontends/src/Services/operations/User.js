import toast from "react-hot-toast";
import {apiConnector} from '../apiConnector'
import {setuser,setloading,setCooldownDate } from '../../Slices/ProfileSlice'
import {setUser,setLoading,setToken,setLogin,setUserImage} from '../../Slices/authSlice.js'

import  {AllDetails,UpdatePersonalDetails} from '../Apis/UserApi'
import {UserLogout} from './Auth'

const {GetAllDetails} = AllDetails
const {UpdateImage} = UpdatePersonalDetails

export function GetAllUserDetails(token,navigate) {
    return async (dispatch) => {
        dispatch(setloading(true));
        const ToastId = toast.loading("Fetching user details, please wait...");
        try {

             if(!token){
                          navigate("/Login")
                          toast.error("Token is Expired Please Create a new One")
                      }
            const response = await apiConnector("GET", GetAllDetails,null,{
                Authorization: `Bearer ${token}`
            });

            console.log("User details fetched successfully");
            // console.log("User details fetched successfully", response);


            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch user details");
            }
               const userimage = response.data.image

            dispatch(setuser({...response.data.data, image: userimage}));

            return { success: true, data: response.data };
        } catch (error) {
            dispatch(UserLogout(navigate));
            console.error("Error fetching user details:", error);
            return { success: false, error: error.message };
        } 
        finally {
            toast.dismiss(ToastId);
            dispatch(setloading(false));
        }
    };
}

export function Changeimage(token, newImage,navigate) {
    return async (dispatch) => {
        dispatch(setloading(true));
        const ToastId = toast.loading("Changing user image, please wait...");
        try {
             if(!token){
                          navigate("/Login")
                          toast.error("Token is Expired login")
                      }
            // Prepare FormData
            const formData = new FormData();
            formData.append("displayPicture", newImage);

            const response = await apiConnector("PUT", UpdateImage, formData, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            });

            console.log("The image is been updated")
            if (!response.data.success) {
        if (response.data.nextChangeDate) { // ⬅️ CHANGED - Save cooldown
          dispatch(setCooldownDate(response.data.nextChangeDate));
        }
        throw new Error(response.data.message || "Image update failed");
      }
  if (response.data.nextChangeDate) {
        dispatch(setCooldownDate(response.data.nextChangeDate));
      }
         
            const userimage = response?.data?.data?.image
             dispatch(setUserImage(userimage))
            localStorage.setItem("userImage", userimage)
              dispatch(setuser({...response.data.data, image: userimage}));
                 toast.success("Profile image updated successfully");
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error changing user image:", error);
            console.error(error.response.data.message);
            toast.error(error.response.data.message)
            toast.error(error.message || "Error updating image");

            return { success: false, error: error.message };
        } finally {
            toast.dismiss(ToastId);
        dispatch(setloading(false));
        }
    };
}
