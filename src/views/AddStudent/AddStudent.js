import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddStudent = () => {
  const { register, handleSubmit, reset } = useForm();
  const formDataHandler = (data) => {
    fetch("https://powerful-river-71836.herokuapp.com/student/addStudent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((req) => req.json())
      .then((mess) => {
        if (mess) {
          Swal.fire("Success!", "New meal added successfully!", "success");
          reset();
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title mb-5">Add A New Student</h5>
              <form method="post" onSubmit={handleSubmit(formDataHandler)}>
                <div className="row mb-3">
                  <label
                    htmlFor="inputName1"
                    className="col-sm-2 col-form-label"
                  >
                    Student Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputName1"
                      {...register("name")}
                      placeholder="Student Name"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputRoll2"
                    className="col-sm-2 col-form-label"
                  >
                    Roll
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputRoll2"
                      {...register("roll")}
                      placeholder="Roll"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input3" className="col-sm-2 col-form-label">
                    Age
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="input3"
                      {...register("age")}
                      placeholder="Student Age"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input4" className="col-sm-2 col-form-label">
                    Class
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="input4"
                      {...register("class")}
                      placeholder="Student Class"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input5" className="col-sm-2 col-form-label">
                    Hall
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="input5"
                      {...register("hall")}
                      placeholder="Hall Name"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input6" className="col-sm-2 col-form-label">
                    Status
                  </label>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        value="active"
                        {...register("status")}
                        type="radio"
                        id="flexRadioDefault1"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        value="inActive"
                        {...register("status")}
                        type="radio"
                        id="flexRadioDefault2"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary offset-2">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
