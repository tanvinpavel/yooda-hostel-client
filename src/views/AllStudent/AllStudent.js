import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const AllStudent = () => {
  const [student, setStudent] = useState([]);
  const { register, handleSubmit } = useForm();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(4);
  let count;

  useEffect(() => {
    fetch(`http://localhost:4000/student?page=${currentPage}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data.student);
        const count = data.count;
        const totalPage = Math.ceil(count / size);
        setPageCount(totalPage);
      });
  }, [currentPage, size]);

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
        fetch(`http://localhost:4000/student/deleteStudent/${id}`, {
          method: "DELETE",
        })
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

  const activeHandler = (data) => {
    fetch("http://localhost:4000/student/updateStatus/active", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          window.location.reload();
        }
      });
  };

  const inActiveHandler = (data) => {
    fetch("http://localhost:4000/student/updateStatus/inActive", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          window.location.reload();
        }
      });
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
            <div
              className="btn-group btn-group-sm"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <div className="btn-group ms-auto" role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  className="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Bulk Action
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li>
                    <form onClick={handleSubmit(activeHandler)} id="form1">
                      <button className="dropdown-item" onClick={() => {}}>
                        Active
                      </button>
                    </form>
                  </li>
                  <li>
                    <form onClick={handleSubmit(inActiveHandler)} id="form1">
                      <button type="submit" className="dropdown-item">
                        Inactive
                      </button>
                    </form>
                  </li>
                </ul>
                <div className="btn-group" role="group">
                  <button
                    id="btnGroupDrop2"
                    type="button"
                    className="btn btn-primary dropdown-toggle"
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
            </div>

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
                  <th scope="col">Select</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {student.map((student, i) => (
                  <tr key={student._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{student.name}</td>
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
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="checkboxNoLabel"
                        value={student._id}
                        {...register("status")}
                        form="form1"
                      />
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

export default AllStudent;
