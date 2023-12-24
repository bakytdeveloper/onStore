// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Login.css';
//
// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Здесь добавьте логику для отправки данных на сервер для входа
//         console.log('Form data submitted:', formData);
//     };
//
//     return (
//         <div className="login-container">
//             <h2>Вход</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email:
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} />
//                 </label>
//                 <label>
//                     Пароль:
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} />
//                 </label>
//                 <button type="submit">Войти</button>
//             </form>
//             <p>
//                 Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
//             </p>
//         </div>
//     );
// };
//
// export default Login;




// // client/src/components/Login/Login.js
// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import './Login.css';
//
// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//
//     const history = useHistory();
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5500/api/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//
//             if (response.ok) {
//                 // Логин прошел успешно
//                 const data = await response.json();
//                 localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
//                 history.push('/'); // Перенаправление на главную страницу
//             } else {
//                 // Обработка ошибок логина
//                 const data = await response.json();
//                 console.error(data.message);
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//         }
//     };
//
//     return (
//         <div className="login-container">
//             <h2>Вход</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email:
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} />
//                 </label>
//                 <label>
//                     Пароль:
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} />
//                 </label>
//                 <button type="submit">Войти</button>
//             </form>
//             <p>
//                 Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
//             </p>
//         </div>
//     );
// };
//
// export default Login;


// client/src/components/Login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaHome } from 'react-icons/fa';

import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5500/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Логин прошел успешно
                const data = await response.json();
                localStorage.setItem('token', data.token);

                // Проверка роли и перенаправление
                const isAdmin = data.role === 'admin';
                if (isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/'); // Перенаправление на главную страницу для обычных пользователей
                }
            } else {
                // Обработка ошибок логина
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="close-icon" onClick={() => navigate('/')}>
                <FaTimes />
            </div>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Пароль:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <button type="submit">Войти</button>
            </form>
            <p>
                Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
            </p>
        </div>
    );
};

export default Login;
