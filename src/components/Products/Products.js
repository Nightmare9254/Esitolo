import Product from '../Product/Product';
import Menu from '../Menu/Menu';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useCounter } from '../../store/sub';
import { Link } from 'react-router-dom';
import { categoryList } from '../../assets/Consts/categoryList';
import { AnimatePresence } from 'framer-motion';
import SearchProducts from './SearchProducts';
import { PulsingAnimation } from '../../framer/Transitions';
import { ADD } from '../../assets/Consts/Actions';
import { useLocal } from '../../hooks/cart';

const Products = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, actions] = useCounter();
  const [search, setSearch] = useState('');
  const [filterLoading, setFilterLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [toggle, setToggle] = useState(state.isSearch);
  const [sortBy, setSortBy] = useState('0');

  const sortProducts = (a, b) => {
    if (sortBy === '1') {
      return a.price - b.price;
    }
    if (sortBy === '0') return;

    return b.price - a.price;
  };

  const observer = useRef();
  const lastProduct = useCallback((item) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
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
    if (hasMore) {
      setLoading(true);
      fetch(
        `https://esitolo-backend.herokuapp.com/products/all-products?${params.toString()}`
      )
        .then((res) => res.json())
        .then((json) => {
          setProducts((prev) => [...prev, ...json.items]);
          setHasMore(json.hasMore);
          setLoading(false);
        });
    }
  }, [page, state.category]);

  useEffect(() => {
    if (search === '') setFiltered([]);

    if (search.length > 0) {
      setFilterLoading(true);
      const timeout = setTimeout(() => {
        fetch(
          `https://esitolo-backend.herokuapp.com/products/products-search?search=${search}`
        )
          .then((res) => res.json())
          .then((json) => {
            setFiltered(json);
            setFilterLoading(false);
          });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [search]);

  const reset = () => {
    setSearch('');
    setFiltered([]);
  };

  const toggleState = () => {
    setToggle(!toggle);
    actions.openSearch(false);
  };

  const [addItem] = useLocal();

  return (
    <>
      <div className="all-products">
        <div className="all-products__actions">
          <Link to="/">
            <i className="fas fa-arrow-left fa-2x" />
          </Link>
          <div className="all-products__container-search" onClick={toggleState}>
            <i className="fas fa-search fa-2x" />
          </div>
        </div>
        <AnimatePresence>
          {toggle && (
            <SearchProducts
              reset={reset}
              toggleState={toggleState}
              filtered={filtered}
              filterLoading={filterLoading}
              search={search}
              setSearch={setSearch}
            />
          )}
        </AnimatePresence>

        {search.length === 0 && (
          <>
            <select
              defaultValue={state.category}
              onChange={(e) => actions.updateCategory(e.target.value)}
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
              onChange={(e) => setSortBy(e.target.value)}
              onKeyDown={sortProducts}
            >
              <option value="0">Default</option>
              <option value="1">Sort by price (Low to High)</option>
              <option value="2">Sort by price (High to Low)</option>
            </select>
          </>
        )}
        {products
          .sort(sortProducts)
          .map(({ image, _id, productName, price, description }, index) => {
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
                  blur={search.length > 0 ? true : false}
                  addItem={addItem}
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
                  addItem={addItem}
                  blur={search.length > 0 ? true : false}
                />
              );
            }
          })}
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
      <Menu />
    </>
  );
};

export default Products;
