// AdminDashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'; // Adjust the import path based on your project structure
import ManageTrains from '../Components/ManageTrains'; // Import your Train component
import ManageUsers from '../Components/ManageUsers'; // Import your Users component
import ManageTickets from '../Components/ManageTickets';

const AdminDashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState('dashboard');

  const renderContent = () => {
    switch (selectedTopic) {
      case 'trains':
        return <ManageTrains />; // Replace with your Train component
      case 'users':
        return <ManageUsers />; // Replace with your Users component
      // Add more cases for other admin functionalities
      case 'tickets':
        return <ManageTickets/>
      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard">
        <div>
      <Sidebar onSelectTopic={setSelectedTopic} />
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
