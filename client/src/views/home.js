import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function Home() {
  const [notifArray, setNotifArray] = useState(null);
  const [notifVisible, setNotifVisible] = useState(false);

  const { currentUser } = useAuth();

  async function getNotifications() {

    if (notifArray !== null) {
      setNotifVisible(true);
    } else {
      console.log('Getting notifications')

      await axios.get(`http://localhost:3001/user/${currentUser.uid}/notifications`).then((res) => {
        setNotifArray(res.data);
        setNotifVisible(true);
      });
    };
  };

  return (
    <div className='block w-screen h-screen bg-white text-dark-theme fixed'>
      <div className='flex justify-center w-full'>
        <div className='w-[80vw] h-[65px]'>
          <div className='flex justify-between items-center w-full h-[65px] '>
            <div className='flex justify-center items-center text-3xl font-bold'>
              <span>Glory</span>
            </div>
            <div className='flex justify-between items-center w-[45vw] text-xl pt-2 font-medium'>
              <span>Home</span>
              <span>Lifts</span>
              <span>Data</span>
              <span>Profile</span>
            </div>
            <div onClick={() => {
              if (notifArray === null && notifVisible === false) {
                getNotifications();
              } else if (notifArray !== null && notifVisible === false) {
                setNotifVisible(true);
              } else {
                setNotifVisible(false);
              }
            }} className='flex justify-center items-center text-lg font-semibold p-2 hover:bg-gray-200 rounded-full cursor-pointer relative'>
              <FontAwesomeIcon icon={faBell} size='lg' />
              {notifVisible ? 
              <div className='w-[300px] h-[500px] absolute top-10 border rounded-lg'>
                <ul>
                  {notifArray.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.message}
                      </li>
                    )
                  })}
                </ul>
              </div>
              :
              <></>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home