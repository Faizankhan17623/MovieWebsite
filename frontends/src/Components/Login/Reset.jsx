import { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import Loader from '../extra/Loading'
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia"
import { useForm } from 'react-hook-form'
import { FaLongArrowAltLeft } from "react-icons/fa";


const Reset = () => {
       const {
          register,
          handleSubmit,
          formState: { errors },
          watch
        } = useForm()
        
        const Password = watch('NewPass')
        const [Lower, setLower] = useState('');
        const [Upper, setUpper] = useState(false);
        const [Number, setNumber] = useState(false);
        const [Special, setSpecial] = useState(false);
        const [LengthValid, setLengthValid] = useState(false);
        const [Pass,setPass] = useState(false)
        const [Confirm,setConfirm] = useState(false)
    
    const onChange = (data)=>{
        console.log("This is the data",data)
    }


    const Maximum = '5'
useEffect(() => {
  const hasLower = /[a-z]/.test(Password);
  const hasUpper = /[A-Z]/.test(Password);
  const hasNumber = /[0-9]/.test(Password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(Password);
  const isLengthValid  = Password?.length > Maximum

  setLower(hasLower);
  setUpper(hasUpper);
  setNumber(hasNumber);
  setSpecial(hasSpecial);
  setLengthValid(isLengthValid);
}, [Password]); 


  return (
    <div className='w-screen h-screen overflow-x-hidden flex flex-col'>
        <Navbar/>
        <div className='flex flex-1 justify-center items-center text-white'>
            <div className=' h-fit w-96 flex flex-col gap-3'>
                <h1 className='font-semibold text-3xl'>Choose New Password</h1>
                <p className='font-inter text-xl'> Almost done. Enter your Password and youre all set.</p>

                <form className='flex flex-col gap-3' onSubmit={handleSubmit(onChange)}>
              
                    <div>
                        <label htmlFor="NewPass">
                            New Password <span className="text-red-500">*</span>                           {errors.NewPass && (
              <span className="text-red-600 text-sm">{errors.NewPass.message}</span>
            )}
                            <input type={`${Pass?"text":"password"}`} name="NewPass"
                            placeholder='Enter Your New password'
              className={`w-full p-3  rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition `}

                              id=""  {...register("NewPass", { required: "Password is Required",minLength:{value:6,message:"Password must be atleat of 6 characters"},maxLength:{value:10,message:"Maximum length is of 10 Characters"}})}/>
                        </label>
                         <button
              type="button"
              className="relative left-86 bottom-6 transform -translate-y-1/2 text-2xl text-richblack-900"
              tabIndex={-1}
              onClick={() => setPass(s => !s)}
            >
              {Pass ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
            </button>
                    </div>
                    <div>
                        <label htmlFor="ConfirmPass">
                            Confirm new Password <span className="text-red-500">*</span> {errors.ConfirmPass && (
              <span className="text-red-600 text-sm">{errors.ConfirmPass.message}</span>
            )}
                            <input type={`${Confirm?"text":"password"}`}
                            placeholder='Confirm Your new Password'
              className={`w-full p-3  rounded-lg form-style outline-none focus:ring-2 focus:ring-blue-400 transition`}
            //   value={Password}
                             name="ConfirmPass" id=""  {...register("ConfirmPass", {  required: "Password is Required" ,minLength:{value:6,message:"Password must be atleat of 6 characters"},maxLength:{value:10,message:"Maximum length is of 10 Characters"},validate: (val) =>
                val === Password || "Passwords do not match"
            })}/>
                        </label>
                            <button
              type="button"
              className="relative left-86 bottom-6 transform -translate-y-1/2 text-2xl text-richblack-900"
              tabIndex={-1}
              onClick={() => setConfirm(s => !s)}
            >
              {Confirm ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
            </button>
                    </div>
                

                <div className='flex flex-col gap-2'>
                    <div className='w-full flex flex-row justify-around items-center'>
                        <span className='flex gap-1 '><span className={`${Lower?"bg-caribgreen-200":"bg-red-600"} flex justify-center items-center  bgs text-richblack-800`}>  {Lower ? '✔' : 'X'}</span><p>one lowercase character</p></span>
                        <span className='flex gap-1 '><span className={`${Special?"bg-caribgreen-200":"bg-red-600"} flex justify-center items-center  bgs text-richblack-800`}>{Special ? '✔' : 'X'}</span><p>one special character</p></span>
                    </div>
                    <div className='w-full flex flex-row justify-around items-center'>  
                        <span className='flex gap-1'><span className={`${Upper?"bg-caribgreen-200":"bg-red-600"} flex justify-center items-center  bgs text-richblack-800`}>{Upper ? '✔' : 'X'}</span><p>one uppercase character</p></span>
                        <span className='flex gap-1'><span className={`${LengthValid?"bg-caribgreen-200":"bg-red-600"} flex justify-center items-center  bgs text-richblack-800`}>{LengthValid ? '✔' : 'X'}</span><p>6 character maximum</p></span>
                    </div>
                    <div className='w-full flex flex-row justify-self-start items-start'>
                        <span className='flex gap-1 NUmbers'><span className={`${Number?"bg-caribgreen-200":"bg-red-600"} flex justify-center items-center  bgs text-richblack-800`}>{Number ? '✔' : 'X'}</span><p>one number</p></span>
                    </div>

                </div>
                <button type="submit"
            className="w-full bg-yellow-200 Org_Btns hover:bg-yellow-300 text-white font-semibold  rounded-lg  text-lg transition duration-200 shadow"

                >Reset Password</button>
               <div className='w-full flex-1'>
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

export default Reset