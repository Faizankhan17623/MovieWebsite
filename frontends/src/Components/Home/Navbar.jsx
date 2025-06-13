import React, { useEffect, useState } from 'react'
import Image from '../../assets/Logo/sd-removebg-preview.png'
// sd-removebg-preview.png
import Image2 from '../../assets/Logo/sdreincarneted-removebg-preview.png'
// import Image3 from '../../assets/Logo/dada_bhai_image-removebg-preview.png'
import Image4 from '../../assets/Logo/energy.jpg'

import { FaLongArrowAltDown } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";

import '../../App.css'

const Navbar = ({setColors,darkmode}) => {

  const [path, setpath] = useState(false)

  useEffect(()=>{

    const currentUrl = window.location.pathname
    setpath(currentUrl)

  },[])

  const tagsnames = {
    tag:[
      "Adventure",
      "Martial",
      "Superhero",
      "Disaster",
      "Spy Secret",
      "War",
      "Crime"
    ]
  };

  const theatreTypes = {
  types: [
    "Multiplex Theatre",
    "IMAX Theatre",
    "3D Theatre",
    "4DX Theatre",
    "Drive-in Theatre",
    "Single Screen Theatre",
    "Open Air Theatre"
  ]
};
const color_change = ()=>{
  setColors(!darkmode)
  
}
// w-full h-26 flex justify-between items-center border-b-3 text-white
  return (
    <div className='w-screen h-26 flex justify-between items-center border-b-3 text-white'>
        <div className='py-4 pl-6'>
          <a href="/" className=''>
            <img src={Image} alt="Main logo" className='h-18 w-[250px] text-black' loading='lazy'/>
          </a>
        </div>


         <div className= 'w-[450px]  py-4 px-3'>
            <ul className={`flex justify-between items-center h-full text-white`}>
                <a href="/" className={`hover:text-yellow-500 text-white ${path === '/' ? 'text-yellow-200' : ''}`} >Home</a>
                <div className={`hover:text-yellow-500 text-white ${path === '/Movies' ? 'text-yellow-200' : ''} flex items-center gap-1 group relative z-10`}>
  <a href="/Movies" className="flex items-center gap-1">
    Movies <FaLongArrowAltDown className='text-blue-300 group-hover:rotate-180'/>
  </a>
  <div className="hidden group-hover:flex flex-col absolute top-7 left-0 bg-white shadow-lg rounded-md ">
    {tagsnames.tag.map((tag, index) => (
      <a
        href={`/Movies/${tag}`}
        key={index}
        className={`py-2 px-4 hover:bg-gray-100 whitespace-nowrap cursor-pointer border-b-2 text-white bg-gray-800
        `}
      >
        {tag}
      </a>
    ))}
  </div>
</div>

<div className={`hover:text-yellow-500 text-white ${path === '/Theatres' ? 'text-yellow-200' : ''} flex items-center gap-1 group relative z-10`}>
  <a href="/Theatres" className="flex items-center gap-1">
    Theatres <FaLongArrowAltDown className='text-blue-300 group-hover:rotate-180'/>
  </a>
  <div className="hidden group-hover:flex flex-col absolute top-7 left-0 bg-white shadow-lg rounded-md ">
    {theatreTypes.types.map((tag, index) => (
      <a
        href={`/Theatres/${tag}`}
        key={index}
        className={`py-2 px-4 hover:bg-gray-100 whitespace-nowrap cursor-pointer border-b-2 text-white bg-gray-800`}
      >
        {tag}
      </a>
    ))}
  </div>
</div>
                {/* Theatres */}
                <a href="/About" className={`hover:text-yellow-500 text-white ${path === '/About' ? 'text-yellow-200' : ''}`}>About Us</a>
                <a href="/Contact" className={`hover:text-yellow-500 text-white ${path === '/Contact' ? 'text-yellow-200' : ''}`}>Contact Us</a>
            </ul>
        </div>
        <div className=' text-white w-[300px]  h-16  flex justify-center items-center'>
          <div className='flex justify-evenly items-center  w-[55%]'>
            <span onClick={color_change}>{<FaMoon className='text-white text-3xl'/>}</span>
            <MdOutlineShoppingCart className={`text-white text-3xl`} /> 
            <div className=''>
              <img src={Image2} alt="login logo" className='w-10 fill-black'/>
            </div>
          </div>
        </div>
       
    </div>
  )
}

export default Navbar