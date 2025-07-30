import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Navbar from '../Home/Navbar'
import { FaLongArrowAltLeft } from "react-icons/fa";
import {GetPasswordResettoken} from '../../Services/operations/Auth' 
import { useDispatch } from 'react-redux';
import Loader from '../extra/Loading'
import toast from 'react-hot-toast'
import Reset from './Reset'
// ...rest of your imports

const Forgot = () => {
  const dispatch = useDispatch()
  const [Send, setsend] = useState(false);
  const [Emails,setEmail] = useState("")
  const [loading,setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [token,seToken] = useState("")
  
  // console.log(Emails)
  // console.log(Send)

  const Handler = async (e) =>{
    try {
      setLoading(true)
      const Response = await dispatch(GetPasswordResettoken(e.Email,setsend))
      // console.log(Response)
      seToken(Response.data.token)

      if(Response?.success){
        toast.success("LInk Sedn TO The Email")
      }

    } catch (error) {
      console.log(error)
      console.log(error.message)
      toast.error("Error in Sending The Reset Password Link")
    }finally{
      setLoading(false)
    }
  }
  const onsubmit = (data) => {
    Handler(data)
  }

  if(loading){
    return (
      <div className='w-full h-full flex flex-1 justify-center items-center'>
        <Loader/>
      </div>
    )
  }
  return (
    <div className='w-screen h-screen overflow-x-hidden flex flex-col'>
      <Navbar/>
      <div className='flex-1 flex justify-center items-center text-white'>
        <div className='h-96 w-96 flex flex-col gap-3'>
          <h1 className='font-inter text-2xl'>{Send ? "Check Email" : "Reset Your Password"}</h1>
          <p className='font-inter text-xl'>
            {Send ? 
              `We have sent the reset email to your  Email: ${Emails}` : 
              "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
            }
          </p>
          <form onSubmit={handleSubmit(onsubmit)}>
            {!Send && (
              <>
                <label className="block mb-2 font-semibold" htmlFor="Email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                
                  type="email"
                  {...register("Email", { required: "Email is required" })}
                  className={`w-full p-3 gap-2 rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.Email ? "border-red-500" : ""}`}
                  placeholder="Enter Your Email Address"
                />
                {errors.Email && (
                  <span className="text-red-600 text-sm">{errors.Email.message}</span>
                )}
              </>
            )}

            <button
              type='submit'
              className="w-full bg-yellow-100 Org_Btns hover:bg-yellow-200 text-white font-semibold py-3 rounded-lg mt-4 text-lg transition duration-200 shadow"
            >
              {Send ? "Resend Email" : "Reset Password"}
            </button>

            <div className='w-full flex-1 Logins text-yellow-200 '>
              <a href="/Login" className='flex justify-items-start items-center gap-1 hover:text-yellow-300 cursor-pointer'>
                <FaLongArrowAltLeft className='text-2xl'/> Back To Login
              </a>
            </div>
          </form>
        </div>
      </div>
      {token && <Reset JWT={token}/>}
    </div>
  )
}

export default Forgot
