import { useFetch } from '../../hooks/useFetch';
import { useCookies } from 'react-cookie';
import { formatDate } from '../../functions/formatDate';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [cookies] = useCookies();
  const { user } = cookies;

  const { data, loading } = useFetch(`/orders/history?userId=${user._id}`);

  return (
    <main className="history">
      {!loading && (
        <>
          {data.map(item => {
            return (
              <section className="history__single-order" key={item._id}>
                {item.items.map(item => (
                  <div className="history__single-item">
                    <Link to={`/product/${item.id}`}>
                      <h4 className="history__item-name">{item.name}</h4>
                    </Link>
                    <div className="history__item-info">
                      <p className="history__item-quantity">
                        {item.quantity} x {item.price}
                      </p>
                      <p className="history__item-price">
                        USD {item.price * item.quantity}$
                      </p>
                    </div>
                  </div>
                ))}
                <div className="history__order-info">
                  <div className="history__info-wrapper">
                    <p className="history__order-details">
                      Order ID:
                      <span className="history__details-data">{item._id}</span>
                    </p>
                    <p className="history__order-details">
                      Discount:
                      <span className="history__details-data">5%</span>
                    </p>
                    <p className="history__order-details">
                      Order Time:
                      <span className="history__details-data">
                        {formatDate(item.orderDate, loading)}
                      </span>
                    </p>
                    <p className="history__order-details">
                      Total products:
                      <span className="history__details-data">
                        {item.items.length}
                      </span>
                    </p>
                    <p className="history__order-details">
                      Paid:
                      <span className="history__details-data history__details-price">
                        {item.price} USD
                      </span>
                    </p>
                  </div>
                  <p className="history__order-status">
                    Status:
                    <span className="history__status-type">{item.status}</span>
                  </p>
                </div>
              </section>
            );
          })}
        </>
      )}
    </main>
  );
};

export default OrderHistory;