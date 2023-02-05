import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from '@firebase/auth';
import { useAuth } from '../contexts/UserContext';
import { auth } from '../firebase';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { emailSignUp, currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (email != null && username != null && password != null) {
      try {
        await emailSignUp(email, password);
        await updateProfile(auth.currentUser, {
          displayName: username
        });
        await axios.put('http://localhost:3001/user', {
          userID: auth.currentUser.uid,
          name: username,
          email: email
        }).then(navigate('/'));
      } catch (err) {
        console.log(err.message);
      };
    };
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      navigate('/home')
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex justify-center items-center w-screen h-screen text-white bg-dark-theme'>
      <div className='block w-[70vw] h-[70vh]'>
        <div className='w-full mb-3'>
          <span className='text-3xl font-semibold'>Start Tracking with Glory</span>
        </div>
        <div className='w-full'>
          <span className='text-gray-200'>Already have an account? <Link to='/login' className='text-dark-accent font-semibold'>Log In.</Link></span>
        </div>
        <div className='mt-10'>
          <div className='flex justify-between w-[400px] mb-5'>
            <input type='text' placeholder='Username' className='w-[195px] h-[40px] text-black pl-3 border-2 outline-none border-dark-accent rounded-lg' onChange={(e) => setUsername(e.target.value)} />
            <input type='email' placeholder='Email' className='w-[195px] h-[40px] text-black pl-3 border-2 outline-none border-dark-accent rounded-lg' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='w-[400px] mb-10'>
            <input type='password' placeholder='Password' className='w-full h-[40px] text-black pl-3 border-2 outline-none border-dark-accent rounded-lg' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='w-[400px] h-[40px] bg-dark-accent rounded' onClick={handleSubmit}>Create Account</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp;