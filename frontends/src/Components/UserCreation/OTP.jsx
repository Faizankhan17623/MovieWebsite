import OtpInput from 'react-otp-input';
import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../Home/Navbar';
import { LuTimerReset } from "react-icons/lu";
import { HiArrowNarrowLeft } from "react-icons/hi";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [decrement, setDecrement] = useState(0);
  const intervalRef = useRef();
  // console.log(intervalRef)

  // Start/restart countdown
  const MainOtp = '111111'
const navigate = useNavigate()
  const startCountdown = () => {
    setDecrement(60);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDecrement(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start timer on mount & clear on unmount
  useEffect(() => {
    startCountdown();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  // Simulate OTP verification
  const handleVerifyClick = () => {
  //  otp.filter((data)=>{data === MainOtp ;return toast.success("verified")})
  //   alert(`Verifying code: ${otp}`);

  if(otp === MainOtp){
    navigate('/')
    return toast.success("done")
  }
    toast.error("wrong otp input")
  };

  const handleResendOtp = () => {
    // TODO: call API to send new OTP here
    alert('OTP sent again!');
    setOtp('');
    startCountdown();
  };
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col overflow-x-hidden'>
      <Navbar />
      <div className="w-full h-[600px] flex justify-center items-center text-white flex-col">
        <div className='w-[30%] h-[49%] flex flex-col justify-around'>
          <h1 className='font-bold text-4xl text-center'>Verify Email</h1>
          <p className='text-center'>A Verification Code has been sent to your Email.<br />Please enter the code below.</p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                type="tel"
                maxLength={1}
                {...props}
                placeholder="–"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[44px] sm:w-[48px] md:w-[54px] lg:w-[60px] border-0 bg-slate-800 text-xl rounded-md text-gray-100 aspect-square text-center focus:ring-2 focus:ring-yellow-400"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
              margin: '0 auto',
            }}
          />
          <div className='flex flex-row justify-center items-center gap-2'>
            <span className='font-semibold'>Resend in:</span>
            <span className='text-yellow-300 font-mono text-xl'>{decrement}s</span>
          </div>

          <button
            type='submit'
            className={`mt-2 bg-yellow-200 hover:bg-yellow-100 w-full h-12 text-brown-900 rounded-md font-bold text-lg transition-all disabled:opacity-50`}
            onClick={handleVerifyClick}
            disabled={otp.length < 6}
          >
            Verify And Register
          </button>

          <div className='w-full flex flex-row justify-between items-center h-12 mt-3'>
            <button className='flex flex-row justify-center items-center gap-2 font-medium text-white hover:text-yellow-400 transition' onClick={()=>navigate('/SignUp')}>
              <HiArrowNarrowLeft className='text-2xl' /> Back To Account Creation
            </button>
            <button
              className='flex flex-row justify-center items-center gap-1 font-medium text-blue-200 hover:text-yellow-400 transition disabled:opacity-40 disabled:cursor-not-allowed'
              disabled={decrement > 0}
              onClick={handleResendOtp}
            >
              <LuTimerReset className='text-xl' />
              <span>{decrement > 0 ? 'Resend OTP' : 'Resend OTP'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
