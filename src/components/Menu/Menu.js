import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [cookies] = useCookies();
  const { user } = cookies;

  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__item menu__item--active">
          <Link to="/">
            <i className="fas fa-home fa-3x"></i>
            <p className="menu__describe">Home</p>
          </Link>
        </div>
        <div className="menu__item">
          <Link to="/basket">
            <i className="fas fa-shopping-basket fa-3x"></i>
            <p className="menu__describe">Basket</p>
          </Link>
        </div>
        <div className="menu__item">
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
