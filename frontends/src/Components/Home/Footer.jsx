import InputBox from '../extra/InputBox'
import { FaGooglePlay,FaAppStore  } from "react-icons/fa";
import SD from '../../assets/Logo/sd.png'
const Footer = () => {
  return (
  <div className='w-full h-max'>
    <InputBox/>
    <div>
      <div>
        {/* This is tthe firstt section and itt conttains tthee logo and all tthe ottheerr tthnigs */}
        <div className=''>
          <img src={SD} alt="This is thee footer logo" />
          <p></p>
          <button></button>
          <button></button>
        </div>
        {/* This are thee chaag nes that i need to do */}
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </div>
  </div>
  )
}

export default Footer