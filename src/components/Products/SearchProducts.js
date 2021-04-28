import React, { useEffect, useReducer, useState } from 'react';
import { PulsingAnimation, ShowInput } from '../../framer/Transitions';
import { useLocal } from '../../hooks/cart';
import Product from '../Product/Product';

const SearchProducts = ({ toggleState }) => {
  const [filterLoading, setFilterLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const searchItems = () => {
    setIsSearch(true);
    setFilterLoading(true);
    fetch(
      `https://esitolo-backend.herokuapp.com/products/products-search?search=${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setFiltered(json);
        setFilterLoading(false);
      });
  };

  const reset = () => {
    setSearch('');
    setFiltered([]);
  };

  return (
    <ShowInput>
      <div>
        <div className="all-products__container-input">
          <div
            onClick={() => {
              toggleState();
              reset();
            }}
            className="all-products__container-icon"
          >
            <i className="fas fa-arrow-left fa-2x" />
          </div>
          <input
            value={search}
            placeholder="Search for favourites things"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                // dispatch({ type: 'ADD' });
              }
            }}
            className="all-products__input"
          />
          <button
            style={{ background: 'transparent', border: 'none', color: '#fff' }}
            onClick={searchItems}
          >
            <i className="fas fa-search" />
          </button>
        </div>
        <div className="all-products__search-container">
          <div className="all-products__loading-container">
            {isSearch && filterLoading && search.length > 0 && (
              <PulsingAnimation />
            )}
            {!filterLoading && isSearch && filtered.length > 0 && (
              <p className="all-products__loading-status">
                Results for:{' '}
                <span className="all-products__loading-item">{search}</span>
              </p>
            )}
            {!filterLoading && search.length > 0 && filtered.length === 0 && (
              <p className="all-products__loading-status">
                No result for{' '}
                <span className="all-products__loading-item">{search}</span>
              </p>
            )}
            {!filterLoading && search.length > 0 && (
              <p className="all-products__loading-status">
                Total results:{' '}
                <span className="all-products__loading-item">
                  {filtered.length}
                </span>
              </p>
            )}
          </div>
          {/* {tags.length >= 1 && search.length < 1 && ( */}
          <>
            <div className="all-products__recent">
              <h4>Search History</h4>
              <button
                // onClick={() => dispatch({ type: 'REMOVE' })}
                className="all-products__btn-remove"
              >
                <i className="fas fa-times" />
              </button>
            </div>
            {/* <div className="all-products__recent-container">
                {tags.map((item, index) => (
                  <p
                    className="all-products__recent-item"
                    key={index}
                    onClick={() => setSearch(item)}
                  >
                    {item}
                  </p>
                ))}
              </div> */}
          </>

          <div className="all-products__results">
            {filtered.map(
              ({ image, _id, productName, price, description }, index) => (
                <Product
                  view={true}
                  key={index}
                  id={_id}
                  productName={productName}
                  image={image}
                  price={price}
                  // addItem={addItem}
                />
              )
            )}
          </div>
        </div>
      </div>
    </ShowInput>
  );
};

export default SearchProducts;
