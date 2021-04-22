import Product from '../Product/Product';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import { useEffect, useRef, useState } from 'react';
import { useCounter } from '../../store/sub';
import { Link } from 'react-router-dom';
import { categoryList } from '../../assets/Consts/categoryList';
import styled from 'styled-components';

const ContainerSearch = styled.div`
  position: relative;
  margin-top: 1rem;
  transition: opacity 0.3s ease-in;
`;

const Products = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, actions] = useCounter();
  const [search, setSearch] = useState('');
  const [filterLoading, setFilterLoading] = useState(true);
  const [ifBottom, setIsBottom] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // console.log(`scrollTop: ${scrollTop}`);
    // console.log(`scrollHeight: ${scrollHeight}`);
    // console.log(`clientHeight: ${clientHeight}`);

    if (scrollHeight - scrollTop === clientHeight) {
      // console.log('teraz if');
      setIsBottom(true);
      setPage((prev) => prev + 1);
    }

    // if (scrollTop + clientHeight >= scrollHeight) {
    //   setPage((prev) => prev + 1);
    // }
  };

  const params = new URLSearchParams({
    page: page,
    category: state.category,
  });

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [state.category]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://esitolo-backend.herokuapp.com/products/all-products?${params.toString()}`
    )
      .then((res) => res.json())
      .then((json) => {
        setProducts((prev) => [...prev, ...json]);
        setLoading(false);
      });
  }, [page, state.category]);
  useEffect(() => {
    setFilterLoading(true);
    if (search === '') setFiltered([]);

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
  }, [search]);

  const reset = () => {
    setSearch('');
    setFiltered([]);
  };

  return (
    <>
      <div onScroll={handleScroll} className="all-products">
        {ifBottom && (
          <p style={{ color: '#fff', fontSize: '30px' }}>Kurwa ma miód</p>
        )}
        <div className="all-products__container-input">
          <div className="all-products__container-icon">
            <Link to="/">
              <i className="fas fa-arrow-left" />
            </Link>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="all-products__input"
          />
        </div>
        {search.length > 0 && (
          <ContainerSearch>
            <div onClick={reset} className="close">
              X
            </div>
            <div className="test">
              {!filterLoading && filtered.length > 0 && (
                <p className="test-query">
                  Results for: <span>{search}</span>
                </p>
              )}
              {filterLoading && <p className="test-query">Loading...</p>}
              {!filterLoading && filtered.length === 0 && (
                <p className="test-query">No result for {search}</p>
              )}
              {filtered.map(
                ({ image, _id, productName, price, description }, index) => (
                  <Product
                    key={index}
                    id={_id}
                    description={description}
                    productName={productName}
                    image={image}
                    price={price}
                  />
                )
              )}
            </div>
          </ContainerSearch>
        )}
        {search.length === 0 && (
          <select
            onChange={(e) => actions.updateCategory(e.target.value)}
            className="all-products__select"
          >
            {categoryList.map((name, index) => (
              <option value={name} key={index}>
                {name}
              </option>
            ))}
          </select>
        )}
        {products.map(
          ({ image, _id, productName, price, description }, index) => (
            <Product
              key={index}
              id={_id}
              description={description}
              productName={productName}
              image={image}
              price={price}
              blur={search.length > 0 ? true : false}
            />
          )
        )}
        {loading && <Loading />}
      </div>
      <Menu />
    </>
  );
};

export default Products;
