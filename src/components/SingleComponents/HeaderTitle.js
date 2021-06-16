import { Link } from 'react-router-dom';
import { useDimensions } from '../../hooks/useDimensions';

const HeaderTitle = ({ title }) => {
  const { width } = useDimensions();

  return (
    <div className="header">
      {width <= 1365 && (
        <div className="page__title">
          <h2 className="page__title-h2">{title}</h2>
        </div>
      )}
      {width >= 1366 && (
        <>
          <h2 className="header__logo">
            <Link to="/">Esitolo</Link>
          </h2>
          <div className="header__menu">
            <Link to="/account" className="header__menu-items">
              <i className="fas fa-user"></i>
              <span className="header__menu-child">Account</span>
            </Link>
            <Link to="/basket" className="header__menu-items">
              <i className="fas fa-shopping-basket"></i>
              Basket
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderTitle;
