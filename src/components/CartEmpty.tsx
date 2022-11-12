import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Košík je prázdný <span>😕</span>
        </h2>
        <img src="img/empty-cart.png" alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Zpět</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
