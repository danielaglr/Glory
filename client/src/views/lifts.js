import React, { useEffect, useState } from 'react';

import fetchLifts from '../utility/helpers/fetchLifts';
import toMDT from '../utility/cleaning/toMDT';
import { useAuth } from '../contexts/UserContext';

import Navbar from '../components/navbar';

function Lifts() {
  const [liftArr, setLiftArr] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');

  const { currentUser } = useAuth();

  useEffect(() => {
    fetchLifts(currentUser.uid).then((res) => {
      setLiftArr(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedLiftArr = liftArr.sort((a, b) => new Date(b.time._seconds * 1000) - new Date(a.time._seconds * 1000));

  return (
    <div className='hidden lg:block w-screen h-screen text-dark-theme fixed'>
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <div className='w-[80vw] h-[65px] mx-auto z-10'>
          <Navbar />
        </div>
        <div className='flex justify-center items-center w-screen h-[calc(100vh_-_65px)] border-t border-gray-theme bg-gray-theme'>
          <div className='block w-[80vw] h-[80vh] fixed'>
            <div className='flex justify-between items-center w-full h-[55px] px-10 text-base font-medium'>
              <span className='text-2xl font-semibold'>Charts</span>
              <div className='flex justify-between items-center w-[550px] h-full'>
                <div className={`flex justify-center items-center w-[125px] h-[35px] ${selectedTab === 'all' ? 'bg-dark-theme text-white' : ''} border-2 border-dark-theme rounded-lg cursor-pointer`} onClick={(e) => setSelectedTab('all')}>All Lifts</div>
                <div className={`flex justify-center items-center w-[125px] h-[35px] ${selectedTab === 'Squat' ? 'bg-dark-theme text-white' : ''} border-2 border-dark-theme rounded-lg cursor-pointer`} onClick={(e) => setSelectedTab('Squat')}>Squat</div>
                <div className={`flex justify-center items-center w-[125px] h-[35px] ${selectedTab === 'Bench Press' ? 'bg-dark-theme text-white' : ''} border-2 border-dark-theme rounded-lg cursor-pointer`} onClick={(e) => setSelectedTab('Bench Press')}>Bench Press</div>
                <div className={`flex justify-center items-center w-[125px] h-[35px] ${selectedTab === 'Deadlift' ? 'bg-dark-theme text-white' : ''} border-2 border-dark-theme rounded-lg cursor-pointer`} onClick={(e) => setSelectedTab('Deadlift')}>Deadlift</div>
              </div>
            </div>
            <table className='flex flex-col w-[80vw] h-[calc(100%_-_55px)] text-white rounded-2xl fixed'>
              <thead className='w-full h-[55px] bg-dark-theme font-medium px-10 shadow-md rounded-t-2xl'>
                <tr className='flex justify-between items-center w-full h-full text-start'>
                  <th className='w-[150px] text-start'>Date</th>
                  <th className='w-[150px] text-start'>Lift</th>
                  <th className='w-[150px] text-start'>Weight</th>
                  <th className='w-[150px] text-start'>Reps</th>
                </tr>
              </thead>
              <tbody className='w-full text-dark-theme bg-white shadow-md rounded-b-2xl'>
                {liftArr.length !== 0 && sortedLiftArr.filter(lift => selectedTab === 'all' || lift.lift === selectedTab).map((item, index) => {
                  return (
                    <tr key={index} className='flex justify-between items-center w-full h-[55px] even:bg-gray-100 px-10'>
                      <td className='w-[150px] text-start'>{toMDT(item.time._seconds)}</td>
                      <td className='w-[150px] text-start'>{item.lift}</td>
                      <td className='w-[150px] text-start'>{item.weight + 'lbs'}</td>
                      <td className='w-[150px] text-start'>{item.reps}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lifts;