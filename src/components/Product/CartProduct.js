import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';
import ItemsCounter from '../SingleComponents/ItemsCounter';
const CartProduct = ({
  image,
  productName,
  price,
  removeItem,
  addQuantity,
  category,
  quantity,
  id,
  isInOrder = false,
}) => {
  const [, actions] = useCounter();
  return (
    <div className="product-cart">
      <div className="product-cart__image-wrapper">
        <img src={image[0]} alt={productName} className="product-cart__image" />
      </div>

      <div className="product-cart__content">
        <p className="product-cart__title">{productName}</p>
        {!isInOrder && (
          <p className="product-cart__category">
            Category:
            <Link
              onClick={() => actions.updateCategory(category)}
              to="/products"
              role="link"
              aria-label={`Go to ${category} category}`}
            >
              <span className="product-cart__category--link">{category}</span>
            </Link>
          </p>
        )}
        {isInOrder && (
          <p className="product-cart__category">Quantity: {quantity}</p>
        )}
        <div className="product-cart__counter">
          {!isInOrder && (
            <ItemsCounter
              quantity={quantity}
              id={id}
              removeItem={removeItem}
              addQuantity={addQuantity}
            />
          )}
          <p className="product-cart__price">{price}$</p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
