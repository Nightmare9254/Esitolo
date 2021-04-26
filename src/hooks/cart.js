import { useEffect, useReducer } from 'react';

export const useLocal = () => {
  const ACTIONS = {
    ADD: 'add-item',
    REMOVE: 'remove-item',
    DELETE: 'delete-cart',
    QUANTITY: 'add-item-quantity',
  };

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

  const reducer = (cartItems, action) => {
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

      case ACTIONS.DELETE:
        return cartItems.splice(0, cartItems.length);

      case ACTIONS.QUANTITY:
        console.log('dupa');
        const id = cartItems.findIndex((i) => i.id === action.payload.id);
        cartItems[id].quantity += 1;
        return [...cartItems];

      default:
        return null;
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
    return total.toFixed(2);
  };

  const removeCart = () => {
    dispatch({ type: ACTIONS.DELETE });
  };

  const addQuantity = (id) => {
    dispatch({ type: ACTIONS.QUANTITY, payload: { id } });
  };

  return [addItem, removeItem, calculate, removeCart, addQuantity, cartItems];
};
