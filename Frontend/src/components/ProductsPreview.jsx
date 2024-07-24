import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AddProduct } from "./AddProduct";
import { addToCart } from "../stores/cart/cartSlice";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product)
  }

  return (
    <div className="w-full p-4 m-2 rounded-lg text-center bg-white shadow-md">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-t" />
      <div className="p-4">
        <h2 className="pb-2 text-lg font-bold">{product.name}</h2>
        <p className="mb-2 h-20 line-clamp-4 overflow-hidden text-gray-600">{product.content}</p>
        <p className="mb-2 font-bold text-gray-800">${product.price.toFixed(2)}</p>
        <AddProduct onAddProduct={addProduct} />
      </div>
    </div>
  )
}

export const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:2000/article');
        const data = await response.json();
        setProducts(data);
      } catch(e) {
        console.error(e);
      }
    };

    fetchArticles();
  }, []);

  const onAddProduct = (product) => {
    if (product.isAvailable) {
      dispatch(addToCart(product));
    } else {
      alert("Sorry, this product is currently unavailable.");
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Customers' favorite food!</h2>
      <Carousel responsive={responsive} transitionDuration={1000}>
        {products.length > 0 &&
          products.map((product, index) => (
            <div className="product-card" key={index}>
              <ProductPreviewCard product={product} onAddProduct={onAddProduct} />
            </div>
          ))}
      </Carousel>
    </div>
  );
};
