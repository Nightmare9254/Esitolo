import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';

const TopProducts = ({
  id,
  image,
  price,
  description,
  productName,
  addItem,
}) => {
  return (
    <div className="bestsellers">
      <button
        onClick={() => addItem({ id, productName, price, image, quantity: 1 })}
        className="bestsellers__add"
      >
        Add to cart
      </button>
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
