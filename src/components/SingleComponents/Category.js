import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';

export const Category = ({ link, name, imgSrc }) => {
  const [state, actions] = useCounter();
  return (
    <Link
      to="/products"
      onClick={() => {
        actions.updateCategory(link);
      }}
    >
      <div className="category">
        <img src={imgSrc} alt="category" className="category__img" />
        <img src="../assets/CategoryImg/" alt="" />
        <p className="category__description">{name}</p>
      </div>
    </Link>
  );
};
