import Product from '../Product/Product';
import { useFetch } from '../../hooks/useFetch';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import { useCounter } from '../../store/sub';
import { categoryList } from '../../assets/Consts/categoryList';
import { useEffect, useRef, useState } from 'react';

const Products = () => {
  const { data, loading,setLoading } = useFetch('/products/all-products');
  const [state, actions] = useCounter();
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);
  const [test,setTest] = useState(false);

  const filterProducts = product => {
    if(product.productName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1) return false;
    if(state.category === 'all') return true;

    return product.category === state.category;
  }

  useEffect(() => {
   if(state.category === 'all'){
     return setTimeout(() => {
      setLoading(false)
     },1000)
   } 
   setTimeout(() => {
    setLoading(false)
   },300)
  },[state.category,searchValue])



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
          {searchValue.length === 0 && <button onClick={() => {
            setSearchValue(inputRef.current.value)
          }}>Search</button>}
           {searchValue.length !== 0 && <button onClick={() => {
            setLoading(true)
            setSearchValue("")
            inputRef.current.value = '';
          }}>Cancel</button>}
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
            actions.updateCategory(e.target.value)
            setLoading(true);
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
          {!loading && data.filter(filterProducts).map(({image,_id,productName,price,description}) =>
            <Product
              key={_id}
              description={description}
              productName={productName}
              image={image}
              price={price}
              />
          )}
        </div>
      </div>
      <Menu />
    </>
  );
};

export default Products;
