import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Categories from './Categories';
import Bestsellers from './Bestsellers';
import Restocked from './Restocked';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { useCounter } from '../../store/sub';
import { useLocal } from '../../hooks/cart';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import SearchBar from '../Menu/SearchBar';

const Main = () => {
  const [, actions] = useCounter();

  useEffect(() => {
    actions.updateCategory('all');
  }, []);

  const [addItem] = useLocal();

  return (
    <>
      <HeaderTitle title="Esitolo" />
      <main className="main">
        <SearchBar />
        <div className="main__flow">
          <section className="main__flow-first-child main__categories-wrapper">
            <h3 className="main__heading-3">Bestsellers</h3>
            <Bestsellers addItem={addItem} />
          </section>
          <section className="main__categories-wrapper">
            <h4 className="main__heading-4">Browse by categories</h4>
            <Categories />
          </section>
        </div>
        <Restocked addItem={addItem} />
        <Link to="/products" role="link">
          <p className="button-restocked">See more</p>
        </Link>
      </main>
      <Footer />
      <Menu />
    </>
  );
};

export default Main;
