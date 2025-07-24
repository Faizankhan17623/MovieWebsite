import {  useState } from 'react'
import CountryCodee from '../../data/CountryCode.json'
import { useForm } from 'react-hook-form'
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia"
import { useNavigate } from 'react-router-dom'
import Loader from '../extra/Loading'

const Org = () => {
  const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [Pass,setpass] = useState("")
    const [ConfirmPass,setConfirmPass] = useState("")
    const [loading,setLoading] = useState(false)

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
    } = useForm()
    const navigate = useNavigate()
  
    const password = watch('Password')
  
    const onsubmit = (data) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate('/OTP')
      }, 10000);
      console.log("This is the org form data", data)
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
        className='w-full h-full mx-auto p-8 rounded-2xl  shadow-lg space-y-8 mt-8'
      >
        {/* Name Row */}
        <div className="flex gap-4">
          {/* First Name */}
          <div className="flex-1">
            <label className="block  mb-2 font-semibold" htmlFor="First">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("First", { required: "First Name is required" })}
              className={`w-full p-3  rounded-lg outline-none focus:ring-2 focus:ring-blue-400 form-style transition ${errors.First && "border-red-500"}`}
              placeholder="Enter First Name"
            />
            {errors.First && (
              <span className="text-red-600 text-sm">{errors.First.message}</span>
            )}
          </div>
          {/* Last Name */}
          <div className="flex-1">
            <label className="block mb-2 font-semibold" htmlFor="Last">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("Last", { required: "Last Name is required" })}
              className={`w-full p-3  rounded-lg outline-none focus:ring-2 form-style focus:ring-blue-400 transition ${errors.Last && "border-red-500"}`}
              placeholder="Enter Last Name"
            />
            {errors.Last && (
              <span className="text-red-600 text-sm">{errors.Last.message}</span>
            )}
          </div>
        </div>
  
        {/* Email */}
        <div>
          <label className="block  mb-2 font-semibold" htmlFor="Email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("Email", { required: "Email is required" })}
            className={`w-full p-3  rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.Email && "border-red-500"}`}
            placeholder="Enter Your Email Address"
          />
          {errors.Email && (
            <span className="text-red-600 text-sm">{errors.Email.message}</span>
          )}
        </div>
  
        {/* Phone */}
        <div className="flex gap-4">
          {/* Country Code */}
          <div className="w-32">
            <label className="block  mb-2 font-semibold" htmlFor="CountryCode">
              Country Code <span className="text-red-500">*</span>
            </label>
            <select
              {...register("CountryCode", { required: "Country code is required" })}
              className={`p-3 w-30 bg-richblack-600 h-11 form-style  rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.CountryCode && "border-red-500"}`}
              defaultValue=""
            >
              <option value="" disabled>Select Your Country Code</option>
              {CountryCodee.map((data, i) => (
                <option key={i} value={data.code}>{data.code} - {data.country}</option>
              ))}
            </select>
            {errors.CountryCode && (
              <span className="text-red-600 text-sm">{errors.CountryCode.message}</span>
            )}
          </div>
          {/* Number */}
          <div className="flex-1">
            <label className="block  mb-2 font-semibold" htmlFor="Number">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={10}
              {...register("Number", {
                required: "Number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Number must be exactly 10 digits"
                }
              })}
              className={`w-[300px] p-3  rounded-lg outline-none form-style focus:ring-2 focus:ring-blue-400 transition ${errors.Number && "border-red-500"}`}
              placeholder="Enter Your 10-digit Mobile Number"
            />
            {errors.Number && (
              <span className="text-red-600 text-sm">{errors.Number.message}</span>
            )}
          </div>
        </div>
  
        {/* Passwords */}
        <div className="flex gap-4">
          {/* Password */}
          <div className="flex-1 relative">
            <label className="block  mb-2 font-semibold" htmlFor="Password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
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
            {errors.Password && (
              <span className="text-red-600 text-sm">{errors.Password.message}</span>
            )}
          </div>
          {/* Confirm Password */}
          <div className="flex-1 relative">
            <label className="block  mb-2 font-semibold" htmlFor="ConfirmPass">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              {...register("ConfirmPass", {
                required: "Confirm password is required",
                minLength: {
                  value: 6,
                  message: "Password must be exactly 6 characters"
                },
                maxLength: {
                  value: 10,
                  message: "Password must be exactly 10 characters"
                },
                validate: (val) =>
                  val === password || "Passwords do not match"
              })}
              className={`w-full p-3 pr-10  rounded-lg outline-none form-style focus:ring-2 focus:ring-blue-400 transition ${errors.ConfirmPass && "border-red-500"}`}
              placeholder="Confirm your password"
              onChange={(e)=>setConfirmPass(e.target.value)}
  
            />
            <button
              type="button"
              className="absolute right-3 top-12 transform -translate-y-1/2 text-2xl "
              tabIndex={-1}
              onClick={() => setShowConfirm(s => !s)}
            >
              {showConfirm ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
            </button>
            {errors.ConfirmPass && (
              <span className="text-red-600 text-sm">{errors.ConfirmPass.message}</span>
            )}
          </div>
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
            className="w-full bg-yellow-200 Org_Btns hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4 text-lg transition duration-200 shadow"
          >
            Submit
          </button>
        )}
      </form>
    )
  }
export default Org