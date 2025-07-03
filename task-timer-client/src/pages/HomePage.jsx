import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Проверка токена и получение данных пользователя (если нужно)
    const fetchUser = async () => {
      try {
        const res = await API.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div>
      <h1>Добро пожаловать, {user.name}!</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
