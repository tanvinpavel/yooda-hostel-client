import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useInterceptor from "../../../hooks/useInterceptor";
import { getChangesValue } from "../../../utility";

const UpdateForm = ({ meal }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: meal,
  });
  const axiosPrivate = useInterceptor();

  //update
  const editDataHandler = (formData) => {
    const updatedData = getChangesValue(formData, meal);
    if (Object.keys(updatedData).length !== 0) {

      axiosPrivate.put(`/meal/update/${meal._id}`, updatedData)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", "Update successful!", "success");
          }
        })
        .catch(err => Swal.fire("Failed!", "Please try again later.", "error"));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "seems you do not have made any change",
      });
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit(editDataHandler)}>
      <div className="mb-3">
        <label htmlFor="inputEmail3" className="form-label">
          Name
        </label>
        
          <input
            type="text"
            className="form-control"
            id="inputEmail3"
            {...register("name")}
            placeholder="Meal Name"
          />
        </div>
      <div className="mb-3">
        <label htmlFor="inputPassword3" className="form-label">
          Price
        </label>
        
          <input
            type="number"
            className="form-control"
            id="inputPassword3"
            {...register("price")}
            placeholder="Price"
          />
        </div>
      <button type="submit" className="btn btn-warning text-white w-100">
        Update
      </button>
    </form>
  );
};

export default UpdateForm;
