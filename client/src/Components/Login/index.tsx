import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Auth }from '../../utils/Auth';
import { login  } from '../../apiServices/authApi';

//import './styles.css'

interface IProps {
  setIsAuthenticated : Function
}

export const Login = ({ setIsAuthenticated} : IProps) => {

  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e :FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password };
    const res = await login(user);
    if (res.error) {
      alert(`${res.message}`);
      setUsername('')
      setPassword('')
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      Auth.login(() => navigate('/profile'));
    }
  };

  const validateForm = () => {
    return !username || !password;
  };

  return (
    <div id = 'login-container'>
      <h2>Login</h2>
      <form className="form" onSubmit={e => handleSubmit(e)}>
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
          Login
        </button>
      </form>
    </div>
  );
};