import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import useInterceptor from "../../hooks/useInterceptor";

const Header = () => {
  const {user, setUser} = useAuthContext();
  const navigate = useNavigate();
  const axiosPrivate = useInterceptor();

  const logoutHandler = async (e) => {
    try {
      e.preventDefault();
      
      const response = await axiosPrivate.get('/auth/logout');
      if(response.data.modifiedCount){
        const exits = localStorage.getItem('isLoggedIn');

        if(exits){
          localStorage.removeItem('isLoggedIn');
        }
        
        setUser({});
        navigate('/login', {replace: true});
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Yooda Hostel <small className="text-secondary">v2.0</small></Link>
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
              <NavLink to="/search" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Search</NavLink>
              <NavLink to="/distributeMeal" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Distribute Meal</NavLink>

                {
                  !user?.accessToken ? <>

                  
                  <NavLink to='/login' className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
                  <NavLink to="/signup" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Sign Up</NavLink>
                
                  </> : <>

                  <NavLink to="/addMeal" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Add Meal</NavLink>

                  <NavLink to="/allMeal" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>All Meal</NavLink>

                  <NavLink to="/addStudent" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>Add Student</NavLink>

                  <NavLink to="/allStudent" className={(navInfo) => navInfo.isActive ? 'nav-link active' : 'nav-link'}>All Student</NavLink>

                  <span className="nav-link" style={{'cursor': 'pointer'}} onClick={logoutHandler}>Logout</span>
                  </>
                } 
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
