import React, { useEffect, useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import AllCountries from '../../data/AllCountries.json';
import Countries from '../../data/CountryCode.json'
import Projects from '../../data/Projects.json'
import Genre from '../../data/Genre.json'
import Tools from '../../data/Tools.json'
import Credits from '../../data/Credits.json'
import Profession from '../../data/Professsion.json'
import { FaCaretDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaLinkedin, FaYoutube , FaInstagram, FaImdb } from "react-icons/fa";
import Soc from '../../data/Social.json'
import { FaXTwitter } from "react-icons/fa6";


const OrganizerVerificationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verification } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const iconMap = {
    FaLinkedin: FaLinkedin,
    FaYoutube: FaYoutube ,
    FaInstagram: FaInstagram,
    FaImdb: FaImdb,
    FaXTwitter: FaXTwitter 
};


const SocialName = {
  "Linkedn":"Linkedn",
  "Youtube":"Youtube",
  "Instagram":"Instagram",
  "IMDB":"IMDB",
  "X / (Twitter)":"X / (Twitter)"
}
// 593 

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open,Setopen] = useState(true)
  const [Add,setAdd] = useState(true)
  const [Work,setWork] = useState('No')
  const [Media,setMedia] = useState('No')
  const [filmentries,setfilmentries] = useState([{name:'',url:'',role:'',budget:''}])

  const [Socials,setSocials] = useState([{MediaName:'',Followers:'',link:''}])
  const[Socialerror,setSocialError] = useState("")

  const [projects,setprojects] = useState(false)
  const [Social,setsocial] = useState(false)
  const [filmError, setFilmError] = useState("");

  const [Upload, setUpload] = useState(false); 
  const [selectedFile, setSelectedFile] = useState(null); 
  const fileInputRef = useRef(null); 

const [Ongoing, setOngoing] = useState("No");
  const [Planned, setPlanned] = useState("No");
  const [OngoingProjects, setOngoingProjects] = useState([
    { ProjectName: "", ProjectFile: "", Start_Date: "", Start_End: "", Release: "" },
  ]);
  const [PlannedProjects, setPlannedProjects] = useState([
    { PName: "", PType: "", PStatus: "", PStart: "", PEnd: "", PReles: "" },
  ]);
  const [On, setOn] = useState(false);
  const [pp, setpp] = useState(false);
  const [OngoingError, setOngoingError] = useState("");
  const [PlannedError, setPlannedError] = useState("");
const [showGenreDropdown, setShowGenreDropdown] = useState(false);
const [showsubGenreDropdown, setShowsubGenreDropdown] = useState(false);
const [Genres,setGenres] = useState([])
const [SubGenres,setsubgenres] = useState([])
const [genreError, setGenreError] = useState("");
const [SubGenreError, setSubGenreError] = useState(""); // Add this state
const [distrubation,setdistrubation] = useState('No')

const [Screen,setscreens]=useState(false)
const [Audience,setaudience]=useState(false)
const [ScrenTypes,setscreentypes] = useState([])
const [AudienceTypes,setaudiencetypes] = useState([])

const [AudienceError,setaudienceError] = useState('')
const [ScreenError,SubscreenError] = useState('')
const [Promotions,setpromotions] = useState("No")
  const [Notable,setnotable] = useState(false)
  const [Notableerror,setnotableerror] = useState("")
  const [Distrubations,setdistrubations]=useState([{projectname:"",Budget:"",ReleaseDate:"",Role:""}])
  const[Support,setsupport]=useState('No')

  const[Certified,setcertified]=useState('No')
  const[Experience,setexperience]=useState('No')
  const[Collabration,setcollabration]=useState('No')

  const [Cert,setcert] = useState(false)
  const [Certifications,setcertifications] = useState([{CertificateName:"",Certificatealink:"",CertDate:""}])
  const[CertError,setcerterror] = useState("")

// console.log(Ongoing)

  const onSubmit = async (data) => {
    try {
      // localStorage.setItem('organizerVerificationData', JSON.stringify(data));
      setIsSubmitted(true);
      alert('Verification data submitted successfully. An admin will review it.');
      console.log(data);
      // navigate('/Dashboard/My-Profile');
       console.log("Form Submitted: ", data);
    // Handling files separatelen are
      console.log("Poster File:", data.posterImage);
      console.log("PDF File:", data.supportingDocs);
    
    } catch (error) {
      console.error('Error during submission:', error);
      alert('An error occurred while submitting your data. Please try again or contact support.');
    }
  };
