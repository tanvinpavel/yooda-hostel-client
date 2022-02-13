import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const StudentUpdate = () => {
  const { register, handleSubmit } = useForm();
  const [student, setStudent] = useState({});
  const { id } = useParams();

  // load data
  useEffect(() => {
    fetch(`https://powerful-river-71836.herokuapp.com/student/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  const formDataHandler = (formData) => {
    let { name, roll, age, className, hall, status } = formData;
    let data = {};

    if (
      name.length > 0 ||
      roll.length > 0 ||
      age.length > 0 ||
      className.length > 0 ||
      hall.length > 0 ||
      status.length > 0
    ) {
      if (name.length > 0) data.name = name;
      if (roll.length > 0) data.roll = roll;
      if (age.length > 0) data.age = age;
      if (className.length > 0) data.class = className;
      if (hall.length > 0) data.hall = hall;
      if (status.length > 0) data.status = status;

      fetch(
        `https://powerful-river-71836.herokuapp.com/student/updateInfo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            Swal.fire("Success!", "Update successful!", "success");
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "seems you do not have made any change",
      });
    }
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
                      defaultValue={student.name}
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
                      defaultValue={student.roll}
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
                      defaultValue={student.age}
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
                      defaultValue={student.class}
                      {...register("className")}
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
                      defaultValue={student.hall}
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
                      {student.status === "active" ? (
                        <input
                          className="form-check-input"
                          value="active"
                          {...register("status")}
                          type="radio"
                          id="flexRadioDefault1"
                          checked
                        />
                      ) : (
                        <input
                          className="form-check-input"
                          value="active"
                          {...register("status")}
                          type="radio"
                          id="flexRadioDefault1"
                          required
                        />
                      )}
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      {student.status === "inActive" ? (
                        <input
                          className="form-check-input"
                          value="inActive"
                          {...register("status")}
                          type="radio"
                          id="flexRadioDefault2"
                          checked
                        />
                      ) : (
                        <input
                          className="form-check-input"
                          value="inActive"
                          {...register("status")}
                          type="radio"
                          id="flexRadioDefault2"
                          required
                        />
                      )}
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

export default StudentUpdate;
