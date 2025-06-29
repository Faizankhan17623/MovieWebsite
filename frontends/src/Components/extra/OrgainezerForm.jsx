import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form';

const OrgainezerForm = () => {
  
      const Submitdata = (data) => {
          console.log("Form Data - ", data);
      }
  
      const { register, handleSubmit,reset, formState: { errors,isSubmitSuccessful } } = useForm()
  
      const [loading,setLoading] = useState(false)
  
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
    <form onSubmit={handleSubmit(Submitdata)} className='flex flex-col justify-around items-center'>
      <div>
        
        <label htmlFor="first">
          <input type="text" name='first' placeholder='Enter First name'/>
        </label>

        <label htmlFor="second">
          <input type="text" name='second' placeholder='Enter Second name' />
        </label>
      </div>
      
    </form>
  )
}

export default OrgainezerForm