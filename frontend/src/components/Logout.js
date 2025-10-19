import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove only user info, not everything
    localStorage.removeItem('user');
    // Optional: remove bookings if you want to reset all data
    // localStorage.removeItem('bookings');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-outline-danger"
      style={{ marginLeft: '10px' }}
    >
      Logout
    </button>
  );
};

export default Logout;
