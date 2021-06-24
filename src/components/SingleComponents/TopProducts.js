import { Link } from 'react-router-dom';
import { ScaleButtonClick } from '../../framer/Transitions';

const TopProducts = ({ id, image, price, productName, addItem, category }) => {
  return (
    <div className="bestsellers">
      <ScaleButtonClick className="scalebutton">
        <button
          className="bestsellers__add"
          onClick={() =>
            addItem({ id, productName, price, image, quantity: 1, category })
          }
          aria-label="add product to cart"
        >
          Add to cart
        </button>
      </ScaleButtonClick>
      <Link
        to={`/product/${id}`}
        className="bestsellers__link"
        role="link"
        aria-label="Go to single product page"
      >
        <div className="bestsellers__img-container">
          <img
            src={image[0]}
            alt={`Product: ${productName}`}
            className="bestsellers__product-img"
            loading="lazy"
          />
        </div>

        <div className="bestsellers__data">
          <p className="bestsellers__price">{price} $</p>
          <p className="bestsellers__name">{productName}</p>
        </div>
      </Link>
    </div>
  );
};

export default TopProducts;
