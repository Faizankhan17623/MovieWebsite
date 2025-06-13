import toast from "react-hot-toast";
import {apiConnector} from './apiConnector.js'

import {setUser,setLoading,setToken,setliggenin,setUserImage} from '../../Slices/authSlice.js'
import {setloading,setlikes,setdislikes,setuser} from '../../Slices/ProfileSlice.js'
import {CreateUser,SendOtp,Login,ResetPassword,UpdatePersonalDetails,PersonalChoice,GetAllShows,SpecificShow,Comment,SendMessage,TicketData,Ratings} from '../Apis/UserApi.js'

import {setShow,setlaoding,setallShow} from '../../Slices/ShowSlice.js'

const {createuser} = CreateUser 
const {createotp} = SendOtp
const {login} = Login
const {LinkSend,Resetpassword} = ResetPassword
const {LikeBanner,DislikeBanner} = PersonalChoice
const {UpdateUsername,UpdatePassword,UpdateImage,UpdateNumber,CurrentUserDetails} = UpdatePersonalDetails
const {AllShows} = GetAllShows
const {specificshow} = SpecificShow
const {Comments,GetAllComment} = Comment
const {SendMessages,UpdateMessage,GetAllMessages} = SendMessage
const {TicketPurchase,TicketPurchasedFullDetail} = TicketData
const {CreateRating,GetAverageRating,GetAllRatingReview} = Ratings

export function sendOtp(email){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",createotp,{
                email:email
            })

            console.log("Api response...",response)
            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success('otp Send SuccesFully')

            // isme navigate daal na reh gay hain
        } catch (error) {
            console.log("Error in sending the otp",error)
            console.log("Error in sending the otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function UserCreation(name,password,email,number,otp,navigate){
    return async (dispatch)=>{
        const toastId = toast.loading('...loading')
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",createuser,{
                userName:name,
                email:email,
                password:password,
                number:number,
                otp:otp
            })

            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Signup Successful")
            dispatch(setUser(response.data.usertype))
            navigate('/')
        } catch (error) {
            console.log("Sign up failed")
            navigate("/") 
            // ya abhe nahi pura frontend ho gaenga na uske baadh
            console.log("Error in Creating the user",error)
        }
        dispatchEvent(setLoading(false))
        toast.dismiss(toastId)
    }
}



