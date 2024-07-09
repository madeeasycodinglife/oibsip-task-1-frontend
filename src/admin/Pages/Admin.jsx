import React,{useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Admin = () => {
const navigate = useNavigate();
const goto = ()=>{
    navigate('/admin/dashboard')
}
const {user} = useContext(AuthContext);
  return (
    <div className="admin">
      <h2>Welcome {user.name}!</h2>
      <button className='btn' onClick={goto}>Go to Dashboard</button>
      {/* Add admin-specific content and routes here */}
    </div>
  );
};

export default Admin;