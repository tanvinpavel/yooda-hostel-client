import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Yooda Hostel</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav  ms-auto">
              <NavLink to="/home" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
              <NavLink to="/distributeMeal" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Distribute Meal</NavLink>
              <NavLink to="/addMeal" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Add Meal</NavLink>
              <NavLink to="/allMeal" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>All Meal</NavLink>
              <NavLink to="/addStudent" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Add Student</NavLink>
              <NavLink to="/allStudent" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>All Student</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