// console.log(Genres)
  const handleReset = () => {
    localStorage.removeItem('organizerVerificationData');
    reset();
    setIsSubmitted(false);
  };


  return (
    <div className="flex justify-center w-full min-h-screen bg-richblack-900 h-[4000px] overflow-y-scroll overflow-x-hidden">
  <div className="w-full max-w-5xl bg-richblack-900 rounded-xl shadow-lg p-8 Secondss text-white">
    <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center Verificationss">Organizer Data</h2>
    <p className="text-gray-400 font-italic text-center Verificationss">
      {isSubmitted
        ? 'Your verification data has been submitted and is under review. You can only view it now.'
        : 'Fill in your details below to request verification as an Organizer. These details can only be submitted once and cannot be changed later. The Administrator Will Review Your Application and Reach back to You Via E-mail'}
    </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
          {/* Personal Information */}
         <div className="w-full Form bg-richblack-800 rounded-md">
        <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Personal Information</p>
        <div className="w-full h-full flex justify-evenly items-center">
          <label htmlFor="First" className="flex flex-col gap-2">
            <span className="flex flex-row items-center gap-2">*<span>First Name</span></span>
            <input
              type="text"
              placeholder="Enter Your First name"
              className="w-[490px] p-3 rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition"
              {...register("First", { required: "*First Name is required" })}
            />
            {errors.First && <span className="text-red-500">{errors.First.message}</span>}
          </label>


           <label htmlFor="Last" className="flex flex-col gap-2 w-1/2">
            <span className="flex flex-row items-center gap-2">*<span>Last Name</span></span>
            <input
              type="text"
              placeholder="Enter Your Last name"
              className="p-3 rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition"
              {...register("Last", { required: "*Last Name is required" })}
            />
            {errors.Last && <span className="text-red-500">{errors.Last.message}</span>}
          </label>
        </div>

           <div className="w-full flex justify-between items-start Emails ">
          <label htmlFor="Email" className="flex flex-col gap-2 mt-6">
            <span className="flex flex-row items-center gap-2">*<span>Email Address</span></span>
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Enter Your Email id"
              className="w-[490px] p-3 rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition mt-0"
              {...register("Email", { required: "*Email is required" })}
            />
            {errors.Email && <span className="text-red-500">{errors.Email.message}</span>}
          </label>

             <div className="flex w-1/2 gap-2  min-h-[100px]">
            <div className="w-32 flex flex-col gap-2">
              <label className="flex flex-col gap-2 font-semibold" htmlFor="CountryCode">
                <span className="flex flex-row items-center gap-2">*<span>Country Code</span></span>
              </label>
                        <select
                {...register("CountryCode", { required: "Country code is required" })}
                className={`p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.CountryCode ? "border-red-500" : ""}`}
                defaultValue=""
              >
                <option value="" disabled>Select Your Country Code</option>
                {Countries.map((data, i) => (
                  <option key={i} value={data.code}>
                    {data.code} - {data.country}
                  </option>
                ))}
              </select>
              {errors.CountryCode && <span className="text-red-500">{errors.CountryCode.message}</span>}
            </div>
<div className="flex flex-col gap-2">
              <label htmlFor="MobileNumber" className="flex flex-col gap-2">
                <span className="flex flex-row items-center gap-2">*<span>Mobile Number</span></span>
                <input
                  type="tel"
                  name="MobileNumber"
                  id="MobileNumber"
                  placeholder="Enter Your Mobile Number"
                  className="p-3 w-[373px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                  {...register("MobileNumber", { required: "*Mobile Number is required" })}
                />
                {errors.MobileNumber && <span className="text-red-500">{errors.MobileNumber.message}</span>}
              </label>


                      <label
                htmlFor="WhatsAppNumber"
                className={`flex flex-col gap-2 Whatsappp ${open ? "invisible h-0 opacity-0" : "visible h-auto opacity-100"} transition-all duration-300`}
              >
                <span className="flex flex-row items-center gap-2">*<span>WhatsApp Number</span></span>
                <input
                  type="tel"
                  name="WhatsAppNumber"
                  id="WhatsAppNumber"
                  placeholder="Enter Your WhatsApp Number"
                  className="p-3 w-[373px] bg-richblack-600  h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                  {...register("WhatsAppNumber", { required: open ? false : "*WhatsApp Number is required" })}
                />
                {errors.WhatsAppNumber && <span className="text-red-500">{errors.WhatsAppNumber.message}</span>}
              </label>
            </div>
          </div>
        </div>
            
             <div className="">
          <input
            type="checkbox"
            name="SameOnWhatsApp"
            id="SameOnWhatsApp"
            checked={open}
            onChange={(e) => {
              Setopen(e.target.checked);
              setValue("SameOnWhatsApp", e.target.checked);
              if (e.target.checked) {
                setValue("WhatsAppNumber", "");
              }
            }}
            className="mr-2"
          />
          <label htmlFor="SameOnWhatsApp">Same on WhatsApp</label>
        </div>

             <div className="flex w-full justify-evenly items-stretch Location  gap-x-30 border">

          <div className="w-32 flex flex-col gap-3">
            <label className="block mb-2 font-semibold" htmlFor="CountryName">
              <span className='flex justify-center items-center gap-3'>*<span>Country Name</span></span> 
            </label>
            <select
              {...register("CountryName", { required: "Country Name is required" })}
              className={`p-3 w-[250px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.CountryName ? "border-red-500" : ""}`}
              defaultValue=""
            >
                          <option value="" disabled>Select Your Country Name</option>
              {AllCountries.data.map((data, i) => (
                <option key={i} value={data.code}>
                  {data.name}
                </option>
              ))}
            </select>
            {errors.CountryName && <span className="text-red-500">{errors.CountryName.message}</span>}
          </div>
                       <div className="w-32 flex flex-col gap-3">
            <label className="block mb-2 font-semibold" htmlFor="StateName">
              <span className='flex justify-center items-center gap-2'>*<span>State Name</span></span>
            </label>
            <select
              {...register("StateName", { required: "State Name is required" })}
              className={`p-3 w-[300px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.StateName ? "border-red-500" : ""}`}
              defaultValue=""
            >
                            <option value="" disabled>Select Your State Name</option>
              {AllCountries.data.map((data, i) => (
                <option key={i} value={data.code}>
                  {data.name}
                </option>
              ))}
            </select>
            {errors.StateName && <span className="text-red-500">{errors.StateName.message}</span>}
          </div>



             <div className="w-32 flex flex-col gap-3">
            <label className="flex flex-col gap-3 mb-2 font-semibold" htmlFor="CityName">
              <span className='flex justify-center items-center gap-2'>*<span>City Name</span></span>
            <input type="text"  name='CityName'  placeholder='Enter The City Name' className='p-3 w-[230px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'  {...register("CityName", { required: "State Name is required" })}/>
            </label>
          </div>

        </div>
       

            <div>
          <input
            type="checkbox"
            name="SameAddress"
            id="SameAddress"
            {...register("SameAddress")}
            className="Addres"
            checked={Add}
            onChange={(e)=>{setAdd(e.target.checked);setValue('SameAdd',e.target.checked)}}
          />
          <label htmlFor="SameAddress">Same Address for local and permanent</label>
          <label htmlFor="LocalAddress" className="flex flex-col gap-2">
            <span className='flex  items-center gap-1'>*<span>Local Address</span></span>
            <input
              type="text"
              placeholder="Enter Your local Address"
              className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              {...register("LocalAddress")}
            />
          </label>
                
               <label htmlFor="PermanentAddress" className="flex flex-col gap-2 Perm">
            <span className='flex  items-center gap-1'>*<span>Permanent Address</span></span>
            <input
              type="text"
              placeholder="Enter Your permanent Address"
              className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              {...register("PermanentAddress")}
            />
          </label>
        </div>

           <div className='w-full  flex justify-evenly items-center gap-5 Genderrres border'>
                 <label htmlFor="Gender" className="flex flex-col gap-2">
            Choose Your Gender

            <div className='flex justify-around items-center gap-5 '>
            <div>
              <input
                type="radio"
                name="Gender"
                id="Male"
                value="Male"
                {...register("Gender", { required: "*Gender is required" })}
                className="mr-2"
              />
              <label htmlFor="Male">Male</label>
</div>
            <div>
              <input
                type="radio"
                name="Gender"
                id="Female"
                value="Female"
                {...register("Gender", { required: "*Gender is required" })}
                className="mr-2"
              />
              <label htmlFor="Female">Female</label>
            </div>
<div>
              <input
                type="radio"
                name="Gender"
                id="None"
                value="None"
                {...register("Gender", { required: "*Gender is required" })}
                className="mr-2"
              />
              <label htmlFor="None">Rather Not To Disclose</label>
            </div>
            {errors.Gender && <span className="text-red-500">{errors.Gender.message}</span>}
            </div>
          </label>

              <div>
          <label htmlFor="posterImage" className="flex flex-col gap-2">
            Upload Image
            <input
              type="file"
              name="posterImage"
              id="posterImage"
              accept="image/*"
              {...register("posterImage", {
                  required: "Image is required",
                  validate: {
                    fileType: (files) =>
                      files[0]?.type.startsWith("image/") || "Only image files are allowed",
                    fileSize: (files) =>
                      (files[0]?.size <= 5 * 1024 * 1024) || "File size must be less than 5MB",
                  },
                })}
              className="mt-2 w-full text-sm text-gray-400 bg-richblack-600 h-5 flex justify-center items-center rounded-md"
              onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file || null);
                  setUpload(!!file);
                }}
                ref={fileInputRef}
            />
            {errors.posterImage && (
                <span className="text-red-500 text-sm">{errors.posterImage.message}</span>
              )}
              {selectedFile && (
                <p className="text-sm text-gray-400 mt-1">Selected: {selectedFile.name}</p>
              )}
          </label>
          <div className="flex gap-2 Uploadeser">
          <button
                type="button"
                className="px-4 py-2 bg-yellow-400 text-black rounded Buttonss"
                onClick={() => fileInputRef.current.click()}
              >
                Select Image
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-700 text-white rounded Buttonss"
                onClick={() => {
                  setSelectedFile(null);
                  setUpload(false);
                  setValue("posterImage", null); // Clear form value
                  fileInputRef.current.value = null; // Clear file input
                }}
              >
                Cancel
              </button>
          </div>
        </div>
        </div>

      </div>

          {/* Professional Background */}
          <div className='w-full Backgroundss bg-richblack-800 rounded-md'>
             <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Professional Background</p>
             <div className='w-full h-full'>
              <div className='w-full border flex justify-around items-center gap-5'>

                <label htmlFor="Achievements" className='flex flex-col gap-3'>
                  <span className='flex justify-center items-center gap-2'>*<span>Website / Portfolio Link</span></span>
                  <input type="url" name="Achievements" id="Achievements" placeholder='Enter Your Link Here' className='form-style w-[200px]'/>
                </label>

                <div className="w-48 flex flex-col gap-3">
                          <label className="block mb-2 font-semibold" htmlFor="CountryName">
                            <span>*<span>Total Completed Projects</span></span>
                          </label>
                          <select
                            {...register("CountryName", { required: "Country Name is required" })}
                            className={`p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.CountryCode ? "border-red-500" : ""}`}
                            defaultValue=""
                          >
                            <option value="" disabled>Number of Projects</option>
                            {Projects.ProjectNumber.map((data, i) => (
                              <option key={i} value={data}>
                                {data}
                              </option>
                            ))}
                          </select>
                        </div>

                          <div className="w-48 flex flex-col gap-3">
                          <label className="block mb-2 font-semibold" htmlFor="CountryName">
                            <span>*<span>Years of Experience</span></span>
                          </label>
                          <select
                            {...register("CountryName", { required: "Country Name is required" })}
                            className={`p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.CountryCode ? "border-red-500" : ""}`}
                            defaultValue=""
                          >
                            <option value="" disabled>Number of Projects</option>
                            {Projects.years.map((data, i) => (
                              <option key={i} value={data}>
                                {data}
                              </option>
                            ))}
                          </select>
                        </div>
              </div>
              <div className='BIO'>                        <div>
                          <label htmlFor="bio" className=" font-semibold OIB">
  <span className='flex  items-center gap-2'>*<span>Short Bio About YourSelf</span></span>
</label>
<textarea
  id="bio"
  name="bio"
  placeholder="Write a short bio (max 250 characters)"
  maxLength={250}
  rows={4}
  className="w-full p-3 bg-richblack-600 text-white rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
