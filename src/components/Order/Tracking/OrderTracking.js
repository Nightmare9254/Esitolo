import { useParams } from 'react-router-dom';

const OrderTracking = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default OrderTracking;
