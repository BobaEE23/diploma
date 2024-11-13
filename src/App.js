import { Routes, Route } from "react-router-dom";
import { Header } from "./header/components/header";
import "./App.css";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div>Главня</div>} />
        <Route path="/admin" element={<div>страница админа</div>} />
        <Route path="/register" element={<div>регистрация</div>} />
        <Route path="/auth" element={<div>авторизация</div>} />
        <Route path="/cart" element={<div>Корзина</div>} />
        <Route path="/product/:id" element={<div>продукт</div>} />
      </Routes>
    </>
  );
};
