//import React from 'react'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase';

const App = () => {
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        console.log('Logged in successfully');
        navigate('/');
      } else {
        // User is signed out
        console.log('Logged out successfully');
        navigate('/login');
      }
    })

  
    
  }, []);




  return (
    <div>
      <ToastContainer theme ='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App