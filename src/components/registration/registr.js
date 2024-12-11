import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setUserRole, setUserName, setUserAuthenticated } from "../../actions";


export const Registration = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Инициализируем useNavigate
    const dispatch = useDispatch();

    const registrationFormSchema = yup.object().shape({
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
        email: yup
            .string()
            .required('Заполните email')
            .email('Неверный формат email'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(registrationFormSchema),
    });

    const onSubmit = async (data) => {
        const { login, password, email } = data;

        try {
            // Замените URL на ваш адрес базы данных
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password, email, role_id: 1 }), // role_id для читателя
            });

            if (response.ok) {
                const user = await response.json();
                console.log('Регистрация успешна');
                dispatch(setUserRole(user.role_id)); // Отправка экшена для обновления роли
                dispatch(setUserName(user.login)); // Отправка экшена для обновления имени пользователя
                dispatch(setUserAuthenticated(true)); // Отправка экшена для обновления статуса аутентификации
                console.log('Роль пользователя:', user.role_id); // Вывод роли в консоль
                setErrorMessage('');
                reset(); // Очистка полей формы
                navigate('/'); // Перенаправление на главную страницу
            } else {
                setErrorMessage('Ошибка при регистрации');
            }
        } catch (error) {
            console.error('Ошибка при запросе к базе данных:', error);
            setErrorMessage('Ошибка при запросе к базе данных');
        }
    };

    return (
        <div className="Registration">
            <h2 className="RegistrationTitle">Регистрация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="RegistrationInput RegistrationLogin"
                    placeholder="login"
                    {...register('login')}
                />
                {errors.login && <p className="RegistrationError">{errors.login.message}</p>}

                <input
                    className="RegistrationInput RegistrationPassword"
                    placeholder="password..."
                    type="password"
                    {...register('password')}
                />
                {errors.password && <p className="RegistrationError">{errors.password.message}</p>}

                <input
                    className="RegistrationInput RegistrationEmail"
                    placeholder="email"
                    {...register('email')}
                />
                {errors.email && <p className="RegistrationError">{errors.email.message}</p>}

                <button className="RegistrationButton" type="submit">Зарегистрироваться</button>
            </form>
            {errorMessage && <p className="RegistrationError">{errorMessage}</p>}
        </div>
    );
};