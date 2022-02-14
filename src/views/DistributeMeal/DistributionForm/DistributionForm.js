import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
const Swal = require('sweetalert2');

const DistributionForm = (props) => {
    const student = props.info;
    const { register, handleSubmit } = useForm();
    const [meals, setMeals] = useState([]);
    
    useEffect(() => {
        fetch("https://powerful-river-71836.herokuapp.com/meal")
          .then((res) => res.json())
          .then((data) => setMeals(data));
      }, []);

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth()+1;
  if(month.toString().length === 1){
    month = '0'+month;
  }
  let cdate = today.getDate();
  let formateDate = year+"-"+month+"-"+cdate;

  const mealDistributeHandler = (data) => {
      if(student._id){
        const s_id = student._id;
        const {name, roll} = student;
        const uData = {
            s_id,
            name,
            roll,
            date: formateDate,
            ...data,
        }

        if(formateDate === student.receive.date && data.shift === student.receive.shift){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Already served!'
              })
        }else{

            fetch('https://powerful-river-71836.herokuapp.com/student/foodDistribution', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(uData)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        Swal.fire(
                            'Success!',
                            'Meal Served!',
                            'success'
                        )
                    }
                })
        }
      }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please add a student!'
          })
      }
  }

    return (
        <div className="row">
                  <div className="col-md-8 mt-5">
                    <div className="card">
                      <div className="card-body">

                      <form method='POST' className='row g-3' id="form1" onSubmit={handleSubmit(mealDistributeHandler)}>
                          <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Student Name</label>
                            <input type="email" defaultValue={student.name} className="form-control" id="inputEmail4" disabled/>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Student ID</label>
                            <input type="text" defaultValue={student._id} className="form-control" id="inputPassword4" disabled/>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Date</label>
                            <input type="date"  defaultValue={formateDate} className="form-control" id="inputCity" disabled/>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Shift</label>
                            <select id="inputState"  {...register("shift")} className="form-select" required>
                              <option value="">Select Shift</option>
                              <option value="first">First</option>
                              <option value="second">Second</option>
                            </select>
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Status</label>
                            {
                                student.status === 'active' && <input type="text" className="form-control is-valid text-success" defaultValue="Active" id="inputZip" disabled/>
                            }
                            {
                              student.status === 'inActive' && <input type="text" className="form-control is-invalid text-danger" defaultValue="Inactive" id="inputZip" disabled/>
                            }
                            {
                              student.status !== 'active' && student.status !== 'inActive' && <input type="text" className="form-control" id="inputZip" disabled/>
                            }
                          </div>
                          <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-5">
                    <div className="card-body">
                    <label htmlFor="foodList" className="form-label">Choose Menu (<small>Use ctrl to select multiple option</small>)</label>
                      {
                        meals.length === 0 ? <div className="d-flex justify-content-center align-items-center" style={{"height": "200px"}}>
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div> : <select id="foodList" {...register("foodList")} className="form-select" form='form1' multiple required>
                              <option disabled>Food Menu</option>
                              {
                                meals.map(m => <option key={m._id} value={m._id}>{m.name} ----- {m.price} TK</option>)
                              }
                          </select>
                      }
                    </div>
                  </div>
                </div>
                
    );
};

export default DistributionForm;