/>
<p className="text-sm text-gray-400 mt-1 flex justify-end ">Max 250 characters</p>

                        </div>
                        
              </div>

              <div className='Working flex justify-around items-start w-full '>
                <div className='w-1/2  flex flex-col gap-3 justify-center items-center'>
                  <p className='Work font-bold'>Have you Worked on any Notable Projects</p>
                  <div className='flex gap-3'>
                    <span>
                    <input type="checkbox" name="Work" id="" value="Yes" onChange={(e)=>{setWork(e.target.value)}} checked={Work === "Yes"}/>
                    <label htmlFor="Work">Yes</label>
                    </span>
                    <span>
                    <input type="checkbox" name="Work" id="" value="No" checked={Work === "No"} onChange={(e)=>{setWork(e.target.value)}}/>
                    <label htmlFor="Work">No</label>
                    </span>
                  </div>
                </div>

                <div className='w-1/2  flex flex-col gap-3 justify-center items-center'>
                    <p className='Work font-bold'>Would You Like to Share Your Social Media</p>
                  <div className='flex gap-3'>
                    <span>
                      <input type="checkbox" name="Media" id="" value="Yes" onChange={(e)=>{setMedia(e.target.value)}} checked={Media === "Yes"}/>
                      <label htmlFor="Media">Yes</label>
                    </span>
                    <span>
                      <input type="checkbox" name="Media" id="" value="No" onChange={(e)=>{setMedia(e.target.value)}} checked={Media === "No"}/>
                      <label htmlFor="Media">No</label>
                    </span>
                  </div>
                </div>
              </div>

              {Work === "Yes" && projects &&(
                <div className='flex Show gap-1 Projectsss'>
                   <FaCaretDown
              className="text-2xl cursor-pointer fill-red-600"
              onClick={() => setprojects(false)}
            />
            <span>Show Projects</span>
                </div>
              )}

                   {Work === "Yes" && (
                    <div className={`${projects ? "hidden" : "w-full Projectsss flex flex-col justify-around gap-2"}`}>
                      <div className="flex flex-row">
                                    <FaCaretDown className="text-2xl cursor-pointer"  onClick={()=>setprojects(true)}/>
                                    <span>Hide Projects</span>
                                  </div>

                      {filmentries.map((data,index)=>(
                        <div className=' flex justify-evenly items-center gap-3' key={index}>
                          <span>{index+1}</span>
                          <label htmlFor={`Projects.${index}`} className='flex flex-col gap-2'>
                            <span className='flex gap-2'>*<span>Project Name</span></span>
                            <input type="text" placeholder='Enter the name of the Project' className='form-style h-9 w-[290px] bg-richblack-600 rounded-2xl form-style' 
                            {...register(`Projects.${index}.name`,{required:"Project name is required"})} value={data.name} onChange={
                              (e)=>{
                                const updated = [...filmentries]
                                updated[index].name = e.target.value
                                setfilmentries(updated)
                              }}
                            />
                          </label>
                          <label htmlFor="paise" className='flex flex-col gap-2'>
                            <span>Total Budget</span>
                               <select name="" id="" className='p-3  bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'  {...register(`paise.${index}.budget`)} value={data.budget} onChange={
                              (e)=>{
                                const updated = [...filmentries]
                                updated[index].budget = e.target.value
                                setfilmentries(updated)
                              }}>
                  <option value="" disabled>Select Budget Range</option>
                  {Projects.Money.map((data,index)=>(
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                          </label>
                          <label htmlFor="Roless" className='flex flex-col gap-2'>
                            <span className='flex gap-2'>*<span>Your Role</span></span>
                             <select name="" id="" className='p-3  bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'  {...register(`Roless.${index}`,{required:"role is required"})} value={data.role} onChange={
                              (e)=>{
                                const updated = [...filmentries]
                                updated[index].budget = e.target.value
                                setfilmentries(updated)
                              }}>
                  <option value="" disabled>Your Role</option>
                  {Projects.roles.map((data,index)=>(
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                          </label>
                          <label htmlFor="Links" className='flex flex-col gap-2'>
                            <span>*<span>Url</span></span>
                            <input type="url" name="" id="" className='form-style h-9 bg-richblack-600 rounded-2xl form-style w-[290px]' placeholder='Enter Your Url' {...register(`films.${index}.url`, {
                      required: "Film URL is required",
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Enter a valid URL",
                      },
                    })} 
                    value={data.url} 
                    onChange={
                              (e)=>{
                                const updated = [...filmentries];
                      updated[index].url = e.target.value;
                                setfilmentries(updated)
                              }}/>
                          </label>
                            <div
                                            className="flex justify-center items-center  rounded-full hover:bg-red-600"
              onClick={() => {
                    if (filmentries.length === 1) {
                      setFilmError("You need to keep at least one field ");
                    } else {
                      const updated = filmentries.filter((_, i) => i !== index);
                      setfilmentries(updated);
                      setFilmError("");
                    }
                  }}                             
                                          >
                                            <RxCross1 className='text-richblack-100'/>
                                          </div>
                        </div>
                      ))}

                        {filmError && (
              <span className="text-red-500 text-sm flex justify-center items-center">
                {filmError}
              </span>
            )}

                      <button
              type="button"
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded Adding"
              onClick={()=>{
                if(filmentries.length >= 4){
                  setFilmError("You can create 4 fields only");
                }else{
                  setfilmentries([...filmentries, { name:'',url:'',role:'',budget:''}]);
                  setFilmError("");
                }
              }}
            >
              Add more
            </button>
                    </div>
                  )}


                  {Media == "Yes" && Social && (
                    <div className='flex gap-1 Socialss'>
                   <FaCaretDown
              className="text-2xl cursor-pointer fill-red-600"
              onClick={() => setsocial(false)}
            />
            <span>Show Media</span>
                </div>
                  )}

                  {Media === "Yes" && (
                    <div className={`${Social ? "hidden" : "w-full Socialss flex flex-col justify-around gap-2"}`}>
                        <div className="flex flex-row">
                                    <FaCaretDown className="text-2xl cursor-pointer"  onClick={()=>setsocial(true)}/>
                                    <span>Hide Media</span>
                                  </div>

{Socials.map((data, index) => {
      // Pick the social media platform based on the mediaName in the state
      const socialItem = Soc.find((s) => s.name === data.MediaName) || Soc[index % Soc.length];
      const IconComponent = iconMap[socialItem.icon];

      return (
        <div className="flex justify-evenly items-center gap-3" key={index}>
          {/* 1. Social Media Icon */}
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-richblack-700">
            {IconComponent && <IconComponent className="text-2xl text-blue-400" />}
          </div>

          {/* 2. Social Media Name (dropdown to select platform) */}
          <label className="flex flex-col gap-2">
            <span>
              * Social Media
            </span>
            <select
              className="form-style h-12 w-[160px] bg-richblack-600 rounded-2xl"
              {...register(`socials.${index}.mediaName`, { required: "Social Media platform is required" })}
              value={data.MediaName}
              onChange={(e) => {
                const updated = [...Socials];
                updated[index].MediaName = e.target.value;
                setSocials(updated);
              }}
            >
              <option value="" disabled>Select Platform</option>
              {Soc.map((s, i) => (
                <option key={i} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.socials?.[index]?.mediaName && (
              <span className="text-red-500 text-sm">{errors.socials[index].mediaName.message}</span>
            )}
          </label>

          {/* 3. Followers / Subscribers */}
          <label className="flex flex-col gap-2">
            <span>
              * Followers
            </span>
            <input
              type="tel"
              placeholder="Enter followers"
              className="form-style h-9 w-[160px] bg-richblack-600 rounded-2xl"
              {...register(`socials.${index}.followers`, { required: "Followers are required" })}
              value={data.Followers || ""}
              onChange={(e) => {
                const updated = [...Socials];
                updated[index].Followers = e.target.value;
                setSocials(updated);
              }}
            />
            {errors.socials?.[index]?.followers && (
              <span className="text-red-500 text-sm">{errors.socials[index].followers.message}</span>
            )}
          </label>

          {/* 4. URL */}
          <label className="flex flex-col gap-2">
            <span>
              * URL
            </span>
            <input
              type="url"
              placeholder="Enter profile URL"
              className="form-style h-9 w-[240px] bg-richblack-600 rounded-2xl"
              {...register(`socials.${index}.link`, {
                required: "URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Enter a valid URL",
                },
              })}
              value={data.link || ""}
              onChange={(e) => {
                const updated = [...Socials];
                updated[index].link = e.target.value;
                setSocials(updated);
              }}
            />
            {errors.socials?.[index]?.link && (
              <span className="text-red-500 text-sm">{errors.socials[index].link.message}</span>
            )}
          </label>

          {/* Delete button */}
          <div
            className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
            onClick={() => {
              if (Socials.length === 1) {
                setSocialError("You need to keep at least one field ");
              } else {
                const updated = Socials.filter((_, i) => i !== index);
                setSocials(updated);
                setSocialError("");
              }
            }}
          >
            <RxCross1 className="text-richblack-100" />
          </div>
        </div>
      );
    })}

    {Socialerror && (
      <span className="text-red-500 text-sm flex justify-center items-center">
        {Socialerror}
      </span>
    )}

    <button
      type="button"
      className="mt-2 px-4 py-1 bg-blue-600 text-white rounded Adding"
      onClick={() => {
        if (Socials.length >= 5) {
          setSocialError("You can create 5 fields only");
        } else {
          // Add the next available social media platform
          const nextIndex = Socials.length % Soc.length;
          setSocials([...Socials, { MediaName: Soc[nextIndex].name, Followers: '', link: '' }]);
          setSocialError("");
        }
      }}
    >
      Add more
    </button>
  </div>
)}
             </div>
          </div>

          {/* Projects */}
          <div className='w-full Project md:flex-row gap-4 p-4 mb-4  rounded-md bg-richblack-800 shadow '>
             <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Projects</p>
             <div className='w-full h-full'>
              <div className=' w-full flex  justify-evenly items-center'>
{/* Ongoing,setOngoing */}
                <div className='flex flex-col gap-3'>
                 <div className='flex justify-center items-center gap-2'>
                    <p className='Work font-bold'>Any Ongoing Project</p>
                    <input type="checkbox" name="Work" id="" value="Yes" onClick={(e)=>setOngoing(e.target.value)} checked={Ongoing === "Yes"}/>
                    <label htmlFor="Work">Yes</label>
                    <input type="checkbox" name="Work" id="" value="No" onClick={(e)=>setOngoing(e.target.value)} checked={Ongoing === "No"}/>
                    <label htmlFor="Work">No</label>
                  </div>
                </div>
                {/* Planned,setPlanned */}

                <div className='flex flex-col gap-3'>
                 <div className='flex justify-center items-center gap-2'>
                    <p className='Work font-bold'>Any Projects planned For This Year</p>
                    <input type="checkbox" name="Work" id="" value="Yes" onClick={(e)=>setPlanned(e.target.value)} checked={Planned === "Yes"}/>
                    <label htmlFor="Work">Yes</label>
                    <input type="checkbox" name="Work" id="" value="No" onClick={(e)=>setPlanned(e.target.value)} checked={Planned === "No"}/>
                    <label htmlFor="Work">No</label>
                  </div>
                </div>
              </div>

              {Ongoing === "Yes" && On && (
        <div className="flex gap-1 One">
          <FaCaretDown
            className="text-2xl cursor-pointer fill-red-600"
            onClick={() => setOn(false)}
          />
          <span>Hide Media</span>
        </div>
      )}
{Ongoing === "Yes" && (
        <div className={`${On ? "hidden" : "w-full One flex flex-col justify-around gap-2"}`}>
          <div className="flex flex-row">
            <FaCaretDown
              className="text-2xl cursor-pointer"
              onClick={() => setOn(true)}
            />
            <span>Show Projects</span>
          </div>

          {OngoingProjects.map((data, index) => (
            <div
              className="flex gap-4 p-3 border-b border-gray-700"
              key={index}
            >
              <label htmlFor={`ProjectName-${index}`} className="flex flex-col gap-2">
                <span className="flex justify-start items-center gap-3">
                  *<span>Project Name</span>
                </span>
                <input
                  type="text"
                  name={`ProjectName-${index}`}
                  placeholder="Enter Your Project Name"
                  className="form-style h-9 w-[220px] bg-richblack-600 rounded-2xl px-3"
                  {...register(`OngoingProjects[${index}].ProjectName`, {
                    required: "Project name is required",
                  })}
                  value={data.ProjectName}
                  onChange={(e) => {
                    const updated = [...OngoingProjects];
                    updated[index].ProjectName = e.target.value;
                    setOngoingProjects(updated);
                  }}
                />
              </label>

              <label htmlFor={`ProjectFile-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">
                  *<span>Upload Script / Images</span>
                </span>
                <input
                  type="file"
                  name={`ProjectFile-${index}`}
                  accept=".pdf,.docx,.jpg,.jpeg,.png"
                  className="form-style bg-richblack-600 rounded-2xl p-2"
                  multiple
                  {...register(`OngoingProjects[${index}].ProjectFile`, {
                    required: "File upload is required",
                  })}
                  onChange={(e) => {
                    const updated = [...OngoingProjects];
                    updated[index].ProjectFile = e.target.files[0];
                    setOngoingProjects(updated);
                  }}
                />
              </label>

              <label htmlFor={`Start_Date-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">*<span>Start Date</span></span>
                <input
                  type="month"
                  name={`Start_Date-${index}`}
                  className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                  {...register(`OngoingProjects[${index}].Start_Date`, {
                    required: "Date is required",
                  })}
                  value={data.Start_Date}
                  onChange={(e) => {
                    const updated = [...OngoingProjects];
                    updated[index].Start_Date = e.target.value;
                    setOngoingProjects(updated);
                  }}
                />
              </label>

              <label htmlFor={`Start_End-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">*<span>End Date</span></span>
                <input
                  type="month"
                  name={`Start_End-${index}`}
                  className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                  {...register(`OngoingProjects[${index}].Start_End`, {
                    required: "Date is required",
                  })}
                  value={data.Start_End}
                  onChange={(e) => {
                    const updated = [...OngoingProjects];
                    updated[index].Start_End = e.target.value;
                    setOngoingProjects(updated);
                  }}
                />
              </label>

              <label htmlFor={`Release-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center">*<span>Released</span></span>
                <select
                  name={`Release-${index}`}
                  id={`Release-${index}`}
                  className="p-3 bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                  {...register(`OngoingProjects[${index}].Release`, {
                    required: "Release is required",
                  })}
                  value={data.Release}
                  onChange={(e) => {
                    const updated = [...OngoingProjects];
                    updated[index].Release = e.target.value;
                    setOngoingProjects(updated);
                  }}
                >
                  <option value="" disabled>
                    Released
                  </option>
                  {Projects.Release.map((rel, idx) => (
                    <option key={idx}>{rel}</option>
                  ))}
                </select>
              </label>

              <div
                className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  if (OngoingProjects.length === 1) {
                    setOngoingError("You need to keep at least one field");
                  } else {
                    const updated = OngoingProjects.filter((_, i) => i !== index);
                    setOngoingProjects(updated);
                    setOngoingError("");
                  }
                }}
              >
                <RxCross1 className="text-richblack-100" />
              </div>
            </div>
          ))}

          {OngoingError && (
            <span className="text-red-500 text-sm flex justify-center items-center">
              {OngoingError}
            </span>
          )}

          <button
            type="button"
            className="px-4 py-1 bg-blue-600 text-white rounded Adding w-full"
            onClick={() => {
              if (OngoingProjects.length >= 4) {
                setOngoingError("You can create 4 fields only");
              } else {
                setOngoingProjects([
                  ...OngoingProjects,
                  { ProjectName: "", ProjectFile: "", Start_Date: "", Start_End: "", Release: "" },
                ]);
                setOngoingError("");
              }
            }}
          >
            Add more
          </button>
        </div>
      )}

      {Planned === "Yes" && pp && (
        <div className="flex gap-1 One">
          <FaCaretDown
            className="text-2xl cursor-pointer fill-red-600"
            onClick={() => setpp(false)}
          />
          <span>Hide Planned Projects</span>
        </div>
      )}

      {Planned === "Yes" && (
        <div className={`${pp ? "hidden" : "w-full One flex flex-col justify-around gap-2"}`}>
          <div className="flex flex-row">
            <FaCaretDown
              className="text-2xl cursor-pointer"
              onClick={() => setpp(true)}
            />
            <span>Show Planned Projects</span>
          </div>

          {PlannedProjects.map((data, index) => (
            <div
              className="flex gap-4 p-3 border-b border-gray-700"
              key={index}
            >
              <label htmlFor={`PName-${index}`} className="flex flex-col gap-2">
                <span className="flex justify-start items-center gap-3">
                  *<span>Project Name</span>
                </span>
                <input
                  type="text"
                  name={`PName-${index}`}
                  placeholder="Enter Your Project Name"
                  className="form-style h-9 w-[220px] bg-richblack-600 rounded-2xl px-3"
                  {...register(`PlannedProjects[${index}].PName`, {
                    required: "Project name is required",
                  })}
                  value={data.PName}
                  onChange={(e) => {
                    const updated = [...PlannedProjects];
                    updated[index].PName = e.target.value;
                    setPlannedProjects(updated);
                  }}
                />
              </label>

              <label htmlFor={`PType-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">
                  *<span>Project Type</span>
                </span>
                <select
                  name={`PType-${index}`}
                  className="form-style h-12 w-[160px] bg-richblack-600 rounded-2xl"
                  {...register(`PlannedProjects[${index}].PType`, {
                    required: "Type is required",
                  })}
                  value={data.PType}
                  onChange={(e) => {
                    const updated = [...PlannedProjects];
                    updated[index].PType = e.target.value;
                    setPlannedProjects(updated);
                  }}
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {Credits.notableCredits[0].type.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor={`PStatus-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">
                  *<span>Project Status</span>
                </span>
                <select
                  name={`PStatus-${index}`}
                  className="form-style h-12 w-[160px] bg-richblack-600 rounded-2xl"
                  {...register(`PlannedProjects[${index}].PStatus`, {
                    required: "Status is required",
                  })}
                  value={data.PStatus}
                  onChange={(e) => {
                    const updated = [...PlannedProjects];
                    updated[index].PStatus = e.target.value;
                    setPlannedProjects(updated);
                  }}
                >
                  <option value="" disabled>
                    Project Status
                  </option>
                  {Projects.Stages.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor={`PStart-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">*<span>Start Date</span></span>
                <input
                  type="month"
                  name={`PStart-${index}`}
                  className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                  {...register(`PlannedProjects[${index}].PStart`, {
                    required: "Date is required",
                  })}
                  value={data.PStart}
                  onChange={(e) => {
                    const updated = [...PlannedProjects];
                    updated[index].PStart = e.target.value;
                    setPlannedProjects(updated);
                  }}
                />
              </label>

              <label htmlFor={`PEnd-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">*<span>End Date</span></span>
                <input
                  type="month"
                  name={`PEnd-${index}`}
                  className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                  {...register(`PlannedProjects[${index}].PEnd`, {
                    required: "Date is required",
                  })}
                  value={data.PEnd}
                  onChange={(e) => {
                    const updated = [...PlannedProjects];
                    updated[index].PEnd = e.target.value;
                    setPlannedProjects(updated);
                  }}
                />
              </label>

              <label htmlFor={`PReles-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center">*<span>Released</span></span>
                <select
                  name={`PReles-${index}`}
                  id={`PReles-${index}`}
                  className="p-3 bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                  {...register(`PlannedProjects[${index}].PReles`, {
                    required: "Release is required",
                  })}
                  value={data.PReles}
                  onChange={(e) => {
                    const updated = [...PlannedProjects];
                    updated[index].PReles = e.target.value;
                    setPlannedProjects(updated);
                  }}
                >
                  <option value="" disabled>
                    Released
                  </option>
                  {Projects.Release.map((rel, idx) => (
                    <option key={idx}>{rel}</option>
                  ))}
                </select>
              </label>

              <div
                className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  if (PlannedProjects.length === 1) {
                    setPlannedError("You need to keep at least one field");
                  } else {
                    const updated = PlannedProjects.filter((_, i) => i !== index);
                    setPlannedProjects(updated);
                    setPlannedError("");
                  }
                }}
              >
                <RxCross1 className="text-richblack-100" />
              </div>
            </div>
          ))}

          {PlannedError && (
            <span className="text-red-500 text-sm flex justify-center items-center">
              {PlannedError}
            </span>
          )}

          <button
            type="button"
            className="px-4 py-1 bg-blue-600 text-white rounded Adding w-full"
            onClick={() => {
              if (PlannedProjects.length >= 4) {
                setPlannedError("You can create 4 fields only");
              } else {
                setPlannedProjects([
                  ...PlannedProjects,
                  { PName: "", PType: "", PStatus: "", PStart: "", PEnd: "", PReles: "" },
                ]);
                setPlannedError("");
              }
            }}
          >
            Add more
          </button>
        </div>
      )}
    {/* </div> */}
              
                <div className='dGsss flex flex-col gap-2'>
                <span className='flex justify-start items-center gap-2'>*<span>What Type of Genre Suits You</span></span>
     
<div
  className="relative group w-full h-full"
>
  <input
    type="button"
    className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
    value={showGenreDropdown?"Genre":"Select Genre"}
    onClick={() => setShowGenreDropdown((prev) => !prev)}
  />
  {showGenreDropdown && (
  <div className="absolute left-0 bg-richblack-800 -top-67 mt-2 p-2 rounded shadow w-full h-[255px] z-10">
    <div className='flex justify-around items-center gap-2 w-full h-full'>
      <div className='w-[80%] border-r-1 grid grid-cols-5 grid-rows-4 gap-2'>
        {Genre.genres.map((data, index) => (
          <div
            key={index}
            value={data.name}
           className={`text-md font-edu-sa w-fit Datass rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition px-4 py-2 cursor-pointer font-semibold
      ${Genres.includes(data.name) ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"}
    `}
  
onClick={() => {
  if (Genres.length >= 5) {
    setGenreError("You cannot select more than 5 genres");
    return;
  }
  setGenreError(""); // Clear error on valid selection
  if (!Genres.includes(data.name)) {
    setGenres([...Genres, data.name]);
  }
}}
          >
            {/* console.log(e.target.innerText) */}
            {data.name}
          </div>
        ))}
      </div>
    <div className=' h-full w-[18%] flex flex-col justify-between items-center py-2'>
  {/* Title at the top */}
  <div className="w-full flex justify-center items-center mb-2">
    <h2 className="font-bold text-lg">Genres</h2>
  </div>
  {/* Selected genres in the middle */}
  <div className="flex flex-col justify-center items-center flex-1 gap-1">
    {Genres.length === 0 ? (
      <div className="text-gray-400">Select Genre</div>
    ) : (
      Genres.map((data, index) => (
        <div key={index} className="bg-yellow-400 text-black text-md font-edu-sa w-full border rounded-md flex justify-around items-center gap-2">{data} <div  onClick={() => {
         const updatedGenres = Genres.filter((_, i) => i !== index);
  setGenres(updatedGenres);
  if (updatedGenres.length < 5) setGenreError("");
      }}
      className="cursor-pointer"><RxCross1/></div> </div>
      ))
    )}
  </div>
  {/* Error at the bottom */}
  <div className="w-full flex justify-center items-center mt-2">
    {genreError && (
      <div className="text-red-500 font-bold">{genreError}</div>
    )}
  </div>
</div>
    </div>
  </div>
)}
</div>
              </div>
                             <span className='dGsss flex justify-start items-center gap-2'>*<span>What Type of Sub Genre Suits You</span></span>
     
<div
  className="relative group w-full h-full "
>
  <input
    type="button"
    className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
    value={showsubGenreDropdown?"Sub Genre":"Select Sub Genre"}
    onClick={() => setShowsubGenreDropdown((prev) => !prev)}
  />
   {showsubGenreDropdown && (
              <div className="absolute left-0 -top-72 mt-2 bg-richblack-700 p-4 rounded-xl shadow-lg w-full min-h-[240px] z-10 border border-richblack-700">
                <div className="flex flex-col gap-2 w-full">
                  {Genres.length === 0 ? (
                    <div className="text-gray-400">Select a genre first</div>
                  ) : (
                    Genres.map((selectedGenre, idx) => {
                      const genreObj = Genre.genres.find(g => g.name === selectedGenre);
                      return (
                        <div key={idx} className="flex flex-wrap gap-3 w-full mb-2">
                          {genreObj.subgenres.map((sub, subIdx) => {
                            const subName = sub.name;
                            const isSelected = SubGenres.includes(subName);
                            return (
                              <div
                                key={subIdx}
                                className={`min-w-[140px] px-4 py-2 rounded-lg shadow-md font-semibold text-md cursor-pointer transition-all border border-richblack-700 flex items-center justify-between
                                  ${isSelected
                                    ? "bg-yellow-400 text-black font-bold"
                                    : "bg-richblack-600 text-white hover:bg-yellow-400 hover:text-black"}
                                `}
                                onClick={() => {
                                  if (!isSelected) {
                                    if (SubGenres.length >= 10) {
                                      setSubGenreError("You cannot select more than 10 sub genres");
                                      return;
                                    }
                                    setsubgenres([...SubGenres, subName]);
                                    setSubGenreError("");
                                  }
                                }}
                              >
                                <span>{subName}</span>
                                {isSelected && (
                                  <span
                                    className="ml-2 cursor-pointer hover:text-red-600"
                                    onClick={e => {
                                      e.stopPropagation();
                                      const updated = SubGenres.filter(sg => sg !== subName);
                                      setsubgenres(updated);
                                      if (updated.length < 10) setSubGenreError("");
                                    }}
                                  >
                                    <RxCross1 />
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })
                  )}
                  <div className="w-full flex justify-center items-center mt-2">
                    {SubGenreError && (
                      <div className="text-red-500 font-bold">{SubGenreError}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
</div>   
             </div>
          </div>
          {/* This one is thee ending div of the projects */}

          {/* Distrubation */}
          <div className='w-full Distrubations bg-richblack-800 rounded-md'>
             <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Distribution</p>
             <div className='w-full h-full'>
              
               <div className='flex justify-around items-center gap-2 w-full '>

                <div className='flex flex-col justify-around items-center gap-2 w-full relative'>
                   <span className='flex  items-center gap-1 font-inter text-md'>*<span>Preferred Screening Formats</span></span>
                    <input type="button" value={Screen?"Screen Formats":"Select Screen Formats"} className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition" onClick={()=>setscreens((prev)=>!prev)}/>
                    {/* onClick={() => setShowsubGenreDropdown((prev) => !prev)} */}
                    {Screen&&(<div className='w-full absolute -top-60  h-[200px] flex justify-center items-center'>
                      <div className='bg-richblack-600 grid  flex-col grid-cols-3 w-full h-full' >
                        {Projects.Screens.map((data,index)=>(
                               <div key={index} value={data}  className={`flex justify-center items-center gap-1 text-md font-edu-sa w-fit Datass rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition px-4 py-2 cursor-pointer font-semibold
      ${ScrenTypes.includes(data) ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"}
    `} 
onClick={() => {
  if (ScrenTypes.length >= 5) {
    SubscreenError("You cannot select more than 5 genres");
    return;
  }
  SubscreenError(""); // Clear error on valid selection
  if (!ScrenTypes.includes(data)) {
    setscreentypes([...ScrenTypes, data]);
  }
}}>{data}<span className={ScrenTypes.includes(data)?"flex":"hidden"}        onClick={e => {
                                      e.stopPropagation();
                                      const updated = ScrenTypes.filter(sg => sg !== data);
                                      setscreentypes(updated);
                                      if (updated.length < 2) SubscreenError("You need to select at least 2 Screen formats");
                                    }}><RxCross1/></span></div>
                        ))}
                           <div className="w-full flex justify-center items-center mt-2">
                    {ScreenError && (
                      <div className="text-red-500 font-bold">{ScreenError}</div>
                    )}

                  </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className='flex flex-col justify-around items-center gap-2 w-full relative'>
                    <span className="flex items-center gap-1 font-inter text-md">*<span>Target Audience Types</span></span>
                    <input type="button" value={Audience?"Target Audience":"Select Target Audience"} className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition" onClick={()=>setaudience((prev)=>!prev)}/>
                     {Audience&&(<div className='w-full absolute -top-60  h-[200px] flex justify-center items-center'>
                      <div className='bg-richblack-600 grid  flex-col grid-cols-3 w-full h-full' >
                        {Projects.targetAudience.map((data,index)=>(
                               <div key={index} value={data.label}  className={`flex justify-center items-center gap-1 text-md font-edu-sa w-fit Datass rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition px-4 py-2 cursor-pointer font-semibold
      ${AudienceTypes.includes(data) ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"}
    `} 
    // AudienceTypes,setaudiencetypes
onClick={() => {
  if (AudienceTypes.length >= 5) {
    setaudienceError("You cannot select more than 5 genres");
    return;
  }
  setaudienceError(""); // Clear error on valid selection
  if (!AudienceTypes.includes(data)) {
    setaudiencetypes([...AudienceTypes, data]);
  }
}}>{data.label}<span className={AudienceTypes.includes(data)?"flex":"hidden"}        onClick={e => {
                                      e.stopPropagation();
                                      const updated = AudienceTypes.filter(sg => sg !== data);
                                      setaudiencetypes(updated);
                                      if (updated.length < 2) setaudienceError("You need to select at least 2 Screen formats");
                                    }}><RxCross1/></span></div>
                        ))}
                           <div className="w-full flex justify-center items-center mt-2">
                    {AudienceError && (
                      <div className="text-red-500 font-bold">{AudienceError}</div>
                    )}

                  </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

               <div className='w-full  flex justify-around items-center dpp'>
                <div className='dGsss flex flex-col gap-2'>
                  <div className='flex justify-around items-center flex-col'>
                    <p className='Work'>Are There Any Projects Ready For Distrubation</p>
                    <div className='flex gap-2'>
                      <input type="checkbox" name="Work" id="" value="Yes" onChange={(e)=>setdistrubation(e.target.value)} checked={distrubation === "Yes"}/>
                      <label htmlFor="Work">Yes</label>
                      <input type="checkbox" name="Work" id="" value="No" onChange={(e)=>setdistrubation(e.target.value)} checked={distrubation === "No"}/>
                      <label htmlFor="Work">No</label>
                    </div>
                  </div>
                </div>

                <div className='dGsss flex flex-col gap-2'>
                  <div className='flex justify-around items-center flex-col'>
                  <span className='flex gap-2'>*<p className='Promo'>Would You like Us To Handle Your Promotions</p></span>
                    <div className='flex gap-2'>
                      <input type="checkbox" name="Promo" id="" value="Yes"  onChange={(e)=>setpromotions(e.target.value)} checked={Promotions === "Yes"}/>
                      <label htmlFor="Promo">Yes</label>
                      <input type="checkbox" name="Promo" id="" value="No"  onChange={(e)=>setpromotions(e.target.value)} checked={Promotions === "No"}/>
                      <label htmlFor="Promo">No</label>
                    </div>
                  </div>
                </div>
                </div>
             {/* [Notable,setnotable] */}
             {/* Distrubations,setdistrubations */}
             {/* projectname:"",Budget:"",ReleaseDate:"",Role:"" */}
             {/* Distrubations,setdistrubations */}
              {distrubation === "Yes" && Notable &&(
                <div className='flex Show gap-1 Distribute'>
                   <FaCaretDown
              className="text-2xl cursor-pointer fill-red-600"
              onClick={() => setnotable(false)}
            />
            <span>Show Projects</span>
                </div>
              )}

                   {distrubation === "Yes" && (
                    <div className={`${Notable ? "hidden" : "w-full Projectsss flex flex-col justify-around gap-2"}`}>
                      <div className="flex flex-row">
                                    <FaCaretDown className="text-2xl cursor-pointer"  onClick={()=>setnotable(true)}/>
                                    <span>Hide Projects</span>
                                  </div>

                      {Distrubations.map((data,index)=>(
                        <div className=' flex justify-evenly items-center gap-3' key={index}>
                          <span>{index+1}</span>
                          <label htmlFor={`Distrubations.${index}`} className='flex flex-col gap-2'>
                            <span className='flex gap-2'>*<span>Project Name</span></span>
                            <input type="text" placeholder='Enter the name of the Project' className='form-style h-9 w-[290px] bg-richblack-600 rounded-2xl form-style' 
                            {...register(`Distrubations.${index}.name`,{required:"Project name is required"})} value={data.projectname} onChange={
                              (e)=>{
                                const updated = [...Distrubations]
                                updated[index].projectname = e.target.value
                                setdistrubations(updated)
                              }}
                            />
                          </label>
                          <label htmlFor="Budgets" className='flex flex-col gap-2'>
                            <span>Total Budget</span>
                               <select name="" id="" className='p-3  bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'  {...register(`Budgets.${index}.budget`)} value={data.Budget} onChange={
                              (e)=>{
                                const updated = [...filmentries]
                                updated[index].Budget = e.target.value
                                setdistrubations(updated)
                              }}>
                  <option value="" disabled>Select Budget Range</option>
                  {Projects.Money.map((data,index)=>(
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                          </label>
                          <label htmlFor="Roles" className='flex flex-col gap-2'>
                            <span className='flex gap-2'>*<span>Your Role</span></span>
                             <select name="" id="" className='p-3  bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'  {...register(`Roles.${index}`,{required:"role is required"})} value={data.Role} onChange={
                              (e)=>{
                                const updated = [...filmentries]
                                updated[index].Role = e.target.value
                                setdistrubations(updated)
                              }}>
                  <option value="" disabled>Your Role</option>
                  {Projects.roles.map((data,index)=>(
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                          </label>
                     <label htmlFor={`Release_Date-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">*<span>Release Date</span></span>
                <input
                  type="month"
                  name={`Release_Date-${index}`}
                  className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                  {...register(`OngoingProjects[${index}].Release_Date`, {
                    required: "Date is required",
                  })}
                  value={data.Start_Date}
                  onChange={(e) => {
                    const updated = [...OngoingProjects];
                    updated[index].Start_Date = e.target.value;
                    setdistrubations(updated);
                  }}
                />
              </label>
                            <div
                                            className="flex justify-center items-center  rounded-full hover:bg-red-600"
              onClick={() => {
                    if (Distrubations.length === 1) {
                      setnotableerror("You need to keep at least one field ");
                    } else {
                      const updated = Distrubations.filter((_, i) => i !== index);
                      setdistrubations(updated);
                      setnotableerror("");
                    }
                  }}                             
                                          >
                                            <RxCross1 className='text-richblack-100'/>
                                          </div>
                        </div>
                      ))}
{/* Notableerror,setnotableerror */}
                        {Notableerror && (
              <span className="text-red-500 text-sm flex justify-center items-center">
                {Notableerror}
              </span>
            )}

                      <button
              type="button"
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded Adding b"
              onClick={()=>{
                if(Distrubations.length >= 4){
                  setnotableerror("You can create 4 fields only");
                }else{
                  setdistrubations([...Distrubations, { projectname:"",Budget:"",ReleaseDate:"",Role:""}]);
                  setnotableerror("");
                }
              }}
            >
              Add more
            </button>
                    </div>
                  )}
             </div>
          </div>

          {/* Support & Motivation */}
          <div className='w-full Supports bg-richblack-800 rounded-md'>
             <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Support & Motivation</p>
            <div className='w-full h-full flex flex-col gap-2'>
              {/* Support,setsupport */}
              <label htmlFor='Assist' className='w-full'>
 
                  <div className='dGsss flex flex-col gap-2'>
                  <div className='flex justify-around items-center flex-col'>
                    <p className='Work'>Would You Require Any Type of Support Or Assistance</p>
                    <div className='flex gap-2'>
                      <input type="checkbox" name="Work" id="" value="Yes" onChange={(e)=>setsupport(e.target.value)} checked={Support === "Yes"}/>
                      <label htmlFor="Work">Yes</label>
                      <input type="checkbox" name="Work" id="" value="No" onChange={(e)=>setsupport(e.target.value)} checked={Support === "No"}/>
                      <label htmlFor="Work">No</label>
                    </div>
                  </div>
                </div> 

                <div className={Support === "Yes"?"flex flex-col":"hidden"}>
                    <span>*<span>Can You tell What type of Support You Need</span></span>
                  <select name="" id="" className='p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'>
                    <option value="" disabled>Support Needed</option>
                    {Projects.supportNeeds.map((data,index)=>(
                      <option key={index} value={data.label}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
             <div>
                          <label htmlFor="Reason" className="block font-semibold mb-2 ">
  What is Your main Reason for Joining <span className="text-red-500">*</span>
</label>
<textarea
  id="Reason"
  name="Reason"
  placeholder="Write a short bio (max 250 characters)"
  maxLength={250}
  rows={4}
  className="w-full p-3 bg-richblack-600 text-white rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
/>
<p className="text-sm text-richblack-900 mt-1 flex justify-end relative bottom-7 right-2">Max 250 characters</p>

                        </div>

  {/* const[Certified,setcertified]=useState('No') */}
  {/* const[Experience,setexperience]=useState('No') */}
  {/* const[Collabration,setcollabration]=useState('No') */}

<div className='w-full  flex justify-around items-center Last_Field'>
  <div className='flex flex-col justify-around items-center'>
                    <span className='flex gap-1'>*<span>Do You Have any Certifications in this field</span></span>
                    <div className='flex gap-2'>
                      <input type="checkbox"  name='Education' value="Yes" onChange={(e)=>setcertified(e.target.value)} checked={Certified === "Yes"}/>
                      <label htmlFor="Education">Yes</label>
                      <input type="checkbox"  name='Education' value="No" onChange={(e)=>setcertified(e.target.value)} checked={Certified === "No"}/>
                      <label htmlFor="Education">No</label>
                    </div>
                    {/* if the user select yes then a link should appear like yes then a name image of starting an ending date */}
                </div>     

                  <div className='flex flex-col justify-around items-center'>
                    <span className='flex gap-1'>*<span>Do You Have Any Experience Collabration with Others</span></span>
                    <div className='flex gap-2'>
                      <input type="checkbox"  name='Education' value="Yes" onChange={(e)=>setexperience(e.target.value)} checked={Experience === "Yes"}/>
                      <label htmlFor="Education">Yes</label>
                      <input type="checkbox"  name='Education' value="No" onChange={(e)=>setexperience(e.target.value)} checked={Experience === "No"}/>
                      <label htmlFor="Education">No</label>
                    </div>
                  </div>

                  <div className='flex flex-col justify-around items-center'>
                    <span className='flex gap-1'>*<span>Are You Comfortable With Collabration</span></span>
                    <div className='flex gap-2'>
                      <input type="checkbox"  name='Education' value="Yes" onChange={(e)=>setcollabration(e.target.value)} checked={Collabration === "Yes"}/>
                      <label htmlFor="Education">Yes</label>
                      <input type="checkbox"  name='Education' value="No" onChange={(e)=>setcollabration(e.target.value)} checked={Collabration === "No"}/>
                      <label htmlFor="Education">No</label>
                    </div>
                  </div>
</div>


  {/* const [Cert,setcert] = useState(false)
  const [Certifications,setcertifications] = useState([{CertificateName:"",Certificatealink:"",CertDate:""}])
  const[CertError,setcerterror] = useState("") */}

  {Certified === "Yes" && Cert && (
        <div className="flex gap-1 One">
          <FaCaretDown
            className="text-2xl cursor-pointer fill-red-600"
            onClick={() => setcert(false)}
          />
          <span>Hide Media</span>
        </div>
      )}
{Certified === "Yes" && (
        <div className={`${Cert ? "hidden" : "w-full One flex flex-col justify-around gap-2"}`}>
          <div className="flex flex-row">
            <FaCaretDown
              className="text-2xl cursor-pointer"
              onClick={() => setcert(true)}
            />
            <span>Show Projects</span>
          </div>

          {Certifications.map((data, index) => (
            <div
              className="flex gap-4 p-3 border-b border-gray-700 w-full justify-around items-center"
              key={index}
            >
              <label htmlFor={`ProjectName-${index}`} className="flex flex-col gap-2">
                <span className="flex justify-start items-center gap-3">
                  *<span>Certificate Name</span>
                </span>
                <input
                  type="text"
                  name={`ProjectName-${index}`}
                  placeholder="Enter Your Certificate Name"
                  className="form-style h-9 w-[390px] bg-richblack-600 rounded-2xl px-3"
                  {...register(`OngoingProjects[${index}].ProjectName`, {
                    required: "Project name is required",
                  })}
                  value={data.CertificateName}
                  onChange={(e) => {
                    const updated = [...Certifications];
                    updated[index].CertificateName = e.target.value;
                    setcertifications(updated);
                  }}
                />
              </label>

              <label htmlFor={`ProjectFile-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">
                  *<span>Certificate</span>
                </span>
                <input
                  type="file"
                  name={`ProjectFile-${index}`}
                  accept=".pdf,.docx,.jpg,.jpeg,.png"
                  className="form-style bg-richblack-600 rounded-2xl p-2"
                  multiple
                  {...register(`OngoingProjects[${index}].ProjectFile`, {
                    required: "File upload is required",
                  })}
                  onChange={(e) => {
                    const updated = [...Certifications];
                    updated[index].Certificatealink = e.target.files[0];
                    setcertifications(updated);
                  }}
                />
              </label>

              <label htmlFor={`Start_Date-${index}`} className="flex flex-col gap-2">
                <span className="flex items-center gap-3">*<span>Certificate Completion Date</span></span>
                <input
                  type="month"
                  name={`Start_Date-${index}`}
                  className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                  {...register(`OngoingProjects[${index}].Start_Date`, {
                    required: "Date is required",
                  })}
                  value={data.CertDate}
                  onChange={(e) => {
                    const updated = [...Certifications];
                    updated[index].CertDate = e.target.value;
                    setcertifications(updated);
                  }}
                />
              </label>

              <div
                className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  if (Certifications.length === 1) {
                    setcerterror("You need to keep at least one field");
                  } else {
                    const updated = Certifications.filter((_, i) => i !== index);
                    setcertifications(updated);
                    setcerterror("");
                  }
                }}
              >
                <RxCross1 className="text-richblack-100" />
              </div>
            </div>
          ))}

          {CertError && (
            <span className="text-red-500 text-sm flex justify-center items-center">
              {CertError}
            </span>
          )}

          <button
            type="button"
            className="px-4 py-1 bg-blue-600 text-white rounded Adding w-full"
            onClick={() => {
              if (Certifications.length >= 4) {
                setcerterror("You can create 4 fields only");
              } else {
                setcertifications([
                  ...Certifications,
                  {CertificateName:"",Certificatealink:"",CertDate:""},
                ]);
                setcerterror("");
              }
            }}
          >
            Add more
          </button>
        </div>
      )}

            </div>
          </div>

          {/* Roles */}
          <div className='w-full Roles bg-richblack-800 rounded-md'>
            <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Role Specific Question</p>
            <div className='w-full'>
              <div className="flex">
                What Role Suits You
  <button className="px-4 py-2 bg-yellow-400 text-black rounded-l">Director</button>
  <button className="px-4 py-2 bg-gray-700 text-white rounded-r">Producer</button>
</div>
<div className="flex">
  Do You have Any Experience in This field
  <button className="px-4 py-2 bg-yellow-400 text-black rounded-l">Fresher</button>
  <button className="px-4 py-2 bg-gray-700 text-white rounded-r">Experienced</button>
</div>

{/* experienced Directors */}
<div>
  <p>Can you Name Some Of The Awards That you have received for your previous projects </p>
  <input type="checkbox" name="" id="" />
  <label htmlFor="">Yes</label>
  <input type="checkbox" name="" id="" />
  <label htmlFor="">NO</label>
  <div>
    <label htmlFor="">
      Award Categorey 
      <select name="" id="">
        <option value="" disabled>Categorey</option>
        {Projects.awardCategories.map((data,index)=>(
          <option key={index} value={data}>{data}</option>
        ))}
      </select>
    </label>
    <label htmlFor="">
      Name of Award/Festival
      <input type="text" placeholder='Enter The Award Name' />
    </label>
       <label htmlFor="">
        Movie/Web Series Name
      <input type="text" placeholder='Enter The Award Name' />
    </label>
    <label htmlFor="">
      Currencey  
      <select name="" id="">
        <option value="" disabled>Categorey</option>
        {Projects.currencies.map((data,index)=>(
          <option key={index} value={data.code}>{data.code} {data.symbol}</option>
        ))}
      </select>
      Total Budget
      <input type="text" placeholder='Enter Your Total Budget'/>
    </label>
    <label htmlFor="">
      Release Date
      <input type="date" name="" id="" />
    </label>
    <div>
      <label htmlFor="Description">Can You Describe A Short Description of the project</label>
      <textarea name="" id=""></textarea>
    </div>
  </div>
</div>

<div>
  <div>
      <p>Can you Name Some of the Software or Tools tha tyou have worked with</p>
  <input type="checkbox" name="" id="" />
  <label htmlFor="">Yes</label>
  <input type="checkbox" name="" id="" />
  <label htmlFor="">NO</label>
  </div>
  <div>
    <select name="" id="">
      <option value="">Tools Used</option>
      {Tools.categories.map((data,index)=>(
        <option key={index} value={data.category}>{data.category}</option>
      ))}
    </select>

    {/* abhe iske badk ek your kaam karna hain filtr lagea ke wo styling main hoga par to wo yaad rakhan a ui like medium */}
  </div>
</div>


<div>
  <label htmlFor="">
    What Can be Yout Typical Team Size For a Project
    <select name="" id="">
      <option value="" disabled>Team Size</option>
      {Projects.typicalTeamSizeRanges.map((data,index)=>(
        <option key={index} value={data}>{data}</option>
      ))}
      </select> 
  </label>
</div>

<div>
  <p>Notable Projects That you have done</p>
  <label htmlFor="">
    Project name
    <input type="text"  placeholder='Enter The Name of Your Project'/>
  </label>
  <label htmlFor="">
    Role
    <select name="" id="">
      <option value="">Role</option>
      {Credits.notableCredits.map((data,index)=>(
        <option key={index} value={data.role}>{data.role}</option>
      ))}
    </select>
  </label>
    <label htmlFor="">
    Type
    <select name="" id="">
      <option value="">Type</option>
      {Credits.notableCredits.map((data,index)=>(
        <option key={index} value={data.type}>{data.type}</option>
      ))}
    </select>
  </label>
    <label htmlFor="">
    Platform
    <select name="" id="">
      <option value="">Platform</option>
      {Credits.notableCredits.map((data,index)=>(
        <option key={index} value={data.platform}>{data.platform}</option>
      ))}
    </select>
  </label>
  <label htmlFor="">
    Release Date
    <input type="date" name="" id="" />
  </label>

  <label htmlFor="">
    Production House
    <select name="" id="">
      <option value="">Production House</option>
      {Credits.productionHouses.map((data,index)=>(
        <option key={index} value={data.category}>{data.category}</option>
      ))}
    </select>
  </label>
  <label htmlFor="">
    Linked Awards
    <select name="" id="">
      <option value="">Linked Awards</option>
      {Credits.notableCredits.map((data,index)=>(
        <option key={index} value={data.linkedAwards}>{data.linkedAwards}</option>
      ))}
    </select>
  </label>

  <label htmlFor="">
    Remarks 
    <input type="text" placeholder='Enter Remarks' />
  </label>
</div>



{/* experienced Producers */}
<div>
    <div>
        <label className="block font-semibold">Production Resume</label>
        <input 
          type="file" 
          accept="application/pdf" 
          {...register("supportingDocs")} 
          className="mt-2 block w-full text-sm text-gray-400"
        />
      </div>

      <div>
        <label htmlFor="">
          Can You Tell Us What are the various ways That you have Used to fund your Projects
          <select name="" id="">
            <option value="" disabled>Sources</option>
            {Profession.fundingSources.map((data,index)=>(
              <option key={index} value={data}>{data}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <p>Are you affiliated with any union, guild, or professional film association?</p>
        <input type="checkbox" name="" id="" value="Yes"/>
        <label htmlFor="">Yes</label>
        <input type="checkbox" name="" id="" value="No"/>
        <label htmlFor="">No</label>
        <div>
          <label htmlFor="">
            Select Guild/Union
            <select name="" id="">
              <option value="" disabled>Select Guild/Union</option>
              {Profession.unionsGuildsAffiliations.map((data,index)=>(
                <option key={index} value={data}>{data}</option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            Membership ID
            <input type="text" placeholder='Enter Your Membership id' />
          </label>
          <label htmlFor="">
            Year Joined
            <input type="date" name="" id="" />
          </label>
          <label htmlFor="">
            Expiry Date
            <input type="date" name="" id="" />
          </label>
        </div>
      </div>
      
<div>
  <label htmlFor="">
    What Can be Yout Typical Team Size For a Project
    <select name="" id="">
      <option value="" disabled>Team Size</option>
      {Projects.typicalTeamSizeRanges.map((data,index)=>(
        <option key={index} value={data}>{data}</option>
      ))}
      </select> 
  </label>
</div>



<div>
  <label htmlFor="">
    Number of Projects you have completed Till now
    <select name="" id="">
      <option value="" disabled>Project</option>
      {Projects.ProjectNumber.map((data,index)=>(
        <option key={index} value={data}>{data}</option>
      ))}
      </select> 
  </label>
</div>


<label htmlFor="">How Do you handle Risk While Working on a Project with Example</label>
<textarea name="" id="" rows="4" cols="70"></textarea>
</div>

{/* Fresher Directors */}
<div>
  <label htmlFor="">Inspiration
    <input type="text" />
  </label>
  
<div>
  <label htmlFor="">
    Projects done till now
    <select name="" id="">
      <option value="" disabled>Team Size</option>
      {Projects.typicalTeamSizeRanges.map((data,index)=>(
        <option key={index} value={data}>{data}</option>
      ))}
      </select> 
  </label>
</div>

  <label htmlFor="">
    What were the challenges that you have faced in your early days
    <input type="text" />
  </label>
  
  <label htmlFor="">
    Suppose a scenarios like you have tkane a project in hand so how do you start the planning of that project
    <input type="text" />
  </label>
  
  <label htmlFor="">
    What are the Variouys ways you promote your project what are the various sources 
    <input type="text" />
  </label>

  
  <label htmlFor="">
    Before Recording a scene how do you visualise a scene that is going to happen 
    <input type="text" />
  </label>
</div>


{/* Fresher Producers */}
<div>
  <label htmlFor="">Inspiration
    <input type="text" />
  </label>
  
<div>
  <label htmlFor="">
    Projects done till now
    <select name="" id="">
      <option value="" disabled>Team Size</option>
      {Projects.typicalTeamSizeRanges.map((data,index)=>(
        <option key={index} value={data}>{data}</option>
      ))}
      </select> 
  </label>
</div>

  <label htmlFor="">
    How do you plan a budget for a film 
    <input type="text" />
  </label>

  <div>
    <p>Do you have any intership or crowd funding experience</p>
    <input type="checkbox" name="" id="" value="Yes"/>
    <label htmlFor="">Yes</label>
    <input type="checkbox" name="" id="" value="No"/>
    <label htmlFor="">No</label>
  </div>

  <label htmlFor="">
    How do you plan to network with other people of the industry
    <input type="text" placeholder='Networking Plans' />
  </label>
<label htmlFor="">
    How do you handle Funding Delays
    <input type="text" placeholder='Funding Delays' />
  </label>

</div>

            </div>
            
          </div>
            {/* THis is the end div */}

            <div className='w-full Policy bg-richblack-800 rounded-md'>
            <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Policy Agreement</p>
            <div className='w-full'>
              <div>
                <label htmlFor="">Privacy&Policy</label>
                <input type="checkbox" name="" id="" />
              </div>
              <div>
                <label htmlFor="">I Agree To Follow all the terms ans conditions of the companey and the given data that i have filled is correct i do tkate the responsbilites if the data is not teue the admin can block my account</label>
                <input type="checkbox" name="" id="" />
              </div>

            </div>

            </div>

            <button className='bg-yellow-100'> Submit</button>
        </form>
      </div>
    </div>
  );
};

export default OrganizerVerificationForm;



// Country code ke leya star mata use karna use it only for the mobile number


// Project name role type platform releasedate productionhouse   lnkedawards remarks



   {/* <select name="" id="" className='p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'>
                  <option value="" disabled>Select Sub Genre</option>
                  {Genre.genres.map((data,index)=>(
                    <option key={index} value={data.name}>
                      {data.name}
                    </option>
                  ))}
                </select> */}

                // This one is for the subn genre that is presnt in the projects




                {/* <select name="" id="" className='p-3 w-[450px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition'>
                  <option value="" disabled>Select Genre</option>
                  {Genre.genres.map((data,index)=>(
                    // <option key={index} value={data.name}>
                    //   {data.name}
                    // </option>
                    <div className="relative top-10" key={index} value={data.name}>
                      {data.name}
                    </div>
                  ))}
                </select> */}


                // This one is fo r the genre from the projects