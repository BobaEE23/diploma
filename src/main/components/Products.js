import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart } from '../../actions';
import { sortProducts } from '../../reducers/productReducer';
import useFilterProducts from '../../hooks/useFilterProducts'; // Импортируем хук

export const Products = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { products, sortBy } = useSelector(state => state.products);
  const selectedCategories = useSelector(state => state.categories.selectedCategories);
  const [isLoading, setIsLoading] = useState(true); // Состояние для отображения лоадера

  // Загрузка товаров с задержкой в 1 секунду
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchProducts());
      setIsLoading(false); // Скрываем лоадер после загрузки
    }, 1000);

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании
  }, [dispatch]);

  // Используем хук для фильтрации товаров
  const filteredProducts = useFilterProducts(products, searchQuery, selectedCategories);

  // Сортировка товаров
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="products">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div> {/* Крутящийся кружок */}
        </div>
      ) : (
        sortedProducts.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={product.photo || 'https://via.placeholder.com/150'} alt={product.name} />
            <div className="productInfo">
              <div>ID: {product.id}</div>
              <div>Название: {product.name}</div>
              <div>Стоимость: {product.price} руб.</div>
            </div>
            <button onClick={(e) => {
              e.preventDefault();
              handleAddToCart(product);
            }}>
              Добавить в корзину
            </button>
          </Link>
        ))
      )}
    </div>
  );
};