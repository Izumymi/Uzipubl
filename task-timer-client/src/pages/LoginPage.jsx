import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response.data.message || 'Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Вход</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Войти</button>
    </form>
  );
}
