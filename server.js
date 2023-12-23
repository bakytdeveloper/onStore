// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require("cors");
const { authenticateUser } = require('./middleware/authMiddleware'); // Добавлено
const PORT = process.env.PORT || 5500;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('БАЗА ДАННЫХ ПОДКЛЮЧЕННА И РАБОТАЕТ БЕЗ ПРОБЛЕМ !!!');
});

// Middleware для аутентификации
app.use(authenticateUser);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`СЕРВЕР РАБОТАЕТ НА ${PORT} ПОРТУ !!!`);
});
