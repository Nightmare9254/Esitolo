import React, { useEffect, useReducer, useState } from 'react';
import { PulsingAnimation, ShowInput } from '../../framer/Transitions';
import { useLocal } from '../../hooks/cart';
import Product from '../Product/Product';

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// // const mic = new SpeechRecognition();

// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = 'pl';

const SearchProducts = ({ toggleState }) => {
  const [filterLoading, setFilterLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');
  const [isListening, setIsListening] = useState(false);

  // const handleListen = () => {
  //   if (isListening) {
  //     mic.start();
  //   } else {
  //     mic.stop();
  //   }

  //   mic.onresult = e => {
  //     const transcript = Array.from(e.results)
  //       .map(result => result[0])
  //       .map(result => result.transcript)
  //       .join('');

  //     if (transcript.length > 1) {
  //       setSearch(transcript);
  //       mic.stop();
  //       setIsListening(false);
  //     }

  //     setTimeout(() => {
  //       searchItems(transcript);
  //     }, 500);
  //     console.log(transcript);

  //     mic.onerror = e => {
  //       console.log(e.error);
  //     };
  //   };
  // };

  // useEffect(() => {
  //   handleListen();
  // }, [isListening]);

  const searchItems = query => {
    setFiltered([]);
    setFilterLoading(true);
    setKey(query);
    fetch(
      `${process.env.REACT_APP_API}/products/products-search?search=${query}`
    )
      .then(res => res.json())
      .then(json => {
        setFiltered(json);
        setFilterLoading(false);
      });
  };

  const reset = () => {
    setSearch('');
    setFiltered([]);
  };

  const [addItem] = useLocal();

  const actions = (tags, action) => {
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
        console.log(action.payload.id);
        tags.splice(action.payload.id, 1);
        return [...tags];
      default:
        break;
    }
  };

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
          <button
            onClick={() => {
              toggleState();
              reset();
            }}
            className="all-products__container-icon"
            aria-label="Go back"
          >
            <i className="fas fa-arrow-left fa-2x" />
          </button>
          <input
            value={search}
            placeholder="Search for favorite's things"
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                dispatch({ type: 'ADD' });
                searchItems(search);
              }
            }}
            className="all-products__input"
          />
          <button
            onClick={() => {
              dispatch({ type: 'ADD' });
              searchItems(search);
            }}
            className="all-products__search-btn"
            aria-label="Search button"
          >
            <i className="fas fa-search" />
          </button>

          <button
            onClick={() =>
              setIsListening(prevState => setIsListening(!prevState))
            }
            className="all-products__search-btn all-products__search-btn--mic"
            aria-label="Use microphone to search for an item"
          >
            {isListening && (
              <span>
                <i className="fas fa-circle" />
              </span>
            )}
            {!isListening && (
              <span>
                <i className="fas fa-microphone"></i>
              </span>
            )}
            {isListening && (
              <span>
                <i className="fas fa-microphone-slash"></i>
              </span>
            )}
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
                      className="all-products__recent-item-name"
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
                      <i className="fas fa-times" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="all-products__results">
            {filtered.map(
              ({ image, _id, productName, price, category }, index) => (
                <Product
                  view={true}
                  key={index}
                  id={_id}
                  productName={productName}
                  image={image}
                  price={price}
                  addItem={addItem}
                  category={category}
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
