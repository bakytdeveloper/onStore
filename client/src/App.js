// import React, {useEffect, useState} from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import ProductList from "./components/ProductList/ProductList";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
//
// // const Home = () => <div>Home</div>;
//
// function App() {
//
//   // Предположим, у вас есть стейт для хранения списка товаров
//   const [products, setProducts] = useState([]);
//
//   // Используйте useEffect для получения данных с сервера
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:5500/api/products');
//         const data = await response.json();
//         setProducts(data);
//         console.log(data)
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//
//     fetchProducts();
//   }, []); // Пустой массив зависимостей гарантирует вызов useEffect только после монтирования компонента
//
//   const [selectedDirection, setSelectedDirection] = useState(null);
//
//   const handleDirectionSelect = (direction) => {
//     setSelectedDirection(direction);
//   };
//
//   const handleProductsLoad = (loadedProducts) => {
//     setProducts(loadedProducts);
//   };
//
//
//     const [selectedType, setSelectedType] = useState(null);
//
//
//     const handleTypeSelect = (type) => {
//         setSelectedType(type);
//     };
//
//
//
//
//     return (
//       <Router>
//         {/*<div>*/}
//           <Header />
//           <Sidebar
//               onDirectionSelect={handleDirectionSelect}
//               onProductsLoad={handleProductsLoad}
//               onTypeSelect={handleTypeSelect}
//
//           />
//           <Switch>
//
//
//             <ProductList className="product-list" products={products} />
//
//           </Switch>
//         {/*</div>*/}
//       </Router>
//   );
// }
//
// export default App;
//
//



// client/src/pages/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from './components/ProductDetails/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDirectionSelect = (direction) => {
    setSelectedDirection(direction);
    setSearchTerm(''); // Сбрасываем поисковый запрос при выборе направления
  };

  const handleProductsLoad = (loadedProducts) => {
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
    setSelectedDirection(null);
    setSelectedType(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSearchTerm(''); // Сбрасываем поисковый запрос при выборе типа
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = products.filter(
        (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.type.toLowerCase().includes(value.toLowerCase()) ||
            product.brand.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
      <Router>
        <Header onSearch={handleSearch} />
        <Sidebar
            onDirectionSelect={handleDirectionSelect}
            onProductsLoad={handleProductsLoad}
            onTypeSelect={handleTypeSelect}
        />
        <Switch>
          <Route path="/details/:productId">
            <ProductDetails products={products} />
          </Route>
          <Route path="/">
            <ProductList className="product-list" products={filteredProducts} />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
