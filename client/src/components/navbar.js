import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import { useAuth } from '../contexts/UserContext';
import getTimeSince from '../utility/cleaning/getTimeSince';

function Navbar() {
  const [notifArray, setNotifArray] = useState(null);
  const [notifVisible, setNotifVisible] = useState(false);

  const { currentUser } = useAuth();

  async function getNotifications() {

    if (notifArray !== null) {
      setNotifVisible(true);
    } else {
      await axios.get(`http://localhost:3001/user/${currentUser.uid}/notifications`).then((res) => {
        setNotifArray(res.data);
        setNotifVisible(true);
      });
    };
  };

  function toggleNotifs() {
    if (notifArray === null && notifVisible === false) {
      getNotifications();
    } else if (notifArray !== null && notifVisible === false) {
      setNotifVisible(true);
    } else if (notifArray !== null && notifVisible === true) {
      setNotifVisible(false);
    };
  };

  return (
    <div className='flex justify-between items-center w-[80vw] h-[65px] fixed'>
      <div className='flex justify-center items-center text-3xl font-bold'>
        <span>Glory</span>
      </div>
      <div className='flex justify-between items-center w-[45vw] text-xl pt-2 font-medium'>
        <Link to='/home'>Home</Link>
        <Link to='/lifts'>Lifts</Link>
        <Link to='/data'>Data</Link>
        <Link to='/profile'>Profile</Link>
      </div>
      <div className='flex justify-center items-center text-lg font-semibold z-10'>
        <FontAwesomeIcon className='p-2 cursor-pointer hover:bg-gray-200 rounded-full' icon={faBell} size='lg' onClick={toggleNotifs} />
        {notifVisible ? 
        <div className='w-[300px] h-[500px] absolute top-20 bg-white border rounded-lg'>
          <ul className='flex items-end w-full h-full'>
            <div className='flex flex-col mt-auto w-full'>
              {notifArray.map((item, index) => {
                return (
                  <li key={index} className='flex w-full h-[75px] border-t'>
                    <div className='flex justify-center items-center w-[75px] h-full'>
                      <div className='w-[48px] h-[48px] bg-gray-300 rounded-full'></div>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                      <span className='text-base'>{item.message}</span>
                      <span className='text-sm text-gray-400'>{getTimeSince(item.timestamp._seconds) + ' ago'}</span>
                    </div>
                  </li>
                )
              })}
            </div>
          </ul>
        </div>
        :
        <></>
        }
      </div>
    </div>
  )
}

export default Navbar;