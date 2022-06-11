import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAllowed = () => {
    const navigate = useNavigate();
    return (
        <div className='block-hight d-flex justify-content-center align-items-center text-danger'>
            <div className="">
                <h3><span>
                <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    </span>You are not allowed to view this page</h3>
                <button className='btn btn-outline-dark mt-3 d-flex align-items-center mx-auto' onClick={() => navigate(-1, {replace: true})}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                </svg> Go Back</button>
            </div>
        </div>
    );
};

export default NotAllowed;