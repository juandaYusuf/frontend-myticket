import React from 'react'
import {
  GetStart,
  SignInUp,
  Ticket,
  Home,
  Profile,
  About,
} from '../../pages'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import ProtectedRoutes from '../ProtectedRoutes'



const Routs = () => {

  return (
    <>
      <Router>
        <Routes>

          {/* //! Unprotected Routes 
        */}
          <Route path='/' element={<GetStart />} />
          <Route path='SignInUp' element={<SignInUp />} />

          {/* //! Protected Routes
        */}
          <Route element={<ProtectedRoutes />}>
            <Route path='Home' element={<Home />} />
            <Route path='Ticket' element={<Ticket />} />
            <Route path='Profile' element={<Profile />} />
            <Route path='About' element={<About />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default Routs