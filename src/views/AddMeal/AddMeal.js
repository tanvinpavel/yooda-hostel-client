import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddMeal = () => {
  const { register, handleSubmit, reset } = useForm();
  const formDataHandler = (data) => {
    console.log(data);
    fetch("http://localhost:4000/meal/addMeal", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((req) => req.json())
      .then((mess) => {
        if (mess) {
          Swal.fire("Success!", "New meal added successfully!", "success");
          reset();
        }
      });
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
                  <label
                    htmlFor="input3"
                    className="col-sm-2 col-form-label"
                  >
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
