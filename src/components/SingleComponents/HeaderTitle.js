import { Link } from 'react-router-dom';
import { useDimensions } from '../../hooks/useDimensions';
import Floater from 'react-floater';
import { useLocal } from '../../hooks/cart';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useCounter } from '../../store/sub';

const Wrapper = styled.div`
  background: #23252f;
  border-radius: 3px;
  max-width: 500px;
  padding: 2rem;
  color: #eaeae7;
`;

const Header = styled.h4`
  font-size: 2.1rem;
  text-align: center;
  margin: 1rem 0 2rem 0;
  color: #fac646;
`;

const Item = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0;
`;
const HeaderTitle = ({ title, filter = null, hideBasket = false }) => {
  const [, , , , , cartItems] = useLocal();
  const { width } = useDimensions();
  const [state, actions] = useCounter();
  const [floater, setFloater] = useState(false);
  const PreviewItems = () => {
    return (
      <Wrapper onMouseLeave={() => setFloater(false)}>
        {state.helpPreview.length > 0 && (
          <>
            <Header>Items in the basket</Header>
            {state.helpPreview.map(({ productName, quantity, price, id }) => (
              <Link to={`/product/${id}`}>
                <Item>
                  {productName} - {price}$
                </Item>
              </Link>
            ))}
          </>
        )}
        <button className="header__floater-btn">
          <Link to="/basket">Go to basket</Link>
        </button>
        {state.helpPreview.length === 0 && <p>Your basket is empty</p>}
      </Wrapper>
    );
  };

  const previewBasket = PreviewItems();

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

          <div>{filter}</div>
          <div className="header__menu">
            <Link to="/account" className="header__menu-items">
              <i className="fas fa-user"></i>
              <span className="header__menu-child">Account</span>
            </Link>
            {!hideBasket && (
              <Floater
                component={previewBasket}
                open={floater}
                showCloseButton={true}
                styles={{
                  arrow: { color: '#23252f' },
                }}
              >
                <Link
                  onMouseEnter={() => setFloater(true)}
                  to="/basket"
                  className="header__menu-items"
                >
                  <i className="fas fa-shopping-basket"></i>
                  Basket
                </Link>
              </Floater>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderTitle;
