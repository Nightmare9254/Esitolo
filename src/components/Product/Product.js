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
}) => {
  return (
    <div ref={refItem} className={`${isBottom ? 'isBottom' : ''}`}>
      {!isInCart && (
        <button
          onClick={() =>
            addItem({ id, productName, price, image, quantity: 1 })
          }
        >
          add to basekt
        </button>
      )}
      {/* <i className="fas fa-plus product__icon-add"></i> */}
      <Link to={`/product/${id}`}>
        <div className={`product ${view ? 'product--searched' : ''}`}>
          <div className="product__container-img">
            <img src={image[0]} className="product__img" alt="product" />
          </div>
          <div className="product__data">
            <p className="product__price">{price} $</p>
            <p className="product__name">{productName}</p>
            <p className="product__description">{description}</p>
            {isInCart && (
              <p className="product__description">Quantity: {quantity}</p>
            )}
          </div>
        </div>
      </Link>
      {isInCart && (
        <button
          onClick={() => {
            removeItem(id);
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default Product;
