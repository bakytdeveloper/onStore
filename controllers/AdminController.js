// server/controllers/AdminController.js
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

const getAllProductsAdmin = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'email');
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// const editProduct = async (req, res) => {
//     try {
//         const { productId, updatedFields } = req.body;
//
//         const product = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found.' });
//         }
//
//         res.json({ message: 'Product updated successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// };





const addProduct = async (req, res) => {
    try {
        const newProduct = req.body; // Данные нового товара приходят с фронтенда
        const product = new Product(newProduct);
        await product.save();
        res.status(201).json({ message: 'Product added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


const createProduct = async (req, res) => {
    try {
        const { direction, type, brand, images, name, description, price, characteristics } = req.body;
        const newProduct = new Product({
            direction,
            type,
            brand,
            images: images.split(',').map((image) => image.trim()), // Преобразование строки в массив изображений
            name,
            description,
            price,
            characteristics,
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const editProduct = async (req, res) => {
    try {
        const { productId, updatedFields } = req.body;
        const product = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports = { getAllProductsAdmin, getAllOrdersAdmin, createProduct,
    getAllUsersAdmin, editProduct, addProduct, deleteProduct };
