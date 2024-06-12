import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './views/auth/Login'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreHeader from './views/base/StoreHeader'
import StoreFooter from './views/base/StoreFooter'
import MainWrapper from './layout/MainWrapper'


function App() {


  return (
    <BrowserRouter>
    <StoreHeader />
    <MainWrapper>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/create-new-password' element={<CreatePassword />} />
      </Routes>
      <StoreFooter />
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App
