import { createStore } from 'react-sweet-state';

const initialState = {
  category: 'all',
};

const actions = {
  updateCategory: (arg) => ({ getState, setState }) => {
    const { category } = getState();
    setState({
      category: arg,
    });
  },
};

const Store = createStore({ initialState, actions });

export default Store;
