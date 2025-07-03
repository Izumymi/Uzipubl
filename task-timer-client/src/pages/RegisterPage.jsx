import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response.data.message || 'Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Регистрация</h2>
      <input placeholder="Имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Пароль" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
