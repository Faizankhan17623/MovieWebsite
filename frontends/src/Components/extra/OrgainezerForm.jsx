import  { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Line from '../extra/Line'
import CountryCode from '../../data/CountryCode.json'
import Levels from '../../data/Levels.json'
import Loader from './Loading'
import toast from 'react-hot-toast';
import TheatrerForm from './TheatrerForm';
import AllCountries from '../../data/AllCountries.json'
import Genre from '../../data/Genre.json'
import Projects from '../../data/Projects.json'

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
      const [sameAddress, setSameAddress] = useState(true);
      const [localAddress, setLocalAddress] = useState('');
      const [permanentAddress, setPermanentAddress] = useState('');
      const [Switch, setSwitch] = useState('');
      const [notabelFilms,setnotabelFilms] = useState('')
      

      // This states are for the more films that you have done for that
      // const [Serialno,setSerialno] = useState(1)
      
const [filmError, setFilmError] = useState("");

const [filmEntries, setFilmEntries] = useState([{ name: '', url: '' }]);
const [ready,setReady] = useState('')
      // console.log(notabelFilms)
      // console.log(Serialno)
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
   let fieldsToValidate  = ['first', 'last', 'email', 'countryCode', 'phonenumber', 'whatsAppNumber'];


    if (part === 2) {
    fieldsToValidate  = ['Country', 'State', 'City', 'LocalAddress', 'PermanentAddress'];
  }

  const isStepValid = await trigger(fieldsToValidate);

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

const today  = new Date()
const maxDate = today.toISOString().split('T')[0];
const minDate = '1940-01-01'
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

      {/* THis is the part 2 section in the form like the number 2  */}
      {part === 2 && loading ? (
  <Loader data="top-50 left-70" />
) : (

  <div className={`${part === 2 ? "flex" : "hidden"} w-full  h-[80%] `}>
    {selectedType === 'New Comer' && (
      <div className="flex flex-col w-full">
      <div className="w-full h-[90px]  flex justify-around items-center">

  <label htmlFor="CountryName" className="flex flex-col justify-center  gap-2">
             <span>{errors.CountryName && (
  <span className="text-red-500 text-base">{errors.CountryName.message}</span>
)}Country Name</span>
          <select
           {...register("CountryName", { required: "*" })}
  className="w-40 bg-richblack-600 h-11 form-style"
  value={selectedCountry}
  onChange={e => {
    setSelectedCountry(e.target.value);
    setSelectedState(''); // Reset state when country changes
  }}
>
  <option value="">Select Country</option>
  {AllCountries.data.map((data, index) => (
    <option key={index} value={data.name}>{data.name}</option>
  ))}
</select>
        </label>

<label htmlFor="State" className="flex flex-col justify-center gap-2">
  <span>{errors.State && (
    <span className="text-red-500 text-base">{errors.State.message}</span>
  )} State</span>

  <select
    name="State"
    className={`w-40 bg-richblack-600 h-11 form-style ${!selectedCountry ? "cursor-not-allowed" : "cursor-pointer"}`}
    value={selectedState}
    onChange={e => {
      setSelectedState(e.target.value);
      setValue("State", e.target.value); // ✅ manually update form value
    }}
    disabled={!selectedCountry}
  >
    <option value="">Enter Your State Name</option>
    {(AllCountries.data.find(c => c.name === selectedCountry)?.states || []).map((state, idx) => (
      <option key={idx} value={state.name}>{state.name}</option>
    ))}
  </select>
</label>

        <label htmlFor="City" className="flex flex-col gap-2">
          <span>{errors.City && (
  <span className="text-red-500 text-base">{errors.City.message}</span>
)} City name</span>
          <input type="text" placeholder="Enter Your City Name" name="City" className="form-style rounded-md w-[180px]" {...register("City",{required:"*"})}/>
        </label>
        </div>

        <div className=" w-full h-[190px] flex justify-around items-center flex-col"> 
          <label htmlFor="" className="flex flex-row justify-center items-center gap-2">
  <input
    type="checkbox"
    checked={sameAddress}
    {...register('SameAddress',{required:"*"})}
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

<label htmlFor="LocalAddress" className="flex flex-col gap-2">
  <span>{errors.LocalAddress && (
  <span className="text-red-500 text-base">{errors.LocalAddress.message}</span>
)} Local Address</span>
  <input
    type="text"
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
  <span>{errors.Permanent && (
  <span className="text-red-500 text-base">{errors.Permanent.message}</span>
)} Permanent Address</span>

  <input
    type="text"
    {...register('Permanent',{ required: "*" })}
    value={permanentAddress}
    onChange={e => setPermanentAddress(e.target.value)}
    className={`form-style h-9 bg-richblack-600 rounded-2xl form-style w-[580px] ${sameAddress?"cursor-not-allowed":"cursor-auto"}`}
    disabled={sameAddress}
  />
</label>
        </div>

  <div className='w-full flex flex-col justify-center items-center gap-5'>
    <span className='font-mono'>Are You a Producer Or Director</span>
    <p className='font-mono'>How Would you Like To Register on our Platform As <span className='text-richblue-25'>{Switch}</span></p>
      <div className='w-fit h-14 flex justify-around items-center gap-1 rounded-3xl bg-richblack-400 Level2Btns'>

        <button disabled={loading} className={`rounded-3xl w-44 h-14 ${
    selectedType === 'Director' ? 'bg-richblack-900 border-richblack-900' : 'bg-richblack-400'
  }`}
  onClick={() => {handleChangeAndNext('Director')}}
        >
          Director
        </button>
        <button
          disabled={loading}
          className={`rounded-3xl w-44 h-14 ${
    selectedType === 'Producer' ? 'bg-richblack-900 border-richblack-900' : 'bg-richblack-400'
  }`}
  onClick={() => {handleChangeAndNext('Producer')}}
        >
          Producer
        </button> 
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


        {part === 3 && loading ? (
  <Loader data="top-50 left-70" />
) : (
  <div className={`${part === 3 ? "flex" : "hidden"}`}>
    {selectedType === 'Director' && (
      <div className='w-full h-full border '>
         <div className='flex flex-col w-full '>
          <label htmlFor="Career">
            When Did You Begin your Career
            <input type="date" name="Career"  className='form-style h-9 bg-richblack-600 rounded-2xl form-style w-[180px]'  max={maxDate} min={minDate}{...register("Date",{required:"*"})}/>
            <span className='hidden'>Total Experience</span>
          </label>
<label htmlFor="Genre">
  What type of Genre Suits you 
  <select
    name="Genre"
    id="Genre"
    className="w-40 bg-richblack-600 h-11 form-style"
    {...register('Genre', { required: "*" })}
    
  >
    <option value="">Select Genre</option>
    {Genre.genres.map((data, index) => (
      <option key={index} value={data.name} >{data.name}</option>
    ))}
  </select>
  {errors.Genre && (
    <span className="text-red-500 text-base">{errors.Genre.message}</span>
  )}
</label>

        </div> 
        <label htmlFor="Connection">
          Have you directed any notable films or web series
          <span>
            <input type="checkbox" name="notabelFilms" value="yes"  onChange={(e)=>setnotabelFilms(e.target.value)}  checked={notabelFilms === "yes"}/>
            <span>yes</span>
          </span>
          <span>
            <input type="checkbox" name="notabelFilms" value="No" onChange={(e)=>setnotabelFilms(e.target.value)} checked={notabelFilms === "No"}/>
            <span>No</span>
          </span>
        </label>

  {notabelFilms === 'yes' && (
  <div className="flex flex-col gap-2">
    {filmEntries.map((entry, idx) => (
      <span key={idx} className="flex gap-2">
        <span>{idx + 1}</span>
        <label>
          Name
          <input
            type="text"
            placeholder={`Enter the ${idx + 1} film name`}
            value={entry.name}
            onChange={e => {
              const updated = [...filmEntries];
              updated[idx].name = e.target.value;
              setFilmEntries(updated);
            }}
          />
        </label>
        <label>
          Url
          <input
            type="url"
            placeholder="Enter the link of that film"
            value={entry.url}
            onChange={e => {
              const updated = [...filmEntries];
              updated[idx].url = e.target.value;
              setFilmEntries(updated);
            }}
          />
        </label>
      </span>
    ))}
    {filmError && (
      <span className="text-red-500 text-sm">{filmError}</span>
    )}
    <button
      type="button"
      onClick={() => {
        if (filmEntries.length >= 5) {
          setFilmError("You can create 5 fields only");
        } else {
          setFilmEntries([...filmEntries, { name: '', url: '' }]);
          setFilmError("");
        }
      }}
      className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
    >
      Add more
    </button>
  </div>
)}
<label htmlFor="portfolio">
  Resume / Portfolio Link 
  <input type="url" name="portfolio" {...register('portfolio',{required:"*"})} placeholder='Enter your Link'/>
</label>
 <label htmlFor="Projects">
  Number of Projects you have done
  <select
  name="Projects"
  id="Projects"
  className="w-40 bg-richblack-600 h-11 form-style "
  {...register('Projects', { required: "*" })}
>
  <option value="">Number of Projects</option>
  {Projects.ProjectNumber.map((data, index) => (
    <option key={index} value={data} className='flex justify-center items-center flex-col'>{data}</option>
  ))}
</select>
  {errors.Projects && (
    <span className="text-red-500 text-base">{errors.Projects.message}</span>
  )}
</label> 

<label htmlFor="Production">
          Are There any project ready to upload or in the production
          <span>
            <input type="checkbox" name="Production" value="yes"  onChange={(e)=>setReady(e.target.value)}  checked={ready === "yes"}/>
            <span>yes</span>
          </span>
          <span>
            <input type="checkbox" name="Production" value="No" onChange={(e)=>setReady(e.target.value)} checked={ready === "No"}/>
            <span>No</span>
          </span>
        </label>
        <label htmlFor="" className={ready === "yes"?"flex":"hidden"}>
          can you give me some names of then ane in what stage are there 
        </label>
      </div>
    )}
     {selectedType === 'Producer' && (
      <div>
        This is for the producer section
      </div>
    )}
  </div>
)}


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









