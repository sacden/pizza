import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzasSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const dispatch = useAppDispatch();

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1)); //my hack
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const sortBy = sort.sortProperty;

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  //if its a first render, save parameters in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      if (sort) {
        params.sortBy = sort;
      }
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
    }
    isMounted.current = true;
  }, []);

  //if first render have already done and parameters were changed, put parameters to url
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`/?${queryString}`);
    }
    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //if first render have done, get products
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">Všechny kategorie</h2>
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
