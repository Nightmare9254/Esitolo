import { createStore } from 'react-sweet-state';

const initialState = {
  category: 'all',
  loading: null,
  isSearch: false,
};

const actions = {
  updateCategory: (arg) => ({ getState, setState }) => {
    const { category } = getState();
    setState({
      category: arg,
    });
  },
  loadCategory: (arg) => ({ getState, setState }) => {
    const { loading } = getState;
    setState({
      loading: arg,
    });
  },
  openSearch: (arg) => ({ getState, setState }) => {
    const { isSearch } = getState();
    setState({
      isSearch: arg,
    });
  },
};

const Store = createStore({ initialState, actions });

export default Store;
