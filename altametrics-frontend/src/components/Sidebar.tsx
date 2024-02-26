import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { logout } from '../state/slices/authSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
      dispatch(logout());
  }
  
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/main"
              className={({ isActive }) => isActive ? 'active' : undefined}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/invoices"
              className={({ isActive }) => isActive ? 'active' : undefined}
            >
              Invoices
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className='logout'>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
