// import React from 'react';
// import './AdminPanel.css'
//
// const AdminPanel = () => {
//     return (
//         <div className="admin">
//             <h2>Админ-панель</h2>
//             <p>Добро пожаловать в админ-панель. Здесь вы можете управлять товарами, пользователями и другими настройками.</p>
//             {/* Добавьте содержимое админ-панели здесь */}
//         </div>
//     );
// };
//
// export default AdminPanel;







// client/src/components/AdminPanel/AdminPanel.js
import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import './AdminPanel.css';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Загрузим список товаров при монтировании компонента
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/products');
            const data = await response.json();
            setProducts(data || []); // Удостоверимся, что products - это массив
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductSubmit = async (formData) => {
        try {
            let response;
            if (selectedProduct) {
                // Редактирование существующего товара
                response = await fetch('http://localhost:5500/api/products/edit-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: selectedProduct._id, updatedFields: formData }),
                });
            } else {
                // Создание нового товара
                response = await fetch('http://localhost:5500/api/products/create-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (response.ok) {
                // Обновим список товаров и сбросим выбранный товар
                fetchProducts();
                setSelectedProduct(null);
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleCancelEdit = () => {
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5500/api/products/delete-product/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Обновим список товаров
                fetchProducts();
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Админ-панель</h2>
            {selectedProduct ? (
                <div>
                    <h3>Редактировать продукт</h3>
                    <ProductForm onSubmit={handleProductSubmit} initialData={selectedProduct} />
                    <button onClick={handleCancelEdit}>Отменить редактирование.</button>
                </div>
            ) : (
                <div>
                    <h3>Создать Новый продукт</h3>
                    <ProductForm onSubmit={handleProductSubmit} />
                </div>
            )}

            <h3>Список продуктов</h3>
            <ul>
                {Array.isArray(products) &&
                products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.brand}
                        <button onClick={() => handleEditProduct(product)}>Редактировать</button>
                        <button onClick={() => handleDeleteProduct(product._id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;


