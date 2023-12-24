// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Registration.css';
//
// const Registration = () => {
//     const [formData, setFormData] = useState({
//         username: '',
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
//         // Здесь добавьте логику для отправки данных на сервер для регистрации
//         console.log('Form data submitted:', formData);
//     };
//
//     return (
//         <div className="registration-container">
//             <h2>Регистрация</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Имя пользователя:
//                     <input type="text" name="username" value={formData.username} onChange={handleChange} />
//                 </label>
//                 <label>
//                     Email:
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} />
//                 </label>
//                 <label>
//                     Пароль:
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} />
//                 </label>
//                 <button type="submit">Зарегистрироваться</button>
//             </form>
//             <p>
//                 Уже есть аккаунт? <Link to="/login">Войти</Link>
//             </p>
//         </div>
//     );
// };
//
// export default Registration;



// // client/src/pages/Registration.js
// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import './Registration.css';
//
// const Registration = () => {
//     const [formData, setFormData] = useState({
//         username: '',
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
//             const response = await fetch('http://localhost:5500/api/users/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//
//             if (response.ok) {
//                 // Регистрация прошла успешно
//                 history.push('/login'); // Перенаправление на страницу логина
//             } else {
//                 // Обработка ошибок регистрации
//                 const data = await response.json();
//                 console.error(data.message);
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };
//
//     return (
//         <div className="registration-container">
//             <h2>Регистрация</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Имя пользователя:
//                     <input type="text" name="username" value={formData.username} onChange={handleChange} />
//                 </label>
//                 <label>
//                     Email:
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} />
//                 </label>
//                 <label>
//                     Пароль:
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} />
//                 </label>
//                 <button type="submit">Зарегистрироваться</button>
//             </form>
//             <p>
//                 Уже есть аккаунт? <Link to="/login">Войти</Link>
//             </p>
//         </div>
//     );
// };
//
// export default Registration;





// client/src/components/Registration/Registration.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaHome } from 'react-icons/fa';
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await fetch('http://localhost:5500/api/users/registration', {
            // const response = await fetch('http://localhost:5500/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Регистрация прошла успешно
                navigate('/login'); // Перенаправление на страницу логина
            } else {
                // Обработка ошибок регистрации
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="registration-container">
            <div className="close-icon" onClick={() => navigate('/')}>
                <FaTimes />
            </div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя пользователя:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Пароль:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default Registration;
