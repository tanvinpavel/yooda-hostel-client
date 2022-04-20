import { useState } from "react";
import axios from "../../api/axios";
import InputField from "../InputField/InputField";
import './Signup.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass: '',
    confirmPass: ''
  });

  const inputs = [
    {
      id: 1,
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Name',
      required: true,
      pattern: '[a-zA-Z0-9]{3,25}',
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
        headers: {'Content-Type': 'application/json'}
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <div className="object-center">
      <form onSubmit={formHandler}>
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
