import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { list } from '../components/Sort';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setSortType] = React.useState(0);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const sort = useSelector((state) => state.filter.sort);

  const { searchValue } = React.useContext(SearchContext);

  const sortingList = ['price', 'category', 'rating'];

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://6356efe39243cf412f90972d.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }` +
          '&sortBy=' +
          sortingList[sortType] +
          '&order=desc',
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  //if its a first render, save parameters in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
    }
    isSearch.current = true;
  }, []);

  //if first render have already done and parameters were changed, put parameters to url
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //if first render have done, get products
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
    .filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Všechny kategorie</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
