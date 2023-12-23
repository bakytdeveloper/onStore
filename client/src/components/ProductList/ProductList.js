// // client/src/components/ProductList/ProductList.js
// import React from 'react';
// import ProductCard from './../ProductCard/ProductCard';
// import './ProductList.css';
// import {Link} from "react-router-dom";
//
// const ProductList = ({ products }) => {
//     return (
//         <div className="product-list">
//             {products.map((product, index) => (
//                 <Link key={product._id}  to={`/details/${product._id}`}>
//                 <ProductCard
//                     className="product-card"
//                     key={product._id}
//                     images={product.images || []}
//                     brand={product.brand}
//                     description={product.description}
//                     price={product.price}
//                 />
//                 </Link>
//             ))}
//         </div>
//     );
// };
//
// export default ProductList;





// client/src/components/ProductList/ProductList.js
import React from 'react';
import ProductCard from './../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map((product, index) => (
                <ProductCard
                    key={product._id}
                    linkTo={`/details/${product._id}`} // Передаем ссылку как часть данных
                    images={product.images || []}
                    brand={product.brand}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </div>
    );
};

export default ProductList;

