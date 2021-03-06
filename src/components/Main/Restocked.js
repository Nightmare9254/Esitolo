import { useFetch } from '../../hooks/useFetch';
import Product from '../Product/Product';
import { PulsingAnimation } from '../../framer/Transitions';

const Restocked = ({ addItem }) => {
  const { data, loading } = useFetch('/products/restocked');

  return (
    <>
      {!loading && (
        <div className="main__restocked">
          {data.map(
            ({ image, _id, productName, price, description, category }) => (
              <Product
                key={_id}
                id={_id}
                productName={productName}
                price={price}
                image={image}
                description={description}
                addItem={addItem}
                category={category}
              />
            )
          )}
        </div>
      )}
      {loading && <PulsingAnimation />}
    </>
  );
};

export default Restocked;
