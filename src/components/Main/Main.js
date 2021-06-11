import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Categories from './Categories';
import Bestsellers from './Bestsellers';
import Restocked from './Restocked';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { useCounter } from '../../store/sub';
import { useLocal } from '../../hooks/cart';

const Main = () => {
  const [state, actions] = useCounter();

  useEffect(() => {
    actions.updateCategory('all');
  }, []);

  const [addItem] = useLocal();

  return (
    <>
      <section className="main">
        <div>
          <Link to="/products">
            <div
              onClick={() => actions.openSearch(true)}
              className="main__search main__search--mobile"
            >
              <p className="main__search-text">Search something amazing</p>
              <div className="main__icon">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </Link>
        </div>
        <h3 className="main__heading-3">Bestsellers</h3>
        <div className="custom__scrollBar">
          <Bestsellers addItem={addItem} />
        </div>
        <h4 className="main__heading-4">Browse by categories</h4>
        <div className="main__flow">
          <Categories />
          <Restocked addItem={addItem} />
          <div
            style={{
              background: '#000',
              width: '300px',
              paddingTop: '2rem',
              color: '#fff',
            }}
          >
            <p style={{ fontSize: '30px', textAlign: 'center' }}>End in</p>
            <img
              style={{ width: '300px' }}
              src="https://animush.pl/wp-content/uploads/2019/11/animush-kubek-serio-3.jpg"
            />
            <div style={{ textAlign: 'center', fontSize: '20px' }}>
              <p>Kubek z fiuta</p>
              <p>56.78</p>
              <p>Go to product</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Menu />
    </>
  );
};

export default Main;
