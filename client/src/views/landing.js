import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {

  return (
    <div className='flex justify-center w-screen bg-dark-theme'>
      <div className='block w-[80vw] h-screen'>
        <div className='flex justify-between items-center w-full h-[65px] text-white'>
          <div className='text-3xl font-bold'>
            <span>Glory</span>
          </div>
          <div className='flex justify-between items-center w-[200px] text-lg font-semibold'>
            <Link to='/login' className='w-[90px] hover:border-b-[3px] border-dark-accent pt-1 text-center'>
              Log In
            </Link>
            <Link to='/signup' className='w-[90px] hover:border-b-[3px] border-dark-accent pt-1 text-center'>
              Sign Up
            </Link>
          </div>
        </div>
        <div className='flex flex-wrap justify-center items-center w-full text-[50px] text-white'>
          <div className='w-[50vw] mt-[20vh] text-center font-black tracking-wide leading-[60px]'>
            <span>Start Tracking Your Lifts with Glory</span>
          </div>
          <div className='w-full mt-[2vh] text-gray-200 text-center text-lg font-light'>
            <span className='w-[40vw]'>See your progress in real time, visualized with data analytics.</span>
          </div>
          <div className='w-[full] mt-[5vh]'>
            <div className='flex justify-evenly w-[40vw]'>
              <Link to='/signup' className='flex justify-center items-center w-[200px] h-[45px] text-lg border border-dark-accent rounded-xl bg-dark-accent'>Get Started</Link>
              <Link to='/signup' className='flex justify-center items-center w-[200px] h-[45px] text-lg border-2 border-dark-accent rounded-xl'>Features</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;