import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { axiosPrivate } from "../../api/axios";

const AddStudent = () => {
  const { register, handleSubmit, reset } = useForm();
  const formDataHandler = (data) => {
    axiosPrivate.post('/student/addStudent', data)
      .then(res => {
        if (res.data) {
          Swal.fire("Success!", "New meal added successfully!", "success");
          reset();
        }else{
          Swal.fire("Failed!", "Please try again later.", "error")
        }
      })
      .catch(err => Swal.fire("Failed!", "Please try again later.", "error"));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow my-5 border-0" style={{ background: "#f2f2f2" }}>
            <div className="card-body mt-4 mx-4">
              <h5 className="card-title mb-5">Add A New Student</h5>
              <form method="post" onSubmit={handleSubmit(formDataHandler)}>
                <div className="mb-3">
                  <label
                    htmlFor="inputName1"
                    className="form-label"
                  >
                    Student Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName1"
                    {...register("name")}
                    placeholder="Student Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputRoll2"
                    className="form-label"
                  >
                    Roll
                  </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRoll2"
                      {...register("roll")}
                      placeholder="Roll"
                      required
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="input3" className="form-label">
                    Age
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input3"
                    {...register("age")}
                    placeholder="Student Age"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="input4" className="form-label">
                    Class
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input4"
                    {...register("class")}
                    placeholder="Student Class"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="input5" className="form-label">
                    Hall
                  </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input5"
                      {...register("hall")}
                      placeholder="Hall Name"
                      required
                    />
                </div>
                <div className="mb-3">
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
                <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Add
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
