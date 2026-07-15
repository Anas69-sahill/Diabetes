import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">DiaPredict</div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Overview</NavLink>
        <NavLink to="/predict" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Predict</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
