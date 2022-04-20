import {useState} from 'react';
import InputField from '../InputField/InputField';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const Login = () => {

  const [values, setValues] = useState({
    email: '',
    pass: ''
  });
  const navigate = useNavigate();
  const {setUser} = useAuthContext();

  const inputs = [
    {
      id: 1,
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      required: true,
      errorMessage: 'Email required'
    },
    {
      id: 2,
      name: 'pass',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      errorMessage: 'Password required',
    }
  ];

  const formHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData.entries());

      const response = await axios.post('/auth/login', payload, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      });

      if(response.data.accessToken){
        setUser(response.data);
        localStorage.setItem('isLoggedIn', JSON.stringify(response.data));
        navigate('/home');
      }
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
        <h4>Login</h4>
        {
          inputs.map(input => <InputField key={input.id} onChange={onChange} data={input} />)
        }
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;