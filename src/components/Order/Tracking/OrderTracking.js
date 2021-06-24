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
import { useState } from 'react';
import { fetchFrom } from '../../../hooks/fetchFrom';
import Footer from '../../Footer/Footer';
const OrderTracking = () => {
  const { id } = useParams();
  const history = useHistory();

  const { data, loading } = useFetch(`/orders/order?id=${id}`);
  const [cookies] = useCookies();
  const { user } = cookies;

  const [review, setReview] = useState('');
  const [itemsId, setItemsId] = useState([]);
  const [message, setMessage] = useState('');

  const addReview = async () => {
    if (itemsId.length >= 1) {
      const body = {
        review,
        itemsId,
        userName: user ? user.name : 'Anonymous',
      };
      const { resMessage } = await fetchFrom('orders/create-review', { body });
      setMessage(resMessage);
      return;
    }

    setMessage('Please select at least on product to review');
  };
  return (
    <>
      <HeaderTitle title="Order details" />
      <div className="order">
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
                        <li key={id}>
                          <ul className="order__list-wrapper">
                            <li>
                              Name:
                              <span>
                                <Link
                                  className="order__link"
                                  to={`/product/${id}`}
                                  role="link"
                                  aria-label={`Go to ${name} product page`}
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
                          </ul>
                        </li>
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

            <section className="order__review">
              <h3 className="order__review-header">Leave a review</h3>
              <div>
                <p className="order__review-list-header">Choose products</p>
                {data.items.map(({ name, id }) => {
                  return (
                    <div key={id} className="order__select-wrapper">
                      <label className="order__select">
                        <input
                          onClick={e => {
                            if (e.target.checked) {
                              setItemsId([...itemsId, id]);
                            } else {
                              const index = itemsId.find(i => i === id);
                              const newItems = [...itemsId];
                              newItems.splice(index, 1);
                              setItemsId(newItems);
                            }
                          }}
                          type="checkbox"
                          className="order__select-item"
                        />
                        <p className="order__select-desc">{name}</p>
                      </label>
                    </div>
                  );
                })}
              </div>
              <label className="label order__textarea-label">
                <i className="fas fa-gavel"></i>
                <textarea
                  type="text"
                  placeholder="Quality product, fast shipping"
                  className="label__input order__review-area"
                  wrap="off"
                  rows="1"
                  value={review}
                  onChange={e => setReview(e.target.value)}
                />
              </label>
              <button type="button" className="order__btn" onClick={addReview}>
                Leave a review
              </button>
              {message && <p className="order__message">{message}</p>}
            </section>
            <section className="order__rating">
              <p className="order__rate">Rate us</p>
              <div>
                <StarRating orderId={id} orderRating={data.rating} />
              </div>
            </section>
          </>
        )}
        {loading && <PulsingAnimation />}
      </div>
      <Footer />
      <Menu />
    </>
  );
};

export default withRouter(OrderTracking);
