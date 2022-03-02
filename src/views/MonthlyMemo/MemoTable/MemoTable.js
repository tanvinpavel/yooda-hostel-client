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
                                        <td>{day.shift?.day ? <span className="green-dot"></span>: <span className="red-dot"></span>}</td>
                                        <td>{day.shift?.night ? <span className="green-dot"></span> : <span className="red-dot"></span>}</td>
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