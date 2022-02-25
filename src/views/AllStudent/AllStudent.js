import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const AllStudent = () => {
  const [student, setStudent] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(4);
  let [item, setItem] = useState(0);
  const [action, setAction] = useState('');
  const [reRender, setReRender] = useState(0);
  let count;

  useEffect(() => {
    fetch(
      `https://powerful-river-71836.herokuapp.com/student?page=${currentPage}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStudent(data.student);
        const count = data.count;
        const totalPage = Math.ceil(count / size);
        setPageCount(totalPage);
      });
  }, [currentPage, size, reRender]);

  const bulkHandler = (data) => {
    const payload = {...data, action}

    if(item > 0){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update",
      }).then((result) => {
        if(result.isConfirmed) {
          fetch("http://localhost:4000/student/updateStatus/action", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((data) => {
              if(data.modifiedCount > 0){
                setReRender(data.modifiedCount);
                reset();
                setItem(0);
                Swal.fire("SUCCESS", "Update Successful!", "success");
              }else{
                reset();
                setItem(0);
                Swal.fire("Failed", "Update Failed!", "warning");
              }
            });
        }
      });
    }else{
      Swal.fire("Some Thing Wants Wrong", "No Item Selected!", "warning");
    }
  }

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
        fetch(
          `https://powerful-river-71836.herokuapp.com/student/deleteStudent/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              const lestItem = student.filter((s) => s._id !== id);
              setStudent(lestItem);
            }
          });
      }
    });
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
      {student.length === 0 ? (
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
          <div className="col-md-8">
            <h3 className="text-center mt-3">All Student Data</h3>

            <div className="d-flex justify-content-between">
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
                      <button type="submit" form="form1" onClick={()=>{setAction('active')}} className="dropdown-item">Active</button>
                    </li>
                    <li>
                      <button type="submit" form="form1" onClick={()=>{setAction('inActive')}} className="dropdown-item">Inactive</button>
                    </li>
                  </ul>
                </div>

                <div className="btn-group" role="group">
                  <button
                    id="btnGroupDrop2"
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Limit
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="btnGroupDrop2">
                    <li>
                      <button
                        onClick={() => {
                          setSize(5);
                        }}
                        className="dropdown-item"
                      >
                        5
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setSize(10);
                        }}
                        className="dropdown-item"
                      >
                        10
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {item > 0 && <div>{item} selected</div>}
            </div>

            <table className="table table-dark table-hover mt-2 table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Roll</th>
                  <th scope="col">Age</th>
                  <th scope="col">Class</th>
                  <th scope="col">Hall</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                  <th scope="col">Select</th>
                </tr>
              </thead>
              <tbody>
                {student.map((student, i) => (
                  <tr key={student._id}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <Link to={`/memo/${student._id}`}>{student.name}</Link>
                    </td>
                    <td>{student.roll}</td>
                    <td>{student.age}</td>
                    <td>{student.class}</td>
                    <td>{student.hall}</td>
                    <td>
                      {student.status === "active" ? (
                        <span className="px-2 py-1 rounded bg-success">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-danger rounded">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td>
                      <NavLink
                        to={`/student/update/${student._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        edit
                      </NavLink>
                      <button
                        onClick={() => {
                          deleteHandler(student._id);
                        }}
                        className="btn btn-sm btn-outline-danger"
                      >
                        delete
                      </button>
                    </td>
                    <td>
                    <form id="form1" onSubmit={handleSubmit(bulkHandler)}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value={student._id}
                          onClick={(e) => {
                            counterFunction(e);
                          }}
                          {...register("statusIDList")}
                        />
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* pagination */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <button
                    onClick={() => {
                      let p = currentPage - 1;
                      p > 0 && setCurrentPage(p);
                    }}
                    className="page-link"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                  (num) => (
                    <li
                      key={num}
                      className={
                        num === currentPage ? "active page-item" : "page-item"
                      }
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(num)}
                      >
                        {num}
                      </button>
                    </li>
                  )
                )}
                <li className="page-item">
                  <button
                    onClick={() => {
                      let k = currentPage + 1;
                      k <= pageCount && setCurrentPage(k);
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

export default AllStudent;
