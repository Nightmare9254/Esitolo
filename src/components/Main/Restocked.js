import { useFetch } from '../../hooks/useFetch';
import Product from '../Product/Product';

const Restocked = () => {
  const restocked = useFetch('/products/restocked');

  return (
    <>
      <div className="main__restocked">
        {restocked.map(({ image, _id, productName, price, description }) => (
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

      <button className="button button__restocked">See more</button>
    </>
  );
};

export default Restocked;