export function UserLogin(email,pass,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",login,{
                email:email,
                password:pass
            })
            console.log("User is been logged in ")
            toast.success('Congragulations you are logged in')
            dispatch(setToken(response.data.token))
            const userimage = response.data.image
            dispatch(setUserImage(userimage))
            dispatch(setliggenin(true))
            localStorage.setItem('token',JSON.stringify(response.data.token))
            navigate('/') // navigation add karna baaki hain saab ke leya sir jee
        }catch(error){
            console.log("There is an error in the login process",error)
            console.log("unable to log in")
            navigate("/home")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



// and if any thing extra is needed to add we wil add that in the code in future
export function UserLogout(navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setLoading(true))
        try{
            dispatch(setToken(null))
            dispatch(setUser(null))
            localStorage.removeItem('token')
            dispatch(setliggenin(false))
            navigate('/login')
        }catch(error){
            console.log("There is an error in the logout process",error)
            console.log("unable to log out")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function GetPasswordResettoken(email,emailsend){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",LinkSend,{
                email:email
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Link Send Successfully")
            emailsend(true)
        } catch (error) {
            console.log("Error in updating the password",error)
            console.log("Error in updating the password")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function Restpassword(token,password){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("PUT",Resetpassword,{
                token:token,
                password:password
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successfully")
            // navigate('/login')
        } catch (error) {
            console.log("Error in updating the password",error)
            console.log("Error in updating the password")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}




// From herewe will put all the code that is going to se to update the data user fields
export function Updateusername(name){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PUT",UpdateUsername,{
                userName:name
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setUser(response.data.user))
            toast.success("UserName Updated Successfully")
        } catch (error) {
            console.log("Error in updating the username",error)
            console.log("Error in updating the username")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function Updatepassword(newpass,oldpass){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {

            const response = await apiConnector("PUT",UpdatePassword,{
                password:newpass
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Updated Successfully")
        } catch (error) {
            console.log("Error in updating the password",error)
            console.log("Error in updating the password")
            console.log("The old password is not correct")
            console.log(oldpass)
            toast.error("The old password is not correct")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function Updateimage(image){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PUT",UpdateImage,{
                image:image
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Image Updated Successfully")
        } catch (error) {
            console.log("Error in updating the image",error)
            console.log("Error in updating the image")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function Updatenumber(newnumber){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PUT",UpdateNumber,{
                number:newnumber
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Number Updated Successfully")
        } catch (error) {
            console.log("Error in updating the number",error)
            console.log("Error in updating the number")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}



export function GetCurrentUserDetails(){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("GET",CurrentUserDetails)
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setUser(response.data.user))
        } catch (error) {
            console.log("Error in getting the current user details",error)
            console.log("Error in getting the current user details")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}



// here w will put some data of the personal details and this are all the function that are like  using the peersonal details and the personal slice


export function bannerLike(id){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PUT",LikeBanner,{
                id
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setlikes(response.data.likes))
            toast.success("Banner Liked Successfully")
        } catch (error) {
            console.log("Error in liking the banner",error)
            console.log("Error in liking the banner")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}
export function bannerDislike(id){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PUT",DislikeBanner,{
                id
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                toast.error(response.data.message)
                throw new Error(response.data.message)
            }
            dispatch(setdislikes(response.data.dislikes))
            toast.success("Banner Disliked Successfully")
        } catch (error) {
            console.log("Error in disliking the banner",error)
            console.log("Error in disliking the banner")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}



export function GetAllShowsData(){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setlaoding(true))
        try {
            const response = await apiConnector("GET",AllShows)
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setallShow(response.data.shows))
        } catch (error) {
            console.log("Error in getting the all shows data",error)
            console.log("Error in getting the all shows data")
        }
        dispatch(setlaoding(false))
        toast.dismiss(toastId)
    }
}



export function GetSpecificShowData(id){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setlaoding(true))
        try {
            const response = await apiConnector("GET",specificshow,{
                id
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setShow(response.data.show))
        } catch (error) {
            console.log("Error in getting the specific show data",error)
            console.log("Error in getting the specific show data")
        }
        dispatch(setlaoding(false))
        toast.dismiss(toastId)
    }
}

export function CommentOnBanner(id,comment){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PUT",Comments,{
                id,
                comment:comment
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Comment Added Successfully")
        } catch (error) {
            console.log("Error in commenting on the banner",error)
            console.log("Error in commenting on the banner")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function GetAllComments(id){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("GET",GetAllComment,{
                id
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setShow(response.data.show))
        } catch (error) {
            console.log("Error in getting the all comments data",error)
            console.log("Error in getting the all comments data")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}


export function SendMessageFriends(to,message,type){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("POST",SendMessages,{
                to:to,
                message:message,
                typeOfmessage:type
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Message Send Successfully")
        } catch (error) {
            console.log("Error in sending the message",error)
            console.log("Error in sending the message")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}



export function Updatemessage(id,message){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("PUT",UpdateMessage,{
                id,
                message:message
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Message Updated Successfully")
        } catch (error) {
            console.log("Error in updating the message",error)
            console.log("Error in updating the message")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}


export function GetallMessages(){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("GET",GetAllMessages)
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setShow(response.data.show))
        } catch (error) {
            console.log("Error in getting the all messages data",error)
            console.log("Error in getting the all messages data")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}


export function ticketpurchased(){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setlaoding(true))
        try{
            const response = await apiConnector("GET",TicketPurchase)
            dispatch(setuser(response.data.user))
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setShow(response.data.show))            
        }catch(error){
            console.log("Error in getting the ticket purchase data",error)
            console.log("Error in getting the ticket purchase data")
        }
        dispatch(setlaoding(false))
        toast.dismiss(toastId)
    }
}

export function ticketpurchasedfull(){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setlaoding(true))
        try{
            const response = await apiConnector("GET",TicketPurchasedFullDetail)
            dispatch(setuser(response.data.user))
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setShow(response.data.show))            
        }catch(error){
            console.log("Error in getting the ticket purchase data",error)
            console.log("Error in getting the ticket purchase data")
        }
        dispatch(setlaoding(false))
        toast.dismiss(toastId)
    }
}

export function createRating(rating,showid,review){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("POST",CreateRating,{
                rating:rating,
                review:review,
                course:showid,
                user:setuser
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Rating Created Successfully")
        } catch (error) {
            console.log("Error in creating the rating",error)
            console.log("Error in creating the rating")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}   


export function getAverageRating(Showid){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("GET",GetAverageRating,{
                Showid
            })
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setShow(response.data.show))
        } catch (error) {
            console.log("Error in getting the average rating",error)
            console.log("Error in getting the average rating")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}


export function getAllRatingReview(){
    return async(dispatch)=>{
        const toastId = toast.loading("..loading")
        dispatch(setloading(true))
        try {
            const response = await apiConnector("GET",GetAllRatingReview)
            console.log("This is the responsee data",response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setShow(response.data.show))
        } catch (error) {
            console.log("Error in getting the all rating and review",error)
            console.log("Error in getting the all rating and review")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}