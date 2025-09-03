import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { LuUserRound } from 'react-icons/lu';
import { FaBookBookmark, FaCartShopping } from 'react-icons/fa6';
import { CiBookmark } from 'react-icons/ci';
import { IoTicketSharp, IoSettings, IoLogOutOutline } from 'react-icons/io5';
import Logout from '../extra/Logout';
import { UserLogout } from '../../Services/operations/Auth';
import { loadUserFromLocalStorage } from '../../Slices/ProfileSlice';
import { FaCaretDown } from 'react-icons/fa';
import { CiChat1 } from 'react-icons/ci';
import { MdReviews } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import isVerificationSubmitted from './OrganizerVerificationForm'
const LeftSide = () => {
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [text, setText] = useState('My Profile');
  const [extra, setExtra] = useState('');
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [inside, setInside] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loadUserFromLocalStorage());
    }
  }, [dispatch, user]);

  const viewerNav = [
    { icon: LuUserRound, label: 'My Profile', path: '/Dashboard/My-Profile', id: 1 },
    { icon: FaBookBookmark, label: 'Purchased Tickets', path: '/Dashboard/Purchased-Tickets', id: 2 },
    { icon: CiBookmark, label: 'Wishlist', path: '/Dashboard/Wishlist', id: 3 },
    { icon: FaCartShopping, label: 'Purchase History', path: '/Dashboard/Purchase-History', id: 4 },
  ];

  const organizerNav = [
    { icon: LuUserRound, label: 'My Profile', path: '/Dashboard/My-Profile', id: 1 },
    { icon: FaBookBookmark, label: 'My Shows', path: '/Dashboard/Manage-Events', id: 2 },
    {
      icon: FaCartShopping,
      label: 'Create Show',
      path: '/Dashboard/Shows',
      id: 3,
      disabled: !user.verified || !isVerificationSubmitted,
    },
    { icon: CiChat1, label: 'Chat', path: '/Dashboard/My-Venues', id: 4 },
    { icon: MdReviews, label: 'Reviews', path: '/Dashboard/My-Venues', id: 5 },
    {
      icon: IoSettings, // Using IoSettings icon for verification form link
      label: 'Organizer Verification',
      path: '/Dashboard/Organizer-Verification',
      id: 6,
      disabled: isVerificationSubmitted, // Disable once submitted
    },
  ];

  const adminNav = [
    { icon: LuUserRound, label: 'My Profile', path: '/Dashboard/My-Profile', id: 1 },
    { icon: FaBookBookmark, label: 'User Management', path: '/Dashboard/User-Management', id: 2 },
    { icon: IoSettings, label: 'Site Settings', path: '/Dashboard/Site-Settings', id: 3 },
  ];

  const navMap = {
    [ACCOUNT_TYPE.USER]: viewerNav,
    [ACCOUNT_TYPE.ORGANIZER]: organizerNav,
    [ACCOUNT_TYPE.ADMIN]: adminNav,
  };

  const navigationItems = navMap[user?.usertype] || [];

  const isVerificatioasdefnSubmitted = localStorage.getItem("user");
  // console.log(isVerificatioasdefnSubmitted.verified)
  if (!user) {
    return (
      <div className="w-full h-full bg-richblack-800 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-richblack-800 flex flex-col text-richblack-900">
      <nav className="flex flex-col gap-3 Sides text-richblack-100">
        {navigationItems.map(({ icon: Icon, label, path, id, disabled }) => (
          <div key={id} className="flex flex-col">
            {label === 'Create Show' ? (
              <>
                <button
                  className={`flex items-center justify-between w-full text-left p-2 Drop rounded ${
                    text === label ? 'bg-yellow-200 text-richblack-900' : 'hover:bg-richblack-700'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  onClick={() => {
                    if (!disabled && user.verified) {
                      setShow((prev) => !prev);
                      setInside('');
                      setText(label);
                    }
                  }}
                  disabled={disabled}
                >
                  <span className="flex items-center gap-2">
                    {disabled && <FaLock />}
                    <Icon />
                    {label}
                  </span>
                  <FaCaretDown className={`transition-transform ${show ? 'rotate-180' : ''}`} />
                </button>

                {show && (
                  <div className="ml-8 mt-2 subMenu flex flex-col gap-2">
                    <div
                      className={
                        inside === 'Create Tags'
                          ? 'hover:text-yellow-200 flex items-center gap-6 cursor-pointer text-yellow-200'
                          : 'flex items-center gap-6'
                      }
                      onClick={() => setInside((prev) => (prev === 'Create Tags' ? '' : 'Create Tags'))}
                    >
                      Create Tags <FaCaretDown className={`${inside === 'Create Tags' ? 'rotate-180' : ''}`} />
                    </div>
                    {inside === 'Create Tags' && (
                      <div className="ml-8 mt-2 flex flex-col gap-2 Tags1">
                        <Link to="/Dashboard/Shows/Option1" className="hover:text-yellow-200">
                          Create Tags
                        </Link>
                        <Link to="/Dashboard/Shows/Option2" className="hover:text-yellow-200">
                          Update Tags
                        </Link>
                        <Link to="/Dashboard/Shows/Option3" className="hover:text-yellow-200">
                          Delete Tags
                        </Link>
                        <Link to="/Dashboard/Shows/Option4" className="hover:text-yellow-200">
                          See All Tags
                        </Link>
                      </div>
                    )}

                    <div
                      className={
                        inside === 'Create Cast'
                          ? 'hover:text-yellow-200 flex items-center gap-6 cursor-pointer text-yellow-200'
                          : 'flex items-center gap-6'
                      }
                      onClick={() => setInside((prev) => (prev === 'Create Cast' ? '' : 'Create Cast'))}
                    >
                      Create Cast <FaCaretDown className={`${inside === 'Create Cast' ? 'rotate-180' : ''}`} />
                    </div>
                    {inside === 'Create Cast' && (
                      <div className="ml-8 mt-2 flex flex-col gap-2 Tags1">
                        <Link to="/Dashboard/Shows/Option1" className="hover:text-yellow-200">
                          Create Cast
                        </Link>
                        <Link to="/Dashboard/Shows/Option2" className="hover:text-yellow-200">
                          Update Cast Name
                        </Link>
                        <Link to="/Dashboard/Shows/Option3" className="hover:text-yellow-200">
                          Update Cast Image
                        </Link>
                        <Link to="/Dashboard/Shows/Option4" className="hover:text-yellow-200">
                          Delete Cast
                        </Link>
                        <Link to="/Dashboard/Shows/Option5" className="hover:text-yellow-200">
                          See All Cast
                        </Link>
                      </div>
                    )}

                    <div
                      className={
                        inside === 'Create Show'
                          ? 'hover:text-yellow-200 flex items-center gap-4 cursor-pointer text-yellow-200'
                          : 'flex items-center gap-4'
                      }
                      onClick={() => setInside((prev) => (prev === 'Create Show' ? '' : 'Create Show'))}
                    >
                      Create Show <FaCaretDown className={`${inside === 'Create Show' ? 'rotate-180' : ''}`} />
                    </div>
                    {inside === 'Create Show' && (
                      <div className="ml-8 mt-2 flex flex-col gap-2 Tags1">
                        <Link to="/Dashboard/Shows/Option1" className="hover:text-yellow-200">
                          Create Show
                        </Link>
                        <Link to="/Dashboard/Shows/Option2" className="hover:text-yellow-200">
                          Update Show Title
                        </Link>
                        <Link to="/Dashboard/Shows/Option3" className="hover:text-yellow-200">
                          Update Tagline
                        </Link>
                        <Link to="/Dashboard/Shows/Option4" className="hover:text-yellow-200">
                          Update Title Image
                        </Link>
                        <Link to="/Dashboard/Shows/Option5" className="hover:text-yellow-200">
                          Update Trailer
                        </Link>
                        <Link to="/Dashboard/Shows/Option6" className="hover:text-yellow-200">
                          Delete Show
                        </Link>
                      </div>
                    )}

                    <Link to="/Dashboard/Shows/Option7" className="hover:text-yellow-200">
                      Upload Show
                    </Link>
                    <Link to="/Dashboard/Shows/Option8" className="hover:text-yellow-200">
                      See All Shows
                    </Link>
                  </div>
                )}
                <div className="flex flex-col">
                  <button
                    className={`flex items-center justify-between w-full text-left p-2 Drop rounded ${
                      text === 'Tickets' ? 'bg-yellow-200 text-richblack-900' : 'hover:bg-richblack-700'
                    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => {
                      if (!disabled && user.verified) {
                        setTicket((prev) => !prev);
                        setInside('');
                        setText('Tickets');
                      }
                    }}
                    disabled={disabled}
                  >
                    <span className="flex items-center gap-2">
                      {disabled && <FaLock />}
                      <IoTicketSharp />
                      Tickets
                    </span>
                    <FaCaretDown className={`transition-transform ${ticket ? 'rotate-180' : ''}`} />
                  </button>

                  {ticket && (
                    <div className="ml-8 mt-2 subMenu1 flex flex-col gap-2">
                      <Link to="/Dashboard/Tickets/Create" className="hover:text-yellow-200">
                        Create Ticket
                      </Link>
                      <Link to="/Dashboard/Tickets/Update" className="hover:text-yellow-200">
                        Ticket Allotment
                      </Link>
                      <Link to="/Dashboard/Tickets/All" className="hover:text-yellow-200">
                        See All Tickets
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to={path}>
                <button
                  className={`flex items-center gap-2 w-full text-left p-2 Close rounded ${
                    text === label ? 'bg-yellow-200 text-richblack-900' : 'hover:bg-richblack-700'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  onClick={() => setText(label)}
                >
                  <Icon />
                  {label}
                </button>
              </Link>
            )}
          </div>
        ))}

        {/* Verification Status Indicator */}
        {user.usertype === ACCOUNT_TYPE.ORGANIZER && (
          <div className="mt-4 text-richblack-200 text-sm">
            {isVerificationSubmitted
              ? 'Please submit verification data to unlock full features.' :'Verification Data Submitted'
              }
          </div>
        )}
      </nav>

      <span className="inline-block w-35 h-[1px] bg-white my-2 DashLine"></span>

      <div className="flex flex-col gap-3 Sides text-richblack-300">
        <Link to="/Dashboard/Settings">
          <button
            className={`flex items-center gap-2 w-full text-left p-2 Close rounded ${
              extra ? 'bg-yellow-200' : 'hover:bg-richblack-700'
            }`}
            onClick={(e) => {
              setExtra(e.target.innerText);
              setText('');
            }}
          >
            <IoSettings />Settings
          </button>
        </Link>
        <button
          onClick={() =>
            setConfirmationModal({
              text1: 'Are you sure?',
              text2: 'You will be logged out of your account.',
              btn1Text: 'Logout',
              btn2Text: 'Cancel',
              btn1Handler: () => dispatch(UserLogout()),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="flex items-center gap-2 w-full text-left p-2 hover:bg-richblack-700 rounded"
        >
          <IoLogOutOutline />LogOut
        </button>
      </div>
      {confirmationModal && <Logout modalData={confirmationModal} />}
    </div>
  );
};

export default LeftSide;