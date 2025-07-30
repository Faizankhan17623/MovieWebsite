import {  useState } from 'react'
import CountryCodee from '../../data/CountryCode.json'
import { useForm } from 'react-hook-form'
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia"
import { useNavigate } from 'react-router-dom'
import Loader from '../extra/Loading'
import {OrgainezerLogin} from '../../Services/operations/orgainezer'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
// import OpenRoute from '../../Hooks/OpenRoute'
const Org = () => {
  const dispatch = useDispatch()

  const [showPass, setShowPass] = useState(false)
    const [Pass,setpass] = useState("")
    const [loading,setLoading] = useState(false)

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm()
    const navigate = useNavigate()
  
    // const password = watch('Password')
  
    const onsubmit = async(data) => {
       setLoading(true)
              try{
                const Response = await dispatch(OrgainezerLogin(data.Email,data.Password))
                // OpenRoute()
                if(Response?.success){
                  toast.success("user is loged in ")
                }
              setLoading(false)
              }catch(error){
               toast.error(error.message)
                         console.log(error)
                         console.log(error.message)
              }
    }
  
    if (loading) {
      return (
        <div className="w-full h-full  bg-transparent flex justify-center items-center">
          <Loader />
        </div>
      )
    }
   return (
      <form
        onSubmit={handleSubmit(onsubmit)}
        className='w-full h-full mx-auto p-8 rounded-2xl  shadow-lg space-y-8 mt-8 gap-4'
      >
   
  
        {/* Email */}
        <div>
          <label className="block  mb-2 font-semibold" htmlFor="Email">
            Email Address <span className="text-red-500">*</span>    {errors.Email && (
            <span className="text-red-600 text-sm">{errors.Email.message}</span>
          )}
          </label>
          <input
            type="email"
            autoComplete='email'
            {...register("Email", { required: "Email is required" })}
            className={`w-full p-3  rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.Email && "border-red-500"}`}
            placeholder="Enter Your Email Address"
          />
        
        </div>
  
        {/* Phone */}
    
  
        {/* Passwords */}
        <div className="flex gap-4 Pass">
          {/* Password */}
          <div className="flex-1 relative">
            <label className="block  mb-2 font-semibold" htmlFor="Password">
              Password <span className="text-red-500">*</span>  {errors.Password && (
              <span className="text-red-600 text-sm">{errors.Password.message}</span>
            )}
            </label>
            <input
              type={showPass ? "text" : "password"}
              autoComplete='current-password'
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 2,
                  message: "Password must be exactly 6 characters"
                },
                maxLength: {
                  value: 10,
                  message: "Password must be exactly 10 characters"
                }
              })}
              className={`w-full p-3 pr-10  rounded-lg outline-none form-style focus:ring-2 focus:ring-blue-400 transition ${errors.Password && "border-red-500"}`}
              placeholder="Enter Your Password"
              onChange={(e)=>setpass(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-12 transform -translate-y-1/2 text-2xl "
              tabIndex={-1}
              onClick={() => setShowPass(s => !s)}
            >
              {showPass ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
            </button>
            
          </div>
          {/* Confirm Password */}
          
        </div>
        
         <div className='w-full flex flex-end justify-end items-end Forgot'>
            <p> <a href="/Forgot-Password" className='text-blue-200'>Forgot Password</a>  </p>
        </div>

        {/* Submit button */}
          {loading ? (
          <button
            type="button"
            className="w-full bg-gray-200 text-gray-500 font-semibold py-3 rounded-lg mt-4 text-lg transition duration-200 shadow flex justify-center items-center"
            disabled
          >
            <Loader />
            <span className="ml-2">Processing...</span>
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-yellow-200 cursor-pointer Org_Btns hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4 text-lg transition duration-200 shadow"
          >
            Submit
          </button>
        )}
      </form>
    )
  }
export default Org