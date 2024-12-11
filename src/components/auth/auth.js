import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setUserRole, setUserName, setUserAuthenticated } from "../../actions";


export const Auth = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Инициализируем useNavigate
    const dispatch = useDispatch();

    const authFormSchema = yup.object().shape({
        login: yup
            .string()
            .required('Заполните логин')
            .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
            .min(3, 'Неверно заполнен логин. Минимум 3 символа')
            .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
        password: yup
            .string()
            .required('Заполните пароль')
            .matches(
                /^[\w#%]+$/,
                'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
            )
            .min(6, 'Неверно заполнен пароль. Минимум 6 символов')
            .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(authFormSchema),
    });

    const onSubmit = async (data) => {
        const { login, password } = data;

        try {
            // Замените URL на ваш адрес базы данных
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();

            const user = users.find(user => user.login === login && user.password === password);

            if (user) {
                console.log('Авторизация успешна');
                dispatch(setUserRole(user.role_id)); // Отправка экшена для обновления роли
                dispatch(setUserName(user.login)); // Отправка экшена для обновления имени пользователя
                dispatch(setUserAuthenticated(true)); // Отправка экшена для обновления статуса аутентификации
                console.log('Роль пользователя:', user.role_id); // Вывод роли в консоль
                setErrorMessage('');
                reset(); // Очистка полей формы
                navigate('/'); // Перенаправление на главную страницу
            } else {
                setErrorMessage('Неверный логин или пароль');
            }
        } catch (error) {
            console.error('Ошибка при запросе к базе данных:', error);
            setErrorMessage('Ошибка при запросе к базе данных');
        }
    };

    return (
        <div className="Auth">
            <h2 className="AuthTitle">Авторизация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="AuthInput AuthLogin"
                    placeholder="login"
                    {...register('login')}
                />
                {errors.login && <p className="AuthError">{errors.login.message}</p>}

                <input
                    className="AuthInput AuthPassword"
                    placeholder="password..."
                    type="password"
                    {...register('password')}
                />
                {errors.password && <p className="AuthError">{errors.password.message}</p>}

                <button className="AuthButton" type="submit">Авторизироваться</button>
            </form>
            {errorMessage && <p className="AuthError">{errorMessage}</p>}
        </div>
    );
};