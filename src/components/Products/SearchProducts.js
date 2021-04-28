import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { PulsingAnimation, ShowInput } from '../../framer/Transitions';
import { useLocal } from '../../hooks/cart';
import Product from '../Product/Product';

const SearchProducts = ({ toggleState }) => {
  const [filterLoading, setFilterLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');

  const searchItems = (query) => {
    setFiltered([]);
    setFilterLoading(true);
    setKey(query);
    fetch(
      `https://esitolo-backend.herokuapp.com/products/products-search?search=${query}`
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

  const [addItem] = useLocal();

  const actions = useCallback((tags, action) => {
    switch (action.type) {
      case 'ADD':
        const index = tags.indexOf(search);
        if (index === -1 && search !== '') {
          if (tags.length >= 10) {
            tags.shift();
          }
          tags.push(search);
          return [...tags];
        }
        return [...tags];
      case 'REMOVE':
        tags.splice(action.payload.id, 1);
        return [...tags];
      default:
        break;
    }
  }, []);
  // BEFORE
  // const actions = (tags, action) => {
  //   switch (action.type) {
  //     case 'ADD':
  //       const index = tags.indexOf(search);
  //       if (index === -1 && search !== '') {
  //         if (tags.length >= 10) {
  //           tags.shift();
  //         }
  //         tags.push(search);
  //         return [...tags];
  //       }
  //       return [...tags];
  //     case 'REMOVE':
  //       console.log(action.payload.id);
  //       tags.splice(action.payload.id, 1);
  //       return [...tags];
  //     default:
  //       break;
  //   }
  // };

  const [tags, dispatch] = useReducer(actions, [], () => {
    const local = localStorage.getItem('tags');
    return local ? JSON.parse(local) : [];
  });

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

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
                dispatch({ type: 'ADD' });
                searchItems(search);
              }
            }}
            className="all-products__input"
          />
          <button
            onClick={() => searchItems(search)}
            className="all-products__search-btn"
          >
            <i className="fas fa-search fa-2x" />
          </button>
        </div>
        <div className="all-products__search-container">
          <div className="all-products__loading-container">
            {filterLoading && key.length > 0 && <PulsingAnimation />}
            {!filterLoading && filtered.length > 0 && (
              <p className="all-products__loading-status">
                Results for:{' '}
                <span className="all-products__loading-item">{key}</span>
              </p>
            )}
            {!filterLoading && filtered.length === 0 && (
              <p className="all-products__loading-status">
                No result for{' '}
                <span className="all-products__loading-item">{key}</span>
              </p>
            )}
            {!filterLoading && (
              <p className="all-products__loading-status">
                Total results:{' '}
                <span className="all-products__loading-item">
                  {filtered.length}
                </span>
              </p>
            )}
          </div>
          {tags.length >= 1 && filtered.length < 1 && (
            <>
              <div className="all-products__recent">
                <h4>Search History</h4>
              </div>
              <div className="all-products__recent-container">
                {tags.map((item, index) => (
                  <div key={index} className="all-products__recent-item">
                    <p
                      key={index}
                      onClick={() => {
                        searchItems(item);
                      }}
                    >
                      {item}
                    </p>
                    <button
                      className="all-products__btn-remove"
                      onClick={() =>
                        dispatch({ type: 'REMOVE', payload: { id: index } })
                      }
                    >
                      <i
                        style={{
                          marginLeft: '.5rem',
                          fontSize: '20px',
                          color: 'tomato',
                        }}
                        className="fas fa-times"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="all-products__results">
            {filtered.map(({ image, _id, productName, price }, index) => (
              <Product
                view={true}
                key={index}
                id={_id}
                productName={productName}
                image={image}
                price={price}
                addItem={addItem}
              />
            ))}
          </div>
        </div>
      </div>
    </ShowInput>
  );
};

export default SearchProducts;
