import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useInterceptor from "../../hooks/useInterceptor";
import './allStudent.css';


const AllStudent = () => {
  const [student, setStudent] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  let [item, setItem] = useState(0);
  const [action, setAction] = useState("");
  const [reRender, setReRender] = useState(0);
  const axiosPrivate = useInterceptor();
  const [payloads, setPayloads] = useState(null);

  useEffect(() => {
    axiosPrivate.get(`/student?page=${currentPage}&&size=${size}`)
      .then((res) => {
        const count = res.data.count;
        setPayloads(count);
        const totalPage = Math.ceil(count / size);
        setPageCount(totalPage);
        setStudent(res.data.student);
      })
      .catch(err => console.log(err));
  }, [currentPage, size, reRender, axiosPrivate]);

  const bulkHandler = (data) => {
    const payload = { ...data, action };

    if (item > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: action === 'Delete' ? '#dc3545' : 'rgb(65 162 255)',
        cancelButtonColor: action === 'Delete' ? '#20c997' : 'rgb(250 96 96)',
        confirmButtonText: `${action}`,
      }).then((result) => {
        if (result.isConfirmed) {
          
          if(action === 'Delete'){
            axiosPrivate.delete("/student/deleteMultipleStudent", {data: data})
              .then((res) => {
                if (res.data.deletedCount > 0) {
                  setReRender(res.data.deletedCount);
                  reset();
                  setItem(0);
                  Swal.fire("Deleted!", "Your file has been deleted.", "success");
                }
              })
              .catch((err) => {
                Swal.fire("Failed!", "Please try again later.", "error");
              })
          }else{
            axiosPrivate.put("/student/updateStatus/action", payload)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                setReRender(res.data.modifiedCount);
                reset();
                setItem(0);
                Swal.fire("SUCCESS", "Update Successful!", "success");
              } else {
                reset();
                setItem(0);
                Swal.fire("Failed", "Update Failed!", "warning");
              }
            })
            .catch(err => Swal.fire("Failed!", "Please try again later.", "error"));
          }
        }
      });
    } else {
      Swal.fire("Some Thing Wants Wrong", "No Item Selected!", "warning");
    }
  };

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
        axiosPrivate.delete(`/student/deleteStudent/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              const restItem = student.filter((s) => s._id !== id);
              setStudent(restItem);
            }
          })
          .catch(err => Swal.fire("Failed!", "Please try again later.", "error"));
      }
    });
  };

  // count selected item 
  const counterFunction = (e) => {
    if (e.target.checked === true) {
      setItem(item + 1);
    } else {
      setItem(item - 1);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-sm-12 col-md-12 col-lg-10">
          <h3 className="text-center mt-3">All Student Data</h3>

          {/* bulk action */}
          <div className="d-flex justify-content-between">
            <div className="btn-group" role="group" aria-label="...">
              <div className="btn-group" role="group">
                <button
                  id="btnGroupDrop2"
                  type="button"
                  className="btn btn-sm btn-outline-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Active/Deactive
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop3">
                  <li>
                    <button
                      type="submit"
                      form="form1"
                      onClick={() => {
                        setAction("Active");
                      }}
                      className="dropdown-item"
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      type="submit"
                      form="form1"
                      onClick={() => {
                        setAction("Inactive");
                      }}
                      className="dropdown-item"
                    >
                      Inactive
                    </button>
                  </li>
                </ul>
              </div>

              <button 
                type="submit"
                form="form1"
                onClick={() => {
                  setAction("Delete");
                }}
                className="btn btn-outline-danger"
              >
                Delete
              </button>

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

          {/* data table  */}
          <div className="container-table my-5 shadow">
              <table>
                <thead>
                    <tr className="text-center">
                      <th scope="col">Select</th>
                      <th scope="col">Name</th>
                      <th scope="col">Roll</th>
                      <th scope="col">Age</th>
                      <th scope="col">Class</th>
                      <th scope="col">Hall</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    payloads === null || payloads === 0 ? 
                    <tr>
                        <td colSpan='8' style={{'height': '300px'}} className="text-center bg-white">
                            {
                              payloads !== 0 ?
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> 
                                : 
                                <h1 className="text-center text-danger">No Data Found</h1>
                            }
                        </td>
                    </tr>
                     :
                    student.map((student, i) => 
                    <tr className="text-center" key={student._id}>
                      {/* <td scope="row">{i + 1}</td> */}
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
                      <td>
                        <Link to={`/memo/${student._id}`}>{student.name}</Link>
                      </td>
                      <td>{student.roll}</td>
                      <td>{student.age}</td>
                      <td>{student.class}</td>
                      <td>{student.hall}</td>
                      <td>
                        {student.status === "active" ? (
                          <span className="active-status">
                            Active
                          </span>
                        ) : (
                          <span className="inactive-status">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td>
                        <NavLink
                          to={`/student/update/${student._id}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 action-icons action-icon-edit" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </NavLink>
                        <button
                          className="no-border"
                          onClick={() => {
                            deleteHandler(student._id);
                          }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 action-icons action-icon-delete" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  )
                  }
                </tbody>
              </table>
          </div>
          {/* pagination */}
          <nav aria-label="Page navigation example" className={payloads > size ? 'd-block' : 'd-none'} >
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
    </div>
  );
};

export default AllStudent;
