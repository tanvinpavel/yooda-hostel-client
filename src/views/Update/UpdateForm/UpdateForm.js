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
        .catch(err => console.log(err));
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
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputEmail3"
            {...register("name")}
            placeholder="Meal Name"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Price
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="inputPassword3"
            {...register("price")}
            placeholder="Price"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-warning offset-2">
        Update
      </button>
    </form>
  );
};

export default UpdateForm;
