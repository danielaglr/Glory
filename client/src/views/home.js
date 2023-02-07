import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import { useAuth } from '../contexts/UserContext';
import getTimeSince from '../utility/cleaning/getTimeSince';
import createLiftsChart from '../utility/charts/createLiftsChart';

function Home() {
  const [notifArray, setNotifArray] = useState(null);
  const [friendArray, setFriendArray] = useState(null);
  const [notifVisible, setNotifVisible] = useState(false);

  const { currentUser } = useAuth();

  async function getFriendActivity() {
    await axios.get(`http://localhost:3001/user/${currentUser.uid}/friends/posts`).then((res) => {
      setFriendArray(res.data);
    });
  };

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

  useEffect(() => {
    createLiftsChart(currentUser.uid);
    getFriendActivity();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='block w-screen h-screen bg-white text-dark-theme fixed'>
      <div className='block justify-center w-full'>
        <div className='w-[80vw] mx-auto'>
          {/* Navigation */}
          <div className='flex justify-between items-center w-full h-[65px] '>
            <div className='flex justify-center items-center text-3xl font-bold'>
              <span>Glory</span>
            </div>
            <div className='flex justify-between items-center w-[45vw] text-xl pt-2 font-medium'>
              <Link to='/home'>Home</Link>
              <Link to='/lifts'>Lifts</Link>
              <Link to='/data'>Data</Link>
              <Link to='/profile'>Profile</Link>
            </div>
            <div className='flex justify-center items-center text-lg font-semibold relative z-10'>
              <FontAwesomeIcon className='p-2 cursor-pointer hover:bg-gray-200 rounded-full' icon={faBell} size='lg' onClick={() => {
              if (notifArray === null && notifVisible === false) {
                getNotifications();
              } else if (notifArray !== null && notifVisible === false) {
                setNotifVisible(true);
              } else {
                setNotifVisible(false);
              }
            }} />
              {notifVisible ? 
              <div className='w-[300px] h-[500px] absolute top-10 bg-white border rounded-lg'>
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
        </div>
        <div className='flex w-screen h-[calc(100vh_-_65px)] border-t border-gray-theme'>
          <div className='flex justify-center items-center w-[75%] h-full bg-gray-theme'>
            <canvas id='liftsChart' className='!w-[95%] !h-[85%] bg-white rounded-2xl shadow-md p-5'></canvas>
          </div>
          <div className='block w-[25%] h-full border-l'>
            <div className='flex justify-center items-center w-full h-[45px] border-'>
              <span className='text-xl font-semibold'>Friend Activity</span>
            </div>
            <div className='block w-full h-[calc(100%_-_45px)] relative'>
              <ul className='w-full h-auto odd:border-y'>
                {friendArray && friendArray.map((item, index) => {
                  return(
                    <li key={index} className='flex w-full h-[75px]'>
                      <div className='flex justify-center items-center w-[75px] h-full'>
                        <div className='w-[48px] h-[48px] rounded-full bg-gray-theme'></div>
                      </div>
                      <div className='flex flex-col justify-center w-[calc(100%_-_75px)] h-full text-start pr-3'>
                        <span className='text-base font-medium'>{item.author_name} just logged {item.weight}lbs on {item.type}!</span>
                        <div className='flex justify-between items-center w-full h-auto'>
                          <span className='text-sm text-gray-400 font-medium'>2/5/2023</span>
                          <span className='text-sm text-gray-400 font-normal'></span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className='flex justify-center items-center w-full h-[45px] absolute bottom-0 hover:bg-gray-200 cursor-pointer border-t'>
                <FontAwesomeIcon icon={faSquarePlus} size='xl' />
                <span className='text-lg font-semibold ml-10'>Add Friends</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;