import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const AllMeal = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/meal")
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
        fetch(`http://localhost:4000/meal/delete/${id}`, {
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
      {meals.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "500px" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row justify-content-md-center">
          <div className="col-md-8 mt-3">
            <div
              className="btn-group"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <div className="btn-group" role="group">
                <button
                  id="btnGroupDrop2"
                  type="button"
                  className="btn btn-outline-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Active/Deactive
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop2">
                  <li>
                    <a className="dropdown-item" href="#">
                      Dropdown link
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dropdown link
                    </a>
                  </li>
                </ul>
              </div>

              <div className="btn-group" role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  className="btn btn-outline-warning dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Limit
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li>
                    <a className="dropdown-item" href="#">
                      5/Page
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      10/Page
                    </a>
                  </li>
                </ul>
              </div>
            </div>

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
      )}
    </div>
  );
};

export default AllMeal;
