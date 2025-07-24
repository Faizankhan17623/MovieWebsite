import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Navbar from '../Home/Navbar'
import { FaLongArrowAltLeft } from "react-icons/fa";

// ...rest of your imports

const Forgot = () => {
  const [Send, setsend] = useState(false);
  const [Emails,setEmail] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(Emails)
  const onsubmit = (data) => {
    console.log("This is the log data", data);
    setsend(true);
    setEmail(data.Email)
  }

  return (
    <div className='w-screen h-screen overflow-x-hidden flex flex-col'>
      <Navbar/>
      <div className='flex-1 flex justify-center items-center text-white'>
        <div className='h-96 w-96 flex flex-col gap-3'>
          <h1 className='font-inter text-2xl'>{Send ? "Check Email" : "Reset Your Password"}</h1>
          <p className='font-inter'>
            {Send ? 
              `We have sent the reset email to your  Email:${Emails}` : 
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

            <div className='w-full flex-1 Logins'>
              <a href="/Login" className='flex justify-items-start items-center gap-1'>
                <FaLongArrowAltLeft className='text-2xl'/> Back To Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgot
