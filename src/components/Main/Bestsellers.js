import { useFetch } from '../../hooks/useFetch';
import Loading from '../Loading/Loading';
import TopProducts from '../SingleComponents/TopProducts';

const Bestsellers = () => {
  const { data, loading } = useFetch('/products/bestsellers');

  return (
    <>
      {!loading &&
        data.map(({ _id, image, price, productName }) => (
          <TopProducts
            key={_id}
            id={_id}
            image={image}
            price={price}
            productName={productName}
          />
        ))}
      {loading && <Loading />}
    </>
  );
};

export default Bestsellers;
