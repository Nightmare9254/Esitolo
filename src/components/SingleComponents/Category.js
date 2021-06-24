import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';

export const Category = ({ link, name, imgSrc }) => {
  const [state, actions] = useCounter();
  return (
    <Link
      to="/products"
      role="link"
      aria-label="Go to category"
      onClick={() => {
        actions.updateCategory(link);
      }}
    >
      <div className="category">
        <img src={imgSrc} alt={`Category: ${name}`} className="category__img" />

        <p className="category__description">{name}</p>
      </div>
    </Link>
  );
};
