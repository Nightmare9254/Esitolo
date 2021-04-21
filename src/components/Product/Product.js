import { Link } from 'react-router-dom';

const Product = ({ id, description, productName, image, price }) => {
  return (
    <div>
      <Link to={`/product/${id}`}>
        <div className="product">
          <i className="fas fa-plus product__icon-add"></i>
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
    </div>
  );
};

export default Product;
