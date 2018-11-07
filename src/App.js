import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

/* ********************************************
*
*********************************************** */
const Nav = () => (
  <nav className="navbar navbar-dark bg-primary">
    <a className="navbar-brand" href="#">Shopping Cart</a>
  </nav>
);

// const Nav = () => {
//   return (
//     <nav className="navbar navbar-dark bg-primary">
//       <a className="navbar-brand" href="#">Shopping Cart</a>
//     </nav>
//   );
// };

/* ********************************************
*
*********************************************** */
const Foot = ({ year }) => (
  <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
      &copy;
      {year}
    </a>
  </nav>
);
Foot.propTypes = {
  year: PropTypes.number.isRequired,
};


/* ********************************************
*
*********************************************** */
const CartItem = ({ item }) => {
  return (
    <div className="collection-item">
      <div className="row">
        <div className="col-md-8">{item.product.name}</div>
        <div className="col-md-2">{item.product.priceInCents}</div>
        <div className="col-md-2">{item.quantity}</div>
      </div>
    </div>
  );
};

/* ********************************************
*
*********************************************** */
const CartItems = () => {
  const myItem = { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 };
  return (
    <div className="container">
      <h1>Cart Items</h1>
      <div className="list-group">
        <div className="list-group-item">
          <div className="row">
            <div className="col-md-8">Product</div>
            <div className="col-md-2">Price</div>
            <div className="col-md-2">Quantity</div>
          </div>
        </div>
        <CartItem item={myItem} />
      </div>
    </div>
  );
};

/* ********************************************
*
*********************************************** */
class App extends Component {
  cartItemsList = [
    { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
    { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
    { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
  ];

  render() {
    return (
      <div>
        <Nav />
        <CartItems />
        <Foot year={2019} />
      </div>
    );
  }
}


export default App;
