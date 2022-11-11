import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6356efe39243cf412f90972d.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('error');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  );
};

export default FullPizza;
