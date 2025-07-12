import  { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Line from '../extra/Line'
import CountryCode from '../../data/CountryCode.json'
import Levels from '../../data/Levels.json'
import Loader from './Loading'
import toast from 'react-hot-toast';
import TheatrerForm from './TheatrerForm';
import AllCountries from '../../data/AllCountries.json'

const OrgainezerForm = () => {

      const { register, handleSubmit,reset,setValue,trigger, formState: { errors,isSubmitSuccessful } } = useForm()

      const [loading,setLoading] = useState(false)
      const [part,setPart] = useState(1)
      const [selectedType, setSelectedType] = useState('');

      const [changes,SetChnages] = useState(false)
      const [phoneNumber, setPhoneNumber] = useState('')
      const [sameAsPhone, setSameAsPhone] = useState(true)
      const [whatsAppNumber, setWhatsAppNumber] = useState('')

      const [CountryNames,setCountryNames] = useState('')
      const [selectedCountry, setSelectedCountry] = useState('');
      const [selectedState, setSelectedState] = useState('');
      const [sameAddress, setSameAddress] = useState(false);
      const [localAddress, setLocalAddress] = useState('');
      const [permanentAddress, setPermanentAddress] = useState('');
const [Switch, setSwitch] = useState('');
      
      
        const Submitdata = (data) => {
          localStorage.setItem('formdata', JSON.stringify(data));
          console.log("Form Data -",data);
      }


      const storedData = JSON.parse(localStorage.getItem('formdata') || '{}');
      

  useEffect(() => {
    if (sameAsPhone) {
      setWhatsAppNumber(phoneNumber)
      setValue('whatsAppNumber',phoneNumber)
    }
  }, [sameAsPhone, phoneNumber,setValue])

const handleChangeAndNext = async(type) => {
   const isStepValid = await trigger(['first', 'last', 'email', 'countryCode', 'phonenumber', 'whatsAppNumber']);

  if (!isStepValid) {
    toast.error("Please fill all required fields");
    return;
  }
  setSelectedType(type);
  setLoading(true);
  setTimeout(() => {
    setPart(prev => prev + 1);
    setLoading(false);
  }, 2000);
};

const handleStepChange = (step) => {
  setLoading(true);
  setTimeout(() => {
    setPart(step);
    setLoading(false);
  }, 2000);
};



  const Fetchdata = async () => {
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states");
      const response = await res.json()
      // console.log(response.data,"This is the response")
      setCountryNames(response.data)
      // console.log(CountryNames)
      
    } catch (error) {
       console.error("Error fetching data:", error);
    }
  }
  

  const StateFinder = AllCountries.data.find((data)=>{
  if(data.name === CountryNames){
    return data.states
  }
})
console.log(StateFinder,"This is the state finder")
  return (
    <form onSubmit={handleSubmit(Submitdata)} className=' w-full h-full'>
      <Line changes={changes} part={part} setPart={handleStepChange}/>

      <div className={`w-full Form_data_one h-9/12  ${part === 1 ? "flex" : "hidden"}  gap-5 items-center flex-col`}>
        <div className='Name flex justify-around items-center w-full '>

          <label htmlFor="first" className='flex flex-col gap-2 lable-style'>
            <span>{errors.email && (
  <span className="text-red-500 text-base">{errors.email.message}</span>
)}First Name</span>  
            <input type="text" name='first'  placeholder='Enter First name' {...register('first',{ required: "*"})} className='form-style  w-3xs h-9 bg-richblack-600 rounded-2xl'/>
          </label>

          <label htmlFor="last" className='flex flex-col lable-style gap-2'>
            <span>{errors.email && (
  <span className="text-red-500 text-base">{errors.email.message}</span>
)}Last Name</span>
            <input type="text" name='last'   placeholder='Enter last name' {...register('last',{ required: "*"})} className='form-style w-3xs h-9 bg-richblack-600 rounded-2xl'/>
            
          </label>        
        </div>

        <div>
          <label htmlFor="email" className='flex flex-col  lable-style gap-3'>
            <span className='flex items-center'> {errors.email && (
  <span className="text-red-500 text-base">{errors.email.message}</span>
)}Email </span>
            <input type="email" name="email"  placeholder='Enter Your Email' className='form-style w-[580px]' {...register('email',{ required: "*" })}/>
          </label>
        </div>

<div className='w-full flex justify-evenly items-center'>
        <label  htmlFor="countryCode" className='flex flex-col justify-center gap-2'>
          <span>{errors.email && (
  <span className="text-red-500 text-base">{errors.email.message}</span>
)}Phone Number</span>
          <select name="countryCode" className='w-40 bg-richblack-600 h-11 form-style'>
                    <option value="">Select Country Code</option>

            {CountryCode.map((data, index) => (
              <option  value={data.code} key={index} {...register('countryCode')}>
                {data.code} - {data.country}
              </option>
              
            ))}
          </select>
        </label>

        <label htmlFor="phonenumber" className='flex flex-col gap-2 '>
          <input
            type='tel'
            {...register('phonenumber')}
            placeholder='Enter Your Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='form-style rounded-md w-[380px] phoneNubers'
          />
          {errors.phonenumber && (
  <span className="text-red-500 text-sm">{errors.phonenumber.message}</span>
)}
        </label>
      </div>



<div className={`flex flex-col items-center gap-2 ${!sameAsPhone?"flex-col-reverse":"flex-col-reverse"}`}>
        <label className='flex gap-2 items-center'>
          <input
            type="checkbox"
            checked={sameAsPhone}
            {...register('same')}
            onChange={() => setSameAsPhone(!sameAsPhone)}
          />
          <span>Same on Whatsapp</span>
        </label>
      </div>

      {/* ✅ Conditionally show WhatsApp input */}
      {!sameAsPhone && (
        <div className='w-full flex justify-evenly items-center'>
          <label htmlFor="countryCode" className='flex flex-col justify-center gap-2'>
            <span>{errors.email && (
  <span className="text-red-500 text-base">{errors.email.message}</span>
)}WhatsApp</span>
            
            <select  name="countryCode" className='w-40 bg-richblack-600 h-11 form-style'>
                  <option value="">Select Country</option>

              {CountryCode.map((data, index) => (
                <option  value={data.code} key={index} {...register('whatsAppCode')}>
                  {data.code} - {data.country}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="whatsAppNumber" className='flex flex-col gap-2'>
            <input
            
              type='tel'
              {...register('whatsAppNumber',{required:"Number is required"})}
              placeholder='Enter WhatsApp Number'
              value={whatsAppNumber}
              onChange={(e) => setWhatsAppNumber(e.target.value)}
              disabled={sameAsPhone}
              className='form-style rounded-md w-[380px] phoneNubers'
            />
          </label>
        </div>
      )}
        
        <div className='w-fit h-14 flex justify-around items-center gap-1 rounded-3xl bg-richblack-400 '>
        <button
  className={`rounded-3xl w-44 h-14 ${
    selectedType === 'New Comer' ? 'bg-richblack-900 border-richblack-900' : 'bg-richblack-400'
  }`}
  onClick={() => {handleChangeAndNext('New Comer')}}
>
  New Comer
</button>
<button
type='next'
  className={`rounded-3xl w-44 h-14 ${
    selectedType === 'Experienced' ? 'bg-richblack-900 border-richblack-900'  : 'bg-richblack-400'
  }`}
  onClick={() =>{handleChangeAndNext('Experienced') } }
>
  Experienced
</button>

{/* <button type='submit'>sub</button> */}

      </div>
      </div>

      
      {part === 2 && loading ? (
  <Loader data="top-50 left-70" />
) : (
  <div className={`${part === 2 ? "flex" : "hidden"} w-full  h-[80%] `}>
    {selectedType === 'New Comer' && (
      <div className="flex flex-col w-full">
      <div className="w-full h-[90px]  flex justify-around items-center">

  <label htmlFor="CountryName" className="flex flex-col justify-center  gap-2">
           Country Name
          <select
  name="CountryName"
  className="w-40 bg-richblack-600 h-11 form-style"
  value={selectedCountry}
  onChange={e => {
    setSelectedCountry(e.target.value);
    setSelectedState(''); // Reset state when country changes
  }}
>
  <option value="">Select Country</option>
  {AllCountries.data.map((data, index) => (
    <option key={index} value={data.name} {...register("Country")}>{data.name}</option>
  ))}
</select>
        </label>


 <label htmlFor="StateName" className="flex flex-col justify-center gap-2">
          State
         <select
  name="StateName"
  className={`w-40 bg-richblack-600 h-11 form-style ${!selectedCountry?"cursor-not-allowed":"cursor-pointer"}`}
  value={selectedState}
  onChange={e => setSelectedState(e.target.value)}
  disabled={!selectedCountry}
>
  <option value="">Enter Your State Name</option>
  {(AllCountries.data.find(c => c.name === selectedCountry)?.states || []).map((state, idx) => (
    <option key={idx} value={state.name} {...register("State")}>{state.name}</option>
  ))}
</select>
        </label> 

        <label htmlFor="City" className="flex flex-col gap-2">
           City name
          <input type="text" placeholder="Enter Your City Name" name="City" className="form-style rounded-md w-[180px]" {...register("City")}/>
        </label>
        </div>

        <div className=" w-full h-[190px] flex justify-around items-center flex-col"> 
          <label htmlFor="" className="flex flex-row justify-center items-center gap-2">
  <input
    type="checkbox"
    checked={sameAddress}
    {...register('SameAddress')}
    onChange={e => {
      setSameAddress(e.target.checked);
      if (e.target.checked) {
        setPermanentAddress(localAddress);
      } else {
        setPermanentAddress('');
      }
    }}
  />
  <span>Local and Permanent Address are same</span>
</label>

<label htmlFor="Address" className="flex flex-col gap-2">
  Local Address
  <input
    type="text"
    name="Address"
    {...register('LocalAddress',{ required: "*" })}
    value={localAddress}
    onChange={e => {
      setLocalAddress(e.target.value);
      if (sameAddress) setPermanentAddress(e.target.value);
    }}
    className='form-style h-9 bg-richblack-600 rounded-2xl form-style w-[580px]'
  />
</label>
<label htmlFor="Permanent" className="flex flex-col gap-2">
  Permanent Address
  <input
    type="text"
    name="Permanent"
    {...register('PermanentAddress',{ required: "*" })}
    value={permanentAddress}
    onChange={e => setPermanentAddress(e.target.value)}
    className={`form-style h-9 bg-richblack-600 rounded-2xl form-style w-[580px] ${sameAddress?"cursor-not-allowed":"cursor-auto"}`}
    disabled={sameAddress}
  />
</label>
        </div>

  <div className='w-full flex flex-col justify-center items-center gap-3'>
    <span className='font-mono'>Are You a Producer Or Director</span>
    <p className='font-mono'>How Would you Like To Register on our Platform As <span className='text-richblue-25'>{Switch}</span></p>
      <div className='w-fit h-14 flex justify-around items-center gap-1 rounded-3xl bg-richblack-400'>

        <button disabled={loading} className={`rounded-3xl w-44 h-14 ${
            Switch === 'Director' ? 'bg-richblack-900 border border-richblack-900' : 'bg-richblack-400'
          }`} onClick={() => setSwitch('Director')} {...register("Director")}
        >
          Director
        </button>
        <button
          disabled={loading}
          className={`rounded-3xl w-44 h-14  ${
            Switch === 'Producer' ? 'bg-richblack-900 border border-richblack-900' : 'bg-richblack-400'
          }`}
          onClick={() => setSwitch('Producer')}
          {...register("Producer")}
        >
          Producer
        </button>
      </div>
      <div className='w-full h-[70px]   flex justify-center items-center gap-6'>
        <button type="submit" className='w-28 h-12  bg-richblack-900 rounded-xl' >Previous</button>
      <button type='submit' className='w-28 h-12 border-double rounded-xl  bg-richblack-900'>Next</button>
      </div>
  </div>
      
      </div>
      // This is for the adress local and permanent
    )}
    {selectedType === 'Experienced' && (
      <div>
        This is for the Experienced section
      </div>
    )}
  </div>
)}

       {part === 3 && loading? <Loader data="top-40 left-80"/>:(
        <div className={`${part === 3 ? "flex" : "hidden"}`}>
          Step 3 Content
          <button onClick={()=>setPart(part + 1)}>Next</button>
          <button onClick={()=>setPart(part - 1)}>Prev</button>
        </div>
       ) }

       {part === 4 && loading? <Loader data="top-40 left-80"/>:(
        <div className={`${part === 4 ? "flex" : "hidden"}`}>
          Step 4 Content
          <button onClick={()=>setPart(part + 1)}>Next</button>
          <button onClick={()=>setPart(part - 1)}>Prev</button>

        </div>
       ) }

       {part === 5 && loading? <Loader data="top-40 left-80"/>:(
        <div className={`${part === 5 ? "flex" : "hidden"}`}>
          Step 5 Content
          <button onClick={()=>setPart(part + 1)}>Next</button>
          <button onClick={()=>setPart(part - 1)}>Prev</button>
        </div>
       ) }

       
    </form>

  )
}

export default OrgainezerForm

// https://countriesnow.space/api/v0.1/countries/states

// we are going to use this api 
// This are the things that are going to be added in the second 
// state 
// city 
// age 

// are you a producer director both 
// when did you begin your career
// Resume / Previous work  portfolio
// what type of genre and sub genre suits you



// part 3 
// projects work till now yes no 
//  yes 
// name  type role duration link to see it 
// projects in production pre post ready for scrrening writing not done just a thought other
// if yes genre estimate duration budget


// part 4 
// which screens do you need 
// handle own promotions 
// no Then help  pr sponsors sales legal cencorship


// part 5 
// why do you want to join
// what makes your fims unique
// Do you have full rights of your film
// do you have censorship certificate


// last part 
// prrof of identity
// logo organization or productino 

// any addition requests yes or no if yes then a box
// tersm and conditions 
// privacy and policy 
// agree to contact by whtsapp 









