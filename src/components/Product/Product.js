import { Link } from 'react-router-dom';

const Product = ({
  id,
  description,
  productName,
  image,
  price,
  refItem,
  isBottom,
  view,
  addItem,
  removeItem,
  isInCart,
  quantity,
  addQuantity,
}) => {
  return (
    <div
      style={{ position: 'relative' }}
      ref={refItem}
      className={`${isBottom ? 'isBottom' : ''}`}
    >
      <Link to={`/product/${id}`}>
        <div className={`product ${view ? 'product--searched' : ''}`}>
          <div className="product__container-img">
            <img src={image[0]} className="product__img" alt="product" />
          </div>
          <div className="product__data">
            <p className="product__price">{price} $</p>
            <p className="product__name">{productName}</p>
            <p className="product__description">{description}</p>
          </div>
        </div>
      </Link>
      <div
        className={` ${
          isInCart
            ? 'product__btns-container--left '
            : 'product__btns-container'
        }`}
      >
        {!isInCart && (
          <button
            className="product__add"
            onClick={() =>
              addItem({ id, productName, price, image, quantity: 1 })
            }
          >
            <i className="fas fa-plus"></i>
          </button>
        )}
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
