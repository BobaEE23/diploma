import React, { useState } from 'react';

import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer";

export const Main = () => {
  
  const [searchQuery, setSearchQuery] = useState(''); // Локальное состояние для поиска

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mainPage">
      <div className="container">
        <input
          className="searchInput" // Добавляем класс для стилизации
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={handleSearchChange} // Используем существующий инпут для поиска
        />
        <div className="mainContentPage">
          <Categories />
          <div className="productsSection">
            <Sort />
            <Products searchQuery={searchQuery} /> {/* Передаем поисковый запрос в Products */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};