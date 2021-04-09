import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Categories from './Categories';
import Bestsellers from './Bestsellers';
import Restocked from './Restocked';
import Footer from '../Footer/Footer';

const Main = () => {
  return (
    <>
      <section className="main">
        <Link to="/">
          <div className="main__search">
            <p className="main__search-text">Search something amazing</p>
            <div className="main__icon">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </Link>
        <h3 className="main__heading-3">Bestsellers</h3>
        <div className="main__bestsellers">
          <Bestsellers />
        </div>
        <h4 className="main__heading-4">Browse by categories</h4>
        <Categories />
        <Restocked />
      </section>
      <Footer />
      <Menu />
    </>
  );
};

export default Main;
