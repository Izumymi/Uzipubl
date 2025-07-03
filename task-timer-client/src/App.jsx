import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
