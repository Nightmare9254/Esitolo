import Product from '../Product/Product';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { useCounter } from '../../store/sub';
import { Link } from 'react-router-dom';

const Products = () => {
  // const filterProducts = (product) => {
  //   if (
  //     product.productName.toLowerCase().indexOf(searchValue.toLowerCase()) ===
  //     -1
  //   )
  //     return false;
  //   if (state.category === 'all') return true;

  //   return product.category === state.category;
  // };

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, actions] = useCounter();

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  const params = new URLSearchParams({
    page: page,
    category: state.category,
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://esitolo-backend.herokuapp.com/auth/login/products/all-products?${params.toString()}`
    )
      .then((res) => res.json())
      .then((json) => {
        setProducts((prev) => [...prev, ...json]);
        // console.log(json);
        setLoading(false);
      });
  }, [page]);

  return (
    <div onScroll={handleScroll} className="all-products">
      <Link to="/">
        <button className="button">go back</button>
      </Link>
      {products.map(
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
      {loading && <Loading />}
    </div>
  );
};

export default Products;
