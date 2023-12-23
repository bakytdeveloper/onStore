// // server/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
//
// const authenticateUser = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
//
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };
//
// const authorizeUser = (roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Forbidden' });
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
    // Оставим возможность проходить запросам без токена для гостей
    if (!token && req.originalUrl.includes('/api/products')) {
        // Для эндпоинтов с товарами или направлениями позволим доступ без токена
        return next();
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const authorizeUser = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeUser };
