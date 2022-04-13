import React, { useEffect, useState } from 'react';

const MemoTable = ({allOrder}) => {
    let totalPrice = 0;
    
    function calculateTotal(list){
        let eachDayTotal = 0;
        list.forEach(element => {
            eachDayTotal += parseInt(element.price);
        });
        totalPrice += eachDayTotal;
        return eachDayTotal;
    }

    return (
        <div>
            <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col">S-NO:</th>
                                <th scope="col">Date</th>
                                <th scope="col">Day Shift</th>
                                <th scope="col">Night Shift</th>
                                <th scope='col'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allOrder.map((day, index) => 
                                    <tr key={day._id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{day.date}</td>
                                        <td>{
                                        day.shift?.day ? 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon-size" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        : 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon-size" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        }</td>
                                        <td>{
                                            day.shift?.night ?
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon-size" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg> 
                                            : 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon-size" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                        }</td>
                                        <td>
                                            {
                                                calculateTotal(day.foodList)+'tk'
                                            }
                                        </td>
                                    </tr>    
                                )
                            }
                            <tr><td colSpan="4"></td><td>Total={totalPrice}tk</td></tr>
                        </tbody>
                    </table>
        </div>
    );
};

export default MemoTable;