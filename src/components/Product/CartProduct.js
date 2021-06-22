import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';
const CartProduct = ({
  image,
  productName,
  price,
  removeItem,
  addQuantity,
  category,
  quantity,
  id,
}) => {
  const [, actions] = useCounter();
  return (
    <div className="product-cart">
      <div className="product-cart__image-wrapper">
        <img src={image[0]} alt={productName} className="product-cart__image" />
      </div>

      <div className="product-cart__content">
        <p className="product-cart__title">{productName}</p>
        <p className="product-cart__category">
          Category:
          <Link onClick={() => actions.updateCategory(category)} to="/products">
            <span className="product-cart__category--link">{category}</span>
          </Link>
        </p>
        <div className="product-cart__counter">
          <div className="single__counter">
            <button
              onClick={() => removeItem(id)}
              className="single__action single__action-minus"
            >
              -
            </button>
            <p className="single__choose-amount">{quantity}</p>
            <button
              onClick={() => addQuantity(id)}
              className="single__action single__action-plus"
            >
              +
            </button>
          </div>
          <p className="product-cart__price">{price}$</p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
