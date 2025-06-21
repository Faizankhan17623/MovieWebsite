import Navbar from './Components/Home/Navbar'
import toast from 'react-hot-toast';
import Slider from './Components/Home/Slider'
import Finder from './Components/Home/Finder'
import Listing from './Components/Home/Listing';
import {  Routes, Route } from "react-router-dom";
import About from './Components/Home/AboutUs'
import Contact from './Components/Home/contact'

const Homelayout = ({Notify}) =>{
  return(
    <div className={`bg-richblack-900 min-h-screen`}>
    <div className="max-w-[1440px] mx-auto px-4 overflow-hidden">
      <Navbar setColors={Notify}  />
      <div className="mt-6">
        <Slider />
      </div>
      <Finder />
    </div>
      <Listing/>
  </div>
  )
}

const App = () => {
  const notify = () => toast.error('Work Under Progress !');
  return (
    <div className={`bg-richblack-900 min-h-screen`}>
      <Routes>
        <Route path='/' element={<Homelayout  Notify={notify}/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default App