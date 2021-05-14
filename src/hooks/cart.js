import { useCallback, useEffect, useReducer } from 'react';
import { ACTIONS } from '../assets/Consts/Actions';

export const useLocal = () => {
  const newItem = ({ id, productName, price, image, quantity }, arr) => {
    const index = arr.findIndex((item) => item.id === id);
    if (index !== -1) {
      arr[index].quantity += quantity;
      return false;
    }

    return {
      id,
      productName,
      price,
      image,
      quantity,
    };
  };

  const reducer = useCallback((cartItems, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        const item = newItem(action.payload.values, cartItems);

        if (item === false) return [...cartItems];
        return [...cartItems, newItem(action.payload.values, cartItems)];

      case ACTIONS.REMOVE:
        const index = cartItems.findIndex((i) => i.id === action.payload.id);

        if (index !== -1) {
          cartItems[index].quantity--;
          if (cartItems[index].quantity < 1) {
            cartItems.splice(index, 1);
          }
          return [...cartItems];
        }
        break;
      case ACTIONS.DELETE:
        cartItems.splice(0, cartItems.length);
        return [...cartItems];

      case ACTIONS.QUANTITY: {
        const id = cartItems.findIndex((i) => i.id === action.payload.id);

        cartItems[id].quantity++;

        return [...cartItems];
      }
      default:
        return [...cartItems];
    }
  }, []);

  const [cartItems, dispatch] = useReducer(reducer, [], () => {
    const localData = localStorage.getItem('cart-items');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('cart-items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (values) => {
    dispatch({ type: ACTIONS.ADD, payload: { values } });
  };

  const calculate = () => {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((element) => {
        total += element.price * element.quantity;
      });
    }
    return total;
  };

  const removeCart = () => {
    dispatch({ type: ACTIONS.DELETE });
  };

  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE, payload: { id: id } });
  };

  const addQuantity = (id) => {
    dispatch({ type: ACTIONS.QUANTITY, payload: { id: id } });
  };

  return [addItem, removeItem, calculate, removeCart, addQuantity, cartItems];
};
