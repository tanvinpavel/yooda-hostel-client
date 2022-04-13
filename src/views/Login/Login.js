import React from "react";
import {useForm} from "react-hook-form"
import axios from "../../api/axios";

const Login = () => {

    const {handleSubmit, register} = useForm();

    const formDataHandler = (data) => {
        axios.post('/auth/login', data)
            .then(data => console.log(data))
            .catch( error => console.log(error))
    }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-10">
          <div className="card mt-5 border-0 shadow" style={{ background: "#f2f2f2" }}>
            <div className="card-body">
              <h4 className="card-title mb-3 text-center">Signup</h4>
              <form method="post" onSubmit={handleSubmit(formDataHandler)}>
                <div className="mb-3">
                  <label
                    htmlFor="inputName1"
                    className="form-label"
                  >
                    Username
                  </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName1"
                      {...register("name")}
                      placeholder="Student Name"
                      required
                    />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputRoll2"
                    className="form-label"
                  >
                    Email
                  </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputRoll2"
                      {...register("email")}
                      placeholder="Email"
                      required
                    />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputRoll22"
                    className="form-label"
                  >
                    Roll
                  </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRoll22"
                      {...register("roll")}
                      placeholder="Roll"
                      required
                    />
                </div>
                <div className="row mb-3">
                    <div className="col">
                    <label
                        htmlFor="inputPass22"
                        className="form-label"
                    >
                        Password
                    </label>
                        <input
                        type="password"
                        className="form-control"
                        id="inputRePass44"
                        {...register("pass")}
                        placeholder="Password"
                        required
                        />
                    </div>
                    <div className="col">
                    <label
                        htmlFor="inputRePass44"
                        className="form-label"
                    >
                        Re-enter Password
                    </label>
                        <input
                        type="password"
                        className="form-control"
                        id="inputPass22"
                        {...register("rePass")}
                        placeholder="Reenter password"
                        required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
