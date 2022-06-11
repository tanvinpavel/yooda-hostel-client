import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useInterceptor from "../../hooks/useInterceptor";

const AllMeal = () => {
  const [meals, setMeals] = useState([]);
  let [item, setItem] = useState(0);
  const { register, handleSubmit } = useForm();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const axiosPrivate = useInterceptor();
  const [payloads, setPayloads] = useState(null);

  useEffect(() => {
    axiosPrivate.get(`/meal?limit=${limit}&&page=${currentPage}`)
      .then(res => {
          setPayloads(res.data.count);
          const totalPage = Math.ceil(res.count / limit);
          setPageSize(totalPage);
          
          setMeals(res.data.payload);
      })
      .catch(error => console.log(error))
  }, [axiosPrivate, currentPage, limit, payloads]);

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
        axiosPrivate.delete(`/meal/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your record has been deleted.", "success");
              
              const lestItem = meals.filter((meal) => meal._id !== id);
              setMeals(lestItem);
            }
          })
          .catch(error => Swal.fire("Failed!", "Please try again later.", "error"));
      }
    });
  };

  const bulkHandler = (IDs) => {
    console.log(IDs);
    if (item > 0) {
      Swal
       .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          cancelButtonColor: "#20c997",
          confirmButtonText: "Delete",
        })
       .then((result) => {
        if (result.isConfirmed) {
          axiosPrivate.delete("/meal/deleteMany", {data: IDs})
            .then((res) => {
              if (res.data.deletedCount > 0) {
                const restMeal = meals.filter(
                  (e) => IDs.statusIDList.indexOf(e._id) < 0
                );
                setMeals(restMeal);
                Swal.fire("Success", "Delete Successfully", "success");
              }
            })
            .catch(err => Swal.fire("Failed!", "Please try again later.", "error"))
        }
      });
    } else {
      Swal.fire("Failed", "No Item Selected!", "warning");
    }
  };

  const counterFunction = (e) => {
    if (e.target.checked === true) {
      setItem(item + 1);
    } else {
      setItem(item - 1);
    }
  };

  return (
    <div className="container">
      {payloads === null || payloads === 0 ?
        <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
          {
            payloads !== 0 ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
              <h1 className="mt-5 text-center text-danger">No Data Found</h1>
            )
          } 
        </div> : (
        <div className="row justify-content-md-center">
          <div className="col-md-8 mt-3">
            <div className="d-flex justify-content-between">
              <div
                className="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <button
                  type="submit"
                  form="form1"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
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
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setLimit(5)}
                      >
                        5/Page
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setLimit(10)}
                      >
                        10/Page
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div>{item > 0 && <small>{item} Selected</small>}</div>
            </div>

            <div className="container-table my-5 shadow">
              <table>
                <thead>
                    <tr className="text-center">
                      <th scope="col">Select</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    meals.length !== 0 ? 
                    meals.map((meal, i) => 
                      <tr className="text-center" key={meal._id}>
                        {/* <td scope="row">{i + 1}</td> */}
                        <td>
                          <form id="form1" onSubmit={handleSubmit(bulkHandler)}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkboxNoLabel"
                              value={meal._id}
                              onClick={(e) => {
                                counterFunction(e);
                              }}
                              {...register("statusIDList")}
                            />
                          </form>
                        </td>
                        <td>{meal.name}</td>
                        <td>{meal.price}</td>
                        <td>
                          <NavLink
                            to={`/update/${meal._id}`}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 action-icons action-icon-edit" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </NavLink>
                          <button
                            className="no-border"
                            onClick={() => {
                              deleteHandler(meal._id);
                            }}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 action-icons action-icon-delete" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    )
                     :
                    <tr>
                        <td colSpan='8' style={{'height': '300px'}} className="text-center bg-white">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                  }
                </tbody>
              </table>
          </div>
            <nav aria-label="Page navigation example" className={payloads > limit ? 'd-block' : 'd-none'} >
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <button
                    onClick={() => {
                      let l = currentPage;
                      l -= 1;
                      l > 0 ? setCurrentPage(l) : setCurrentPage(currentPage);
                    }}
                    className="page-link"
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: pageSize }, (_, i) => i + 1).map((i) => (
                  <li
                    key={i}
                    className={
                      currentPage === i ? "page-item active" : "page-item"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage(i);
                      }}
                      className="page-link"
                    >
                      {i}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    onClick={() => {
                      let l = currentPage;
                      l += 1;
                      l <= pageSize
                        ? setCurrentPage(l)
                        : setCurrentPage(currentPage);
                    }}
                    className="page-link"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMeal;
