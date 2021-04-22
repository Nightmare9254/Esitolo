import React from 'react';
import { ShowInput } from '../../framer/Transitions';
import Product from '../Product/Product';

const SearchProducts = ({
  reset,
  toggleState,
  filtered,
  filterLoading,
  search,
  setSearch,
}) => {
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
            className="all-products__input"
          />
        </div>
        <div className="all-products__search-container">
          <div className="all-products__loading-container">
            {filterLoading && search.length > 0 && (
              <p className="all-products__loading-status">Loading...</p>
            )}
            {!filterLoading && filtered.length > 0 && (
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
