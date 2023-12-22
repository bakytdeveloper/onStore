


//
// // client/src/components/Sidebar/Sidebar.js
// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = ({ onDirectionSelect, onProductsLoad }) => {
//     const [directions, setDirections] = useState([]);
//     const [selectedDirection, setSelectedDirection] = useState(null);
//     const [types, setTypes] = useState([]);
//
//     useEffect(() => {
//         const fetchDirections = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products/directions');
//                 const data = await response.json();
//
//                 console.log('Received directions data:', data);
//
//                 if (Array.isArray(data)) {
//                     setDirections(data);
//                 } else {
//                     console.error('Invalid data format for directions:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching directions:', error);
//             }
//         };
//
//         fetchDirections();
//     }, []);
//
//     useEffect(() => {
//         const fetchTypes = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5500/api/products/types?direction=${selectedDirection}`);
//                 const data = await response.json();
//
//                 console.log('Received types data:', data);
//
//                 if (Array.isArray(data)) {
//                     setTypes(data);
//                 } else {
//                     console.error('Invalid data format for types:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching types:', error);
//             }
//         };
//
//         if (selectedDirection) {
//             fetchTypes();
//         }
//     }, [selectedDirection]);
//
//
//     const handleItemClick = (item) => {
//         if (selectedDirection) {
//             onDirectionSelect(item);
//             setSelectedDirection(null);
//         } else {
//             setSelectedDirection(item);
//         }
//     };
//
//
//     const handleDirectionClick = async (direction) => {
//         setSelectedDirection(direction);
//         onDirectionSelect(direction); // Передаем выбранное направление обратно в родительский компонент
//
//         try {
//             const response = await fetch(`http://localhost:5500/api/products/directions/${direction}`);
//             const data = await response.json();
//
//             console.log('Received products data:', data);
//
//             if (Array.isArray(data)) {
//                 onProductsLoad(data); // Передаем полученные товары обратно в родительский компонент
//             } else {
//                 console.error('Invalid data format for products:', data);
//             }
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     return (
//         <aside className="sidebar">
//             <h3>{selectedDirection ? 'Типы товаров' : 'Направление товара'}</h3>
//             <ul>
//                 {selectedDirection ? (
//                     types.map((type, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === type ? 'selected' : undefined}
//                             onClick={() => handleDirectionClick(type)}
//                         >
//                             {type}
//                         </li>
//                     ))
//                 ) : (
//                     directions.map((direction, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === direction ? 'selected' : undefined}
//                             onClick={() => handleDirectionClick(direction)}
//                         >
//                             {direction}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </aside>
//     );
// };
//
// export default Sidebar;





// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = ({ onDirectionSelect, onProductsLoad }) => {
//     const [directions, setDirections] = useState([]);
//     const [selectedDirection, setSelectedDirection] = useState(null);
//     const [types, setTypes] = useState([]);
//
//     useEffect(() => {
//         const fetchDirections = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products/directions');
//                 const data = await response.json();
//
//                 console.log('Received directions data:', data);
//
//                 if (Array.isArray(data)) {
//                     setDirections(data);
//                 } else {
//                     console.error('Invalid data format for directions:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching directions:', error);
//             }
//         };
//
//         fetchDirections();
//     }, []);
//
//     useEffect(() => {
//         const fetchTypes = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5500/api/products/types?direction=${selectedDirection}`);
//                 const data = await response.json();
//
//                 console.log('Received types data:', data);
//
//                 if (Array.isArray(data)) {
//                     setTypes(data);
//                 } else {
//                     console.error('Invalid data format for types:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching types:', error);
//             }
//         };
//
//         if (selectedDirection) {
//             fetchTypes();
//         }
//     }, [selectedDirection]);
//
//     const handleItemClick = (item) => {
//         if (selectedDirection) {
//             onDirectionSelect(item);
//             setSelectedDirection(null);
//         } else {
//             setSelectedDirection(item);
//         }
//     };
//
//     const handleDirectionClick = async (direction) => {
//         setSelectedDirection(direction);
//         onDirectionSelect(direction);
//
//         try {
//             const response = await fetch(`http://localhost:5500/api/products/directions/${direction}`);
//             const data = await response.json();
//
//             console.log('Received products data:', data);
//
//             if (Array.isArray(data)) {
//                 onProductsLoad(data);
//             } else {
//                 console.error('Invalid data format for products:', data);
//             }
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     const handleBackClick = () => {
//         setSelectedDirection(null);
//         onDirectionSelect(null);
//     };
//
//     return (
//         <aside className="sidebar">
//             <h3>{selectedDirection ? 'Типы товаров' : 'Направление товара'}</h3>
//             {selectedDirection && (
//                 <button className="back-button" onClick={handleBackClick}>
//                     Назад
//                 </button>
//             )}
//             <ul>
//                 {selectedDirection ? (
//                     types.map((type, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === type ? 'selected' : undefined}
//                             onClick={() => handleDirectionClick(type)}
//                         >
//                             {type}
//                         </li>
//                     ))
//                 ) : (
//                     directions.map((direction, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === direction ? 'selected' : undefined}
//                             onClick={() => handleDirectionClick(direction)}
//                         >
//                             {direction}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </aside>
//     );
// };
//
// export default Sidebar;



// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
// import {useHistory} from "react-router-dom";
//
// const Sidebar = ({ onDirectionSelect, onProductsLoad }) => {
//     const [directions, setDirections] = useState([]);
//     const [selectedDirection, setSelectedDirection] = useState(null);
//     const [types, setTypes] = useState([]);
//     const [resetProducts, setResetProducts] = useState(false);
//
//     useEffect(() => {
//         const fetchDirections = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products/directions');
//                 const data = await response.json();
//
//                 console.log('Received directions data:', data);
//
//                 if (Array.isArray(data)) {
//                     setDirections(data);
//                 } else {
//                     console.error('Invalid data format for directions:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching directions:', error);
//             }
//         };
//
//         fetchDirections();
//     }, [resetProducts]);
//
//     useEffect(() => {
//         const fetchTypes = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5500/api/products/types?direction=${selectedDirection}`);
//                 const data = await response.json();
//
//                 console.log('Received types data:', data);
//
//                 if (Array.isArray(data)) {
//                     setTypes(data);
//                 } else {
//                     console.error('Invalid data format for types:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching types:', error);
//             }
//         };
//
//         if (selectedDirection) {
//             fetchTypes();
//         }
//     }, [selectedDirection]);
//
//     const handleItemClick = (item) => {
//         if (selectedDirection) {
//             onDirectionSelect(item);
//             setSelectedDirection(null);
//             setResetProducts(true); // Сбрасываем отображаемые продукты
//         } else {
//             setSelectedDirection(item);
//             setResetProducts(false); // Не сбрасываем отображаемые продукты
//         }
//     };
//
//     const handleDirectionClick = async (direction) => {
//         setSelectedDirection(direction);
//         onDirectionSelect(direction);
//         setResetProducts(false); // Не сбрасываем отображаемые продукты
//
//         try {
//             const response = await fetch(`http://localhost:5500/api/products/directions/${direction}`);
//             const data = await response.json();
//
//             console.log('Received products data:', data);
//
//             if (Array.isArray(data)) {
//                 onProductsLoad(data);
//             } else {
//                 console.error('Invalid data format for products:', data);
//             }
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     // const handleBackClick = () => {
//     //     setSelectedDirection(null);
//     //     onDirectionSelect(null);
//     //     setResetProducts(true); // Сбрасываем отображаемые продукты
//     // };
//
//     const history = useHistory();
//
//
//     const handleTitleClick = () => {
//         // Очищаем поле поиска и перезагружаем страницу при клике на заголовок
//         history.push('/');
//         window.location.reload(); // Это перезагрузит страницу
//     };
//

//     return (
//         <aside className="sidebar">
//             <h3>{selectedDirection ? 'Типы товаров' : 'Направление товара'}</h3>
//             {selectedDirection && (
//                 <button className="back-button" onClick={handleTitleClick}>
//                     Назад
//                 </button>
//             )}
//             <ul>
//                 {selectedDirection ? (
//                     types.map((type, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === type ? 'selected' : undefined}
//                             onClick={() => handleDirectionClick(type)}
//                         >
//                             {type}
//                         </li>
//                     ))
//                 ) : (
//                     directions.map((direction, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === direction ? 'selected' : undefined}
//                             onClick={() => handleDirectionClick(direction)}
//                         >
//                             {direction}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </aside>
//     );
// };
//
// export default Sidebar;




// // client/src/components/Sidebar/Sidebar.js
// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = ({ onDirectionSelect, onTypeSelect, onProductsLoad }) => {
//     const [directions, setDirections] = useState([]);
//     const [selectedDirection, setSelectedDirection] = useState(null);
//     const [types, setTypes] = useState([]);
//     const [selectedType, setSelectedType] = useState(null); // Добавлено состояние selectedType
//
//     useEffect(() => {
//         const fetchDirections = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products/directions');
//                 const data = await response.json();
//
//                 console.log('Received directions data:', data);
//
//                 if (Array.isArray(data)) {
//                     setDirections(data);
//                 } else {
//                     console.error('Invalid data format for directions:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching directions:', error);
//             }
//         };
//
//         fetchDirections();
//     }, []);
//
//     useEffect(() => {
//         const fetchTypes = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5500/api/products/types?direction=${selectedDirection}`);
//                 const data = await response.json();
//
//                 console.log('Received types data:', data);
//
//                 if (Array.isArray(data)) {
//                     setTypes(data);
//                 } else {
//                     console.error('Invalid data format for types:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching types:', error);
//             }
//         };
//
//         if (selectedDirection) {
//             fetchTypes();
//         }
//     }, [selectedDirection]);
//
//     const handleItemClick = (item) => {
//         if (selectedDirection) {
//             onDirectionSelect(item);
//             setSelectedDirection(null);
//             setSelectedType(null); // Сбросить selectedType при возврате к направлениям
//         } else if (selectedType) {
//             onTypeSelect(null); // Сбросить selectedType при возврате от типа к направлениям
//             setSelectedType(null);
//         } else {
//             setSelectedDirection(item);
//         }
//     };
//
//     const handleDirectionClick = async (direction) => {
//         setSelectedDirection(direction);
//         onDirectionSelect(direction); // Передаем выбранное направление обратно в родительский компонент
//
//         try {
//             const response = await fetch(`http://localhost:5500/api/products/directions/${direction}`);
//             const data = await response.json();
//
//             console.log('Received products data:', data);
//
//             if (Array.isArray(data)) {
//                 onProductsLoad(data); // Передаем полученные товары обратно в родительский компонент
//             } else {
//                 console.error('Invalid data format for products:', data);
//             }
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     const handleTypeClick = async (type) => {
//         setSelectedType(type);
//
//         try {
//             const response = await fetch(`http://localhost:5500/api/products/types/${type}`);
//             if (!response.ok) {
//                 throw new Error(`Server responded with status ${response.status}`);
//             }
//             const data = await response.json();
//
//             console.log('Received products data:', data);
//
//             if (Array.isArray(data)) {
//                 onProductsLoad(data); // Передаем полученные товары обратно в родительский компонент
//             } else {
//                 console.error('Invalid data format for products:', data);
//             }
//         } catch (error) {
//             console.error('Error fetching products:', error.message);
//         }
//
//         onTypeSelect(type); // Передаем выбранный тип обратно в родительский компонент
//     };
//
//
//     return (
//         <aside className="sidebar">
//             <h3>{selectedType ? 'Назад' : selectedDirection ? 'Типы товаров' : 'Направление товара'}</h3>
//             <ul>
//                 {selectedType ? (
//                     <li onClick={() => handleTypeClick(null)}>Назад</li>
//                 ) : selectedDirection ? (
//                     types.map((type, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === type ? 'selected' : undefined}
//                             onClick={() => handleTypeClick(type)}
//                         >
//                             {type}
//                         </li>
//                     ))
//                 ) : (
//                     directions.map((direction, index) => (
//                         <li
//                             key={index}
//                             className={selectedDirection === direction ? 'selected' : undefined}
//                             onClick={() => handleDirectionClick(direction)}
//                         >
//                             {direction}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </aside>
//     );
// };
//
// export default Sidebar;


// client/src/components/Sidebar/Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ onDirectionSelect, onTypeSelect, onProductsLoad }) => {
    const [directions, setDirections] = useState([]);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null); // Добавляем состояние для хранения выбранного типа

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

    const handleItemClick = (item) => {
        if (selectedDirection) {
            setSelectedDirection(null);
            onDirectionSelect(item);
        } else if (selectedType) {
            setSelectedType(null);
            onTypeSelect(item);
        } else {
            setSelectedDirection(item);
        }
    };

    const handleDirectionClick = async (direction) => {
        setSelectedDirection(direction);
        onDirectionSelect(direction);

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

    return (
        <aside className="sidebar">
            <h3>{selectedDirection ? 'Типы товаров' : 'Направление товара'}</h3>
            <ul>
                {selectedDirection ? (
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



