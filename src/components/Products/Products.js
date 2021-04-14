import Product from '../Product/Product';
import { useFetch } from '../../hooks/useFetch';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import { useCounter } from '../../store/sub';
import { categoryList } from '../../assets/Consts/categoryList';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

const Products = () => {
  const { data, loading, setLoading } = useFetch('/products/all-products');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);
  const [state, actions] = useCounter();
  const [test, setTest] = useState();

  const displayProducts = () => {
    if (state.category === 'all') return mapProducts(data);

    const filtered = data.filter(
      (element) => element.category === state.category
    );

    return mapProducts(filtered);
  };

  const mapProducts = (arr) => {
    const help = arr
      .filter((e) =>
        e.productName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
          ? true
          : null
      )
      .map(({ description, productName, image, price, _id }) => {
        return (
          <Product
            key={_id}
            description={description}
            productName={productName}
            image={image}
            price={price}
          />
        );
      });
    return help;
  };

  // const filterProducts = () => {
  //   console.log(filterOption);
  //   switch (filterOption) {
  //     case '0':
  //       products.sort((a, b) => {
  //         return b.price - a.price;
  //       });

  //       break;
  //     case '1':
  //       products.sort((a, b) => {
  //         return a.price - b.price;
  //       });
  //       break;
  //     default:
  //       return null;
  //   }
  // };
  return (
    <>
      <div className="all-products">
        <div className="all-products__container-input">
          <div className="all-products__container-icon">
            <i className="fas fa-arrow-left"></i>
          </div>

          <input
            placeholder="jacket"
            type="text"
            ref={inputRef}
            className="all-products__input"
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                setSearchValue(e.target.value);
              }
            }}
          />
          {searchValue.length === 0 && (
            <button
              onClick={() => {
                setSearchValue(inputRef.current.value);
              }}
            >
              Search
            </button>
          )}
          {searchValue.length !== 0 && (
            <button
              onClick={() => {
                setSearchValue('');
                inputRef.current.value = '';
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="all-products__search-words">
          <p className="all-products__recent">Recent:</p>
          <div className="all-products__container-span">
            <span className="all-products__span">Rake</span>
            <span className="all-products__span">Bucket</span>
            <span className="all-products__span">Ball</span>
            <span className="all-products__span">Book</span>
          </div>
        </div>
        {/* <p className="all-products__recent">Category:</p> */}
        <select
          onChange={(e) => {
            actions.updateCategory(e.target.value);
          }}
          className="all-products__select"
          defaultValue={state.category}
        >
          {categoryList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="all-products__container-items">
          {loading && <Loading />}
          {!loading && displayProducts()}
        </div>
      </div>
      <Menu />
    </>
  );
};

export default React.memo(Products);
