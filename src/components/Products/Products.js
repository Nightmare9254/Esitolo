import Product from '../Product/Product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCounter } from '../../store/sub';
import { categoryList } from '../../assets/Consts/categoryList';
import { AnimatePresence } from 'framer-motion';
import SearchProducts from './SearchProducts';
import { PulsingAnimation } from '../../framer/Transitions';
import { useLocal } from '../../hooks/cart';
import SearchBar from '../Menu/SearchBar';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

const Products = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, actions] = useCounter();
  const [hasMore, setHasMore] = useState(true);
  const [toggle, setToggle] = useState(state.isSearch);
  const [sortBy, setSortBy] = useState('0');

  const sortProducts = (a, b) => {
    if (a.price === undefined || b.price === undefined) return;

    if (sortBy === '1') {
      return a.price - b.price;
    }
    if (sortBy === '0') return;

    return b.price - a.price;
  };

  const observer = useRef();
  const lastProduct = useCallback(item => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    if (item) observer.current.observe(item);
  }, []);

  const params = new URLSearchParams({
    page: page,
    category: state.category,
  });

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [state.category]);

  useEffect(() => {
    if (hasMore && !state.isSearch) {
      setLoading(true);
      fetch(
        `${
          process.env.REACT_APP_API
        }/products/all-products?${params.toString()}`
      )
        .then(res => res.json())
        .then(json => {
          setProducts(prev => [...prev, ...json.items]);
          setHasMore(json.hasMore);
          setLoading(false);
        });
    }
  }, [page, state.category]);

  const toggleState = () => {
    setToggle(!toggle);
    actions.openSearch(false);
  };

  const [addItem] = useLocal();

  return (
    <>
      <div className="all-products">
        <HeaderTitle
          title="Products"
          filter={
            <div className="all-products__select-actions">
              <select
                defaultValue={state.category}
                onChange={e => actions.updateCategory(e.target.value)}
                className="all-products__select"
              >
                {categoryList.map((name, index) => (
                  <option value={name} key={index}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                className="all-products__select all-products__select--left"
                onChange={e => setSortBy(e.target.value)}
                onKeyPress={sortProducts}
              >
                <option value="0">Default</option>
                <option value="1">Sort by price (Low to High)</option>
                <option value="2">Sort by price (High to Low)</option>
              </select>
            </div>
          }
        />

        <SearchBar />

        <div className="all-products__select-actions all-products__select-actions--desktop">
          <select
            defaultValue={state.category}
            onChange={e => actions.updateCategory(e.target.value)}
            className="all-products__select"
          >
            {categoryList.map((name, index) => (
              <option value={name} key={index}>
                {name}
              </option>
            ))}
          </select>
          <select
            className="all-products__select all-products__select--left"
            onChange={e => setSortBy(e.target.value)}
            onKeyDown={sortProducts}
          >
            <option value="0">Default</option>
            <option value="1">Sort by price (Low to High)</option>
            <option value="2">Sort by price (High to Low)</option>
          </select>
        </div>

        <AnimatePresence>
          {state.isSearch && <SearchProducts toggleState={toggleState} />}
        </AnimatePresence>

        <section className="all-products__wrapper-products">
          {products
            .sort(sortProducts)
            .map(
              (
                { image, _id, productName, price, description, category },
                index
              ) => {
                if (products.length === index + 1) {
                  return (
                    <Product
                      refItem={lastProduct}
                      isBottom={true}
                      key={index}
                      id={_id}
                      description={description}
                      productName={productName}
                      image={image}
                      price={price}
                      addItem={addItem}
                      showDescription={true}
                      category={category}
                    />
                  );
                } else {
                  return (
                    <Product
                      key={index}
                      id={_id}
                      description={description}
                      productName={productName}
                      image={image}
                      price={price}
                      category={category}
                      addItem={addItem}
                      showDescription={true}
                    />
                  );
                }
              }
            )}
        </section>
        {loading && <PulsingAnimation />}
        {!hasMore && (
          <div className="all-products__container-information">
            {state.category === 'all' && (
              <p className="all-products__information">
                You have seen all products
              </p>
            )}
            {state.category !== 'all' && (
              <p className="all-products__information">
                You have seen all products for category:{' '}
                <span className="all-products__information-category">
                  {state.category}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
      <Menu />
    </>
  );
};

export default Products;
