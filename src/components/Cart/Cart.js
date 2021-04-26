import { useEffect, useState } from 'react';
import { useLocal } from '../../hooks/cart';
import Product from '../Product/Product';

const Cart = () => {
  const [addItem, removeItem, calculate, removeCart, cartItems] = useLocal();
  console.log(cartItems);

  // const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   cartItems.forEach((element) => {
  //     setTotal(element.quantity * element.price);
  //   });
  // }, [cartItems]);

  return (
    <div style={{ background: '#333', minHeight: '100vh', padding: '1rem' }}>
      <h1>Cart</h1>
      {cartItems &&
        cartItems.map(({ image, productName, id, quantity, price }) => {
          return (
            <Product
              key={id}
              id={id}
              productName={productName}
              quantity={quantity}
              price={price}
              image={image}
              isInCart={true}
              removeItem={removeItem}
            />
          );
        })}
      <p style={{ color: '#fff', fontSize: '20px' }}>Total: {calculate()}$</p>
      <button>Buy</button>
      <button onClick={removeCart} style={{ background: 'red' }}>
        Remove all cart
      </button>
    </div>
  );
};

export default Cart;
