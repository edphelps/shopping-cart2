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
const CartItem = ({ item }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-md-8">{item.product.name}</div>
      <div className="col-md-2">{item.product.priceInCents}</div>
      <div className="col-md-2">{item.quantity}</div>
    </div>
  </div>
);
CartItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
};


/* ********************************************
*
*********************************************** */
const CartItems = ({ items }) => (
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
      { items.map(item => <CartItem key={item.id} item={item} />) }
    </div>
  </div>
);
CartItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/* ********************************************
*
*********************************************** */
// function onSubmitAddItem(e) {
//   console.log('onSubmitAddItem()');
//   e.preventDefault();
//   console.log('quantity: ', document.forms.myform.quantity.value);
//   const elemSelectionList = document.forms.myform.theproduct;
//   console.log('product: ', elemSelectionList.options[elemSelectionList.selectedIndex].value);
//   console.log('price: ', elemSelectionList.options[elemSelectionList.selectedIndex].dataset.priceincents);
//
//   const cart = {};
//   cart.product = {
//     id: elemSelectionList.options[elemSelectionList.selectedIndex].value,
//     name: elemSelectionList.options[elemSelectionList.selectedIndex].text,
//     princeInCents: elemSelectionList.options[elemSelectionList.selectedIndex].dataset.priceincents,
//   };
//   cart.quantity = document.forms.myform.quantity.value;
//
//   console.log('cart: ', cart);
// }

/* ********************************************
*
*********************************************** */
const AddItem = ({ products, onSubmit }) => {
  // console.log('products: ', products);
  console.log('*** onSubmit: ', onSubmit);
  return (
    <div className="container">
      <form id="myform" onSubmit={onSubmit}>
        Quantity:
        <input type="number" name="quantity" required />
        <br />
        <select id="theproduct" name="theproduct">
          { products.map(product => (
            <option key={product.id} data-priceincents={product.priceInCents} value={product.id}>{product.name}</option>)) }
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
AddItem.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

/* ********************************************
*
*********************************************** */
const cartItemsList = [
  { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
  { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
  { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
];
function addToCart(_item) {
  const item = _item;
  item.id = cartItemsList[cartItemsList.length - 1].id + 1;
  cartItemsList.push(item);
}

let globalThis = null;

/* ********************************************
*
*********************************************** */
class App extends Component {
  state = {
    products: [
      { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 },
      { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 },
      { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 },
      { id: 43, name: 'Small Aluminum Keyboard', priceInCents: 2500 },
      { id: 44, name: 'Practical Copper Plate', priceInCents: 1000 },
      { id: 45, name: 'Awesome Bronze Pants', priceInCents: 399 },
      { id: 46, name: 'Intelligent Leather Clock', priceInCents: 2999 },
      { id: 47, name: 'Ergonomic Bronze Lamp', priceInCents: 40000 },
      { id: 48, name: 'Awesome Leather Shoes', priceInCents: 3990 },
    ],
  };

  onSubmitAddItem(e) {
    console.log('MyonSubmitAddItem()');
    e.preventDefault();
    console.log('quantity: ', document.forms.myform.quantity.value);
    const elemSelectionList = document.forms.myform.theproduct;
    console.log('product: ', elemSelectionList.options[elemSelectionList.selectedIndex].value);
    console.log('price: ', elemSelectionList.options[elemSelectionList.selectedIndex].dataset.priceincents);

    const newItem = {};
    newItem.product = {
      id: elemSelectionList.options[elemSelectionList.selectedIndex].value,
      name: elemSelectionList.options[elemSelectionList.selectedIndex].text,
      princeInCents: elemSelectionList.options[elemSelectionList.selectedIndex].dataset.priceincents,
    };
    newItem.quantity = document.forms.myform.quantity.value;

    addToCart(newItem);

    globalThis.render();

    // console.log('cart: ', cart);
  }

  render() {
    globalThis = this;
    // console.log('onSubmitAddItem: ', onSubmitAddItem); // I EXIST!
    const { products } = this.state; // linter wants destructuring for call to AddItem
    return (
      <div>
        <Nav />
        <p>&nbsp;</p>
        <CartItems items={cartItemsList} />
        <hr />
        <AddItem products={products} onSubmit={this.onSubmitAddItem} />
        <p>&nbsp;</p>
        <Foot year={2019} />
      </div>
    );
  }


}

export default App;
