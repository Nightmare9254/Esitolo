import { useFetch } from '../../hooks/useFetch';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

const Restocked = () => {
  const { data, loading } = useFetch('/products/restocked');

  return (
    <>
      {!loading && (
        <div className="main__restocked">
          {data.map(({ image, _id, productName, price, description }) => (
            <Product
              key={_id}
              id={_id}
              productName={productName}
              price={price}
              image={image}
              description={description}
            />
          ))}
        </div>
      )}

      <button className="button button__restocked">
        <Link to="/products">See more</Link>
      </button>
    </>
  );
};

export default Restocked;
