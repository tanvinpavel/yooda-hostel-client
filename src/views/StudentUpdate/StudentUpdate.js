import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInterceptor from "../../hooks/useInterceptor";
import UpdateForm from "./UpdateForm/UpdateForm";

const StudentUpdate = () => {
  const [student, setStudent] = useState(null);
  const axiosPrivate = useInterceptor();

  const { id } = useParams();

  // load data
  useEffect(() => {
    axiosPrivate.get(`/student/${id}`)
      .then((res) => {
        delete res.data.receive;
        setStudent(res.data);
      })
      .catch(err => console.log(err));
  }, [axiosPrivate, id]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card my-5 px-3 shadow">
            <div className="card-body">
              <h4 className="card-title mb-5">Update Student Info</h4>
              {student ? (
                <UpdateForm data={student} id={id} />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentUpdate;
