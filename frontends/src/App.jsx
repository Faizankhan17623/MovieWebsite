import Navbar from './Components/Home/Navbar'
import toast from 'react-hot-toast';
import Slider from './Components/Home/Slider'
import Finder from './Components/Home/Finder'
import Listing from './Components/Home/Listing';
import {  Routes, Route } from "react-router-dom";
import About from './Components/Home/AboutUs'
import Contact from './Components/Home/contact'
import Join from './Components/UserCreation/Join'
import OPT from './Components/UserCreation/OTP'
import Login from './Components/Login/join'
import Forgot from './Components/Login/Forgot'
import Reset from './Components/Login/Reset'
import OpenRoute from './Hooks/OpenRoute'
import Dasboard from './Components/Dashboard/dashboard'


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
    <div className={`bg-richblack-800 min-h-screen`}>
      <Routes>
        <Route path='/' element={<Homelayout  Notify={notify}/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/SignUp' element={<Join/> }/>
        <Route path='/Login' element={ <Login/>}/>
        <Route path='/OTP' element={<OPT/>}/>
        <Route path='/dashboard' element={
           <OpenRoute>
             <Dasboard/>
           </OpenRoute>
          }/>

        <Route path='/Forgot-Password' element={
          <OpenRoute>
            <Forgot/>
          </OpenRoute> 
          }/>
        <Route path='/Reset-Password/:id' element={ 
          <OpenRoute>
            <Reset/> 
          </OpenRoute>
          }/>
      </Routes>
    </div>
  )
}

export default App