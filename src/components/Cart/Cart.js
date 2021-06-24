import { useCookies } from 'react-cookie';
import { useLocal } from '../../hooks/cart';
import Menu from '../Menu/Menu';
import CartProduct from '../Product/CartProduct';
import { Link } from 'react-router-dom';
import { ScaleButtonClick } from '../../framer/Transitions';
import { useDimensions } from '../../hooks/useDimensions';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import EmptyCart from './EmptyCart';
import Footer from '../Footer/Footer';

const Cart = () => {
  const [, removeItem, calculate, removeCart, addQuantity, cartItems] =
    useLocal();

  const { width } = useDimensions();

  const [cookies] = useCookies();
  const { user } = cookies;

  let total = calculate();

  if (user) {
    total = total * 0.95;
  }

  return (
    <>
      <HeaderTitle title=" Cart" hideBasket={width >= 1333 ? true : false} />
      {cartItems.length >= 1 && (
        <>
          <div className="cart">
            <div className="cart__items">
              <div>
                <header className="cart__header">
                  <h2 className="cart__title">Your cart</h2>
                  <button
                    onClick={() => {
                      removeCart();
                    }}
                    className="cart__remove-btn"
                    aria-label="Remove all products from a cart"
                  >
                    <i className="fas fa-trash-alt fa-2x"></i>
                  </button>
                </header>
              </div>
              <div className="cart__items-wrapper">
                {cartItems.map(
                  ({ image, productName, id, quantity, price, category }) => {
                    return (
                      <CartProduct
                        key={id}
                        id={id}
                        productName={productName}
                        quantity={quantity}
                        price={price}
                        image={image}
                        removeItem={removeItem}
                        addQuantity={addQuantity}
                        category={category}
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div className="cart__total-wrapper">
              <div className="cart__total-row">
                <p className="cart__total-desc">Total:</p>
                <span className="cart__total-price">{total.toFixed(2)} $</span>
              </div>

              <ScaleButtonClick>
                <button className="cart__btn">
                  <Link to="/basket/order-confirmation">GO TO SUMMARY</Link>
                </button>
              </ScaleButtonClick>
            </div>
          </div>
        </>
      )}
      {cartItems.length === 0 && <EmptyCart />}
      <Footer />
      <Menu />
    </>
  );
};
export default Cart;
