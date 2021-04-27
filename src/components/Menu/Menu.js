import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Menu = ({ isSelected }) => {
  const [cookies] = useCookies();
  const { user } = cookies;

  const location = useLocation();

  const [pos, setPos] = useState(0);
  useEffect(() => {
    if (location.pathname === '/account') {
      setPos(0);
    } else if (location.pathname === '/basket') {
      setPos(1);
    } else {
      setPos(2);
    }
  }, [location]);

  return (
    <div className="menu">
      <div className="menu__container">
        <div
          className={`menu__item ${pos === 2 ? 'menu__item--active' : null}`}
        >
          <Link to="/">
            <i className="fas fa-home fa-3x"></i>
            <p className="menu__describe">Home</p>
          </Link>
        </div>
        <div
          className={`menu__item ${pos === 1 ? 'menu__item--active' : null}`}
        >
          <Link to="/basket">
            <i className="fas fa-shopping-basket fa-3x"></i>
            <p className="menu__describe">Basket</p>
          </Link>
        </div>
        <div
          className={`menu__item ${pos === 0 ? 'menu__item--active' : null}`}
        >
          {user && (
            <>
              <Link to="/account">
                <i className="fas fa-user fa-3x"></i>
                <p className="menu__describe">Account</p>
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/auth">
                <i className="fas fa-sign-in-alt fa-3x"></i>
                <p className="menu__describe">Join us</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
