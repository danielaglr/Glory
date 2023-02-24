import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';

import fetchLifts from '../utility/helpers/fetchLifts';
import toMDT from '../utility/cleaning/toMDT';
import { useAuth } from '../contexts/UserContext';

import Navbar from '../components/navbar';

function Lifts() {
  const [liftArr, setLiftArr] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('date-dscnd');

  /* Table filters */
  console.log(selectedFilter);

  const { currentUser } = useAuth();

  useEffect(() => {
    fetchLifts(currentUser.uid).then((res) => {
      setLiftArr(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let sortedLiftArr;

  switch (selectedFilter) {
    case 'date-ascnd':
      sortedLiftArr = liftArr.sort((a, b) => new Date(a.time._seconds * 1000) - new Date(b.time._seconds * 1000));
      break;
    case 'date-dscnd':
      sortedLiftArr = liftArr.sort((a, b) => new Date(b.time._seconds * 1000) - new Date(a.time._seconds * 1000));
      break;
    case 'weight-ascnd':
      sortedLiftArr = liftArr.sort((a, b) => a.weight - b.weight);
      break;
    case 'weight-dscnd':
      sortedLiftArr = liftArr.sort((a, b) => b.weight - a.weight);
      break;
    case 'reps-ascnd':
      sortedLiftArr = liftArr.sort((a, b) => a.reps - b.reps);
      break;
    case 'reps-dscnd':
      sortedLiftArr = liftArr.sort((a, b) => b.reps - a.reps);
      break;
    default:
      sortedLiftArr = liftArr.sort((a, b) => new Date(b.time._seconds * 1000) - new Date(a.time._seconds * 1000));
      break;
  };

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
                  <th className='w-[150px] text-start cursor-pointer' onClick={() => selectedFilter !== 'date-ascnd' ? setSelectedFilter('date-ascnd') : setSelectedFilter('date-dscnd')}>Date {selectedFilter === 'date-ascnd' ? <FontAwesomeIcon icon={faChevronUp} /> : ''}{selectedFilter === 'date-dscnd' ? <FontAwesomeIcon icon={faChevronDown} /> : ''}</th>
                  <th className='w-[150px] text-start cursor-pointer'>Lift</th>
                  <th className='w-[150px] text-start cursor-pointer' onClick={() => selectedFilter !== 'weight-ascnd' ? setSelectedFilter('weight-ascnd') : setSelectedFilter('weight-dscnd')}>Weight {selectedFilter === 'weight-ascnd' ? <FontAwesomeIcon icon={faChevronUp} /> : ''}{selectedFilter === 'weight-dscnd' ? <FontAwesomeIcon icon={faChevronDown} /> : ''}</th>
                  <th className='w-[150px] text-start cursor-pointer' onClick={() => selectedFilter !== 'reps-ascnd' ? setSelectedFilter('reps-ascnd') : setSelectedFilter('reps-dscnd')}>Reps {selectedFilter === 'reps-ascnd' ? <FontAwesomeIcon icon={faChevronUp} /> : ''}{selectedFilter === 'reps-dscnd' ? <FontAwesomeIcon icon={faChevronDown} /> : ''}</th>
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