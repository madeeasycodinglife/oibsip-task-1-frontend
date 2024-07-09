import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../Pages/Homepage';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Trains from '../Pages/Trains';
import Booking from '../Pages/Booking';
import Payment from '../Pages/Payment';
import Pnr from '../Pages/Pnr';
import NotFound from '../Pages/NotFound'; // Import the NotFound component
import { AuthContext } from '../context/AuthContext';

// import AdminRoutes from '../admin/Routes/AdminRoutes';
import Admin from '../admin/Pages/Admin';
import AdminDashboard from '../admin/Pages/AdminDashboard';
// import AdminLayout from '../admin/Components/Layout/AdminLayout'

const AppRoutes = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className='display'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<Navigate to = '/'/>}/>
        <Route path='/trains' element={<Trains />} />
        <Route path='/pnr' element={<Pnr />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/booking/:trainId/:type' element={<Booking />} />
        <Route path='/payment/:bookingId/:seats' element={<Payment />} />
        {/* <Route path='/*' element={<Navigate to='/' />} /> */}
        {user && user.roles.includes("ADMIN") && (
          // <Route path='/admin/*' element={<AdminRoutes />} />
          <>
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          </>
        )}
        <Route path='*' element={<NotFound />} />
        
      </Routes>
    </div>
  );
};

export default AppRoutes;
