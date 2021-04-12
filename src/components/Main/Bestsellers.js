import { useFetch } from '../../hooks/useFetch';
import Loading from '../Loading/Loading';

const Bestsellers = () => {
  const { data, loading } = useFetch('/products/bestsellers');

  return (
    <>
      {!loading &&
        data.map(({ image, price, productName, _id }) => (
          <div className="bestsellers" key={_id}>
            <i className="fas fa-plus bestsellers__icon-add"></i>
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
        ))}
        {loading && <Loading/>}
    </>
  );
};

export default Bestsellers;
