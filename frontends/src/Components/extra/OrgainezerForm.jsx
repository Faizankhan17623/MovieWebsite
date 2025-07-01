import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form';
import Line from '../extra/Line'
import CountryCode from '../../data/CountryCode.json'
import { FaCaretDown } from "react-icons/fa";
import Levels from '../../data/Levels.json'
const OrgainezerForm = () => {

      const Submitdata = (data) => {
          console.log("Form Data -",data);
      }

      const { register, handleSubmit,reset, formState: { errors,isSubmitSuccessful } } = useForm()
      const [loading,setLoading] = useState(false)
      const [part,setPart] = useState(1)
      const [levels,setLevels] = useState(false)
      const [changes,SetChnages] = useState(false)

      useEffect(()=>{
        setLoading(false)
        if(isSubmitSuccessful){
          reset({
            first:"",
            last:"",
            Email:"",
            CountryCode:"",
            Number:"",
            Messages:""
          })
        }
        setLoading(true)
      },[reset,isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(Submitdata)} className=' w-full h-full'>
      <Line />
      <div className='w-full Form_data_one h-9/12 flex  gap-5 items-center flex-col'>
        <div className='Name flex justify-around items-center w-full '>

          <label htmlFor="first" className='flex flex-col gap-2 lable-style'>
            First Name
            <input type="text" name='first' placeholder='Enter First name' {...register('first')} className='form-style  w-3xs h-9 bg-richblack-600 rounded-2xl'/>
          </label>

          <label htmlFor="second" className='flex flex-col lable-style gap-2'>
            Last Name
            <input type="text" name='second' placeholder='Enter Second name' {...register('second')} className='form-style w-3xs h-9 bg-richblack-600 rounded-2xl'/>
          </label>        
        </div>

        <div>
          <label htmlFor="email" className='flex flex-col  lable-style gap-3'>
            Email
            <input type="email" name="email" placeholder='Enter Your Email' className='form-style w-[600px]'/>
          </label>
        </div>

          <div className='w-full flex justify-evenly items-center '>
              <label htmlFor="countryCode" className='flex flex-col  justify-center gap-2 CountryCode '>
                  Phone Number
                <select name="countryCode" className='w-40  bg-richblack-600 h-11 form-style'>
                  {CountryCode.map((data,index)=>(
                    <option value={data.code} key={index}>
                      {data.code} - {data.country}
                    </option>
                  ))}
                </select>
              </label>

            <label htmlFor="phonenumber" className='phoneNubers lable-style'>
              <input type='tel'  placeholder='Enter Your Number'  className='form-style  rounded-md w-[400px]'/>
            </label>
        </div>

        <div className='w-fit h-14 flex justify-around items-center gap-1 rounded-3xl bg-richblack-400 Exp_margin'>
        <button className={`rounded-3xl w-44 h-14 ${changes?"bg-richblack-900 border border-richblack-900":"bg-richblack-400"}`} onClick={(e)=>{e.preventDefault(),SetChnages(true)}}>New Comer</button>
        <button className={`rounded-3xl w-44 h-14 ${!changes?"bg-richblack-900 border border-richblack-900":"bg-richblack-400"}`} onClick={(e)=>{e.preventDefault(),SetChnages(false)}}>Experienced</button>
      </div>

        <div className="relative w-full flex justify-center items-center">
  <button
    disabled={loading}
    type="button"
    className="flex w-1/2 bg-yellow-500 justify-evenly items-center h-9 text-black rounded-2xl next_btn"
    onClick={() => setLevels(!levels)}
  >
    Next <FaCaretDown />
  </button>

  {levels && (
    <span className="absolute top-7 right-[230px] org_dropdown border bg-white text-black w-5 flex flex-col justify-center items-center shadow-lg z-10">
      {Levels.map((data, index) => (
        <span key={index} className="w-full px-2 py-1 hover:bg-gray-200 cursor-pointer flex justify-center items-center">
          {data.level}
        </span>
      ))}
    </span>
  )}
</div>

      </div>
    </form>
  )
}

export default OrgainezerForm