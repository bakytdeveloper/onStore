


// client/src/components/Sidebar/Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ onDirectionSelect, onTypeSelect, onProductsLoad }) => {
    const [directions, setDirections] = useState([]);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [currentLevel, setCurrentLevel] = useState('directions'); // Добавляем состояние для отслеживания текущего уровня

    useEffect(() => {
        const fetchDirections = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/products/directions');
                const data = await response.json();

                console.log('Received directions data:', data);

                if (Array.isArray(data)) {
                    setDirections(data);
                } else {
                    console.error('Invalid data format for directions:', data);
                }
            } catch (error) {
                console.error('Error fetching directions:', error);
            }
        };

        fetchDirections();
    }, []);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch(`http://localhost:5500/api/products/types?direction=${selectedDirection}`);
                const data = await response.json();

                console.log('Received types data:', data);

                if (Array.isArray(data)) {
                    setTypes(data);
                } else {
                    console.error('Invalid data format for types:', data);
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        if (selectedDirection) {
            fetchTypes();
        }
    }, [selectedDirection]);


    const handleDirectionClick = async (direction) => {
        setSelectedDirection(direction);
        onDirectionSelect(direction);
        setCurrentLevel('types');

        try {
            const response = await fetch(`http://localhost:5500/api/products/directions/${direction}`);
            const data = await response.json();

            console.log('Received products data:', data);

            if (Array.isArray(data)) {
                onProductsLoad(data);
            } else {
                console.error('Invalid data format for products:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleTypeClick = async (type) => {
        setSelectedType(type);
        onTypeSelect(type);
        // setCurrentLevel('products');

        try {
            const response = await fetch(`http://localhost:5500/api/products/types/${type}`);
            const data = await response.json();

            console.log('Received products data:', data);

            if (Array.isArray(data)) {
                onProductsLoad(data);
            } else {
                console.error('Invalid data format for products:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleBackClick = async () => {
        setSelectedDirection(null);
        setSelectedType(null); // Обнуляем выбранный тип

        onDirectionSelect(null); // Возвращаемся к направлениям товаров

        // Устанавливаем текущий уровень на "Направления товара"
        setCurrentLevel('directions');

        // Сбрасываем загруженные типы
        setTypes([]);

        try {
            // Загружаем все товары и передаем их в родительский компонент
            const response = await fetch('http://localhost:5500/api/products');
            const data = await response.json();

            console.log('Received products data:', data);

            if (Array.isArray(data)) {
                onProductsLoad(data);
            } else {
                console.error('Invalid data format for products:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    return (
        <aside className="sidebar">
            <h3>{currentLevel === 'types' ? 'Типы товаров' : 'Направление товара'}</h3>
            <ul>
                {currentLevel === 'types' ? (
                    <li className="back" onClick={handleBackClick}>
                        Назад
                    </li>
                ) : null}
                {currentLevel === 'types' ? (
                    types.map((type, index) => (
                        <li
                            key={index}
                            className={selectedType === type ? 'selected' : undefined}
                            onClick={() => handleTypeClick(type)}
                        >
                            {type}
                        </li>
                    ))
                ) : (
                    directions.map((direction, index) => (
                        <li
                            key={index}
                            className={selectedDirection === direction ? 'selected' : undefined}
                            onClick={() => handleDirectionClick(direction)}
                        >
                            {direction}
                        </li>
                    ))
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;




