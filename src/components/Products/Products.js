import Product from '../Product/Product';
import { useFetch } from '../../hooks/useFetch';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';

const Products = () => {
  const { data, loading } = useFetch('/products/all-products');

  return (
    <>
    <div className="all-products">
      <div className="all-products__container-input">
        <div className="all-products__container-icon">
          <i className="fas fa-arrow-left"></i>
        </div>
        <input
          placeholder="jacket"
          type="text"
          className="all-products__input"
        />
      </div>
      <div className="all-products__search-words">
        <p className="all-products__recent">Recent:</p>
        <div className="all-products__container-span">
        <span className="all-products__span">Rake</span>
        <span className="all-products__span">Bucket</span>
        <span className="all-products__span">Ball</span>
        <span className="all-products__span">Book</span>
        
        </div>
      </div>
      <div className="all-products__container-items">
        {!loading &&
          data.map(({ description, productName, image, price, _id }) => (
            <Product
              key={_id}
              description={description}
              productName={productName}
              image={image}
              price={price}
            />
          ))}
        {loading && <Loading/>}
      </div>
    </div>
    <Menu/>
    </>
  );
};

export default Products;
