import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import DistributionForm from "./DistributionForm/DistributionForm";
const Swal = require("sweetalert2");

const DistributeMeal = () => {
  const { register, handleSubmit } = useForm();
  const [student, setStudent] = useState({});

  const searchStudent = (input) => {
    if (input.roll.length > 0) {
      const {roll} = input;
      const payload = {name: roll, roll: roll}
      axios.post("/student/searchStudent", payload)
        .then((res) => {
          if (res.data) {
            setStudent(res.data);
          } else {
            Swal.fire({
              icon: "warning",
              title: "Not Found",
              text: "Student not registered",
            });
          }
        })
        .catch(error => console.log(error));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid roll number!",
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-8">
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
                      placeholder="Search student by roll or name"
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

        <DistributionForm student={student} setStudent={setStudent} />
      </div>
    </div>
  );
};

export default DistributeMeal;
