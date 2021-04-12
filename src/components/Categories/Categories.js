import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Menu from '../Menu/Menu';

const Categories = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('0');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/products/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName: category }),
      });
      const json = await response.json();
      setProducts(json);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filterProducts = () => {
    console.log(filterOption);
    switch (filterOption) {
      case '0':
        products.sort((a, b) => {
          return b.price - a.price;
        });

        break;
      case '1':
        products.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="products-container">
        <Link className="products-container__link-back link-back" to="/">
          <i className="fas fa-arrow-left"></i> Back
        </Link>
        <p className="products-container__title">
          Results for category:{' '}
          <span className="products-container__name">
            <strong>{category}</strong>
          </span>
        </p>
        <p className="products-container__option">Filter by</p>
        <select
          value={filterOption}
          className="products-container__select"
          onChange={(e) => {
            setFilterOption(e.target.value);
            filterProducts();
          }}
        >
          <option value="0">Price (Low to High)</option>
          <option value="1">Price (Hight to Low)</option>
        </select>
        {!loading &&
          products.map(({ description, productName, image, price, _id }) => (
            <Product
              key={_id}
              description={description}
              productName={productName}
              image={image}
              price={price}
            />
          ))}
        {loading && <div>Esitolo ... </div>}
      </div>
      <Menu />
    </>
  );
};

export default Categories;
