import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form';
import Line from '../extra/Line'
import CountryCode from '../../data/CountryCode.json'
import { FaCaretDown } from "react-icons/fa";
import Levels from '../../data/Levels.json'
import Loader from './Loading'

const OrgainezerForm = () => {

      const Submitdata = (data) => {
          console.log("Form Data -",data);
      }

      const { register, handleSubmit,reset, formState: { errors,isSubmitSuccessful } } = useForm()
      const [loading,setLoading] = useState(false)

      const [part,setPart] = useState(0)
      const [levels,setLevels] = useState(false)

      const [changes,SetChnages] = useState(false)
      const [phoneNumber, setPhoneNumber] = useState('')
      const [sameAsPhone, setSameAsPhone] = useState(true)
      const [whatsAppNumber, setWhatsAppNumber] = useState('')

      useEffect(() => {
      setLoading(true)
    if (isSubmitSuccessful) {
      reset({
        first: "",
        last: "",
        email: "",
        countryCode: "",
        phoneNumber: "",
        whatsApp: "",
      })
      setPhoneNumber('')
      setWhatsAppNumber('')
      setSameAsPhone(true)
    }
    setTimeout(() => {
      setLoading(false)
    },2000);
  }, [reset, isSubmitSuccessful])


  useEffect(() => {
    if (sameAsPhone) {
      setWhatsAppNumber(phoneNumber)
    }
  }, [sameAsPhone, phoneNumber])

  const PartSection = useEffect(()=>{
    let direction = 0 
    if(changes && loading){
      setPart(direction+=1)
    }
  },[changes , loading])

  return (
    <form onSubmit={handleSubmit(Submitdata)} className=' w-full h-full'>
      <Line changes={changes} part={part}/>
      <div className={`w-full Form_data_one h-9/12 ${changes?"hidden":"flex"}   gap-5 items-center flex-col`}>
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
<div className='w-full flex justify-evenly items-center'>
        <label htmlFor="countryCode" className='flex flex-col justify-center gap-2'>
          Phone Number
          <select name="countryCode" className='w-40 bg-richblack-600 h-11 form-style'>
            {CountryCode.map((data, index) => (
              <option value={data.code} key={index}>
                {data.code} - {data.country}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="phonenumber" className='flex flex-col gap-2'>
          <input
            type='tel'
            placeholder='Enter Your Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='form-style rounded-md w-[400px] phoneNubers'
          />
        </label>
      </div>



<div className='flex flex-col items-center gap-2'>
        <label className='flex gap-2 items-center'>
          <input
            type="checkbox"
            checked={sameAsPhone}
            onChange={() => setSameAsPhone(!sameAsPhone)}
          />
          <span>Same on Whatsap'p</span>
        </label>
      </div>

      {/* ✅ Conditionally show WhatsApp input */}
      {!sameAsPhone && (
        <div className='w-full flex justify-evenly items-center'>
          <label htmlFor="countryCode" className='flex flex-col justify-center gap-2'>
            WhatsApp
            <select name="countryCode" className='w-40 bg-richblack-600 h-11 form-style'>
              {CountryCode.map((data, index) => (
                <option value={data.code} key={index}>
                  {data.code} - {data.country}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="whatsAppNumber" className='flex flex-col gap-2'>
            <input
              type='tel'
              placeholder='Enter WhatsApp Number'
              value={whatsAppNumber}
              onChange={(e) => setWhatsAppNumber(e.target.value)}
              className='form-style rounded-md w-[400px] phoneNubers'
            />
          </label>
        </div>
      )}
        
        <div className='w-fit h-14 flex justify-around items-center gap-1 rounded-3xl bg-richblack-400 Exp_margin'>
        <button className={`rounded-3xl w-44 h-14 ${
            changes === 'New Comer' ? 'bg-richblack-900  border-richblack-900' : 'bg-richblack-400'
          }`}
          
          onClick={() => SetChnages('New Comer')}>New Comer</button>
        <button className={`rounded-3xl w-44 h-14 ${
            changes === 'Experienced' ? 'bg-richblack-900  border-richblack-900' : 'bg-richblack-400'
          }`}
          
          onClick={() => SetChnages('Experienced')}>Experienced</button>
      </div>
      </div>

      <div className={`${changes ? 'flex':"hidden"}`}>
        {loading&&<Loader/>}
        <div>
          this is the second system 
        </div>

        <button onClick={()=>PartSection()}>next section</button>
      </div>


      <div className={`${changes ? 'hidden':"flex"}`}>
        {loading&&<Loader/>}
        <div>
          this is the second system 
        </div>

        <button onClick={()=>PartSection()}>next section</button>
      </div>

    </form>
  )
}

export default OrgainezerForm