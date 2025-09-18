import React, { useState, useRef,useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import AllCountries from '../../data/AllCountries.json';
import Countries from '../../data/CountryCode.json';
import Projects from '../../data/Projects.json';
import Genre from '../../data/Genre.json';
import Tools from '../../data/Tools.json';
import Credits from '../../data/Credits.json';
import Profession from '../../data/Professsion.json';
import { FaCaretDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaLinkedin, FaYoutube, FaInstagram, FaImdb } from "react-icons/fa";
import Soc from '../../data/Social.json';
import { FaXTwitter } from "react-icons/fa6";
import Logout from '../extra/Logout';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';

const OrganizerVerificationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    defaultValues: {
      distributions: "No",
      promotions: "No",
      Work: "No",
      mediaChoice: "No",
      Ongoing: "No",
      Planned: "No",
      AssistanceRequired: "No",
      Certified: "No",
      Experience: "No",
      Collaboration: "No"
    }
  });

  const iconMap = {
    FaLinkedin: FaLinkedin,
    FaYoutube: FaYoutube,
    FaInstagram: FaInstagram,
    FaImdb: FaImdb,
    FaXTwitter: FaXTwitter,
  };

  const navigate = useNavigate()


  const Proceed = async()=>{
    Swal.fire({
      title:"Success !",
      text:"Your Data is Been Submitted",
      icon:"success",
      showConfirmButton: false,
      timer: 4000
    })

    setTimeout(()=>{
      navigate("/Dashboard/My-Profile")
    },3000)

  }
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [open, setOpen] = useState(true);
  const [add, setAdd] = useState(true);
  const [work, setWork] = useState('No');
  const [media, setMedia] = useState('No');
  const [socialError, setSocialError] = useState("");

  const [projects, setProjects] = useState(false);
  const [social, setSocial] = useState(false);
  const [filmError, setFilmError] = useState("");
  const [upload, setUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [ongoing, setOngoing] = useState("No");
  const [planned, setPlanned] = useState("No");
  const [on, setOn] = useState(false);
  const [pp, setPp] = useState(false);
  const [ongoingError, setOngoingError] = useState("");
  const [plannedError, setPlannedError] = useState("");
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showSubGenreDropdown, setShowSubGenreDropdown] = useState(false);
  const [genres, setGenres] = useState([]);
  const [subGenres, setSubGenres] = useState([]);
  const [genreError, setGenreError] = useState("");
  const [subGenreError, setSubGenreError] = useState("");
  const [distribution, setDistribution] = useState("No");
  const [screen, setScreen] = useState(false);
  const [audience, setAudience] = useState(false);
  const [screenTypes, setScreenTypes] = useState([]);
  const [audienceTypes, setAudienceTypes] = useState([]);
  const [audienceError, setAudienceError] = useState('');
  const [screenError, setScreenError] = useState('');
  const [promotions, setPromotions] = useState("No");
  const [notable, setNotable] = useState(false);
  const [notableError, setNotableError] = useState("");
  const [support, setSupport] = useState('No');
  const [certified, setCertified] = useState('No');
  const [experience, setExperience] = useState('No');
  const [collabration, setCollabration] = useState('No');
  const [cert, setCert] = useState(false);
  const [certError, setCertError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [experiences, setExperiences] = useState("");
  const [roleError, setRoleError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [affiliationError, setAffiliationError] = useState("");
  const [internship, setInternship] = useState("No");
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
const [confirmationModal, setConfirmationModal] = useState(null);
const [openIntern, setOpenIntern] = useState(false);
const [internError, setInternError] = useState("");
  const [Awards, setAwards] = useState("Yes");
  const [awardError, setAwardError] = useState("");
const [hasAwards, setHasAwards] = useState("No");  
const [awardSectionOpen, setAwardSectionOpen] = useState(false);
 const [toolError, setToolError] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
 const [softwareError, setSoftwareError] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [Soft,setSoft] = useState("No")
  const [funding,setfunding] = useState(false)
  const [finance,setfinance] = useState([])
  const[financeError,setfinanceError] = useState("")
const [Funding,setFunding] = useState("No")

const [fields,setFields] = useState({
  bio:"",
  JoiningReason:"",
  // Director Freshser 
  DirectorInspiration:"",
  EarlyChallengs:"",
  ProjectPlanning:"",
  ProjectPromotion:"",
  SceneVisualize:"",
  // Director Experience
  ProjectDescription:"",
  // Producer Fresher
  Inspiration:"",
  BudgetHandling:"",
  Networking:"",
  FundDelays:"",
  // Producer Experience 
  RiskManagement:""
})
// console.log(fields)
console.log(finance)
  const { fields: filmEntries, append: appendFilm, remove: removeFilm } = useFieldArray({ control, name: "filmentries" });
  const { fields: socials, append: appendSocial, remove: removeSocial } = useFieldArray({ control, name: "socials" });
  const { fields: ongoingProjects, append: appendOngoing, remove: removeOngoing } = useFieldArray({ control, name: "ongoingProjects" });
  const { fields: plannedProjects, append: appendPlanned, remove: removePlanned } = useFieldArray({ control, name: "plannedProjects" });
  const { fields: distributionsEntries, append: appendDistribution, remove: removeDistribution } = useFieldArray({ control, name: "distributionsEntries" });
  const { fields: certifications, append: appendCert, remove: removeCert } = useFieldArray({ control, name: "certifications" });
const { fields: internships, append: appendIntern, remove: removeIntern } = useFieldArray({ control, name: "internships" });
const { fields: awards, append: appendAward, remove: removeAward } = useFieldArray({ control, name: "awards"});
const { fields: Tooles, append: appendtools, remove: removetools } = useFieldArray({ control, name: "tools"});

// console.log(Tooles)

useEffect(() => {
  if (Awards === "Yes" && awards.length === 0) {
    appendAward({
      awardCategory: "",
      awardName: "",
      projectName: "",
      releaseDate: "",
      currency: "",
      totalBudget: "",
      totalIncome: "",
    });
  }

  if (Awards === "No" && awards.length > 0) {
    awards.forEach((_, i) => removeAward(i));
  }
}, [Awards, awards, appendAward, removeAward]);

  useEffect(() => {
  if (work === "Yes" && filmEntries.length === 0) {
    appendFilm({ name: '', url: '', role: '', budget: '' });
  }
}, [work, filmEntries, appendFilm]);

useEffect(() => {
  if (media === "Yes" && socials.length === 0) {
    // pick the first platform as default
    appendSocial({ MediaName: Soc[0].name, Followers: '', link: '' });
  }

  if (media === "No" && socials.length > 0) {
    // clear socials when user selects No
    socials.forEach((_, i) => removeSocial(i));
  }
}, [media, socials, appendSocial, removeSocial]);

useEffect(() => {
  if (ongoing === "Yes" && ongoingProjects.length === 0) {
    appendOngoing({
      ProName: "",
      ProFile: "",
      Start_Date: "",
      Start_End: "",
      Release: ""
    });
  }

  if (ongoing === "No" && ongoingProjects.length > 0) {
    ongoingProjects.forEach((_, i) => removeOngoing(i));
  }
}, [ongoing, ongoingProjects, appendOngoing, removeOngoing]);


useEffect(() => {
  if (planned === "Yes" && plannedProjects.length === 0) {
    appendPlanned({
      PName: "",
      PType: "",
      PStatus: "",
      PStart: "",
      PEnd: "",
      PReles: ""
    });
  }

  if (planned === "No" && plannedProjects.length > 0) {
    plannedProjects.forEach((_, i) => removePlanned(i));
  }
}, [planned, plannedProjects, appendPlanned, removePlanned]);

useEffect(() => {
  if (distribution === "Yes" && distributionsEntries.length === 0) {
    appendDistribution({
      projectname: "",
      Budget: "",
      Role: "",
      ReleaseDate: ""
    });
  }

  if (distribution === "No" && distributionsEntries.length > 0) {
    distributionsEntries.forEach((_, i) => removeDistribution(i));
  }
}, [distribution, distributionsEntries, appendDistribution, removeDistribution]);


useEffect(() => {
  if (certified === "Yes" && certifications.length === 0) {
    appendCert({
      CertificateName: "",
      Certificatealink: "",
      CertDate: ""
    });
  }

  if (certified === "No" && certifications.length > 0) {
    certifications.forEach((_, i) => removeCert(i));
  }
}, [certified, certifications, appendCert, removeCert]);

useEffect(() => {
  if (internship === "Yes" && internships.length === 0) {
    appendIntern({
      InternshipName: "",
      InternshipDocs: [],
      InternshipStartDate: "",
      InternshipCompletionDate: ""
    });
  }

  if (internship === "No" && internships.length > 0) {
    internships.forEach((_, i) => removeIntern(i));
  }
}, [internship, internships, appendIntern, removeIntern]);



const filmEntriesValue = watch("filmentries");
const socialsValue = watch("socials");
const ongoingValue = watch("ongoingProjects");
const plannedValue = watch("plannedProjects");
const distributionsValue = watch("distributionsEntries");
const certifiedValue = watch("Certified");

// Film Entries
useEffect(() => {
  if (filmEntriesValue === "No") {
    setValue("filmentries", undefined); // remove key from form
    while (filmEntries.length > 0) removeFilm(0);
  }
}, [filmEntriesValue, filmEntries.length, removeFilm, setValue]);

// Socials
useEffect(() => {
  if (socialsValue === "No") {
    setValue("socials", undefined);
    while (socials.length > 0) removeSocial(0);
  }
}, [socialsValue, socials.length, removeSocial, setValue]);

// Ongoing Projects
useEffect(() => {
  if (ongoingValue === "No") {
    setValue("ongoingProjects", undefined);
    while (ongoingProjects.length > 0) removeOngoing(0);
  }
}, [ongoingValue, ongoingProjects.length, removeOngoing, setValue]);

// Planned Projects
useEffect(() => {
  if (plannedValue === "No") {
    setValue("plannedProjects", undefined);
    while (plannedProjects.length > 0) removePlanned(0);
  }
}, [plannedValue, plannedProjects.length, removePlanned, setValue]);

// Distributions
useEffect(() => {
  if (distributionsValue === "No") {
    setValue("distributionsEntries", undefined);
    while (distributionsEntries.length > 0) removeDistribution(0);
  }
}, [distributionsValue, distributionsEntries.length, removeDistribution, setValue]);

// Certifications (already shown before)
useEffect(() => {
  if (certifiedValue === "No") {
    setValue("certifications", undefined);
    while (certifications.length > 0) removeCert(0);
  }
}, [certifiedValue, certifications.length, removeCert, setValue]);

  const onSubmit = async (data) => {
     await setConfirmationModal({
               text1: 'Are you sure?',
                            text2: "I take full responsibility for my data. If the data is false, my account may be suspended.",
                            btn1Text: 'Proceed',
                            btn2Text: 'Review my Details',
                            btn1Handler: () => Proceed(),
                            btn2Handler: () => setConfirmationModal(null),
            })
    console.log("Form submitted", data);
    console.log("Form errors", errors);
    setSubmittedData(data);
    setIsSubmitted(true);
    try {
      // Future API call here
    } catch (error) {
      console.log(error.message);
    }
  };

  
 const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleChange = (e) => {
    let {name,value} = e.target;
    let words = countWords(value);
    if (words > 250) {
       toast.error(`${name} cannot exceed 250 words`);
      return;
    }
   setFields((prev) => ({ ...prev, [name]: value }));
  };



  return (
    <div className="flex justify-center h-fit w-full min-h-screen bg-richblack-900 overflow-y-scroll overflow-x-hidden">
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
                    {...register("First", { required: "First Name is required" })}
                  />
                  {errors.First && <span className="text-red-500">{errors.First.message}</span>}
                </label>
                <label htmlFor="Last" className="flex flex-col gap-2 w-1/2">
                  <span className="flex flex-row items-center gap-2">*<span>Last Name</span></span>
                  <input
                    type="text"
                    placeholder="Enter Your Last name"
                    className="p-3 rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition"
                    {...register("Last", { required: "Last Name is required" })}
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
                    {...register("Email", { required: "Email is required" })}
                  />
                  {errors.Email && <span className="text-red-500">{errors.Email.message}</span>}
                </label>
                <div className="flex w-1/2 gap-2 min-h-[100px]">
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
                        value={mobileNumber}
                        maxLength={10}
                        {...register("MobileNumber", {
                          required: "*Mobile Number is required",
                          minLength: {
                            value: 10,
                            message: "*Mobile number must be exactly 10 digits"
                          },
                          maxLength: {
                            value: 10,
                            message: "*Mobile number must be exactly 10 digits"
                          },
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "*Please enter a valid 10-digit mobile number"
                          }
                        })}
                        onChange={(e) => {
                          setMobileNumber(e.target.value);
                          if (open) {
                            setWhatsAppNumber(e.target.value);
                            setValue('WhatsAppNumber', e.target.value);
                          }
                        }}
                      />
                      {errors.MobileNumber && <span className="text-red-500">{errors.MobileNumber.message}</span>}
                    </label>
                    <label
                      htmlFor="WhatsAppNumber"
                      className={`flex flex-col gap-2 Whatsappp ${open ? "hidden" : "block"}`}
                    >
                      <span className="flex flex-row items-center gap-2">*<span>WhatsApp Number</span></span>
                      <input
                        type="tel"
                        name="WhatsAppNumber"
                        id="WhatsAppNumber"
                        placeholder="Enter Your WhatsApp Number"
                        className="p-3 w-[373px] bg-richblack-600  h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                        value={whatsAppNumber}
                        maxLength={10}
                        {...register("WhatsAppNumber", {
                          required: open ? false : "*WhatsApp Number is required",
                          minLength: {
                            value: 10,
                            message: "*WhatsApp number must be exactly 10 digits"
                          },
                          maxLength: {
                            value: 10,
                            message: "*WhatsApp number must be exactly 10 digits"
                          },
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "*Please enter a valid 10-digit WhatsApp number"
                          }
                        })}
                        onChange={(e) => {
                          setWhatsAppNumber(e.target.value);
                          if (open) {
                            setMobileNumber(e.target.value);
                            setValue('MobileNumber', e.target.value);
                          }
                        }}
                        disabled={open}
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
                  {...register("SameOnWhatsApp")}
                  onChange={(e) => {
                    setOpen(e.target.checked);
                    setValue("SameOnWhatsApp", e.target.checked);
                    if (e.target.checked) {
                      setWhatsAppNumber(mobileNumber);
                      setValue("WhatsAppNumber", mobileNumber);
                    } else {
                      setWhatsAppNumber("");
                      setValue("WhatsAppNumber", "");
                    }
                  }}
                  className="mr-2"
                />
                <label htmlFor="SameOnWhatsApp">Same on WhatsApp</label>
              </div>
              <div className="flex w-full gap-5 Location flex-row">
                <div className='w-[70%] flex flex-row justify-start gap-60'>
                  <div className="w-32 flex flex-col gap-3">
                    <label className="block mb-2 font-semibold" htmlFor="CountryName">
                      <span className='flex justify-center items-center gap-3'>*<span>Country Name</span></span> 
                    </label>
                    <select
                      {...register("CountryName", { required: "Country Name is required" })}
                      name="CountryName"
                      className={`p-3 w-[250px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.CountryName ? "border-red-500" : ""}`}
                      value={countryName}
                      onChange={(e) => {
                        setCountryName(e.target.value);
                        setStateName("");
                        setValue('CountryName', e.target.value);
                      }}
                    >
                      <option value="" disabled>Select Your Country Name</option>
                      {AllCountries.data.map((data, i) => (
                        <option key={i} value={data.name}>
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
                      name="StateName"
                      className={`p-3 w-[300px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.StateName ? "border-red-500" : ""}`}
                      value={stateName}
                      onChange={(e) => {
                        setStateName(e.target.value);
                        setValue('StateName', e.target.value);
                      }}
                      disabled={!countryName}
                    >
                      <option value="" disabled>Select Your State Name</option>
                      {AllCountries.data
                        .filter((country) => country.name === countryName)
                        .map((country) =>
                          country.states.map((state, index) => (
                            <option key={index} value={state.name}>
                              {state.name}
                            </option>
                          ))
                        )}
                    </select>
                    {errors.StateName && <span className="text-red-500">{errors.StateName.message}</span>}
                  </div>
                </div>
                <div className="w-32 flex flex-col gap-3">
                  <label className="flex flex-col gap-3 mb-2 font-semibold" htmlFor="CityName">
                    <span className='flex justify-center items-center gap-2'>*<span>City Name</span></span>
                    <input type="text" name='CityName' placeholder='Enter The City Name' className='p-3 w-[280px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition' {...register("CityName", { required: "City Name is required" })} />
                    {errors.CityName && <span className="text-red-500">{errors.CityName.message}</span>}
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
                  checked={add}
                  onChange={(e) => {
                    setAdd(e.target.checked);
                    setValue('SameAddress', e.target.checked);
                    if (e.target.checked) {
                      setPermanentAddress(localAddress);
                      setValue('PermanentAddress', localAddress);
                    }
                  }}
                />
                <label htmlFor="SameAddress">Same Address for local and permanent</label>
                <label htmlFor="LocalAddress" className="flex flex-col gap-2">
                  <span className='flex items-center gap-1'>*<span>Local Address</span> {errors.LocalAddress && <span className="text-red-500">{errors.LocalAddress.message}</span>}</span>
                  <input
                    type="text"
                    placeholder="Enter Your local Address"
                    className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={localAddress}
                    {...register("LocalAddress", { required: "Local Address is Required" })}
                    onChange={(e) => {
                      setLocalAddress(e.target.value);
                      if (add) {
                        setPermanentAddress(e.target.value);
                        setValue('PermanentAddress', e.target.value);
                      }
                    }}
                  />
                </label>
                <label htmlFor="PermanentAddress" className="flex flex-col gap-2 Perm">
                  <span className='flex items-center gap-1'>*<span>Permanent Address</span>{errors.PermanentAddress && <span className="text-red-500">{errors.PermanentAddress.message}</span>}</span>
                  <input
                    type="text"
                    placeholder="Enter Your permanent Address"
                    className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={permanentAddress}
                    {...register("PermanentAddress", { required: "Permanent Address is required" })}
                    onChange={(e) => {
                      setPermanentAddress(e.target.value);
                      if (add) {
                        setLocalAddress(e.target.value);
                        setValue('LocalAddress', e.target.value);
                      }
                    }}
                    disabled={add}
                  />
                </label>
              </div>
              <div className='w-full flex justify-evenly items-center gap-5 Genderrres'>
                <label htmlFor="Gender" className="flex flex-col gap-2">
                  <span className='flex justify-center items-center gap-2'>*<span>Choose Your Gender</span></span>
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
                        {...register("Gender", { required: "Gender is required" })}
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
                        {...register("Gender", { required: "Gender is required" })}
                        className="mr-2"
                      />
                      <label htmlFor="None">Rather Not To Disclose</label>
                    </div>
                    {errors.Gender && <span className="text-red-500">{errors.Gender.message}</span>}
                  </div>
                </label>
                <div>
                  <label htmlFor="posterImage" className="flex flex-col gap-2">
                    <span className='flex items-center gap-2'>*<span>Upload Image</span></span>
                    <input
                      type="file"
                      id="posterImage"
                      accept="image/*"
                      {...register("posterImage", {
                        required: "Image is required",
                       validate: {
      fileType: (files) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        return (
          (files && files[0] && allowedTypes.includes(files[0].type))
        );
      },
     fileSize: (files) => {
  if (files && files[0]) {
    if (files[0].size <= 5 * 1024 * 1024) {
      return true; 
    } else {
      setSelectedFile("");
      setUpload(false);
      return "File size must be less than 5MB";
    }
  }
},
    },
                      })}
                      className="form-style iMGAEESS w-full text-sm text-gray-400 bg-richblack-600 h-5 flex justify-center items-center rounded-md"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setSelectedFile(file);
                        setUpload(!!file);
                        setValue("posterImage", file || null, { shouldValidate: true });
                      }}
                      ref={fileInputRef}
                    />
                    {errors.posterImage && (
                      <span className="text-red-500 text-sm">{errors.posterImage.message}</span>
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
                        setValue("posterImage", null, { shouldValidate: true });
                        if (fileInputRef.current) {
                          fileInputRef.current.value = null;
                        }
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
                <div className='w-full flex justify-evenly items-center gap-2'>
                  <label htmlFor="Portfolio" className='flex flex-col gap-3'>
                    <span className='flex items-center gap-2'><span>Website / Portfolio Link</span> {errors.Portfolio && <span className="text-red-500">{errors.Portfolio.message}</span>}</span>
                    <input type="url" name="Portfolio" id="Portfolio" placeholder='Enter Your Link Here' className='form-style w-[390px]' {...register("Portfolio", {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Enter a valid URL",
                      },
                    })} />
                  </label>
                  <div className="w-48 flex flex-col gap-3">
                    <label className="flex flex-col mb-2 font-semibold" htmlFor="TotalProjects">
                      {errors.TotalProjects && <span className="text-red-500">{errors.TotalProjects.message}</span>}
                      <span>*<span>Total Completed Projects</span></span>
                    </label>
                    <select
                      {...register("TotalProjects", { required: "Projects are required" })}
                      className={`p-3 w-[240px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.TotalProjects ? "border-red-500" : ""}`}
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
                    <label className="flex flex-col mb-2 font-semibold" htmlFor="YearExperience">
                      {errors.YearExperience && <span className="text-red-500">{errors.YearExperience.message}</span>}
                      <span>*<span>Years of Experience</span></span>
                    </label>
                    <select
                      {...register("YearExperience", { required: "Experience is required" })}
                      className={`p-3 w-[240px] bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.YearExperience ? "border-red-500" : ""}`}
                      defaultValue=""
                    >
                      <option value="" disabled>Experience</option>
                      {Projects.years.map((data, i) => (
                        <option key={i} value={data}>
                          {data}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='BIO'>
                  <div>
                    <label htmlFor="bio" className="font-semibold OIB">
                      <span className='flex items-center gap-2'>*<span>Short Bio About Yourself</span> {errors.bio && <span className="text-red-500">{errors.bio.message}</span>}</span>
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      placeholder="Write a short bio (max 250 characters)"
                      maxLength={250}
                      rows={4}
                      value={fields.bio}
                      className="w-full p-3 bg-richblack-600 text-white rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                      {...register("bio", { required: "Bio is Required" })}
                      onChange={handleChange}
                    />
                     <p className="text-sm text-gray-400 mt-1 flex justify-end">
        {countWords(fields.bio)} / Max 250 words
      </p>
                  </div>
                </div>
                <div className='Working flex justify-around items-start w-full'>
                  {/* Work Section */}
                  <div className='w-1/2 flex flex-col gap-3 justify-center items-center'>
                    <span className="flex items-center gap-2">
                      * <p className='Work font-bold'>Have you Worked on any Notable Projects</p>
                    </span>
                    <div className='flex gap-3'>
                      <label>
                        <input
                          type="radio"
                          name="Work"
                          value="Yes"
                          checked={work === "Yes"}
                          onChange={() => {
                            setWork("Yes");
                            setValue("Work", "Yes");
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Work"
                          value="No"
                          checked={work === "No"}
                          onChange={() => {
                            setWork("No");
                            setValue("Work", "No");
                          }}
                        />
                        No
                      </label>
                    </div>
                    <input type="hidden" {...register("Work")} value={work} />
                  </div>
                  {/* Media Section */}
                  <div className='w-1/2 flex flex-col gap-3 justify-center items-center'>
                    <span className="flex items-center gap-2">
                      * <p className='Work font-bold'>Would You Like to Share Your Social Media</p>
                    </span>
                    <div className='flex gap-3'>
                      <label>
                        <input
                          type="radio"
                          name="mediaChoice"
                          value="Yes"
                          checked={media === "Yes"}
                          onChange={() => {
                            setMedia("Yes");
                            setValue("mediaChoice", "Yes");
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="mediaChoice"
                          value="No"
                          checked={media === "No"}
                          onChange={() => {
                            setMedia("No");
                            setValue("mediaChoice", "No");
                          }}
                        />
                        No
                      </label>
                    </div>
                    <input type="hidden" {...register("mediaChoice")} value={media} />
                  </div>
                </div>

                {work === "Yes" && projects && (
                  <div className='flex Show gap-1 Projectsss'>
                    <FaCaretDown
                      className="text-2xl cursor-pointer fill-red-600"
                      onClick={() => setProjects(false)}
                    />
                    <span>Show Projects</span>
                  </div>
                )}

                {work === "Yes" && (
                  <div className={`${projects ? "hidden" : "w-full Projectsss flex flex-col justify-around gap-2"}`}>
                    <div className="flex flex-row">
                      <FaCaretDown className="text-2xl cursor-pointer" onClick={() => setProjects(true)} />
                      <span>Hide Projects</span>
                    </div>
                    {filmEntries.map((field, index) => (
                      <div className='flex justify-evenly items-center gap-3' key={field.id}>
                        <span>{index + 1}</span>
                        <label className='flex flex-col gap-2'>
                          <span className='flex gap-2'>
                            *<span>Project Name</span>
                            {errors.filmentries?.[index]?.name && (
                              <span className="text-red-500 text-sm">{errors.filmentries[index].name.message}</span>
                            )}
                          </span>
                          <input
                            type="text"
                            placeholder="Enter the name of the Project"
                            className="form-style h-9 w-[290px] bg-richblack-600 rounded-2xl"
                            {...register(`filmentries.${index}.name`, {
                              required: work === "Yes" ? "Project name is required" : false,
                            })}
                          />
                        </label>
                        <label className='flex flex-col gap-2'>
                          <span>Total Budget</span>
                            {errors.filmentries?.[index]?.budget && (
                              <span className="text-red-500 text-sm">{errors.filmentries[index].budget.message}</span>
                            )}
                          <select
                            className='p-3 bg-richblack-600 h-11 form-style rounded-lg'
                            {...register(`filmentries.${index}.budget`)}
                          >
                            <option value="" disabled>Select Budget Range</option>
                            {Projects.Money.map((money, i) => (
                              <option key={i} value={money}>
                                {money}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className='flex flex-col gap-2'>
                          <span className='flex gap-2'>
                            *<span>Your Role</span>
                            {errors.filmentries?.[index]?.role && (
                              <span className="text-red-500 text-sm">{errors.filmentries[index].role.message}</span>
                            )}
                          </span>
                          <select
                            className='p-3 bg-richblack-600 h-11 form-style rounded-lg'
                            {...register(`filmentries.${index}.role`, { required: "Role is required" })}
                          >
                            <option value="" disabled>Role</option>
                            {Projects.roles.map((role, i) => (
                              <option key={i} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className='flex flex-col gap-2'>
                          <span>
                            *<span>Url</span>
                            {errors.filmentries?.[index]?.url && (
                              <span className="text-red-500 text-sm">{errors.filmentries[index].url.message}</span>
                            )}
                          </span>
                          <input
                            type="url"
                            placeholder='Enter Your Url'
                            className='form-style h-9 w-[290px] bg-richblack-600 rounded-2xl'
                            {...register(`filmentries.${index}.url`, {
                              required: "Film URL is required",
                              pattern: {
                                value: /^https?:\/\/.+/,
                                message: "Enter a valid URL",
                              },
                            })}
                          />
                        </label>
                        <div
                          className="flex justify-center items-center rounded-full hover:bg-red-600 cursor-pointer"
                          onClick={() => {
                            if (filmEntries.length === 1) {
                              setFilmError("You need to keep at least one field");
                            } else {
                              removeFilm(index);
                              setFilmError("");
                            }
                          }}
                        >
                          <RxCross1 className='text-richblack-100' />
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
                      onClick={() => {
                        if (filmEntries.length >= 4) {
                          setFilmError("You can create 4 fields only");
                        } else {
                          appendFilm({ name: '', url: '', role: '', budget: '' });
                          setFilmError("");
                        }
                      }}
                    >
                      Add more
                    </button>
                  </div>
                )}

                {media === "Yes" && social && (
                  <div className='flex gap-1 Socialss'>
                    <FaCaretDown
                      className="text-2xl cursor-pointer fill-red-600"
                      onClick={() => setSocial(false)}
                    />
                    <span>Show Media</span>
                  </div>
                )}
                {media === "Yes" && (
                  <div className={`${social ? "hidden" : "w-full Socialss flex flex-col justify-around gap-2"}`}>
                    <div className="flex flex-row">
                      <FaCaretDown className="text-2xl cursor-pointer" onClick={() => setSocial(true)} />
                      <span>Hide Media</span>
                    </div>
                    {socials.map((field, index) => {
                      const socialItem = Soc.find((s) => s.name === field.MediaName) || Soc[index % Soc.length];
                      const IconComponent = iconMap[socialItem.icon];
                      return (
                        <div className="flex justify-evenly items-center gap-3" key={field.id}>
                          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-richblack-700">
                            {IconComponent && <IconComponent className="text-2xl text-blue-400" />}
                          </div>
                          <label className="flex flex-col gap-2">
                            <span>* Social Media</span>
                            <select
                              className="form-style h-12 w-[160px] bg-richblack-600 rounded-2xl"
                              {...register(`socials.${index}.mediaName`, {
                                required: media === "Yes" ? "Social Media platform is required" : false,
                              })}
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
                          <label className="flex flex-col gap-2">
                            <span>* Followers</span>
                            <input
                              type="tel"
                              placeholder="Enter followers"
                              className="form-style h-9 w-[160px] bg-richblack-600 rounded-2xl"
                              {...register(`socials.${index}.followers`, { required: "Followers are required" })}
                            />
                            {errors.socials?.[index]?.followers && (
                              <span className="text-red-500 text-sm">{errors.socials[index].followers.message}</span>
                            )}
                          </label>
                          <label className="flex flex-col gap-2">
                            <span>* URL</span>
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
                            />
                            {errors.socials?.[index]?.link && (
                              <span className="text-red-500 text-sm">{errors.socials[index].link.message}</span>
                            )}
                          </label>
                          <div
                            className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
                            onClick={() => {
                              if (socials.length === 1) {
                                setSocialError("You need to keep at least one field ");
                              } else {
                                removeSocial(index);
                                setSocialError("");
                              }
                            }}
                          >
                            <RxCross1 className="text-richblack-100" />
                          </div>
                        </div>
                      );
                    })}
                    {socialError && (
                      <span className="text-red-500 text-sm flex justify-center items-center">
                        {socialError}
                      </span>
                    )}
                    <button
                      type="button"
                      className="mt-2 px-4 py-1 bg-blue-600 text-white rounded Adding"
                      onClick={() => {
                        if (socials.length >= 5) {
                          setSocialError("You can create 5 fields only");
                        } else {
                          const nextIndex = socials.length % Soc.length;
                          appendSocial({ MediaName: Soc[nextIndex].name, Followers: '', link: '' });
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
            <div className='w-full Project md:flex-row gap-4 p-4 mb-4 rounded-md bg-richblack-800 shadow '>
              <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Projects</p>
              <div className='w-full h-full'>
                <div className='w-full flex justify-evenly items-center'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex justify-center items-center gap-2'>
                      <span className='flex items-center gap-2'>
                        * <p className='Work font-bold'>Any Ongoing Project</p>
                      </span>
                      <label>
                        <input
                          type="radio"
                          name="Ongoing"
                          value="Yes"
                          checked={ongoing === "Yes"}
                          onChange={() => {
                            setOngoing("Yes");
                            setValue("Ongoing", "Yes");
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Ongoing"
                          value="No"
                          checked={ongoing === "No"}
                          onChange={() => {
                            setOngoing("No");
                            setValue("Ongoing", "No");
                          }}
                        />
                        No
                      </label>
                    </div>
                    <input type="hidden" {...register("Ongoing")} value={ongoing} />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex justify-center items-center gap-2'>
                      <p className='Work font-bold'>Any Projects Planned For This Year</p>
                      <label>
                        <input
                          type="radio"
                          name="Planned"
                          value="Yes"
                          checked={planned === "Yes"}
                          onChange={() => {
                            setPlanned("Yes");
                            setValue("Planned", "Yes");
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Planned"
                          value="No"
                          checked={planned === "No"}
                          onChange={() => {
                            setPlanned("No");
                            setValue("Planned", "No");
                          }}
                        />
                        No
                      </label>
                    </div>
                    <input type="hidden" {...register("Planned")} value={planned} />
                  </div>
                </div>
                {ongoing === "Yes" && on && (
                  <div className="flex gap-1 One">
                    <FaCaretDown
                      className="text-2xl cursor-pointer fill-red-600"
                      onClick={() => setOn(false)}
                    />
                    <span>Hide Media</span>
                  </div>
                )}
                {ongoing === "Yes" && (
                  <div className={`${on ? "hidden" : "w-full One flex flex-col justify-around gap-2"}`}>
                    <div className="flex flex-row">
                      <FaCaretDown
                        className="text-2xl cursor-pointer"
                        onClick={() => setOn(true)}
                      />
                      <span>Show Projects</span>
                    </div>
                    {ongoingProjects.map((field, index) => (
                      <div
                        className="flex gap-4 p-3 border-b border-gray-700"
                        key={field.id}
                      >
                        <label htmlFor={`ProName-${index}`} className="flex flex-col gap-2">
                          <span className="flex justify-start items-center gap-3 flex-col-reverse">
                            {errors.ongoingProjects?.[index]?.ProName && (
                              <span className="text-red-500 text-sm">
                                {errors.ongoingProjects[index].ProName.message}
                              </span>
                            )}
                            <span>*<span>Project Name</span></span>
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your Project Name"
                            className="form-style h-9 w-[220px] bg-richblack-600 rounded-2xl px-3"
                            {...register(`ongoingProjects.${index}.ProName`, {
                              required: ongoing === "Yes" ? "Project name is required" : false,
                            })}
                          />
                        </label>
                        <label htmlFor={`ProFile-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center gap-3 flex-col-reverse">
                            {errors.ongoingProjects?.[index]?.ProFile && (
                              <span className="text-red-500 text-sm">
                                {errors.ongoingProjects[index].ProFile.message}
                              </span>
                            )}
                            <span>*<span>Upload Script / Images</span></span>
                          </span>
                       <input
  type="file"
  className="form-style"
  accept="image/*,application/pdf"
  {...register(`ongoingProjects.${index}.ProFile`, {
    required: "File upload is required",
    validate: {
      fileType: (files) => {
        if (!files?.[0]) return true; // required will catch empty
        const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        return (
          allowedTypes.includes(files[0].type) ||
          "Only images or PDFs are allowed"
        );
      },
      fileSize: (files) =>
        !files?.[0] ||
        files[0].size <= 5 * 1024 * 1024 ||
        "File size must be less than 5MB",
    },
  })}
/>


                        </label>
                        <label htmlFor={`Start_Date-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center gap-3">*<span>Start Date</span></span>
                          {errors.ongoingProjects?.[index]?.Start_Date && (
                            <span className="text-red-500 text-sm">{errors.ongoingProjects[index].Start_Date.message}</span>
                          )}
                          <input
                            type="month"
                            className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                            {...register(`ongoingProjects.${index}.Start_Date`, {
                              required: "Start Date is required",
                            })}
                          />
                        </label>
                        <label htmlFor={`Start_End-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center gap-3">*<span>End Date</span></span>
                          {errors.ongoingProjects?.[index]?.Start_End && (
                            <span className="text-red-500 text-sm">{errors.ongoingProjects[index].Start_End.message}</span>
                          )}
                          <input
                            type="month"
                            className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                            {...register(`ongoingProjects.${index}.Start_End`, {
                              required: "End Date is required",
                            })}
                          />
                        </label>
                        <label htmlFor={`Release-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center">*<span>Released</span></span>
                          {errors.ongoingProjects?.[index]?.Release && (
                            <span className="text-red-500 text-sm">{errors.ongoingProjects[index].Release.message}</span>
                          )}
                          <select
                            className="p-3 bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                            {...register(`ongoingProjects.${index}.Release`, {
                              required: "Required",
                            })}
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
                            if (ongoingProjects.length === 1) {
                              setOngoingError("You need to keep at least one field");
                            } else {
                              removeOngoing(index);
                              setOngoingError("");
                            }
                          }}
                        >
                          <RxCross1 className="text-richblack-100" />
                        </div>
                      </div>
                    ))}
                    {ongoingError && (
                      <span className="text-red-500 text-sm flex justify-center items-center">
                        {ongoingError}
                      </span>
                    )}
                    <button
                      type="button"
                      className="px-4 py-1 bg-blue-600 text-white rounded Adding w-full"
                      onClick={() => {
                        if (ongoingProjects.length >= 4) {
                          setOngoingError("You can create 4 fields only");
                        } else {
                          appendOngoing({ ProName: "", ProFile: "", Start_Date: "", Start_End: "", Release: "" });
                          setOngoingError("");
                        }
                      }}
                    >
                      Add more
                    </button>
                  </div>
                )}
                {planned === "Yes" && pp && (
                  <div className="flex gap-1 One">
                    <FaCaretDown
                      className="text-2xl cursor-pointer fill-red-600"
                      onClick={() => setPp(false)}
                    />
                    <span>Hide Planned Projects</span>
                  </div>
                )}
                {planned === "Yes" && (
                  <div className={`${pp ? "hidden" : "w-full One flex flex-col justify-around gap-2"}`}>
                    <div className="flex flex-row">
                      <FaCaretDown
                        className="text-2xl cursor-pointer"
                        onClick={() => setPp(true)}
                      />
                      <span>Show Planned Projects</span>
                    </div>
                    {plannedProjects.map((field, index) => (
                      <div
                        className="flex gap-4 p-3 border-b border-gray-700"
                        key={field.id}
                      >
                        <label htmlFor={`PName-${index}`} className="flex flex-col gap-2">
                          <span className="flex justify-start items-center gap-3 flex-col">
                            {errors.plannedProjects?.[index]?.PName && (
                              <span className="text-red-500 text-sm">
                                {errors.plannedProjects[index].PName.message}
                              </span>
                            )}
                            <span> *<span>Project Name</span></span>
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your Project Name"
                            className="form-style h-9 w-[220px] bg-richblack-600 rounded-2xl px-3"
                            {...register(`plannedProjects.${index}.PName`, {
                              required: planned === "Yes" ? "Project name is required" : false,
                            })}
                          />
                        </label>
                        <label htmlFor={`PType-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center gap-3 flex-col">
                            {errors.plannedProjects?.[index]?.PType && (
                              <span className="text-red-500 text-sm">
                                {errors.plannedProjects[index].PType.message}
                              </span>
                            )}
                            <span>*<span>Project Type</span></span>
                          </span>
                          <select
                            className="form-style h-12 w-[160px] bg-richblack-600 rounded-2xl"
                            {...register(`plannedProjects.${index}.PType`, {
                              required: "Project Type is required",
                            })}
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
                          <span className="flex items-center gap-3 flex-col">
                            {errors.plannedProjects?.[index]?.PStatus && (
                              <span className="text-red-500 text-sm">
                                {errors.plannedProjects[index].PStatus.message}
                              </span>
                            )}
                            <span> *<span>Project Status</span> </span>
                          </span>
                          <select
                            className="form-style h-12 w-[160px] bg-richblack-600 rounded-2xl"
                            {...register(`plannedProjects.${index}.PStatus`, {
                              required: "Project Status is required",
                            })}
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
                          {errors.plannedProjects?.[index]?.PStart && (
                            <span className="text-red-500 text-sm">
                              {errors.plannedProjects[index].PStart.message}
                            </span>
                          )}
                          <input
                            type="month"
                            className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                            {...register(`plannedProjects.${index}.PStart`, {
                              required: "Start Date is required",
                            })}
                          />
                        </label>
                        <label htmlFor={`PEnd-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center gap-3">*<span>End Date</span></span>
                          {errors.plannedProjects?.[index]?.PEnd && (
                            <span className="text-red-500 text-sm">
                              {errors.plannedProjects[index].PEnd.message}
                            </span>
                          )}
                          <input
                            type="month"
                            className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                            {...register(`plannedProjects.${index}.PEnd`, {
                              required: "End Date is required",
                            })}
                          />
                        </label>
                        <label htmlFor={`PReles-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center">*<span>Released</span></span>
                          {errors.plannedProjects?.[index]?.PReles && (
                            <span className="text-red-500 text-sm">
                              {errors.plannedProjects[index].PReles.message}
                            </span>
                          )}
                          <select
                            className="p-3 bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                            {...register(`plannedProjects.${index}.PReles`, {
                              required: "Required",
                            })}
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
                            if (plannedProjects.length === 1) {
                              setPlannedError("You need to keep at least one field");
                            } else {
                              removePlanned(index);
                              setPlannedError("");
                            }
                          }}
                        >
                          <RxCross1 className="text-richblack-100" />
                        </div>
                      </div>
                    ))}
                    {plannedError && (
                      <span className="text-red-500 text-sm flex justify-center items-center">
                        {plannedError}
                      </span>
                    )}
                    <button
                      type="button"
                      className="px-4 py-1 bg-blue-600 text-white rounded Adding w-full"
                      onClick={() => {
                        if (plannedProjects.length >= 4) {
                          setPlannedError("You can create 4 fields only");
                        } else {
                          appendPlanned({ PName: "", PType: "", PStatus: "", PStart: "", PEnd: "", PReles: "" });
                          setPlannedError("");
                        }
                      }}
                    >
                      Add more
                    </button>
                  </div>
                )}
<div className="dGsss flex flex-col gap-2">
  {/* ✅ Label + Error */}
  <label className="flex justify-start items-center gap-2" htmlFor="genres">
    <span className="text-red-500">*</span>
    <span className="flex gap-6">
      What Type of Genre Suits You  
        {errors.genres && (
        <span className="text-red-500">{errors.genres.message}</span>
      )}
    </span>
  </label>

  <div className="relative group w-full h-full">
    {/* ✅ Register directly on the visible input (focusable) */}
    <input
      type="button"
      id="genres"
      className={`p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none transition 
        ${errors.genres ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
      value={showGenreDropdown ? "Genre" : "Select Genre"}
      onClick={() => setShowGenreDropdown((prev) => !prev)}
      {...register("genres", {
        required: "Please select at least one genre",
        validate: (value) =>
          genres.length > 0 ,
      })}
    />

    {/* ✅ Dropdown */}
    {showGenreDropdown && (
      <div className="absolute left-0 bg-richblack-800 -top-67 mt-2 p-2 rounded shadow w-full h-[255px] z-10">
        <div className="flex justify-around items-center gap-2 w-full h-full">
          {/* Genre options */}
          <div className="w-[80%] border-r-1 grid grid-cols-5 grid-rows-4 gap-2">
            {Genre.genres.map((data, index) => (
              <div
                key={index}
                className={`text-md font-edu-sa w-fit Datass rounded-lg px-4 py-2 cursor-pointer font-semibold
                  ${genres.includes(data.name)
                    ? "bg-yellow-400 text-black"
                    : "hover:bg-yellow-400 hover:text-black"}`}
                onClick={() => {
                  if (genres.length >= 5) {
                    setGenreError("You cannot select more than 5 genres");
                    return;
                  }
                  setGenreError("");
                  if (!genres.includes(data.name)) {
                    const updatedGenres = [...genres, data.name];
                    setGenres(updatedGenres);
                    setValue("genres", updatedGenres.join(","), {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }
                }}
              >
                {data.name}
              </div>
            ))}
          </div>

          {/* Selected Genres */}
          <div className="h-full w-[18%] flex flex-col justify-between items-center py-2">
            <div className="w-full flex justify-center items-center mb-2">
              <h2 className="font-bold text-lg">Genres</h2>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 gap-1">
              {genres.length === 0 ? (
                <div className="text-gray-400">Select Genre</div>
              ) : (
                genres.map((data, index) => (
                  <div
                    key={index}
                    className="bg-yellow-400 text-black text-md font-edu-sa w-full border rounded-md flex justify-around items-center gap-2"
                  >
                    {data}
                    <div
                      onClick={() => {
                        const updatedGenres = genres.filter((_, i) => i !== index);
                        setGenres(updatedGenres);
                        setValue("genres", updatedGenres.join(","), {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        if (updatedGenres.length < 5) {
                          setGenreError("");
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <RxCross1 />
                    </div>
                  </div>
                ))
              )}

              {/* Extra validation messages */}
              {genreError && (
                <span className="text-red-500 text-sm flex justify-center items-center">
                  {genreError}
                </span>
              )}
              {errors.genres && (
                <span className="text-red-500 text-sm">
                  {errors.genres.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

                <label className='dGsss flex justify-start items-center gap-2' htmlFor='subgenres'>
                  <span className="text-red-500">*</span>
                  <span className="flex gap-6">
                    What Type of Sub Genre Suits You
                    {/* {subGenres.length === 0 && <span className="text-red-500">You Need to select Atleasat One Sub Genres</span>} */}
                          {errors.subgenres && (
        <span className="text-red-500">{errors.subgenres.message}</span>
      )}
                  </span>
                </label>
                <div className="relative group w-full h-full ">
                <input
  type="button"
  id="subgenres"
  className={`p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none transition 
    ${errors.subgenres ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
  value={showSubGenreDropdown ? "Sub Genre" : "Select Sub Genre"}
  onClick={() => setShowSubGenreDropdown((prev) => !prev)}
/>

{/* ✅ Hidden input is the real registered field */}
<input
  type="hidden"
  {...register("subgenres", {
    required: "Please select at least one sub genre",
    validate: (value) => value.length > 0 ,
  })}
  value={subGenres.join(",")}
/>


                  {showSubGenreDropdown && (
                    <div className="absolute left-0 -top-88 mt-2 bg-richblack-700 p-4 rounded-xl shadow-lg w-full min-h-[240px] z-10 border border-richblack-700">
                      <div className="flex flex-col gap-2 w-full">
                        {genres.length === 0 ? (
                          <div className="text-gray-400">Select a genre first</div>
                        ) : (
                          genres.map((selectedGenre, idx) => {
                            const genreObj = Genre.genres.find(g => g.name === selectedGenre);
                            return (
                              <div key={idx} className="flex justify-center flex-row items-center gap-3 w-full mb-2 grid grid-cols-4 grid-row-5 gap-2">
                                {genreObj.subgenres.map((sub, subIdx) => {
                                  const subName = sub.name;
                                  const isSelected = subGenres.includes(subName);
                                  return (
                                    <div
                                      key={subIdx}
                                      className={`min-w-[140px] px-4 py-2 rounded-lg shadow-md font-semibold text-md cursor-pointer transition-all border border-richblack-700 flex gap-3 items-center justify-center
                                        ${isSelected
                                          ? "bg-yellow-400 text-black font-bold"
                                          : "bg-richblack-600 text-white hover:bg-yellow-400 hover:text-black"}`}
                                      onClick={() => {
                                        if (!isSelected) {
                                          if (subGenres.length >= 10) {
                                            setSubGenreError("You cannot select more than 10 sub genres");
                                            return;
                                          }
                                          const updated = [...subGenres, subName];
                                          setSubGenres(updated);
                                          setValue("subgenres", updated.join(","));
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
                                            const updated = subGenres.filter(sg => sg !== subName);
                                            setSubGenres(updated);
                                            setValue("subgenres", updated.join(","));
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
                        <input
                          type="hidden"
                          {...register("subgenres", {
                            required: "Please select at least one sub genre",
                            validate: (value) => value.length > 0 || "Please select at least one sub genre",
                          })}
                          value={subGenres.join(",")}
                        />
                        <div className="w-full flex justify-center items-center mt-2">
                          {subGenreError && (
                            <div className="text-red-500 font-bold">{subGenreError}</div>
                          )}
                          {errors.subgenres && <span className="text-red-500 text-sm">{errors.subgenres.message}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Distribution */}
            <div className='w-full Distrubations bg-richblack-800 rounded-md'>
              <p className="text-xl font-bold text-yellow-400 mb-6 text-center flex justify-start items-start Verificationss">Distribution</p>
              <div className='w-full h-full'>
                <div className='flex justify-around items-center gap-2 w-full '>
                <div className="flex flex-col justify-around items-center gap-2 w-full relative">
  <label htmlFor="Formats">
    <span className="flex items-center gap-1 font-inter text-md">
      *<span>Preferred Screening Formats</span>
    </span>
  </label>

  {/* Button to open dropdown */}
  <input
    type="button"
    id="Formats"
    className={`p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none transition 
      ${errors.screenFormats ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
    value={screen ? "Screen Formats" : "Select Screen Formats"}
    onClick={() => setScreen((prev) => !prev)}
  />

  {/* ✅ Hidden input for react-hook-form */}
  <input
    type="hidden"
    {...register("screenFormats", {
      required: "Please select at least one Screen Format",
      validate: (value) =>
        value.length > 0 || "Please select at least one Screen Format",
    })}
    value={screenTypes.join(",")}
  />

  {screen && (
    <div className="w-full absolute -top-60 h-[200px] flex justify-center items-center">
      <div className="bg-richblack-600 grid flex-col grid-cols-3 w-full h-full p-3 rounded-lg shadow-lg">
        {Projects.Screens.map((data, index) => {
          const isSelected = screenTypes.includes(data);
          return (
            <div
              key={index}
              className={`flex justify-center items-center gap-1 text-md font-edu-sa w-fit Datass rounded-lg outline-none transition px-4 py-2 cursor-pointer font-semibold
                ${isSelected ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"}`}
              onClick={() => {
                if (!isSelected) {
                  if (screenTypes.length >= 5) {
                    setScreenError("You cannot select more than 5 formats");
                    return;
                  }
                  const updated = [...screenTypes, data];
                  setScreenTypes(updated);
                  setValue("screenFormats", updated.join(","));
                  setScreenError("");
                }
              }}
            >
              {data}
              {isSelected && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    const updated = screenTypes.filter((sg) => sg !== data);
                    setScreenTypes(updated);
                    setValue("screenFormats", updated.join(","));

                    if (updated.length < 2) {
                      setScreenError(
                        "You need to select at least 2 Screen formats"
                      );
                    } else {
                      setScreenError("");
                    }
                  }}
                  className="ml-2 cursor-pointer hover:text-red-600"
                >
                  <RxCross1 />
                </span>
              )}
            </div>
          );
        })}

        {/* Error messages */}
        <div className="w-full flex justify-center items-center mt-2 col-span-3">
          {screenError && (
            <div className="text-red-500 font-bold">{screenError}</div>
          )}
          {errors.screenFormats && (
            <span className="text-red-500 text-sm">
              {errors.screenFormats.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )}
</div>

                <div className="flex flex-col justify-around items-center gap-2 w-full relative">
  <label htmlFor="audienceTypes">
    <span className="flex items-center gap-1 font-inter text-md">
      *<span>Target Audience Types</span>
    </span>
  </label>

  {/* Button to open dropdown */}
  <input
    type="button"
    id="audienceTypes"
    className={`p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none transition 
      ${errors.audienceTypes ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}`}
    value={audience ? "Audience Types" : "Select Audience Types"}
    onClick={() => setAudience((prev) => !prev)}
  />

  {/* ✅ Hidden input for react-hook-form */}
  <input
    type="hidden"
    {...register("audienceTypes", {
      required: "Please select at least one audience type",
      validate: (value) =>
        value.length > 0 || "Please select at least one audience type",
    })}
    value={audienceTypes.join(",")}
  />

  {audience && (
    <div className="w-full absolute -top-60 h-[200px] flex justify-center items-center">
      <div className="bg-richblack-600 grid flex-col grid-cols-3 w-full h-full p-3 rounded-lg shadow-lg">
        {Projects.targetAudience.map((data, index) => {
          const isSelected = audienceTypes.includes(data.label);
          return (
            <div
              key={index}
              className={`flex justify-center items-center gap-1 text-md font-edu-sa w-fit Datass rounded-lg outline-none transition px-4 py-2 cursor-pointer font-semibold
                ${isSelected ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"}`}
              onClick={() => {
                if (!isSelected) {
                  if (audienceTypes.length >= 5) {
                    setAudienceError("You cannot select more than 5 audience types");
                    return;
                  }
                  const updated = [...audienceTypes, data.label];
                  setAudienceTypes(updated);
                  setValue("audienceTypes", updated.join(","));
                  setAudienceError("");
                }
              }}
            >
              {data.label}
              {isSelected && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    const updated = audienceTypes.filter((sg) => sg !== data.label);
                    setAudienceTypes(updated);
                    setValue("audienceTypes", updated.join(","));

                    if (updated.length < 2) {
                      setAudienceError("You need to select at least 2 audience types");
                    } else {
                      setAudienceError("");
                    }
                  }}
                  className="ml-2 cursor-pointer hover:text-red-600"
                >
                  <RxCross1 />
                </span>
              )}
            </div>
          );
        })}

        {/* Error messages */}
        <div className="w-full flex justify-center items-center mt-2 col-span-3">
          {audienceError && (
            <div className="text-red-500 font-bold">{audienceError}</div>
          )}
          {errors.audienceTypes && (
            <span className="text-red-500 text-sm">
              {errors.audienceTypes.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )}
</div>

                </div>
                <div className='w-full flex justify-around items-center dpp'>
                  <div className='dGsss flex flex-col gap-2'>
                    <div className='flex justify-around items-center flex-col'>
                      <span className='flex gap-2'>
                        * <p className='Distrubationss'>Are There Any Projects Ready For Distribution</p>
                      </span>
                      <div className='flex gap-2'>
                        <label>
                          <input
                            type="radio"
                            name="distributions"
                            value="Yes"
                            checked={distribution === "Yes"}
                            onChange={() => {
                              setDistribution("Yes");
                              setValue("distributions", "Yes");
                            }}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="distributions"
                            value="No"
                            checked={distribution === "No"}
                            onChange={() => {
                              setDistribution("No");
                              setValue("distributions", "No");
                            }}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <input type="hidden" {...register("distributions")} value={distribution} />
                  </div>
                  <div className='dGsss flex flex-col gap-2'>
                    <div className='flex justify-around items-center flex-col'>
                      <p className='Promotiones'>Would You like Us To Handle Your Promotions</p>
                      <div className='flex gap-2'>
                        <label>
                          <input
                            type="radio"
                            name="promotions"
                            value="Yes"
                            checked={promotions === "Yes"}
                            onChange={() => {
                              setPromotions("Yes");
                              setValue("promotions", "Yes");
                            }}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="promotions"
                            value="No"
                            checked={promotions === "No"}
                            onChange={() => {
                              setPromotions("No");
                              setValue("promotions", "No");
                            }}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <input type="hidden" {...register("promotions")} value={promotions} />
                  </div>
                </div>
                {distribution === "Yes" && notable && (
                  <div className='flex Show gap-1 Distribute'>
                    <FaCaretDown
                      className="text-2xl cursor-pointer fill-red-600"
                      onClick={() => setNotable(false)}
                    />
                    <span>Show Projects</span>
                  </div>
                )}
                {distribution === "Yes" && (
                  <div className={`${notable ? "hidden" : "w-full Projectsss flex flex-col justify-around gap-2"}`}>
                    <div className="flex flex-row">
                      <FaCaretDown
                        className="text-2xl cursor-pointer"
                        onClick={() => setNotable(true)}
                      />
                      <span>Hide Projects</span>
                    </div>
                    {distributionsEntries.map((field, index) => (
                      <div className='flex justify-evenly items-center gap-3' key={field.id}>
                        <span>{index + 1}</span>
                        <label className='flex flex-col gap-2'>
           {errors?.distributionsEntries?.[index]?.projectname && <span className='text-red-500 text-sm'>{errors.distributionsEntries[index].projectname.message}</span>}
                          <span className='flex gap-2'>*<span>Project Name</span></span>
                          <input
                            type="text"
                            placeholder="Enter the name of the Project"
                            className="form-style h-9 w-[290px] bg-richblack-600 rounded-2xl"
                            {...register(`distributionsEntries.${index}.projectname`, {
                              required: distribution === "Yes" ? "Project name is required" : false,
                            })}
                          />
                        </label>
                        <label className='flex flex-col gap-2'>
           {/* {errors?.distributionsEntries?.[index]?.Budget && <span className='text-red-500 text-sm'>{errors.distributionsEntries[index].Budget.message}</span>} */}
                          <span>Total Budget</span>
                          <select
                            className='p-3 bg-richblack-600 h-11 form-style rounded-lg'
                            {...register(`distributionsEntries.${index}.Budget`)}
                          >
                            <option value="" disabled>Select Budget Range</option>
                            {Projects.Money.map((money, i) => (
                              <option key={i} value={money}>
                                {money}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className='flex flex-col gap-2'>
           {errors?.distributionsEntries?.[index]?.Role && <span className='text-red-500 text-sm'>{errors.distributionsEntries[index].Role.message}</span>}

                          <span className='flex gap-2'>*<span>Your Role</span></span>
                          <select
                            className='p-3 bg-richblack-600 h-11 form-style rounded-lg'
                            {...register(`distributionsEntries.${index}.Role`, {
                              required: "Role is required",
                            })}
                          >
                            <option value="" disabled>Your Role</option>
                            {Projects.roles.map((role, i) => (
                              <option key={i} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="flex flex-col gap-2">
           {errors?.distributionsEntries?.[index]?.ReleaseDate && <span className='text-red-500 text-sm'>{errors.distributionsEntries[index].ReleaseDate.message}</span>}
                          <span className="flex items-center gap-3">*<span>Release Date</span></span>
                          <input
                            type="month"
                            className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                            {...register(`distributionsEntries.${index}.ReleaseDate`, {
                              required: "Date is required",
                            })}
                          />
                        </label>
                        <div
                          className="flex justify-center items-center rounded-full hover:bg-red-600 cursor-pointer"
                          onClick={() => {
                            if (distributionsEntries.length === 1) {
                              setNotableError("You need to keep at least one field");
                            } else {
                              removeDistribution(index);
                              setNotableError("");
                            }
                          }}
                        >
                          <RxCross1 className='text-richblack-100' />
                        </div>
                      </div>
                    ))}
                    {notableError && (
                      <span className="text-red-500 text-sm flex justify-center items-center">
                        {notableError}
                      </span>
                    )}
                    <button
                      type="button"
                      className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                      onClick={() => {
                        if (distributionsEntries.length >= 4) {
                          setNotableError("You can create 4 fields only");
                        } else {
                          appendDistribution({ projectname: "", Budget: "", ReleaseDate: "", Role: "" });
                          setNotableError("");
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
                <label className="w-full">
                  <div className="dGsss flex flex-col gap-2">
                    <div className="flex justify-around items-center flex-col">
                      <p className="AssistanceRequired">
                        Would You Require Any Type of Support Or Assistance
                      </p>
                      <div className="flex gap-2">
                        <label>
                          <input
                            type="radio"
                            name="AssistanceRequired"
                            value="Yes"
                            checked={support === "Yes"}
                            onChange={() => {
                              setSupport("Yes");
                              setValue("AssistanceRequired", "Yes");
                            }}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="AssistanceRequired"
                            value="No"
                            checked={support === "No"}
                            onChange={() => {
                              setSupport("No");
                              setValue("AssistanceRequired", "No");
                            }}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <input type="hidden" {...register("AssistanceRequired")} value={support} />
                  </div>
                  <div className={support === "Yes" ? "flex flex-col" : "hidden"}>
                    <span>
                      * <span>Can You tell What type of Support You Need</span>
                    </span>
                    <select
                      defaultValue=""
                      id="AssistanceType"
                      className="p-3 w-full bg-richblack-600 h-11 form-style rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                      {...register("AssistanceType", { required: support === "Yes" ? "Please select a support type" : false })}
                    >
                      <option value="" disabled>
                        Support Needed
                      </option>
                      {Projects.supportNeeds.map((data, index) => (
                        <option key={index} value={data.label}>
                          {data.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <div className='flex justify-around gap-2 flex-col'>
                  <label htmlFor="JoiningReason" className="block font-semibold mb-2 ">
                    <span className="flex items-center gap-2"> * <span>What is Your main Reason for Joining</span>    {errors.JoiningReason && (
        <span className="text-red-500">{errors.JoiningReason.message}</span>
      )} </span>
                  </label>
          <textarea
                    id="JoiningReason"
                    name="JoiningReason"
                    placeholder="Write a short bio (max 250 characters)"
                    maxLength={250}
                    rows={4}
                     value={fields.JoiningReason}
                    className="w-full p-3 bg-richblack-600 text-white rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                    {...register("JoiningReason",{required:"Your reason for joining "})}
                      onChange={handleChange}
                  />
                <p className="text-sm text-gray-400 mt-1 flex justify-end">
        {countWords(fields.JoiningReason)} / Max 250 words
      </p>
                </div>
                <div className="w-full flex justify-around items-center Last_Field">
                  <div className="flex flex-col justify-around items-center">
                    <span className="flex gap-1">
                      *<span>Do You Have any Certifications in this field</span>
                    </span>
                    <div className="flex gap-2">
                      <label>
                        <input
                          type="radio"
                          name="Certified"
                          value="Yes"
                          checked={certified === "Yes"}
                          onChange={() => {
                            setCertified("Yes");
                            setValue("Certified", "Yes");
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Certified"
                          value="No"
                          checked={certified === "No"}
                          onChange={() => {
                            setCertified("No");
                            setValue("Certified", "No");
                          }}
                        />
                        No
                      </label>
                    </div>
                    <input type="hidden" {...register("Certified")} value={certified} />
                  </div>
                  <div className="flex flex-col justify-around items-center">
                    <span className="flex gap-1">
                      *<span>Do You Have Any Experience Collaborating with Others</span>
                    </span>
                    <div className="flex gap-2">
                      <label>
                        <input
                          type="radio"
                          name="Experience"
                          value="Yes"
                          checked={experience === "Yes"}
                          onChange={() => {
                            setExperience("Yes");
                            setValue("Experience", "Yes");
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Experience"
                          value="No"
                          checked={experience === "No"}
                          onChange={() => {
                            setExperience("No");
                            setValue("Experience", "No");
                          }}
                        />
                        No
                      </label>
                    </div>
                    <input type="hidden" {...register("Experience")} value={experience} />
                  </div>
                  <div className="flex flex-col justify-around items-center">
                    <span className="flex gap-1">
                      *<span>Are You Comfortable With Collaboration</span>
                    </span>
                    <div className="flex gap-2">
                      <label>
                        <input
                          type="radio"
                          name="Collaboration"
                          value="Yes"
                          checked={collabration === "Yes"}
                          onChange={() => {
                            setCollabration("Yes");
                            setValue("Collaboration", "Yes");
                          }}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Collaboration"
                          value="No"
                          checked={collabration === "No"}
                          onChange={() => {
                            setCollabration("No");
                            setValue("Collaboration", "No");
                          }}
                        />
                        No
                      </label>
                    </div>
                    <input type="hidden" {...register("Collaboration")} value={collabration} />
                  </div>
                </div>
                {certified === "Yes" && cert && (
                  <div className="flex gap-1 One">
                    <FaCaretDown
                      className="text-2xl cursor-pointer fill-red-600"
                      onClick={() => setCert(false)}
                    />
                    <span>Hide Media</span>
                  </div>
                )}
                {certified === "Yes" && (
                  <div className={`${cert ? "hidden" : "w-full One flex flex-col justify-around gap-2"}`}>
                    <div className="flex flex-row">
                      <FaCaretDown
                        className="text-2xl cursor-pointer"
                        onClick={() => setCert(true)}
                      />
                      <span>Show Projects</span>
                    </div>
                    {certifications.map((field, index) => (
                      <div
                        className="flex gap-4 p-3 border-b border-gray-700 w-full justify-around items-center"
                        key={field.id}
                      >
                        <label htmlFor={`CertificateName-${index}`} className="flex flex-col gap-2">
                          <span className="flex justify-start items-center gap-3">
           {errors?.certifications?.[index]?.CertificateName && <span className='text-red-500 text-sm'>{errors.certifications[index].CertificateName.message}</span>}

                            *<span>Certificate Name</span>
                          </span>
                          <input
                            type="text"
                            placeholder="Enter Your Certificate Name"
                            className="form-style h-9 w-[390px] bg-richblack-600 rounded-2xl px-3"
                            {...register(`certifications.${index}.CertificateName`, {
                              required: certified === "Yes" ? "Certificate name is required" : false,
                            })}
                          />
                        </label>
                        <label htmlFor={`Certificatealink-${index}`} className="flex flex-col gap-2">
                          <span className="flex items-center gap-3">
           {errors?.certifications?.[index]?.Certificatealink && <span className='text-red-500 text-sm'>{errors.certifications[index].Certificatealink.message}</span>}

                            *<span>Certificate</span>
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.docx,.jpg,.jpeg,.png"
                            className="form-style bg-richblack-600 rounded-2xl p-2"
                            multiple
                            {...register(`certifications.${index}.Certificatealink`, {
                              required: "File upload is required",
                            })}
                            onChange={(e) => {
                              setValue(`certifications.${index}.Certificatealink`, e.target.files[0], { shouldValidate: true });
                            }}
                          />
                        </label>
                        <label htmlFor={`CertDate-${index}`} className="flex flex-col gap-2">
           {errors?.certifications?.[index]?.CertDate && <span className='text-red-500 text-sm'>{errors.certifications[index].CertDate.message}</span>}

                          <span className="flex items-center gap-3">*<span>Certificate Completion Date</span></span>
                          <input
                            type="month"
                            className="form-style h-9 w-[140px] bg-richblack-600 rounded-2xl px-2"
                            {...register(`certifications.${index}.CertDate`, {
                              required: "Date is required",
                            })}
                          />
                        </label>
                        <div
                          className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
                          onClick={() => {
                            if (certifications.length === 1) {
                              setCertError("You need to keep at least one field");
                            } else {
                              removeCert(index);
                              setCertError("");
                            }
                          }}
                        >
                          <RxCross1 className="text-richblack-100" />
                        </div>
                      </div>
                    ))}
                    {certError && (
                      <span className="text-red-500 text-sm flex justify-center items-center">
                        {certError}
                      </span>
                    )}
                    <button
                      type="button"
                      className="px-4 py-1 bg-blue-600 text-white rounded Adding w-full"
                      onClick={() => {
                        if (certifications.length >= 4) {
                          setCertError("You can create 4 fields only");
                        } else {
                          appendCert({ CertificateName: "", Certificatealink: "", CertDate: "" });
                          setCertError("");
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
                <div className="w-full flex justify-around items-center gap-2 role">
        <div className="flex flex-col justify-around items-center gap-2">
          <span>
            *<span>What Role Suits You</span>
          </span>
          <div className="flex w-[320px] bg-[#656874] rounded-full overflow-hidden">
            {["Director", "Producer"].map((role, idx) => (
              <button
                key={role}
                type="button"
                className={`flex-1 px-6 py-3 transition-colors font-semibold Btnes
                  ${
                    selectedRole === role
                      ? "bg-richblack-900 text-white"
                      : "bg-[#656874] text-white hover:bg-yellow-400 hover:text-black"
                  }
                  ${idx === 0 ? "rounded-l-full" : "rounded-r-full"}
                `}
                onClick={() => {
                  setSelectedRole(role);
                  setRoleError("");
                  setValue("selectedRole", role, { shouldValidate: true }); // ✅ tell RHF
                }}
              >
                {role}
              </button>
            ))}
          </div>
          {roleError && (
            <span className="text-red-500 text-sm mt-1">{roleError}</span>
          )}
          {errors.selectedRole && (
            <span className="text-red-500 text-sm mt-1">
              {errors.selectedRole.message}
            </span>
          )}
          <input
            type="hidden"
            {...register("selectedRole", { required: "Role is required" })}
            value={selectedRole}
          />
        </div>

        {/* Experience Section */}
        <div className="flex flex-col justify-around items-center gap-2">
          <span>
            *<span>Do You have Any Experience in This field</span>
          </span>
          <div className="flex w-[320px] bg-[#656874] rounded-full overflow-hidden">
            {["Fresher", "Experienced"].map((exp, idx) => (
              <button
                key={exp}
                type="button"
                className={`flex-1 px-6 py-3 transition-colors font-semibold Btnes
                  ${
                    experiences === exp
                      ? "bg-richblack-900 text-white"
                      : "bg-[#656874] text-white hover:bg-yellow-400 hover:text-black"
                  }
                  ${idx === 0 ? "rounded-l-full" : "rounded-r-full"}
                `}
                onClick={() => {
                  setExperiences(exp);
                  setExperienceError("");
                  setValue("experiences", exp, { shouldValidate: true }); // ✅ tell RHF
                }}
                style={{ cursor: "pointer" }}
              >
                {exp}
              </button>
            ))}
          </div>
          {experienceError && (
            <span className="text-red-500 text-sm mt-1">
              {experienceError}
            </span>
          )}
          <input
            type="hidden"
            {...register("experiences", {
              required: "Experience level is required",
            })}
            value={experiences}
          />
          {errors.experiences && (
            <span className="text-red-500 text-sm mt-1">
              {errors.experiences.message}
            </span>
          )}
        </div>
      </div>
                {/* end one  */}

                <div className="relative w-full">
                  {(!selectedRole || !experiences) && (
                    <div className="bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                      <div className="bg-richblack-800 p-8 rounded-xl shadow-2xl border border-yellow-400 text-center">
                        <div className="text-6xl text-yellow-400 mb-4">
                          🔒
                        </div>
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">
                          Complete Your Selection
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Please choose a role and select your experience level to continue
                        </p>
                        <div className="flex flex-col gap-2 text-sm text-gray-400">
                          {!selectedRole && <span>• Select your role (Director/Producer)</span>}
                          {!experiences && <span>• Choose your experience level (Fresher/Experienced)</span>}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={`${(!selectedRole || !experiences) ? 'blur-sm pointer-events-none' : ''}`}>
                    {selectedRole === "Director" && experiences === "Experienced" && (
                      <div className=' space-y-8  SelectionOne bg-richblack-800 rounded-lg border border-richblack-600'>
                        {/* <h1 className="text-red-500 flex justify-center items-center gap-2"> All The Fields are Required in this Section </h1> */}

<div className='space-y-4'>
  <h3 className='text-lg font-semibold text-yellow-400 Liness'>🏆 Awards & Recognition</h3>
  <div className='space-y-3'>
      <span className="flex justify-center items-center gap-2">
        *<p className="text-white font-medium">
          Can you name some of the awards you have received for your previous projects?
        </p>
      </span>

    <div className='flex gap-4 justify-center items-center'>
      {/* checkedAwards,setawards */}
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type="radio"
          name="awards"
          value="Yes"
          className='w-4 h-4 text-yellow-400 bg-richblack-800 border-richblack-600 focus:ring-yellow-400'
          {...register("Awards",{required:"Awards is reqired"})}
          checked={hasAwards === "Yes"}
          onChange={(e)=>{
            setHasAwards(e.target.value)
            setValue("Awards", "Yes");
          }}
        />
        <span className='text-white'>Yes</span>
      </label>
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type="radio"
          name="awards"
          value="No"
          className='w-4 h-4 text-yellow-400 bg-richblack-800 border-richblack-600 focus:ring-yellow-400'
          {...register("Awards",{required:"Awards is reqired"})}
          checked={hasAwards === "No"}
          onChange={(e)=>{
            setHasAwards(e.target.value)
            setValue("Awards", "No");
          }}
        />
        <span className='text-white'>No</span>
      </label>
    </div>

    {hasAwards === "Yes" && awardSectionOpen && (
  <div className="flex gap-1">
    <FaCaretDown
      className="text-2xl cursor-pointer fill-red-600"
      onClick={() => setAwardSectionOpen(false)}
    />
    <span>Hide Awards</span>
  </div>
)}

      {hasAwards === "Yes" && (
  <div className={`${awardSectionOpen ? "hidden" : "w-full flex flex-col gap-2"}`}>
    <div className="flex flex-row">
      <FaCaretDown
        className="text-2xl cursor-pointer"
        onClick={() => setAwardSectionOpen(true)}
      />
      <span>Show Awards</span>
    </div>

    {/* Dynamic Fields */}
    {awards.map((field, index) => (
      <div
        key={field.id}
        className="flex flex-wrap Dynamics gap-4 p-3 border-b border-gray-700 w-full items-center"
      >
        {/* Award Category */}
        <label className="flex flex-col gap-2">
          {errors?.awards?.[index]?.category && <span className='text-red-500 text-sm'>{errors.awards[index].category.message}</span>}
          <span>* Award Category</span>
          <select
          defaultValue=""
            className="form-style h-12 w-[150px] bg-richblack-600 rounded-2xl Awards"
            {...register(`awards.${index}.category`, { required: "Category is required" })}>
            <option value="">Select Award</option>
           {Projects.awardCategories.map((data, idx) => (
            <option key={idx}>{data}</option>
           ))}
          </select>
        </label>

        {/* Award Name */}
        <label className="flex flex-col gap-2">
            {errors?.awards?.[index]?.awardName && <span className='text-red-500 text-sm'>{errors.awards[index].awardName.message}</span>}
          <span>* Name of Award / Festival</span>
          <input
            type="text"
            placeholder="Enter Award/Festival Name"
            className="form-style h-9 w-[390px] bg-richblack-800 rounded-2xl px-3 Awards"
            {...register(`awards.${index}.awardName`, { required: "Award name is required" })}
          />
        </label>

        {/* Movie Name */}
        <label className="flex flex-col gap-2">
           {errors?.awards?.[index]?.movieName && <span className='text-red-500 text-sm'>{errors.awards[index].movieName.message}</span>}
          <span>* Movie / Web Series Name</span>
          <input
            type="text"
            placeholder="Enter Movie Name"
            className="form-style h-9 w-[375px] bg-richblack-800 rounded-2xl px-3 Awards"
            {...register(`awards.${index}.movieName`, { required: "Movie/Web Series name is required" })}
          />
        </label>

<div className='flex w-full  justify-center items-center gap-5'>
  {/* Release Date */}
        <label className="flex flex-col gap-2">
           {errors?.awards?.[index]?.releaseDate && <span className='text-red-500 text-sm'>{errors.awards[index].releaseDate.message}</span>}
          <span>* Release Date</span>
          <input
            type="date"
            className="form-style h-9 w-[160px] bg-richblack-600 rounded-2xl px-2 Awards"
            {...register(`awards.${index}.releaseDate`, { required: "Release Date is required" })}
          />
        </label>

        {/* Currency */}
        <div className='flex justify-center items-center gap-5'>
          <label className="flex flex-col gap-2">
           {errors?.awards?.[index]?.Currencey && <span className='text-red-500 text-sm'>{errors.awards[index].Currencey.message}</span>}
          <span>* Currency</span>
           <select
          defaultValue=""
            className="form-style h-12 w-[250px] bg-richblack-600 rounded-2xl Awards"
            {...register(`awards.${index}.Currencey`, { required: "Currencey is required" })}>
            <option value="">Select Currencey</option>
           {Projects.currencies.map((data, idx) => (
            <option key={idx} value={data.code}>{data.name} - {data.symbol}</option>
           ))}
          </select>
        </label>

        {/* Budget */}
        <label className="flex flex-col gap-2">
           {errors?.awards?.[index]?.budget && <span className='text-red-500 text-sm'>{errors.awards[index].budget.message}</span>}
          <span>* Total Budget</span>
          <input
            type="number"
            placeholder="Enter Budget"
            className="form-style h-9 w-[220px] bg-richblack-800 rounded-2xl px-3 Awards"
            {...register(`awards.${index}.budget`, { required: "Budget is required" })}
          />
        </label>

        {/* Earned */}
        <label className="flex flex-col gap-2">
           {errors?.awards?.[index]?.earned && <span className='text-red-500 text-sm'>{errors.awards[index].earned.message}</span>}
          <span>* Total Earned</span>
          <input
            type="number"
            placeholder="Total Earned"
            className="form-style h-9 w-[220px] bg-richblack-800 rounded-2xl px-3 Awards"
            {...register(`awards.${index}.earned`, { required: "Total earned is required" })}
          />
        </label>

        </div>
        
        {/* Delete Button */}
        <div
          className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
          onClick={() => {
            if (awards.length === 1) {
              setAwardError("You need to keep at least one award");
            } else {
              removeAward(index);   // ✅ FIX: use removeAward, not remove
              setAwardError("");
            }
          }}
        >
          <RxCross1 className="text-richblack-100" />
        </div>

</div>
      </div>
    ))}

    {/* Error Message */}
    {awardError && (
      <span className="text-red-500 text-sm flex justify-center items-center">
        {awardError}
      </span>
    )}

    {/* Add More */}
    <button
      type="button"
      className="px-4 py-1 bg-blue-600 text-white rounded w-full Awards"
      onClick={() => {
        if (awards.length >= 4) {
          setAwardError("You can create 4 fields only");
        } else {
          appendAward({   // ✅ FIX: use appendAward
            category: "",
            awardName: "",
            movieName: "",
            releaseDate: "",
            currency: "",
            budget: "",
            earned: "",
          });
          setAwardError("");
        }
      }}
    >
      Add more
    </button>
  </div>
)}
  </div>
</div>
                        <div className='space-y-4 TaS'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>🛠️ Tools & Software</h3>
                          <div className='space-y-3'>
                            <p className='text-white font-medium flex justify-center items-center'>Can you Name Some of the Software or Tools that you have worked with?</p>
                            <div className='flex gap-4 justify-center items-center'>
                              <label className='flex items-center gap-2 cursor-pointer'>
                                {/* Soft,setSoft */}
                                <input type="radio" name="tools" value="Yes" className='w-4 h-4 text-yellow-400 bg-richblack-800 border-richblack-600 focus:ring-yellow-400' {...register("Tools")} onChange={(e)=>{setSoft(e.target.value),setValue("Tools","Yes")}} checked={Soft === "Yes"}/>
                                <span className='text-white'>Yes</span>
                              </label>
                              <label className='flex items-center gap-2 cursor-pointer'>
                                <input type="radio" name="tools" value="No" className='w-4 h-4 text-yellow-400 bg-richblack-800 border-richblack-600 focus:ring-yellow-400' {...register("Tools")} onChange={(e)=>{setSoft(e.target.value),setValue("Tools","No")}} checked={Soft === "No"}/>
                                <span className='text-white'>No</span>
                              </label>
                            </div>

      {Soft === "Yes" && (selectedTools.length === 0 || selectedSoftware.length === 0) && (
  <p className="text-red-500 text-sm mt-2 S">
    Please select at least one Tool and one Software
  </p>
)}

                      <section className={Soft === "Yes" ? "grid grid-cols-2 grid-rows-1 border w-full h-fit bg-richblack-800 border-richblack-600 rounded-md p-3 Softs" : "hidden"}>
      {/* ---------------------- TOOLS SECTION ---------------------- */}
      <div className="h-[300px] w-full flex flex-col">
        <p className="text-red-600 font-bold italic text-center">Select Tools</p>

        <div className="grid grid-cols-3 grid-row-5 w-full h-full overflow-y-auto gap-2 p-2 space-y-1">
          {Tools.tools.map((tool, index) => {
            const isSelected = selectedTools.includes(tool);

            return (
              <div
                key={index}
                className={`relative p-2 rounded-md shadow-sm cursor-pointer w-fit h-fit selectTool flex justify-center items-center gap-2
                ${
                  isSelected
                    ? "bg-yellow-200 text-black"
                    : "bg-richblack-700 text-white hover:bg-richblack-500 active:bg-richblack-600"
                }`}
                onClick={() => {
                  if (isSelected) {
                    // remove
                    const updated = selectedTools.filter((t) => t !== tool);
                    setSelectedTools(updated);
                    if (updated.length <= 10) setToolError(""); // ✅ clear error when valid
                  } else {
                    // add
                    if (selectedTools.length >= 10) {
                      setToolError("You cannot select more than 10 tools");
                      return;
                    }
                    setSelectedTools([...selectedTools, tool]);
                  }
                }}
              >
                {tool}

                {/* Cross icon (only when selected) */}
                {isSelected && (
                  <span
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent parent click
                      const updated = selectedTools.filter((t) => t !== tool);
                      setSelectedTools(updated);
                      if (updated.length <= 10) setToolError(""); // ✅ fixed for Tools
                    }}
                  >
                    <RxCross1 className="text-black hover:text-red-600" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {toolError && <p className="text-red-500 text-xl mt-2">{toolError}</p>}
      </div>

      {/* ---------------------- SOFTWARE SECTION ---------------------- */}
      <div className=" h-[300px] w-full flex flex-col">
        <p className="text-red-600 font-bold italic text-center">Select Software</p>

        <div className="grid grid-cols-3 grid-row-5 w-full h-full overflow-y-auto gap-2 p-2 space-y-1">
          {Tools.software.map((tool, index) => {
            const isSelected = selectedSoftware.includes(tool);

            return (
              <div
                key={index}
                className={`relative p-2 rounded-md shadow-sm cursor-pointer w-fit h-fit selectTool flex justify-center items-center gap-2
                ${
                  isSelected
                    ? "bg-yellow-200 text-black"
                    : "bg-richblack-700 text-white hover:bg-richblack-500 active:bg-richblack-600"
                }`}
                onClick={() => {
                  if (isSelected) {
                    const updated = selectedSoftware.filter((t) => t !== tool);
                    setSelectedSoftware(updated);
                    if (updated.length <= 10) setSoftwareError(""); // ❌ you had setToolError here
                  } else {
                    if (selectedSoftware.length >= 10) {
                      setSoftwareError("You cannot select more than 10 software");
                      return;
                    }
                    setSelectedSoftware([...selectedSoftware, tool]);
                  }
                }}
              >
                {tool}

                {/* Cross icon (only when selected) */}
                {isSelected && (
                  <span
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // ❌ BUG FIXED: you used selectedTools instead of selectedSoftware
                      const updated = selectedSoftware.filter((t) => t !== tool);
                      setSelectedSoftware(updated);
                      if (updated.length <= 10) setSoftwareError(""); // ❌ you had setToolError here
                    }}
                  >
                    <RxCross1 className="text-black hover:text-red-600" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {softwareError && (
          <p className="text-red-500 text-xl mt-2">{softwareError}</p>
        )}
      </div>
    </section>

                          </div>
                        </div>
                        <div className='space-y-4 TaS'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>👥 Team Management</h3>
                          <div className='space-y-2 T flex flex-col gap-3'>
                          <span className='flex justify-center items-center gap-2'> * <label className='block text-sm font-medium text-gray-300'>What Can be Your Typical Team Size For a Project ? {errors.teamSize&&<span className='text-red-500 text-xl'>{errors.teamSize.message}</span>}</label></span>
                            <select defaultValue="" className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400' {...register("teamSize",{required:"Team Size is required"})}>
                              <option value="" disabled>Select Team Size</option>
                              {Projects.typicalTeamSizeRanges.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      
                      </div>
                    )}
                    {selectedRole === "Producer" && experiences === "Experienced" && (
                      <div className='space-y-8 SelectionOne bg-richblack-700 rounded-lg border border-richblack-600'>
                        <h1 className="text-red-500 flex justify-center items-center gap-2"> All The Fields are Required in this Section </h1>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 Liness'>📄 Production Resume</h3>
                          <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-300'>Upload Your Production Resume <span className='text-red-500'>*</span> {errors.supportingDocs && <span className="text-red-500">{errors.supportingDocs.message}</span>}</label>
                            <div className='relative'>
                           <input
  type="file"
  accept="application/pdf"
  className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white 
             file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold 
             file:bg-yellow-400 file:text-black hover:file:bg-yellow-300 focus:outline-none 
             focus:ring-2 focus:ring-yellow-400'
  {...register("supportingDocs", {
    required: "Resume is required",
    validate: (files) => {
      if (files && files[0] && files[0].size > 10 * 1024 * 1024) {
        return "File size should be less than 10MB";
      }
      return true;
    },
  })}
  onChange={(e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB");
      e.target.value = ""; 
    }
  }}
/>
                              <p className='text-xs text-gray-400 mt-1'>PDF files only, max size 10MB</p>
                            </div>
                          </div>
                        </div>
                        <div className='space-y-4 Fundes'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4 '>💰 Funding & Finance</h3>
                          <div className='space-y-2'>
                             <label className='block text-sm font-medium text-gray-300'>Can You Tell Us What are the various ways That you have Used to fund your Projects? <span className='text-red-500'>*</span></label> 
                            {/* <select className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400' {...register("fundingSources", { required: "Funding sources are required" })}>
                              <option value="" disabled>Select Funding Sources</option>
                              {Profession.fundingSources.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                              ))}
                            </select>
                            {errors.fundingSources && <span className="text-red-500">{errors.fundingSources.message}</span>} */}
{/* funding,setfunding */}
                               {funding ? (
    <div className="flex gap-1 One">
      <FaCaretDown
        className="text-2xl cursor-pointer fill-red-600"
        onClick={() => setfunding(false)} // hides this section
      />
      <span>Close {errors.fundingSources && <span className="text-red-500">{errors.fundingSources.message}</span>}</span>
    </div>
  ) : (
    <div className='w-full  bg-richblack-800 p-4 rounded-md flex flex-col gap-4 '>
      <div className="flex flex-row One">
        <FaCaretDown
          className="text-2xl cursor-pointer"
          onClick={() => setfunding(true)} // shows Helloes again
        />
        <span>OPEN    {errors.fundingSources && <span className="text-red-500">{errors.fundingSources.message}</span>}</span>
      </div>
      <div className={`w-full grid grid-cols-2 grid-rows-1 md:grid-cols-2 gap-2 Fundings ${errors.fundingSources ? "border border-red-500" : ""} ${funding ? "hidden" : "flex flex-wrap gap-2"}`}>
         {Profession.fundingSources.map((data, index) => {
          const selected = finance.includes(data);
          // finance,setfinance
          return(
            
              <span key={index} className={`hover:bg-yellow-500 w-fit h-fit f flex justify-center items-center gap-2 rounded-md ${selected ? "bg-yellow-200 text-black" : "bg-richblack-700 text-white hover:bg-richblack-500 active:bg-richblack-600"}`} onClick={()=>{
                                  if(selected){
                                    const updated = finance.filter((f)=>f!==data)
                                    setfinance(updated)
                                      if (updated.length <= 5) setfinanceError("");
                                  } else {
// financeError,setfinanceError                    // add
                    if (finance.length >= 5) {
                      setfinanceError("You cannot select more than 5 Funding source");
                      return;
                    }
                    setfinance([...finance, data]);
                  }
                                }}>{data} {selected && <RxCross1 onClick={(e)=>{
                                  e.stopPropagation()
                                  const updated = finance.filter((f)=>f!==data)
                                  setfinance(updated)
                                    if (updated.length <= 5) setfinanceError("");
                                }}/>}</span>
                                
          )
})}
<input
    type="hidden"
    {...register("fundingSources", {
      required: "Please select at least one Funding Source",
      validate: (value) =>
        value.length > 0 || "Please select at least one Funding Source",
    })}
    value={finance.join(",")}
  />

        {financeError && <p className="text-red-500 text-xl mt-2">{financeError}</p>}

      </div>
    </div>
  )}

                          </div>
                        </div>
                        <div className='space-y-4 Fundes'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>🏛️ Professional Affiliations</h3>
                        <div className='space-y-3'>
  <p className='text-white font-medium flex justify-center items-center'>
    Are you affiliated with any union, guild, or professional film association? 
    <span className='text-red-500'>*</span>
  </p>

  <div className='flex gap-4 justify-center items-center'>
    <label className='flex items-center gap-2 cursor-pointer'>
      <input
        type="radio"
        name="affiliation"
        value="Yes"
        className='w-4 h-4 text-yellow-400 bg-richblack-800 border-richblack-600 focus:ring-yellow-400'
        onChange={() => {
          setAffiliationError("")
          setValue('affiliation',"Yes")
          setFunding("Yes")
        }}
        checked={Funding === "Yes"}
        {...register("affiliation", { required: "Affiliation selection is required" })}
      />
      <span className='text-white'>Yes</span>
    </label>
    <label className='flex items-center gap-2 cursor-pointer'>
      <input
        type="radio"
        name="affiliation"
        value="No"
        className='w-4 h-4 text-yellow-400 bg-richblack-800 border-richblack-600 focus:ring-yellow-400'
        onChange={() => {
          setAffiliationError("")
          setValue('affiliation',"No")
          setFunding("No")
        }}
        checked={Funding === "No"}
        {...register("affiliation", { required: "Affiliation selection is required" })}
      />
      <span className='text-white'>No</span>
    </label>
  </div>

  {Funding === "Yes" && (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

      {/* Guild/Union */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-300'>
          Select Guild/Union <span className='text-red-500'>*</span>
        </label>
        <select
          defaultValue=""
          className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
          {...register("guildUnion", { required: "Guild/Union is required" })}
        >
          <option value="" disabled>Select Guild/Union</option>
          {Profession.unionsGuildsAffiliations.map((data, index) => (
            <option key={index} value={data}>{data}</option>
          ))}
        </select>
        {errors.guildUnion && <p className="text-red-500 text-sm">{errors.guildUnion.message}</p>}
      </div>

      {/* Membership ID */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-300'>
          Membership ID <span className='text-red-500'>*</span>
        </label>
        <input
          type="text"
          placeholder='Enter Your Membership ID'
          className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
          {...register("membershipId", { required: "Membership ID is required" })}
        />
        {errors.membershipId && <p className="text-red-500 text-sm">{errors.membershipId.message}</p>}
      </div>

      {/* Year Joined */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-300'>
          Year Joined <span className='text-red-500'>*</span>
        </label>
        <input
          type="date"
          className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
          {...register("yearJoined", { required: "Year joined is required" })}
        />
        {errors.yearJoined && <p className="text-red-500 text-sm">{errors.yearJoined.message}</p>}
      </div>

      {/* Expiry Date */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-300'>
          Expiry Date <span className='text-red-500'>*</span>
        </label>
        <input
          type="date"
          className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
          {...register("expiryDate", { required: "Expiry date is required" })}
        />
        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
      </div>
    </div>
  )}
</div>
{/* Doing some changes for testing purposed */}
                        </div>
                        <div className='space-y-4 Fundes'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>👥 Team Management</h3>
                          <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-300'>What Can be Your Typical Team Size For a Project? <span className='text-red-500'>*</span>{errors.teamSize && <span className="text-red-500 text-sm mt-1">{errors.teamSize.message}</span>}</label>
                            <select defaultValue="" className='w-full px-3 py-2 any  bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400' {...register("teamSize", { required: "Team size is required" })}>
                              <option value="" disabled>Select Team Size</option>
                              {Projects.typicalTeamSizeRanges.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='space-y-4 Fundes'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>📊 Project Experience</h3>
                          <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-300'>Number of Projects you have completed Till now <span className='text-red-500'>*</span>{errors.projectCount && <span className="text-red-500 text-sm mt-1">{errors.projectCount.message}</span>}</label>
                            <select defaultValue="" className='w-full px-3 py-2 any bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400' {...register("projectCount", { required: "Project count is required" })}>
                              <option value="" disabled>Select Project Count</option>
                              {Projects.ProjectNumber.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                              ))}
                            </select>
                            {/* {errors.projectCount && <span className="text-red-500">{errors.projectCount.message}</span>} */}
                          </div>
                        </div>
                        <div className='space-y-4 Fundes'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>⚠️ Risk Management</h3>
<div className="space-y-2">
  <label htmlFor="RiskManagement" className="block font-semibold mb-2">
    <span className="flex items-center gap-2">
      * <span>
        How do you handle Risk while working on a project (with example)
        {errors.RiskManagement && (
          <span className="text-red-500">{errors.RiskManagement.message}</span>
        )}
      </span>
      {/* {errors.expiryDate && <span className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</span>} */}
    </span>
  </label>

  <textarea
    id="RiskManagement"
    name="RiskManagement"
    placeholder="Describe your risk management approach with specific examples..."
    maxLength={250}
    rows={4}
    value={fields.RiskManagement}
    className="w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
    {...register("RiskManagement", { required: "Risk management description is required" })}
    onChange={handleChange}
  />

  <p className="text-sm text-gray-400 mt-1 flex justify-end">
    {countWords(fields.RiskManagement)} / Max 250 words
  </p>
</div>


                        </div>
                      </div>
                    )}
                    {selectedRole === "Director" && experiences === "Fresher" && (
                      <div className=' space-y-8 SelectionOne bg-richblack-700 rounded-lg border border-richblack-600'>
                        <h1 className="text-red-500 flex justify-center items-center gap-2"> All The Fields are Required in this Section </h1>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 Liness'>💡 Inspiration & Motivation</h3>
                          <div className='space-y-2'>
                             <label htmlFor="DirectorInspiration" className="block font-semibold mb-2 ">
                      <span className="flex items-center gap-2"> * <span>What inspires you to become a director?     {errors.DirectorInspiration && <span className="text-red-500">{errors.DirectorInspiration.message}</span> }</span></span>
                  </label>
          <textarea
                    id="DirectorInspiration"
                    name="DirectorInspiration"
                    placeholder="Tell Me Your Inspiration (max 250 characters)"
                    maxLength={250}
                    rows={4}
                     value={fields.DirectorInspiration}
                                              className='w-full Texetions bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
                    {...register("DirectorInspiration",{required:"Inspiration is required"})}
                      onChange={handleChange}
                  />
                <p className="text-sm text-gray-400 mt-1 flex justify-end">
        {countWords(fields.DirectorInspiration)} / Max 250 words
      </p>                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 Liness'>🎬 Project Experience</h3>
                          <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-300'>Projects done till now  {errors.fresherProjects && <span className="text-red-500">{errors.fresherProjects.message}</span>}  </label>
                            <select defaultValue="" className='w-full Texetions bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400' {...register("fresherProjects",{required:"Project Count is required"})}>
                              <option value="" disabled>Select Project Count</option>
                              {Projects.typicalTeamSizeRanges.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 Liness'>🚧 Early Challenges</h3>
                          <div className='space-y-2'>
                               <label htmlFor="EarlyChallengs" className="block font-semibold mb-2 ">
                      <span className="flex items-center gap-2"> * <span>What are the Early Challenges that you have Faced?     {errors.EarlyChallengs && <span className="text-red-500">{errors.EarlyChallengs.message}</span>} </span></span>
                  </label>
          <textarea
                    id="EarlyChallengs"
                    name="EarlyChallengs"
                    placeholder="What Earl Challenges You have faced (max 250 characters)"
                    maxLength={250}
                    rows={4}
                     value={fields.EarlyChallengs}
                                              className='w-full Texetions bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
                    {...register("EarlyChallengs",{required:"Early Challenges is required"})}
                      onChange={handleChange}
                  />
                <p className="text-sm text-gray-400 mt-1 flex justify-end">
        {countWords(fields.EarlyChallengs)} / Max 250 words
      </p> 
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 Liness'>📋 Project Planning</h3>
                          <div className='space-y-2'>
          <label htmlFor="ProjectPlanning" className="block font-semibold mb-2 ">
                      <span className="flex items-center gap-2"> * <span>How do you plan to PRopose the strateger Of Marketing For Your SHow      {errors.ProjectPlanning && <span className="text-red-500">{errors.ProjectPlanning.message}</span> }</span></span>
                  </label>
          <textarea
                    id="ProjectPlanning"
                    name="ProjectPlanning"
                    placeholder="Project Planning (max 250 characters)"
                    maxLength={250}
                    rows={4}
                     value={fields.ProjectPlanning}
                                              className='w-full Texetions bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
                    {...register("ProjectPlanning",{required:"Project Planning is required"})}
                      onChange={handleChange}
                  />
                <p className="text-sm text-gray-400 mt-1 flex justify-end">
        {countWords(fields.ProjectPlanning)} / Max 250 words
      </p> 
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 Liness'>📢 Promotion & Marketing</h3>
                          <div className='space-y-2'>
                                  <label htmlFor="ProjectPromotion" className="block font-semibold mb-2 ">
                      <span className="flex items-center gap-2"> * <span>What inspires you to become a director?     {errors.ProjectPromotion && <span className="text-red-500">{errors.ProjectPromotion.message}</span> }</span></span>
                  </label>
          <textarea
                    id="ProjectPromotion"
                    name="ProjectPromotion"
                    placeholder="How do you Handle The Promotion (max 250 characters)"
                    maxLength={250}
                    rows={4}
                     value={fields.ProjectPromotion}
                                              className='w-full Texetions bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
                    {...register("ProjectPromotion",{required:"Project Promotion is required"})}
                      onChange={handleChange}
                  />
                <p className="text-sm text-gray-400 mt-1 flex justify-end">
        {countWords(fields.ProjectPromotion)} / Max 250 words
      </p> 
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 Liness'>🎭 Scene Visualization</h3>
                          <div className='space-y-2'>
                                 <label htmlFor="SceneVisualize" className="block font-semibold mb-2 ">
                      <span className="flex items-center gap-2"> * <span>Before Recording a scene, how do you visualize a scene that is going to happen?     {errors.SceneVisualize && <span className="text-red-500">{errors.SceneVisualize.message}</span> }</span></span>
                  </label>
          <textarea
                    id="SceneVisualize"
                    name="SceneVisualize"
                    placeholder="Scene Visualization (max 250 characters)"
                    maxLength={250}
                    rows={4}
                     value={fields.SceneVisualize}
                                              className='w-full Texetions bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
                    {...register("SceneVisualize",{required:"Scene Visualization is required"})}
                      onChange={handleChange}
                  />
                <p className="text-sm text-gray-400 mt-1 flex justify-end">
        {countWords(fields.SceneVisualize)} / Max 250 words
      </p> 
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedRole === "Producer" && experiences === "Fresher" && (
                      <div className='space-y-8 SelectionOne bg-richblack-700 rounded-lg border border-richblack-600'>
                        <h1 className="text-red-500 flex justify-center items-center gap-2"> All The Fields are Required in this Section </h1>

                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400  Liness'>💡 Inspiration & Motivation</h3>
                     <div className='space-y-2'>
  <label htmlFor="DirectorInspiration" className="block font-semibold mb-2 ">
    <span className="flex items-center gap-2">
      * <span>What inspires you to become a director?</span>
      {errors.DirectorInspiration && (
        <span className="text-red-500">
          {errors.DirectorInspiration.message}
        </span>
      )}
    </span>
  </label>

  <textarea
    id="DirectorInspiration"
    name="DirectorInspiration"   // 👈 matches the key in fields
    placeholder="Inspiration (max 250 words)"
    rows={4}
    value={fields.DirectorInspiration}
    className="w-full Texetions bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
    {...register("DirectorInspiration", {
      required: "Director Inspiration is required",
    })}
    onChange={handleChange}
  />

  <p className="text-sm text-gray-400 mt-1 flex justify-end">
    {countWords(fields.DirectorInspiration)} / Max 250 words
  </p>
</div>


                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>🎬 Project Experience</h3>
                          <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-300'><span> * Projects done till now </span> {errors.fresherProjects && (
        <span className="text-red-500">
          {errors.fresherProjects.message}
        </span>
      )} </label>
                            <select defaultValue="" className='w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400' {...register("fresherProjects",{required:"Project Count is required"})}>
                              <option value="" disabled>Select Project Count</option>
                              {Projects.typicalTeamSizeRanges.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>💰 Budget Planning</h3>
<div className="space-y-2">
  <label htmlFor="BudgetHandling" className="block font-semibold mb-2">
    <span className="flex items-center gap-2">
      * <span>
        How do you plan a budget for a film?
        {errors.BudgetHandling && (
          <span className="text-red-500">{errors.BudgetHandling.message}</span>
        )}
      </span>
    </span>
  </label>

  <textarea
    id="BudgetHandling"
    name="BudgetHandling"
    placeholder="Budget planning and financial management... (max 250 words)" 
    maxLength={250}
    rows={4}
    value={fields.BudgetHandling}
    className="w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
    {...register("BudgetHandling", { required: "Budget planning is required" })}
    onChange={handleChange}
  />

  <p className="text-sm text-gray-400 mt-1 flex justify-end">
    {countWords(fields.BudgetHandling)} / Max 250 words
  </p>
</div>

                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>🎓 Experience & Funding</h3>
                         {/* Internship Experience Section */}
<div className="flex flex-col justify-around items-center">
  <span className="flex gap-1">
    *<span>Do you have any Internship or Crowd Funding Experience?</span>
  </span>
  <div className="flex gap-2">
    <label>
      <input
        type="radio"
        name="internshipExperience"
        value="Yes"
        checked={internship === "Yes"}
        onChange={() => {
          setInternship("Yes");
          setValue("internshipExperience", "Yes");
        }}
      />
      Yes
    </label>
    <label>
      <input
        type="radio"
        name="internshipExperience"
        value="No"
        checked={internship === "No"}
        onChange={() => {
          setInternship("No");
          setValue("internshipExperience", "No");
        }}
      />
      No
    </label>
  </div>
  <input type="hidden" {...register("internshipExperience", { required: "Experience is required" })} value={internship} />
</div>

{/* Hide / Show toggle */}
{internship === "Yes" && openIntern && (
  <div className="flex gap-1 One">
    <FaCaretDown
      className="text-2xl cursor-pointer fill-red-600"
      onClick={() => setOpenIntern(false)}
    />
    <span>Hide Internship</span>
  </div>
)}

{internship === "Yes" && (
  <div className={`${openIntern ? "hidden" : "w-full One flex flex-col justify-around gap-2"}`}>
    <div className="flex flex-row">
      <FaCaretDown
        className="text-2xl cursor-pointer"
        onClick={() => setOpenIntern(true)}
      />
      <span>Show Internship</span>
    </div>

    {/* Dynamic Internship Fields */}
    {internships.map((field, index) => (
      <div
        className="flex gap-4 p-3 border-b border-gray-700 w-full justify-around items-center"
        key={field.id}
      >
        {/* Internship Name */}
        <label htmlFor={`internships.${index}.InternshipName`} className="flex flex-col gap-2">
          <span className="flex justify-start items-center gap-3">
            *<span>Internship Name</span>
          </span>
          <input
            type="text"
            placeholder="Enter Internship Name"
            className="form-style h-9 w-[250px] bg-richblack-600 rounded-2xl px-3"
            {...register(`internships.${index}.InternshipName`, {
              required: "Internship name is required",
            })}
          />
          {errors?.internships?.[index]?.InternshipName && (
            <span className="text-red-500 text-sm">
              {errors.internships[index].InternshipName.message}
            </span>
          )}
        </label>

        {/* Internship Documents */}
        <label htmlFor={`internships.${index}.InternshipDocs`} className="flex flex-col gap-2">
          <span className="flex items-center gap-3">
            *<span>Certificate / Documents</span>
          </span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="form-style bg-richblack-600 rounded-2xl p-2"
            {...register(`internships.${index}.InternshipDocs`, {
              required: "Internship file is required",
              validate: {
                fileSize: (files) =>
                  files?.[0]?.size <= 5 * 1024 * 1024 || "File size must be less than 5MB",
              },
            })}
            onChange={(e) => {
              setValue(`internships.${index}.InternshipDocs`, e.target.files[0], { shouldValidate: true });
            }}
          />
          {errors?.internships?.[index]?.InternshipDocs && (
            <span className="text-red-500 text-sm">
              {errors.internships[index].InternshipDocs.message}
            </span>
          )}
        </label>

        {/* Start Date */}
        <label htmlFor={`internships.${index}.StartDate`} className="flex flex-col gap-2">
          <span className="flex items-center gap-3">*<span>Start Date</span></span>
          <input
            type="date"
            className="form-style h-9 w-[150px] bg-richblack-600 rounded-2xl px-2"
            {...register(`internships.${index}.StartDate`, {
              required: "Start date is required",
            })}
          />
          {errors?.internships?.[index]?.StartDate && (
            <span className="text-red-500 text-sm">
              {errors.internships[index].StartDate.message}
            </span>
          )}
        </label>

        {/* Completion Date */}
        <label htmlFor={`internships.${index}.EndDate`} className="flex flex-col gap-2">
          <span className="flex items-center gap-3">*<span>Completion Date</span></span>
          <input
            type="date"
            className="form-style h-9 w-[150px] bg-richblack-600 rounded-2xl px-2"
            {...register(`internships.${index}.EndDate`, {
              required: "Completion date is required",
            })}
          />
          {errors?.internships?.[index]?.EndDate && (
            <span className="text-red-500 text-sm">
              {errors.internships[index].EndDate.message}
            </span>
          )}
        </label>

        {/* Remove Button */}
        <div
          className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-red-600 cursor-pointer"
          onClick={() => {
            if (internships.length === 1) {
              setInternError("You need to keep at least one field");
            } else {
              removeIntern(index);
              setInternError("");
            }
          }}
        >
          <RxCross1 className="text-richblack-100" />
        </div>
      </div>
    ))}

    {/* Error */}
    {internError && (
      <span className="text-red-500 text-sm flex justify-center items-center">
        {internError}
      </span>
    )}

    {/* Add More */}
    <button
      type="button"
      className="px-4 py-1 bg-blue-600 text-white rounded Adding w-full"
      onClick={() => {
        if (internships.length >= 4) {
          setInternError("You can create 4 fields only");
        } else {
          appendIntern({ InternshipName: "", InternshipDocs: "", StartDate: "", EndDate: "" });
          setInternError("");
        }
      }}
    >
      Add more
    </button>
  </div>
)}

                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>🤝 Networking & Industry Relations</h3>
<div className="space-y-2">
  <label htmlFor="Networking" className="block font-semibold mb-2">
    <span className="flex items-center gap-2">
      * <span>
        How do you plan to network with other people of the industry?
        {errors.Networking && (
          <span className="text-red-500">{errors.Networking.message}</span>
        )}
      </span>
    </span>
  </label>

  <textarea
    id="Networking"
    name="Networking"
    placeholder="Networking strategy (max 250 words)"
    maxLength={250}
    rows={3}
    value={fields.Networking}
    className="w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
    {...register("Networking", { required: "Networking plan is required" })}
    onChange={handleChange}
  />

  <p className="text-sm text-gray-400 mt-1 flex justify-end">
    {countWords(fields.Networking)} / Max 250 words
  </p>
</div>


                        </div>
                        <div className='space-y-4'>
                          <h3 className='text-lg font-semibold text-yellow-400 mb-4'>⏰ Risk Management</h3>
<div className="space-y-2">
  <label htmlFor="FundDelays" className="block font-semibold mb-2">
    <span className="flex items-center gap-2">
      * <span>
        How do you handle Funding Delays?
        {errors.FundDelays && (
          <span className="text-red-500">{errors.FundDelays.message}</span>
        )}
      </span>
    </span>
  </label>

  <textarea
    id="FundDelays"
    name="FundDelays"
    placeholder="Risk Management (max 250 words)"
    maxLength={250}
    rows={3}
    value={fields.FundDelays}
    className="w-full px-3 py-2 bg-richblack-800 border border-richblack-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
    {...register("FundDelays", { required: "Funding delays strategy is required" })}
    onChange={handleChange}
  />

  <p className="text-sm text-gray-400 mt-1 flex justify-end">
    {countWords(fields.FundDelays)} / Max 250 words
  </p>
</div>


                        </div>
                      </div>
                    )}  
                  </div>
                </div>
              </div>
            </div>

            <div className='text-white w-full h-[140px] pp bg-richblack-800 rounded-md flex flex-col justify-center items-center gap-3'>
               <div>
              <label className='flex justify-center items-center gap-3'>
                <input
                  type="checkbox"
                  {...register("privacyPolicy", { required: "You must agree to the Privacy & Policy" })}/>
                  I agree to the Privacy & Policy
              </label>
              {errors.privacyPolicy && <span className="text-red-500">{errors.privacyPolicy.message}</span>}
            </div>
            <div className='text-white'>
              <label className='flex justify-center items-center gap-3'>
                <input
                  type="checkbox"
                  {...register("termsAndConditions", { required: "You must agree to the terms and conditions" })}/>
                  I agree to he Terms & Conditions
              </label>
              {errors.termsAndConditions && <span className="text-red-500">{errors.termsAndConditions.message}</span>}
            </div>
            <button type="submit" className='w-full h-8 bg-yellow-300 rounded-md'>Submit</button>
            </div>
                  {confirmationModal && <Logout modalData={confirmationModal} />}
          </form>
      </div>
    </div>
  );
};
export default OrganizerVerificationForm;