import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { currentDate } from '../../utility';
import MemoTable from './MemoTable/MemoTable';
import './MonthlyMemo.css';

const MonthlyMemo = () => {
    let date = new Date();
    let thisMonth = date.getMonth()+1;
    const {id} = useParams();
    const [allOrder, setAllOrder] = useState([]);
    const [noData, setNoData] = useState(1);
    const [student, setStudent] = useState({});
    const [currentMonth, setCurrentMonth] = useState(thisMonth);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    useEffect(() => {
        fetch(`https://powerful-river-71836.herokuapp.com/mealDist/getMemo/${id}`)
            .then(res => res.json())
            .then(data => {
                let thisMonthData = data.filter(order => Number(order.date.split('-')[1]) === currentMonth);
                setNoData(thisMonthData.length);
                setAllOrder(thisMonthData);
            })
    },[currentMonth]);


    useEffect(() => {
        fetch(`https://powerful-river-71836.herokuapp.com/student/${id}`)
            .then(res => res.json())
            .then(data => setStudent(data))
    },[]);

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-8 mt-5">
                    <div className='d-flex justify-content-between'>
                        <div className='mb-2'>
                            <h6>Name: {student.name}</h6>
                            <h6>Roll: {student.roll}</h6>
                            <h6>Date: {currentDate()}</h6>
                            <h6>Status: {student.status === 'active' ? <span className='text-success'>Active</span> : <span className='text-danger'>Inactive</span>}</h6>
                        </div>
                        <div className="dropdown">
                            <button type="button" className="btn btn-sm btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Select Month</button>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {month.filter((_,i)=>i<thisMonth).map((m, i) => <li key={i}><button onClick={()=>{setCurrentMonth(i+1)}} className="dropdown-item">{m}</button></li>)}
                            </ul>
                        </div>
                    </div>
                    <h4 className='text-center mb-3'>Hostel Bill ({month[currentMonth-1]})</h4>
                    {
                        allOrder.length > 0 && noData ? <MemoTable allOrder={allOrder} />
                    :
                        noData
                        ?
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ height: "300px" }}
                            >
                                <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        :
                            <h1 className='text-center text-danger mt-5 pt-5'>No Data found</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default MonthlyMemo;