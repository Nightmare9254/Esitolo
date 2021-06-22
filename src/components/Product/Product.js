import { Link } from 'react-router-dom';
import { ScaleButtonClick } from '../../framer/Transitions';
import { useDimensions } from '../../hooks/useDimensions';

const Product = ({
  id,
  description,
  productName,
  image,
  price,
  refItem,
  addItem,
  removeItem,
  isInCart,
  quantity,
  addQuantity,
  isInOrder,
  showDescription = false,
}) => {
  const { width } = useDimensions();

  return (
    <div ref={refItem} className="product">
      <Link to={`/product/${id}`}>
        <div>
          <div className="product__container-img">
            <img src={image[0]} className="product__img" alt="product" />
          </div>
          <div className="product__data">
            <p className="product__name">{productName}</p>
            {showDescription && (
              <p className="product__description">
                {description.substring(0, 50)}. . .
              </p>
            )}
            {isInOrder && (
              <p className="product__quantity">Quantity: {quantity}</p>
            )}
          </div>
        </div>
      </Link>
      <div className="product__btns-container">
        <div className="product__action">
          <p className="product__price">{price} $</p>
          {!isInCart && !isInOrder && (
            <button
              className="product__add"
              onClick={() =>
                addItem({ id, productName, price, image, quantity: 1 })
              }
            >
              <i className="fas fa-plus"></i>
            </button>
          )}
        </div>
        {isInCart && (
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
        )}
      </div>
    </div>
  );
};

export default Product;
