import { Link } from 'react-router-dom';

const TopProducts = ({ id, image, price, productName }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="bestsellers">
        <button className="bestsellers__icon-add">Add To Cart</button>
        <div className="bestsellers__img-container">
          <img src={image[0]} className="bestsellers__img" alt="bestsellers" />
        </div>
        <p className="bestsellers__price">{price} $</p>
        <p className="bestsellers__name">{productName}</p>
      </div>
    </Link>
  );
};

export default TopProducts;
