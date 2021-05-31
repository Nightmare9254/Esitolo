import { createStore } from 'react-sweet-state';

const initialState = {
  category: 'all',
  loading: null,
  isSearch: false,
  showCard: false,
  attached: false,
  wallet: [],
  toggleDD: false,
  cardId: 0,
};

const actions = {
  updateCategory:
    arg =>
    ({ getState, setState }) => {
      const { category } = getState();
      setState({
        category: arg,
      });
    },
  loadCategory:
    arg =>
    ({ getState, setState }) => {
      const { loading } = getState();
      setState({
        loading: arg,
      });
    },
  openSearch:
    arg =>
    ({ getState, setState }) => {
      const { isSearch } = getState();
      setState({
        isSearch: arg,
      });
    },
  showCard:
    arg =>
    ({ getState, setState }) => {
      const { showCard } = getState();
      setState({ showCard: arg });
    },
  attachCardForm:
    arg =>
    ({ getState, setState }) => {
      const { attached } = getState();
      setState({ attached: arg });
    },
  wallet:
    arg =>
    ({ getState, setState }) => {
      const { wallet } = getState();
      setState({ wallet: arg });
    },
  toggleDropDown:
    arg =>
    ({ getState, setState }) => {
      const { toggleDD } = getState();
      setState({ toggleDD: arg });
    },
  cardId:
    arg =>
    ({ getState, setState }) => {
      const { cardId } = getState();
      setState({ cardId: arg });
    },
};

const Store = createStore({ initialState, actions });

export default Store;
