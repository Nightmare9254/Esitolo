import { Link } from 'react-router-dom';

export const Category = ({ link, name, imgSrc }) => {
  return (
    <Link to={`/products/${link}`}>
      <div className="category">
        <img src={imgSrc} alt="category" className="category__img" />
        <img src="../assets/CategoryImg/" alt="" />
        <p className="category__description">{name}</p>
      </div>
    </Link>
  );
};
