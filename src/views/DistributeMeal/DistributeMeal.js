import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DistributionForm from "./DistributionForm/DistributionForm";
const Swal = require("sweetalert2");

const DistributeMeal = () => {
  const { register, handleSubmit } = useForm();
  const [student, setStudent] = useState({});

  const searchStudent = (data) => {
    if (data.roll.length > 0) {
      fetch(
        "https://powerful-river-71836.herokuapp.com/student/searchStudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => setStudent(data));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please a valid roll number!",
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-8">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title text-center mb-3">Search Student</h5>
                <form
                  className="row g-3"
                  onSubmit={handleSubmit(searchStudent)}
                >
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      {...register("roll")}
                      placeholder="enter student roll"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="submit"
                      id="button-addon2"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <DistributionForm info={student} />
      </div>
    </div>
  );
};

export default DistributeMeal;
