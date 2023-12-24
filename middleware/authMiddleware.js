//
//
// // server/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
//
// const authenticateUser = (req, res, next) => {
//     const token = req.header('Authorization');
//     // Оставим возможность проходить запросам без токена для гостей
//     if (!token && req.originalUrl.includes('/api/products')) {
//         // Для эндпоинтов с товарами или направлениями позволим доступ без токена
//         return next();
//     }
//
//     if (!token) {
//         return res.status(401).json({ message: 'Несанкционированный' });
//     }
//
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ message: 'Несанкционированный' });
//     }
// };
//
// const authorizeUser = (roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Запрещенный' });
//         }
//         next();
//     };
// };
//
// module.exports = { authenticateUser, authorizeUser };




// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    // Разрешаем проход для запросов на продукты без токена
    if (!token && req.originalUrl.includes('/api/products')) {
        return next();
    }

    if (!token && req.originalUrl.includes('/api/users/registration')) {
        return next();
    }

    // Далее ваша текущая логика проверки токена
    if (!token) {
        return res.status(401).json({ message: 'Несанкционированный' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Несанкционированный' });
    }
};


const authorizeUser = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Запрещенный' });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeUser };



