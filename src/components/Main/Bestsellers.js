import { PulsingAnimation } from '../../framer/Transitions';
import { useFetch } from '../../hooks/useFetch';
import TopProducts from '../SingleComponents/TopProducts';

const Bestsellers = () => {
  const { data, loading } = useFetch('/products/bestsellers');

  return (
    <>
      {!loading &&
        data.map(({ _id, image, price, productName, description }) => (
          <TopProducts
            key={_id}
            id={_id}
            image={image}
            price={price}
            productName={productName}
            description={description}
          />
        ))}
      {loading && <PulsingAnimation />}
    </>
  );
};

export default Bestsellers;
