import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../contexts/UserContext';
import putlift from '../utility/helpers/putLift';

import Navbar from '../components/navbar';

function Data() {
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectedLift, setSelectedLift] = useState('');
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const { currentUser } = useAuth();

  async function handleSubmit() {
    if(weight !== 0 && reps !== 0 && selectedLift !== '') {
      await putlift(currentUser.uid, weight, selectedLift, reps);
    };
  };

  return (
    <div className='block w-screen h-screen text-dark-theme'>
      <div className='w-[80vw] h-[65px] mx-auto z-10'>
        <Navbar />
      </div>
      <div className='flex flex-col justify-center items-center w-full h-[calc(100vh_-_65px)] bg-gray-theme fixed'>
        <div className='flex justify-center w-[80vw] h-full'>
          <div className='flex justify-center items-center w-[800px] h-[25vh] bg-white rounded-xl shadow-md mt-10 z-0'>
            <div className='flex flex-row w-[90%] h-[55px] border-2 border-dark-theme rounded-xl pl-5 overflow-x-hidden'>
              <input type='number' placeholder='Weight' onChange={(e) => setWeight(e.target.value)} className='w-[275px] h-full outline-none'></input>
              <div className='flex flex-col justify-center items-center w-[175px] h-full border-x'>
                <div className='flex flex-row justify-between items-center w-[100px] cursor-pointer' onClick={() => setSelectVisible(!selectVisible)}>
                  <span>{selectedLift !== '' ? selectedLift : 'Select Lift'}</span>
                  {selectVisible ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} /> }
                </div>
                <div className={`${!selectVisible ? 'hidden' : 'flex flex-col w-[175px] h-[105px] bg-white border absolute top-[160px] z-10'}`}>
                  <div className='flex justify-center items-center w-full h-[35px] border-b cursor-pointer hover:bg-gray-100' onClick={() => setSelectedLift('Squat')}>
                    Squat
                  </div>
                  <div className='flex justify-center items-center w-full h-[35px] border-b cursor-pointer hover:bg-gray-100' onClick={() => setSelectedLift('Bench Press')}>
                    Bench Press
                  </div>
                  <div className='flex justify-center items-center w-full h-[35px] border-b cursor-pointer hover:bg-gray-100' onClick={() => setSelectedLift('Deadlift')}>
                    Deadlift
                  </div>
                </div>
              </div>
              <input type='number' placeholder='Reps' onChange={(e) => setReps(e.target.value)} className='w-[175px] h-full pl-5 outline-none' />
              <div className='flex justify-center items-center w-[75px] h-full bg-gray-50 cursor-pointer' onClick={() => handleSubmit()}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Data;