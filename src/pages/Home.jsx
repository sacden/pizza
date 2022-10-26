import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);

  const sortingList = ['price', 'category', 'rating'];

  console.log('sortType' + sortingList[sortType]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6356efe39243cf412f90972d.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }` +
        '&sortBy=' +
        sortingList[sortType] +
        '&order=desc',
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
          <Sort value={sortType} onClickSortType={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Všechny kategorie</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
