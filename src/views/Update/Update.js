import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateForm from "./UpdateForm/UpdateForm";

const Update = () => {
  const [meal, setMeal] = useState(null);
  const {id} = useParams();
  
  //load data
  useEffect(() => {
    fetch(`https://powerful-river-71836.herokuapp.com/meal/${id}`)
        .then(res => res.json())
        .then(data => setMeal(data));
  },[id]);

  

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title mb-5">Update Meal Info</h5>
              {
                meal ? <UpdateForm meal={meal}/> : <div className="d-flex justify-content-center align-items-center" style={{"height": "160px"}}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
