import { useState, FunctionComponent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Auth } from '../../utils/Auth';
import { register } from '../../apiServices/authApi';

//import './styles.css'

interface IProps {
  setIsAuthenticated : Function
}

export const Register = ({ setIsAuthenticated } : IProps) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e :FormEvent<HTMLFormElement>) => {
    // Check the client-session to see how to handle redirects
    e.preventDefault();
    const user = { username, password };
    const res = await register(user);

    if (res.error) {
      alert(`${res.message}`);
      setUsername('')
      setPassword('');
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      Auth.login(() => navigate('/profile'));
    }
  };

  const validateForm = ()  => {
    return (
      username.length < 5 || password.length < 5  
    );
  };

  return (
    <div id = 'register'>
      <h2>Register</h2>
      <form className="form" id ='form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      
        <button className="form-submit" type="submit" disabled={validateForm()}>
          Register
        </button>
      </form>
    </div>
  );
};
