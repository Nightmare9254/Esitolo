import { useCookies } from 'react-cookie';
import { useLocal } from '../../hooks/cart';
import Menu from '../Menu/Menu';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import { ScaleButtonClick } from '../../framer/Transitions';

const Cart = () => {
  const [, removeItem, calculate, removeCart, addQuantity, cartItems] =
    useLocal();

  const [cookies] = useCookies();
  const { user } = cookies;

  let total = calculate();

  if (user) {
    total = total * 0.95;
  }

  return (
    <>
      <header className="cart__header">
        <h2 className="cart__title">Cart</h2>
        <button
          onClick={() => {
            removeCart();
          }}
          className="cart__remove-btn"
        >
          <i className="fas fa-trash-alt fa-2x"></i>
        </button>
      </header>
      <div className="cart">
        <div className="cart__items">
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
                  addQuantity={addQuantity}
                />
              );
            })}
        </div>
        <div className="cart__total-wrapper">
          <p className="cart__total-desc">Total: {total.toFixed(2)}$</p>
          {cartItems.length > 0 && (
            <ScaleButtonClick>
              <Link to="/basket/order-confirmation" className="cart__btn">
                Checkout ({cartItems.length})
              </Link>
            </ScaleButtonClick>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
