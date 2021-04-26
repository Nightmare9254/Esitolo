import { Link } from 'react-router-dom';
import { ADD } from '../../assets/Consts/Actions';

const Product = ({
  id,
  description,
  productName,
  image,
  price,
  refItem,
  isBottom,
  view,
}) => {
  return (
    <div ref={refItem} className={`${isBottom ? 'isBottom' : ''}`}>
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
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
