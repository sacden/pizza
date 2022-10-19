import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import pizzas from './assets/pizzas.json';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Všechny kategorie</h2>
          <div class="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
