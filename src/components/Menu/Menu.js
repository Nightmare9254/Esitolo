import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocal } from '../../hooks/cart';
import { ScaleButtonClick } from '../../framer/Transitions';
import { useCounter } from '../../store/sub';

const Menu = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  const [, , , , , cartItems] = useLocal();

  const location = useLocation();

  const [pos, setPos] = useState(0);
  useEffect(() => {
    if (location.pathname.includes('/account')) {
      setPos(0);
    } else if (location.pathname.includes('/basket')) {
      setPos(1);
    } else {
      setPos(2);
    }
  }, [location]);

  const [state, actions] = useCounter();

  // console.log(state.isSearch);
  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__logo">
          <Link to="/">Esitolo </Link>
        </div>

        <Link
          onClick={() => actions.openSearch(true)}
          to="/products"
          className="menu__input--flow"
        >
          <div className="main__search main__search--desktop">
            <p className="main__search-text">Search something amazing</p>
            <div className="main__icon">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </Link>

        <div className="menu__flow">
          <div
            className={`menu__item ${pos === 2 ? 'menu__item--active' : null}`}
          >
            <Link to="/">
              <ScaleButtonClick>
                <i className="fas fa-home fa-3x"></i>
                <p className="menu__describe">Home</p>
              </ScaleButtonClick>
            </Link>
          </div>
          <div
            className={`menu__item ${pos === 1 ? 'menu__item--active' : null}`}
          >
            <Link to="/basket">
              <ScaleButtonClick>
                <div className="menu__item-basket-icon">
                  {cartItems.length >= 1 && (
                    <span className="menu__item-basket-total">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <i className="fas fa-shopping-basket fa-3x"></i>
                <p className="menu__describe">Basket</p>
              </ScaleButtonClick>
            </Link>
          </div>
          <div
            className={`menu__item ${pos === 0 ? 'menu__item--active' : null}`}
          >
            {user && (
              <>
                <Link to="/account">
                  <ScaleButtonClick>
                    <i className="fas fa-user fa-3x"></i>
                    <p className="menu__describe">Account</p>
                  </ScaleButtonClick>
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/auth">
                  <ScaleButtonClick>
                    <i className="fas fa-sign-in-alt fa-3x"></i>
                    <p className="menu__describe">Join us</p>
                  </ScaleButtonClick>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
