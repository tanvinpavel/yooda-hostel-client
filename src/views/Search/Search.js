import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import "./Search.css";

const Search = () => {
  const [students, setStudents] = useState([]);
const [query, setQuery] = useState(/[a-zA-Z0-9)]/i);
const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get('/student')
      .then(res => setStudents(res.data.student))
      .catch(err => console.log(err));
  }, []);

  const searchHandler = (e) => {
      setNotFound(false);
      const regex = new RegExp(`${e.target.value}`, 'i');
      setQuery(regex);
  }

  const formHandler = (e) => {
      e.preventDefault();
      setNotFound(false);

      const formData = new FormData(e.target);
      const value = Object.fromEntries(formData.entries());
      const {searchValue} = value;
      const payload = {name: searchValue, roll: searchValue}

      axios.post('/student/searchStudent', payload)
        .then(res => setStudents([res.data]))
        .catch(err => console.log(err))
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-sm-12 col-md-12 col-lg-10">
          <div className="card mt-5">
            <div className="card-body shadow">
              <h5 className="card-title text-center mb-3">Search Student</h5>
              <form className="row g-3" onSubmit={formHandler}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="search student by name & roll"
                    onChange={searchHandler}
                    name='searchValue'
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="container-table my-5 shadow">
              <table>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Roll</th>
                        <th>Hall</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    students.length !== 0 ? 
                    students.filter(student => query.test(student.name) || query.test(student.roll)).map((student, i) =>
                            <tr key={student._id} className="text-center">
                                <td>{++i}</td>
                                <td>{<Link to={`/memo/${student._id}`}>{student.name}</Link>}</td>
                                <td>{student.roll}</td>
                                <td>{student.hall}</td>
                                <td>{
                                student.status === 'active'
                                ? 
                                  <span className="active-status">Active</span>
                                : 
                                  <span className='inactive-status'>Inactive</span> 
                                }</td>
                            </tr>
                    )
                    : 
                    <tr>
                        <td colSpan='5' style={{'height': '300px'}} className="text-center bg-white">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                  }
                </tbody>
              </table>
                {
                    notFound && <h1 className="mt-5 text-center text-danger">No Data Found</h1>
                }
            </div>
          </div>
        </div>
    </div>
  );
};

export default Search;
