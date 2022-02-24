import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AllMeal = () => {

  const [meals, setMeals] = useState([]);
  let [item, setItem] = useState(0);
  const { register, handleSubmit } = useForm();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:4000/meal?limit=${limit}&&page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => { 
        const totalPage = Math.ceil(data.count / limit);
        setPageSize(totalPage);
        setMeals(data.payload)
      });
  }, [currentPage, limit]);


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

  const bulkHandler = (IDs) => {
    if(item > 0){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('http://localhost:4000/meal/deleteMany', {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(IDs)
          })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
              const restMeal = meals.filter(e => IDs.item.indexOf(e._id) < 0);
              setMeals(restMeal);
              Swal.fire(
                'Success',
                'Delete Successfully',
                'success'
              )
            }
          })
        }
      })
    }else{
      Swal.fire(
        'Failed',
        'No Item Selected!',
        'warning'
      )
    }
  }

  const counterFunction = (e) => {
    if(e.target.checked === true){
      setItem(item+1);
    }else{
      setItem(item-1);
    }
  }

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
            <div className="d-flex justify-content-between">
            <div
              className="btn-group"
              role="group"
              aria-label="Button group with nested dropdown"
            >
                <button
                  type="submit" form="form1"
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
                    <button type="button" className="dropdown-item" onClick={()=>setLimit(5)}>
                      5/Page
                    </button>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item" onClick={()=>setLimit(10)}>
                      10/Page
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              {item>0 && <small>{item} Selected</small>}
            </div>
            </div>

            <table className="table table-dark table-hover mt-5 table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal._id}>
                    <th scope="row">
                      <form onSubmit={handleSubmit(bulkHandler)} id="form1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value={meal._id}
                          onClick={(e)=>{counterFunction(e)}}
                          {...register("item")}
                        />
                      </form>
                    </th>
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

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><button onClick={()=>{ let l=currentPage; l-=1; l>0 ? setCurrentPage(l) : setCurrentPage(currentPage) }} className="page-link">Previous</button></li>
                {
                  Array.from({ length: pageSize }, (_, i) => i + 1)
                  .map( i => <li
                    key={i} className={currentPage === i ? "page-item active" : "page-item"}
                    >
                      <button type="button" onClick={()=>{setCurrentPage(i)}} className="page-link">{i}</button>
                    </li>
                  )
                }
                <li className="page-item"><button onClick={()=>{ let l=currentPage; l+=1; l<=pageSize ? setCurrentPage(l) : setCurrentPage(currentPage) }} className="page-link">Next</button></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMeal;
