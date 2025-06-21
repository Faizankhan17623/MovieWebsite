import Navbar from './Navbar'
import Image1 from '../../assests/review3.png'
const AboutUs = () => {
  return (
    <div className='w-full h-[800px] text-white  overflow-hidden'>
        <Navbar/>
        <div className='w-full h-[61%] border flex flex-col justify-evenly items-center gap-3'>
            <h1 className='text-2xl '>A New Concept for the Brighter Future To help Everyone</h1>
            <p className=''>Cine Circuit is a Very Newley concept that was beeen made by our funder and help from some of his friends that are trying to make the movie industry working a little bit simpler by the means of this platform the orgainezer can have all the details of the last ticket that he has created and how many of them are been sold till now and can geet reviews better then so called movie reviewer and help them to imporove and create new things in the future And help the communitey to grow More And Earn More</p> 
        </div>
        <div className='flex relative -top-5 justify-around items-center bg-none'>
                <img src={Image1} alt="First Logo" loading='lazy' className='w-1 h-1' />
                <img src={Image1} alt="Second Logo"  loading='lazy'className=''/>
                <img src={Image1} alt="Third Logo" loading='lazy'  className=''/>
        </div>
        <div>

        </div>
    </div>
  )
}

export default AboutUs
