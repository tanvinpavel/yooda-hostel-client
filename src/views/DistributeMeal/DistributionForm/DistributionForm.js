import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { currentDate } from "../../../utility";
import "./distributionForm.css";
const Swal = require("sweetalert2");

const DistributionForm = (props) => {
  const { student, setStudent } = props;

  const { register, handleSubmit, reset } = useForm();
  const [errorM, setErrorM] = useState(0);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://powerful-river-71836.herokuapp.com/meal")
      .then((res) => res.json())
      .then((data) => setMeals(data.payload));
  }, []);

  const formateDate = currentDate();

  const mealDistributeHandler = (data) => {
    if (student._id) {
      const s_id = student._id;
      const shift = {};
      if (data.shift === "day") {
        shift.day = true;
      }
      if (data.shift === "night") {
        shift.night = true;
      }
      // if(data.foodList)
      const uData = {
        s_id,
        date: formateDate,
        shift: shift,
        foodList: data.foodList,
      };
      console.log(data.foodList.length);
      if (data.foodList.length >= 2) {
        setErrorM(0);
        if (student?.receive) {
          let Dshift = student.receive.shift;
          const validator = Dshift.filter((m) => m[data.shift]);
          console.log(validator);
          if (formateDate === student?.receive?.date && validator.length) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Already served!",
            });
          } else {
            reset();
            setStudent({});
            saveMealRecipe(uData);
          }
        } else {
          reset();
          setStudent({});
          saveMealRecipe(uData);
        }
      } else {
        setErrorM(1);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add a student!",
      });
    }
  };

  function saveMealRecipe(payload) {
    fetch(
      "https://powerful-river-71836.herokuapp.com/student/foodDistribution",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Object.keys(data).length > 0) {
          Swal.fire("Success!", "Meal Served!", "success");
        }
      });
  }

  return (
    <div className="row">
      <div className="col-md-8 mt-5">
        <div className="card">
          <div className="card-body">
            <form
              method="POST"
              className="row g-3"
              id="form1"
              onSubmit={handleSubmit(mealDistributeHandler)}
            >
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Student Name
                </label>
                <input
                  type="email"
                  defaultValue={student.name}
                  className="form-control"
                  id="inputEmail4"
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Student ID
                </label>
                <input
                  type="text"
                  defaultValue={student._id}
                  className="form-control"
                  id="inputPassword4"
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  defaultValue={formateDate}
                  className="form-control"
                  id="inputCity"
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  Shift
                </label>
                <select
                  id="inputState"
                  {...register("shift")}
                  className="form-select"
                  required
                >
                  <option value="">Select Shift</option>
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Status
                </label>
                {student.status === "active" && (
                  <input
                    type="text"
                    className="form-control is-valid text-success"
                    defaultValue="Active"
                    id="inputZip"
                    disabled
                  />
                )}
                {student.status === "inActive" && (
                  <input
                    type="text"
                    className="form-control is-invalid text-danger"
                    defaultValue="Inactive"
                    id="inputZip"
                    disabled
                  />
                )}
                {student.status !== "active" &&
                  student.status !== "inActive" && (
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      disabled
                    />
                  )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-4 mt-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Choose Menu</h5>
            {meals.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={errorM ? "meal-card hasValue" : "meal-card"}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Tooltip on top"
                >
                  <ul className="list-group">
                    {meals.map((m) => (
                      <li
                        className="list-group-item"
                        key={m._id}
                        style={{ background: "#e9ecef" }}
                      >
                        <div className="form-check d-flex justify-content-between">
                          <span>
                            <input
                              className="form-check-input"
                              {...register("foodList")}
                              value={m._id}
                              type="checkbox"
                              id={m._id}
                              required
                            />
                            <label className="form-check-label" htmlFor={m._id}>
                              {m.name}
                            </label>
                          </span>
                          <span>{m.price}tk</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className={errorM ? "inValid-message" : "d-none"}>
                  Please Select At Last Two Option
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionForm;
