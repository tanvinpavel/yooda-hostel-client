import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const AllMeal = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://powerful-river-71836.herokuapp.com/meal")
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#20c997",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://powerful-river-71836.herokuapp.com/meal/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              const lestItem = meals.filter((meal) => meal._id !== id);
              setMeals(lestItem);
            }
          });
      }
    });
  };

  return (
    <div className="container">
      {
        meals.length === 0 ? <div className="d-flex justify-content-center align-items-center" style={{"height": "500px"}}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> : <div className="row justify-content-md-center">

        <div className="col-md-8">
          <table className="table table-dark table-hover mt-5 table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, i) => (
                <tr key={meal._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{meal.name}</td>
                  <td>{meal.price}</td>
                  <td>
                    <NavLink
                      to={`/update/${meal._id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      edit
                    </NavLink>
                    <button
                      onClick={() => {
                        deleteHandler(meal._id);
                      }}
                      className="btn btn-sm btn-outline-danger"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
  );
};

export default AllMeal;
