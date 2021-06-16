import { PulsingAnimation } from '../../framer/Transitions';
import { useFetch } from '../../hooks/useFetch';
import TopProducts from '../SingleComponents/TopProducts';

const Bestsellers = ({ addItem }) => {
  const { data, loading } = useFetch('/products/bestsellers');

  return (
    <div className="custom__scrollBar">
      {!loading &&
        data.map(({ _id, image, price, productName, description }) => (
          <TopProducts
            key={_id}
            id={_id}
            image={image}
            price={price}
            productName={productName}
            description={description}
            addItem={addItem}
          />
        ))}
      {loading && <PulsingAnimation />}
    </div>
  );
};

export default Bestsellers;
