import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';

const Home = () => {
    const {user} = useAuthContext();
    
    // console.log(localStorage.getItem('hello'));
    return (
        <div className="container">
            <div className="row mt-5 justify-content-md-center">
                <div className="col-md-8 mt-5">
                    <h1 className="display-4 mt-5 pt-5 text-center">Welcome To Yooda Hostel</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;