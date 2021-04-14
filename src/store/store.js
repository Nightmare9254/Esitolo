import { createStore } from 'react-sweet-state';

const initialState = {
  category: 'all',
  loading: null,
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
};

const Store = createStore({ initialState, actions });

export default Store;
