import React, { useEffect, useState } from 'react'
import { FaLongArrowAltDown , FaSearch  } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch ,IoMdMenu } from "react-icons/io";
import '../../App.css'

const Navbar = ({setColors,darkmode}) => {
  
  const [path, setpath] = useState(false)
  const [Open,Setopen] = useState(false)
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

const noLoggeedin ={
  data:[
    "Sign Up",
    "login",
    "Help Center"
  ]
}
const color_change = ()=>{
  setColors(!darkmode)
  
}
// w-full h-26 flex justify-between items-center border-b-3 text-white
  return (
    <div className='w-screen h-20 flex justify-between items-center border-b-1 text-white'>
        <div className='py-4 pl-6'>
          <a href="/" className=''>
            <img src={'https://res.cloudinary.com/dp6kj5f6i/image/upload/v1750395467/sd-removebg-preview_hlj26r.png'} alt="Main logo" className='h-18 w-[250px] text-black' loading='lazy'/>
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

        <div className=' text-white w-[300px]  h-16  flex justify-center gap-5 items-center'>
          <div onClick={color_change}>
            <span><FaMoon className='text-white text-3xl'/></span>
          </div>
          <div>
            <span><MdOutlineShoppingCart className={`text-white text-3xl`} /></span>
          </div>
          <div>
            <span><IoIosSearch className={`text-white text-3xl`} /></span>
          </div> 
          <div className='w-[100px] h-11 flex justify-center gap-2 items-center  bg-puregreys-100 rounded-4xl' onClick={()=>Setopen(!Open)}>
            <IoMdMenu className='text-4xl'/>
            <img src={'https://res.cloudinary.com/dp6kj5f6i/image/upload/v1750395467/sdreincarneted-removebg-preview_dnvhmc.png'} alt="Logo" loading='lazy' className='w-8'/>
              <span className={`${Open ? 'flex' : 'hidden'} flex-col absolute top-[78px]  triangle-up `}></span>
              <div className={`${Open ? 'flex justify-center items-center border-t-4' : 'hidden'} flex-col gap-2 text-white absolute top-[92px] bg-gray-800 p-2 rounded shadow-lg z-50 w-30 border-b-1`}>
                <a href="/" className='border-b-1 gap-2 lines'>{noLoggeedin.data[0]}</a>
                <a href="/" className='border-b-1 gap-2 lines'>{noLoggeedin.data[1]}</a>
                <a href="/" className=''>{noLoggeedin.data[2]}</a>
              </div>
            
          </div>
        </div>
    </div>
  )
}

export default Navbar