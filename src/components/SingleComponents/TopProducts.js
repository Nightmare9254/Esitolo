import { Link } from 'react-router-dom';
import { ScaleButtonClick } from '../../framer/Transitions';

const TopProducts = ({ id, image, price, productName, addItem }) => {
  return (
    <div className="bestsellers">
      <ScaleButtonClick className="scalebutton">
        <button
          className="bestsellers__add"
          onClick={() =>
            addItem({ id, productName, price, image, quantity: 1 })
          }
        >
          Add to cart
        </button>
      </ScaleButtonClick>
      <Link to={`/product/${id}`} className="bestsellers__link">
        <div className="bestsellers__img-container">
          <img
            src={image[0]}
            alt="product"
            className="bestsellers__product-img"
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
