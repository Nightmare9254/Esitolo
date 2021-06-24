import { Link } from 'react-router-dom';
import { useCounter } from '../../store/sub';

const SearchBar = () => {
  const [, actions] = useCounter();
  return (
    <div className="search">
      <Link
        onClick={() => actions.openSearch(true)}
        to="/products"
        aria-label="go to search bar"
      >
        <div className="search__wrapper">
          <div className="search__icon">
            <i className="fas fa-search"></i>
          </div>
          <p className="search-text">
            Search trough thousands of advertisement
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SearchBar;
