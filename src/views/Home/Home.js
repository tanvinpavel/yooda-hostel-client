import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';

const Home = () => {
    const {user} = useAuthContext();
    
    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-8 mt-5">
                    <h1 className="display-4 my-5 pt-5 text-center">Welcome To Yooda Hostel</h1>
                    <h4>Site functionality?</h4>
                    <ul>
                        <li>Login, logout and Registration system.</li>
                        <li>JWT(json web token) for api authentication with Refresh Token and Access Token.</li>
                        <li>you can add, update and delete student and Meal info.</li>
                        <li>You can see all students and meals info where pagination, bulk action (delete, active/deactive) integrated</li>
                        <li>you can search student info and see student monthly bill.</li>
                        <li>you can distribute meal by searching student name and roll.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;