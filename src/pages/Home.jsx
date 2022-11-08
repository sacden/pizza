import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import { SearchContext } from '../App';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  //const [sortType, setSortType] = React.useState(0);
  //const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
  // const categoryId = useSelector((state) => state.filter.categoryId);
  // const currentPage = useSelector((state) => state.filter.currentPage);
  // const sort = useSelector((state) => state.filter.sort);

  //const { searchValue } = React.useContext(SearchContext);

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1)); //my hack
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    //const currentPage =
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const sortBy = sortList.sortProperty;

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  //if its a first render, save parameters in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
    }
    //isSearch.current = true;
    fetchPizzas();
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
  }, [categoryId, sort, searchValue, currentPage]);

  //if first render have done, get products
  React.useEffect(() => {
    window.scrollTo(0, 0);
    //if (!isSearch.current) {
    getPizzas();
    //}
    //isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((pizza) => (
    <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
      <PizzaBlock {...pizza} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Všechny kategorie</h2>
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
