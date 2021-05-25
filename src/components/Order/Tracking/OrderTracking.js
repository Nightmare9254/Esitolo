import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import Product from '../../Product/Product';

const OrderTracking = () => {
  const { id } = useParams();

  const { data, loading } = useFetch(`/orders/order?id=${id}`);

  const formatDate = () => {
    if (!loading) {
      const date = new Date(data.orderDate);

      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (day < 10) day = `0${day}`;
      if (month < 10) month = `0${month}`;

      const fullDate = `${day}:${month}:${year}`;
      return fullDate;
    }
  };

  return (
    <div className="order">
      <p>Order tracking: {id}</p>
      {!loading && (
        <table className="order__table" border="1">
          <tr>
            <th>Customer</th>
            <td>{data.shippingAddress.name}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              <ul>
                <li>{data.shippingAddress.state}</li>
                <li>{data.shippingAddress.city}</li>
                <li>{data.shippingAddress.street}</li>
                <li>{data.shippingAddress.zipCode}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Items</th>
            <td>
              {data.items.map(({ name, quantity, price }, id) => (
                <div key={id}>
                  <p>
                    {name} {quantity} {price}
                  </p>
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <th>Order date</th>
            <td>{formatDate()}</td>
          </tr>
          <tr>
            <th>Total price</th>
            <td>{data.price}</td>
          </tr>
        </table>
      )}
    </div>
  );
};

export default OrderTracking;
