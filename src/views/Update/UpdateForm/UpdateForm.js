import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getChangesValue } from "../../../utility";

const UpdateForm = ({ meal }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: meal,
  });

  //update
  const editDataHandler = (formData) => {
    const updatedData = getChangesValue(formData, meal);
    if (Object.keys(updatedData).length !== 0) {
      fetch(
        `https://powerful-river-71836.herokuapp.com/meal/update/${meal._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
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
