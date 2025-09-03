import Left from './LeftSide'
import Right from './RightSide'
import Navbar from '../Home/Navbar'
import { Outlet ,useLocation } from 'react-router-dom'

const Connector = () => {

  const location = useLocation();
  const isBaseDashboard = location.pathname === '/Dashboard' || location.pathname === '/Dashboard/';

  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col'>
      <Navbar />
      <div className='w-full h-full flex flex-row'>
        <div className='w-1/7 border h-full flex-shrink-0'>
          <Left />
        </div>
        <div className='flex-1 h-full overflow-auto w-full  bg-richblack-900'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Connector