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
      <section className="main">
        <SearchBar />
        <div className="main__flow">
          <div className="main__flow-first-child main__categories-wrapper">
            <h3 className="main__heading-3">Bestsellers</h3>
            <Bestsellers addItem={addItem} />
          </div>
          <div className="main__categories-wrapper">
            <h4 className="main__heading-4">Browse by categories</h4>
            <Categories />
          </div>
        </div>
        <Restocked addItem={addItem} />
        <Link to="/products">
          <div className=" button-restocked">See more</div>
        </Link>
      </section>
      <Footer />
      <Menu />
    </>
  );
};

export default Main;
