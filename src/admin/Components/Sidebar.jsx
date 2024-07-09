// Sidebar.jsx
import React from 'react';

const Sidebar = ({ onSelectTopic }) => {
  const handleTopicClick = (topic) => {
    onSelectTopic(topic);
  };

  return (
    <div className="sidebar">
      {/* <div className="sidebar-heading">Admin Dashboard</div> */}
      <h3>Admin Dashboard</h3>
      <ul className="list-group list-group-flush">
        <li className="list-group-item" onClick={() => handleTopicClick('trains')}>
          Manage Trains
        </li>
        <li className="list-group-item" onClick={() => handleTopicClick('users')}>
          Manage Profiles
        </li>
        <li className="list-group-item" onClick={() => handleTopicClick('tickets')}>
          Manage Tickets
        </li>
        {/* Add more list items for other admin functionalities */}
      </ul>
    </div>
  );
};

export default Sidebar;
