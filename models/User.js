// // server/models/User.js
// const mongoose = require('mongoose');
//
// const userSchema = new mongoose.Schema({
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['client', 'guest', 'admin'], default: 'guest' },
//     cart: [{
//         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//         quantity: { type: Number, default: 1 },
//     }],
//     purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
//     firstName: { type: String },
//     lastName: { type: String },
// });
//
// const User = mongoose.model('User', userSchema);
//
// module.exports = User;





// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String }, // Добавлено поле для имени пользователя
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'guest', 'admin'], default: 'guest' },
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
    }],
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    // username: { type: String }, // Добавлено поле для имени пользователя
    firstName: { type: String },
    lastName: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;