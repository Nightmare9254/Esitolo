import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';

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
          <div className="product"></div>
          <div className="product"></div>
          <div className="product"></div>
          <div className="product"></div>
          <div className="product"></div>
          <div className="product"></div>
        </div>
        <h4 className="main__heading-4">Browse by categories</h4>
        <div className="main__categories">
          <div className="category">
            <img
              className="category__img"
              src="https://www.statisticbrain.com/wp-content/uploads/2015/09/average-home-sale-price.jpg"
              alt="category"
            />
            <p className="category__text">Home</p>
          </div>
          <div className="category">
            <img
              className="category__img"
              src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Flower_garden%2C_Botanic_Gardens%2C_Churchtown_2.JPG"
              alt="category"
            />
            <p className="category__text">Garden</p>
          </div>
          <div className="category">
            <img
              className="category__img"
              src="https://lh3.googleusercontent.com/proxy/Rc_eNNYTmKqOq13frgKlb7LnE-gRoCIzA8fjZPCJQxztwcv6n0_jdW9rJy7-kwCcJ9JQgQHN8eBk372OSRGZ"
              alt=" of category"
            />
            <p className="category__text">RTV AGD</p>
          </div>
          <div className="category">
            <img
              className="category__img"
              src="https://www.dadum.pl/25558-large_default/pop-arty-150-elementow-do-zrobienia-bizuterii-b-toys-bx1373.jpg"
              alt="category"
            />
            <p className="category__text">Toys</p>
          </div>
          <div className="category">
            <img
              className="category__img"
              src="https://www.thoughtco.com/thmb/C7RiS4QG5TXcBG2d_Sh9i4hFpg0=/3620x2036/smart/filters:no_upscale()/close-up-of-clothes-hanging-in-row-739240657-5a78b11f8e1b6e003715c0ec.jpg"
              alt="category"
            />
            <p className="category__text">Clothes</p>
          </div>
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Main;
