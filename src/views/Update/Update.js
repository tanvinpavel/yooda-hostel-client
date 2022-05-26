import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInterceptor from "../../hooks/useInterceptor";
import UpdateForm from "./UpdateForm/UpdateForm";

const Update = () => {
  const [meal, setMeal] = useState(null);
  const { id } = useParams();
  const axiosPrivate = useInterceptor();

  //load data
  useEffect(() => {
    axiosPrivate.get(`/meal/${id}`)
      .then((res) => setMeal(res.data))
      .catch(err => console.log(err));
  }, [axiosPrivate, id]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          {meal ? (
            <div
              className="card my-5 border-0"
              style={{ background: "#f2f2f2" }}
            >
              <div className="card-body p-4 shadow">
                <h5 className="card-title mb-5">Update Meal Info</h5>
                <UpdateForm meal={meal} />
              </div>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "600px" }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Update;
