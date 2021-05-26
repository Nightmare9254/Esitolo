import { useState } from 'react';
import { fetchFrom } from '../hooks/fetchFrom';

const Star = ({ marked, id, handleHover, setRating, userRating, orderId }) => {
  return (
    <div
      className={`star__single ${marked ? 'star__single--selected' : ''}`}
      onClick={() => {
        setRating(id);
        userRating(id);
      }}
      data-star-id={id}
      role="button"
      onMouseOut={() => handleHover(null)}
      onMouseOver={handleHover}
    >
      <i className="fas fa-star"></i>
    </div>
  );
};

const StarRating = ({ orderId, orderRating }) => {
  const [rating, setRating] = useState(orderRating);
  const [selected, setSelected] = useState(0);

  const handleHover = e => {
    let val = 0;
    if (e && e.target && e.target.getAttribute('data-star-id')) {
      val = e.target.getAttribute('data-star-id');
    }
    setSelected(parseInt(val));
  };

  const userRating = async value => {
    const body = {
      value,
      orderId,
    };
    console.log(body);
    const grade = await fetchFrom('orders/rating', {
      body,
    });
  };

  return (
    <div className="star">
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          orderId={orderId}
          userRating={userRating}
          setRating={setRating}
          handleHover={handleHover}
          id={i + 1}
          key={`star_${i + 1}`}
          marked={selected ? selected >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};

export default StarRating;
