import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

import { useAuth } from '../contexts/UserContext';
import createLiftsChart from '../utility/charts/createLiftsChart';

import Navbar from '../components/navbar';

function Home() {
  const { currentUser } = useAuth();

  useEffect(() => {
    createLiftsChart(currentUser.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='hidden lg:block w-screen h-screen text-dark-theme fixed'>
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <div className='w-[80vw] h-[65px] mx-auto z-10'>
          <Navbar />
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
                <li className='flex flex-row w-full h-[75px]'>
                  <div className='flex justify-center items-center w-[75px] h-full'>
                    <div className='w-[48px] h-[48px] bg-gray-300 rounded-full'></div>
                  </div>
                  <div className='block w-[calc(100%_-_75px)] h-full'>
                    <span>Andres Just Hit 135lbs on Bench Press!</span>
                  </div>
                </li>
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