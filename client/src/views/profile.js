import React, { useEffect, useState } from 'react';

import { useAuth } from '../contexts/UserContext';
import fetchUser from '../utility/helpers/fetchUser';

import Navbar from '../components/navbar'
import axios from 'axios';

function Profile() {
  const [selectTab, setSelectTab] = useState('profile');
  const [userData, setUserData] = useState({});
  const [selectedImg, setSelectedImg] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    fetchUser(currentUser.uid).then(res => {
      setUserData(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFile(event) {
    setSelectedImg(event.target.files[0]);
  };

  async function handleFileUpload() {
    const formData = new FormData();

    formData.append('File', selectedImg);

    console.log('Function ran');

    await axios.put(`http://localhost:3001/user/${currentUser.uid}/profile`, {
      profileURL: selectedImg
    });
  };


  console.log(userData);

  return (
    <div className='block w-screen h-screen text-dark-theme'>
      <div className='w-[80vw] h-[65px] mx-auto z-10'>
        <Navbar />
      </div>
      <div className='flex justify-center items-center w-full h-[calc(100vh_-_65px)] fixed'>
        <div className='w-[80vw] h-full'>
          <div className='flex justify-between items-center w-full h-[75px] border-b my-5'>
            <span className='text-2xl font-semibold'>Settings</span>
            <div className='flex justify-between items-center w-[200px] h-full'>
              <button className='w-[95px] h-[40px] bg-dark-theme hover:bg-black text-white font-medium rounded-lg' onClick={handleFileUpload}>Save</button>
              <button className='w-[95px] h-[40px] border-2 border-dark-theme hover:bg-gray-200 font-semibold rounded-lg'>Cancel</button>
            </div>
          </div>
          <div className='flex flex-row justify-between items-center w-full h-full'>
            <ul className='block w-[20%] h-full text-lg font-medium'>
              <li className={`flex justify-start items-center w-full h-[45px] mb-3 rounded-xl ${selectTab === 'profile' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-theme cursor-pointer'}`} onClick={() => setSelectTab('profile')} >
                <span className='pl-3'>Profile</span>
              </li>
              <li className={`flex justify-start items-center w-full h-[45px] mb-3 rounded-xl ${selectTab === 'account' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-theme cursor-pointer'}`} onClick={() => setSelectTab('account')} >
                <span className='pl-3'>Account</span>
              </li>
              <li className={`flex justify-start items-center w-full h-[45px] mb-3 rounded-xl ${selectTab === 'data' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-theme cursor-pointer'}`} onClick={() => setSelectTab('data')} >
                <span className='pl-3'>Data</span>
              </li>
            </ul>
            <div className='block w-[80%] h-full'>
              {userData ? 
              <div className='flex justify-between w-full h-[150px] border-b'>
                <div className='flex flex-col items-start w-[40%] h-full ml-10'>
                  <span className='text-lg font-semibold mt-5'>Public Profile</span>
                  <span className='text-xs text-gray-400 font-semibold'>Update your Username and Profile Picture</span>
                </div>
                <div className='flex flex-row justify-between items-start w-[60%] h-full text-dark-theme'>
                  <div className='flex flex-col justify-between items-center w-[250px] h-[150px]'>
                    {!userData.profileURL ? 
                      <div className='w-[96px] h-[96px] rounded-full bg-gray-200'></div>
                      :
                      <img className='w-[96px] h-[96px] rounded-full' alt='profile icon' src={`${userData.profileURL}`} onChange={handleFile} />
                    }
                    <input className='w-[225px] mb-3' type='file' accept='.jpg,.png' />  
                  </div>
                  <div className='flex flex-col justify-center items-start h-[150px]'>
                    <label className='text-sm text-gray-400 font-semibold'>Username</label>
                    <input type='text' className='w-[300px] h-[35px] border-b pl-3 mb-[55px]' placeholder={userData.name}></input>
                  </div>
                </div>
              </div>
              :
              <span>Loading...</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile