import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useInterceptor from "../../hooks/useInterceptor";

const AddMeal = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPrivate = useInterceptor();

  const formDataHandler = (payload) => {
    axiosPrivate.post("http://localhost:5050/meal/addMeal", payload)
      .then((mess) => {
        if (mess) {
          Swal.fire("Success!", "New meal added successfully!", "success");
          reset();
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <div className="card mt-5 border-0" style={{ background: "#f2f2f2" }}>
            <div className="card-body">
              <h5 className="card-title mb-5">Add New Meal</h5>
              <form method="post" onSubmit={handleSubmit(formDataHandler)}>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
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
                  <label htmlFor="input3" className="col-sm-2 col-form-label">
                    Price
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="input3"
                      {...register("price")}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary offset-2">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
