// src/actions.js
export const setUserRole = (role) => ({
  type: 'SET_USER_ROLE',
  payload: role,
});

export const setUserName = (name) => ({
  type: 'SET_USER_NAME',
  payload: name,
});

export const setUserAuthenticated = (isAuthenticated) => ({
  type: 'SET_USER_AUTHENTICATED',
  payload: isAuthenticated,
});

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const filterProductsByCategory = (categories) => ({
  type: 'FILTER_PRODUCTS_BY_CATEGORY',
  payload: categories,
});

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

export const sortProducts = (sortBy) => ({
  type: 'SORT_PRODUCTS',
  payload: sortBy,
});

export const editProduct = (product) => ({
  type: 'EDIT_PRODUCT',
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: 'DELETE_PRODUCT',
  payload: productId,
});

export const fetchProducts = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        dispatch(setProducts(data));
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  };
};

export const saveProduct = (product) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(editProduct(data));
      })
      .catch(error => {
        console.error('Ошибка при сохранении данных:', error);
      });
  };
};

export const removeProduct = (productId) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch(deleteProduct(productId));
      })
      .catch(error => {
        console.error('Ошибка при удалении данных:', error);
      });
  };
};

export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const removeFromCart = (product) => ({
  type: 'REMOVE_FROM_CART',
  payload: product,
});

export const increaseQuantity = (product) => ({
  type: 'INCREASE_QUANTITY',
  payload: product,
});

export const decreaseQuantity = (product) => ({
  type: 'DECREASE_QUANTITY',
  payload: product,
});
// src/actions/searchActions.js
export const setSearchQuery = (query) => ({
  type: 'SET_SEARCH_QUERY',
  payload: query,
});

export const filterProductsBySearch = (products) => ({
  type: 'FILTER_PRODUCTS_BY_SEARCH',
  payload: products,
});
