import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import HeaderTitle from '../../SingleComponents/HeaderTitle';
import Menu from '../../Menu/Menu';
import StarRating from '../../../functions/StarRating';
import { PulsingAnimation } from '../../../framer/Transitions';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../functions/formatDate';
import { useCookies } from 'react-cookie';
import { cancelOrder } from '../../../functions/stripeCard';
import { useHistory, withRouter } from 'react-router-dom';

const OrderTracking = () => {
  const { id } = useParams();
  const history = useHistory();

  const { data, loading } = useFetch(`/orders/order?id=${id}`);
  const [cookies] = useCookies();
  const { user } = cookies;

  return (
    <>
      <div className="order">
        <HeaderTitle title="Order details" />

        {!loading && (
          <>
            <table className="order__table">
              <thead>
                <tr>
                  <td
                    style={{ padding: '2rem', border: 'none' }}
                    colSpan="2"
                    className="order__table-orderId"
                  >
                    ID: <span className="order__table-id">{id}</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Customer</th>
                  <td>{data.shippingAddress.name}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>
                    <ul className="order__list">
                      <li>
                        State: <span>{data.shippingAddress.state}</span>
                      </li>
                      <li>
                        City: <span>{data.shippingAddress.city}</span>
                      </li>
                      <li>
                        Street: <span>{data.shippingAddress.street}</span>
                      </li>
                      <li>
                        Postal-Code: <span>{data.shippingAddress.zipCode}</span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Items</th>
                  <td>
                    <ul className="order__list">
                      {data.items.map(({ name, quantity, price, id }) => (
                        <div className="order__list-wrapper" key={id}>
                          <li>
                            Name:
                            <span>
                              <Link
                                className="order__link"
                                to={`/product/${id}`}
                              >
                                {name}
                              </Link>
                            </span>
                          </li>
                          <li>
                            Quantity: <span>{quantity}</span>
                          </li>
                          <li>
                            Price: <span>{price}$</span>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Order date</th>
                  <td>{formatDate(data.orderDate, loading)}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{data.status}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th style={{ borderBottom: 'none' }}>Total price</th>
                  <td
                    style={{
                      borderBottom: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {!user ? data.price / 100 : data.price}$
                  </td>
                </tr>
                {!user && (
                  <tr>
                    <th>Cancel order</th>
                    <td>
                      <button
                        className="history__delete-btn"
                        onClick={() => {
                          cancelOrder(
                            data.sessionId,
                            data._id,
                            data.price,
                            history
                          );
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>

            <section>
              <h3 className="order__rate">Rate us</h3>
              <div>
                <StarRating orderId={id} orderRating={data.rating} />
              </div>
            </section>
          </>
        )}
        {loading && <PulsingAnimation />}
      </div>
      <Menu />
    </>
  );
};

export default withRouter(OrderTracking);
