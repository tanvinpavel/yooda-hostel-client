import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MonthlyMemo = () => {
    const {id} = useParams();
    const [allOrder, setAllOrder] = useState([]);
    const [student, setStudent] = useState({});
    let totalPrice = 0;
    console.log(allOrder);

    useEffect(() => {
        fetch(`https://powerful-river-71836.herokuapp.com/mealDist/getMemo/${id}`)
            .then(res => res.json())
            .then(data => {
                setAllOrder(data);
            })
    },[]);

    useEffect(() => {
        fetch(`https://powerful-river-71836.herokuapp.com/student/${id}`)
            .then(res => res.json())
            .then(data => setStudent(data))
    },[]);

    function calculateTotal(list){
        let eachDayTotal = 0;
        list.forEach(element => {
            eachDayTotal += parseInt(element.price);
        });
        totalPrice += eachDayTotal;
        console.log(totalPrice);
        console.log(eachDayTotal);
        return eachDayTotal;
    }

    console.log(id);
    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-8 mt-5">
                    <div className='mb-2'>
                        <h6>Name: {student.name}</h6>
                        <h6>Roll: {student.roll}</h6>
                    </div>
                    <h4 className='text-center mb-3'>Monthly Memo</h4>
                    {
                        allOrder.length === 0 ? <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "300px" }}
                      >
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div> 
                    :
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
                                        <td>{day.shift?.day ? "true": "false"}</td>
                                        <td>{day.shift?.night ? "true" : "false"}</td>
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
                    }
                </div>
            </div>
        </div>
    );
};

export default MonthlyMemo;