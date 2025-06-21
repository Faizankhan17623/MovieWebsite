import { FaHeart  } from "react-icons/fa";

import Navbar from './Navbar'
import Image1 from '../../assests/review.png'
const AboutUs = () => {
  return (
    <div className='w-full h-[900px] text-white  overflow-x-hidden'>
        <Navbar/>
        <div className='w-full h-[61%]  flex flex-col justify-center items-center gap-4 bg-richblack-600'>
            <h1 className='text-2xl '>A New Concept for The Future Generations</h1>
            <h2 className='text-blue-100 flex justify-center items-center gap-2'>Hated By None <FaHeart/>Loved By Millions</h2>
            <p className='w-[80%]  h-[65%] flex justify-center items-center text-2xl'>Cine Circuit is a Very Newley concept that was beeen made by our funder and help from some of his friends that are trying to make the movie industry working a little bit simpler by the means of this platform the orgainezer can have all the details of the last ticket that he has created and how many of them are been sold till now and can geet reviews better then so called movie reviewer and help them to imporove and create new things in the future And help the communitey to grow More And Earn More</p> 
            <div className='flex relative top-[50px] justify-around items-center bg-none w-full h-[100px] '>
                <img src={Image1} alt="First Logo" loading='lazy' className='w-[380px]'/>
                <img src={Image1} alt="Second Logo"  loading='lazy'className='w-[380px]'/>
                <img src={Image1} alt="Third Logo" loading='lazy'  className='w-[380px]'/>
            </div>
        </div>


<div className="bg-richblack-800 top-[150px] w-full h-[400px]  flex justify-center items-center flex-col  border-b-2">
  <div className="w-[92%] flex flex-col gap-2 justify-center items-center">
    <p className="font-mono text-2xl">
      We are passionate about how the thingss <span className="text-blue-200">work and we want to bring A change</span> in this industry <br />
      so we are working on inovation driven that can help us to make a change and be a part of it <br />
      and create an <span className="text-orange-400">Unparalled Experience</span>
    </p>
  </div>
</div>
<div className="w-full bg-richblack-800 h-[400px]  text-white flex justify-evenly items-center flex-row">
  <div className="flex justify-evenly items-center w-[50%] flex-col  h-[95%]">
    <p className="text-orange-500 text-3xl">Our Founding Story</p>

      <p>Our plaatform was sttarrtted in a sharred vision and passion for trranorming thee local movie tickeet selling business and to makee it in aa veery strructured pipeline way and heelp thee makerrs tto ttraack all thee tickeets and all the reevvies that are been coming from thee peoples mouth and usee tthem iin an opportunitted waay to rapidly evolve in an digittal world </p>

      <p>As an MMove enthusiast ourr self we aalways find it veery dificult tto geett thee movvies that are in he ttreendiing istt in tthe rright budgeett and in the rright plaace wheree we can see it so forr eliminaatting that husttle we have laaunched a project that can help you to fiind them and also the ceators tto moniittor all tthee tickeetts and make aa way so thaat thee exxtrra saales do not happen on ttheir tickeet and tthee are not in tthee loss and also heelp them tocraate more and more good thiings in ttheir full potential</p>

  </div>
      <img src={Image1} alt="logo 1"  loading="lazy" className="w-[400px]"/>
  {/* <div>

  </div> */}
</div>
    </div>
  )
}

export default AboutUs