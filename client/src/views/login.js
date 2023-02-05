import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';

function LogIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { emailLogIn, currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (email != null && password != null) {
      try {
        await emailLogIn(email, password);
        navigate('/');
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
          <span className='text-3xl font-semibold'>Keep Tracking with Glory</span>
        </div>
        <div className='w-full'>
          <span className='text-gray-200'>Don't have an account yet? <Link to='/signup' className='text-dark-accent font-semibold'>Sign Up!</Link></span>
        </div>
        <div className='mt-10'>
          <div className='flex justify-between w-[400px] mb-5'>
            <input type='email' placeholder='Email' className='w-full h-[40px] text-black pl-3 border-2 outline-none border-dark-accent rounded-lg' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='w-[400px] mb-10'>
            <input type='password' placeholder='Password' className='w-full h-[40px] text-black pl-3 border-2 outline-none border-dark-accent rounded-lg' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='w-[400px] h-[40px] bg-dark-accent rounded' onClick={handleSubmit}>Log In</button>
        </div>
      </div>
    </div>
  )
}

export default LogIn