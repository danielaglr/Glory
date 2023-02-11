import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import { AuthProvider } from './contexts/UserContext';

import Landing from './views/landing';
import SignUp from './views/signup';
import LogIn from './views/login';
import Home from './views/home';
import Lifts from './views/lifts';
import Data from './views/data';
import Profile from './views/profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/lifts' element={<Lifts />} />
        <Route path='/data' element={<Data />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);