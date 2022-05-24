import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuthContext from "../../hooks/useAuthContext";
import InputField from "../InputField/InputField";
import './Signup.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: '',
    confirmPass: ''
  });
  const navigate = useNavigate();
  const {setUser} = useAuthContext();
  const [errorMessage, setErrorMessage] = useState(false);

  const inputs = [
    {
      id: 1,
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Name',
      required: true,
      pattern: '[a-zA-Z0-9 ]{3,25}',
      errorMessage: "Username should be 3-16 characters and should't include any special character!"
    },
    {
      id: 2,
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      required: true,
      errorMessage: "It should be a valid email address!"
    },
    {
      id: 3,
      name: 'pass',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$',
      errorMessage: "Password should be 8-24 characters and include at least 1 uppercase, 1 lowercase letter, 1 number and 1 special character",
    },
    {
      id: 4,
      name: 'confirmPass',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Reenter Password',
      required: true,
      pattern: values.pass,
      errorMessage: "Password not match!",
    },
  ];

  const formHandler = async (e) => {
    try {
      e.preventDefault();
      const formData= new FormData(e.target);
      const payload = Object.fromEntries(formData.entries());
      
      const response = await axios.post('/auth/signup', payload, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      });

      if(response.data.accessToken){
        setUser(response.data);
        localStorage.setItem('isLoggedIn', JSON.stringify(response.data));
        navigate('/home', {replace: true});
      }
    } catch (error) {
      if(error.response.status === 403){
        setErrorMessage(error.response.data);
      }else{
        setErrorMessage(error.response.data);
      }
    }
    
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <div className="object-center">
      <form onSubmit={formHandler}>
        { errorMessage && <p className="text-danger text-center">{errorMessage}</p> }
        <h4>Signup</h4>
        {
          inputs.map(input => <InputField key={input.id} data={input} onChange={onChange} />)
        }
        <button>Sign UP</button>
      </form>
    </div>
  );
};

export default Signup;
