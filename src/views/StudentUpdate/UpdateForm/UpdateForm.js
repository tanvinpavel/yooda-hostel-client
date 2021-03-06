import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useInterceptor from "../../../hooks/useInterceptor";
import { getChangesValue } from "../../../utility";

const UpdateForm = (props) => {
  const { data, id } = props;

  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
  const axiosPrivate = useInterceptor();

  const formDataHandler = (formData) => {
    const updatedValue = getChangesValue(formData, data);

    if (Object.keys(updatedValue).length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to update!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6f42c1",
        cancelButtonColor: "#d63384",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPrivate.put(`/student/updateInfo/${id}`, updatedValue)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Update successful!", "success");
              }
            })
            .catch(err => Swal.fire("Failed!", "Please try again later.", "error"));
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
    <form method="post" onSubmit={handleSubmit(formDataHandler)}>
      <div className="mb-3">
        <label htmlFor="inputName1" className="form-label">
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
        <label htmlFor="inputRoll2" className="form-label">
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
          Age:
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
          Class:
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
          Hall:
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
        <label htmlFor="input6" className="form-label">
          Status:
        </label>
        
          <div className="form-check">
            <input
              className="form-check-input"
              value="active"
              {...register("status")}
              type="radio"
              id="flexRadioDefault1"
              required
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
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
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Inactive
            </label>
          </div>
        </div>
      <button type="submit" className="btn btn-primary w-100">
        Add
      </button>
    </form>
  );
};

export default UpdateForm;
