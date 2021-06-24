import { Link } from 'react-router-dom';

const Product = ({
  id,
  description,
  productName,
  image,
  price,
  refItem,
  addItem,
  quantity,
  isInOrder,
  category,
  showDescription = false,
}) => {
  return (
    <div ref={refItem} className="product">
      <Link
        to={`/product/${id}`}
        role="link"
        aria-label={`Go to single product page: ${productName}`}
      >
        <div>
          <div className="product__container-img">
            <img
              src={image[0]}
              className="product__img"
              alt={`Product: ${productName}`}
            />
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

          <button
            className="product__add"
            onClick={() =>
              addItem({
                id,
                productName,
                price,
                image,
                quantity: 1,
                category,
              })
            }
            aria-label="add to basket"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
