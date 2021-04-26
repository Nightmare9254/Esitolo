import { useEffect, useReducer } from 'react';

export const useLocal = () => {
  const ACTIONS = {
    ADD: 'add-item',
    REMOVE: 'remove-item',
    DELETE: 'delete-cart',
  };

  const newItem = (product, arr) => {
    const index = arr.findIndex((i) => i.id === product.id);
    if (index !== -1) {
      arr[index].quantity += 1;
      return false;
    }
    return {
      id: product.id,
      productName: product.productName,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    };
  };

  const reducer = (cartItems, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        const item = newItem(action.payload.values, cartItems);
        if (item === false) return [...cartItems];
        return [...cartItems, newItem(action.payload.values, cartItems)];

      case ACTIONS.REMOVE:
        const index = cartItems.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          cartItems[index].quantity -= 1;
          if (cartItems[index].quantity < 1) {
            cartItems.splice(index, 1);
          }
          return [...cartItems];
        }
      case ACTIONS.DELETE:
        return cartItems.splice(0, cartItems.length);
    }
  };
  const [cartItems, dispatch] = useReducer(reducer, [], () => {
    const localData = localStorage.getItem('cart-items');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (values) => {
    dispatch({ type: ACTIONS.ADD, payload: { values } });
  };

  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE, payload: { id: id } });
  };

  const calculate = () => {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((element) => {
        total = element.price * element.quantity + total;
      });
    }

    return total;
  };

  const removeCart = () => {
    dispatch({ type: ACTIONS.DELETE });
  };
  return [addItem, removeItem, calculate, removeCart, cartItems];
};
