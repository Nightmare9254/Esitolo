import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="cart__empty-wrapper">
      <h2 className="cart__empty-title">Your cart is empty</h2>
      <Link to="/products">
        <p className="cart__empty-link">Start shopping now</p>
      </Link>
      <i className="fas fa-shopping-bag"></i>
    </div>
  );
};

export default EmptyCart;
