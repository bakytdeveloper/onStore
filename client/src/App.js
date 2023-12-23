


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
    setSearchTerm('');
  };

  const handleProductsLoad = (loadedProducts) => {
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
    setSelectedDirection(null);
    setSelectedType(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSearchTerm('');
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

        <Routes>
          <Route
              path="/"
              element={
                <React.Fragment>
                  <Sidebar
                      onDirectionSelect={handleDirectionSelect}
                      onProductsLoad={handleProductsLoad}
                      onTypeSelect={handleTypeSelect}
                  />
                  <ProductList className="product-list" products={filteredProducts} />
                </React.Fragment>
              }
          />
          <Route path="/details/:productId" element={<ProductDetails products={products} />} />
        </Routes>
      </Router>
  );
}

export default App;





