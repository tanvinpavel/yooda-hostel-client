import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const Update = () => {
  const { register, handleSubmit, reset } = useForm();
  const [meal, setMeal] = useState({});
  const {id} = useParams();

  //load data
  useEffect(() => {
    fetch(`https://powerful-river-71836.herokuapp.com/meal/${id}`)
        .then(res => res.json())
        .then(data => setMeal(data));
  },[]);

  //update
  const editDataHandler = (data) => {
    let {name, price} = data;

    if(name.length > 0 || price.length > 0){
        let vData = {};
        if(name.length > 0) vData.name = name;
        if(price.length > 0) vData.price = price;

        fetch(`https://powerful-river-71836.herokuapp.com/meal/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vData)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    Swal.fire(
                        'Success!',
                        'Update successful!',
                        'success'
                    );
                }
            })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'seems you do not have made any change',
          })
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title mb-5">Update Meal Info</h5>
              <form method="post" onSubmit={handleSubmit(editDataHandler)}>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={meal.name}
                      id="inputEmail3"
                      {...register("name")}
                      placeholder="Meal Name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                  >
                    Price
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      defaultValue={meal.price}
                      className="form-control"
                      id="inputPassword3"
                      {...register("price")}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-warning offset-2">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
