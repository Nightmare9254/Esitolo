import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';

const TopProducts = ({ id, image, price, description, productName }) => {
  const [state, actions] = useCounter();

  return (
    <>
      <button>add</button>
      <Link to={`/product/${id}`}>
        <div className="bestsellers">
          <div className="bestsellers__img-container">
            <img
              src={image[0]}
              className="bestsellers__img"
              alt="bestsellers"
            />
          </div>
          <p className="bestsellers__price">{price} $</p>
          <p className="bestsellers__name">{productName}</p>
        </div>
      </Link>
    </>
  );
};

export default TopProducts;
