import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

// TODO: figure out how not to need this
let globalThis = null;

/* ********************************************
*  Nav bar
*********************************************** */
const Nav = () => (
  <nav className="navbar navbar-dark bg-primary">
    <a className="navbar-brand" href="#">Shopping Cart</a>
  </nav>
);

/* ********************************************
*  Footer
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
*  Row display of a cart item
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
*  Table display of all items in cart
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
*  Form to add a new item to the cart
*********************************************** */
const AddItem = ({ products, onSubmit }) => (
  <div className="container">
    <form id="myform" onSubmit={onSubmit}>
      Quantity:
      <input type="number" name="quantity" required />
      <br />
      <select id="selProduct" name="selProduct">
        { products.map(product => (
          <option key={product.id} data-priceincents={product.priceInCents} value={product.id}>{product.name}</option>)) }
      </select>
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
);

AddItem.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// /* ********************************************
// *  TODO: move this into state
// *********************************************** */
// const cartItemsList = [
//   { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
//   { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
//   { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
// ];

/* ********************************************
*  Helper to add a new item to the cart
*********************************************** */
function addToCart(_item) {
  const item = _item;
  item.id = globalThis.state.cartItemsList.reduce((a, c) => Math.max(a, c.id), 0) + 1;
  globalThis.state.cartItemsList.unshift(item);
  console.log('---------');
  console.log('cartItemsList: ', globalThis.state.cartItemsList);
  console.log('---------');
}


/* ********************************************
*  Main app
*********************************************** */
class App extends Component {
  state = {
    timestamp: new Date(),
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
    cartItemsList: [
      { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
      { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
      { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
    ],
  };

  // /* ********************************************
  // *  TODO: move this into state
  // *********************************************** */
  // cartItemsList = [
  //   { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
  //   { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
  //   { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
  // ];


  componentDidMount() {
    globalThis = this;
  }

  /* ********************************************
  *  onSubmitAddItem()
  *********************************************** */
  onSubmitAddItem(e) {
    e.preventDefault();

    // create item to add to cart
    const elemSelectionList = document.forms.myform.selProduct;

    const newItem = {};
    newItem.product = {
      id: parseInt(elemSelectionList.options[elemSelectionList.selectedIndex].value, 10),
      name: elemSelectionList.options[elemSelectionList.selectedIndex].text,
      priceInCents: parseInt(elemSelectionList.options[elemSelectionList.selectedIndex].dataset.priceincents, 10),
    };
    newItem.quantity = parseInt(document.forms.myform.quantity.value, 10);
    addToCart(newItem);

    // force rendering
    globalThis.setState((prevState) => ({
      timestamp: Date()
    }));
  }

  /* ********************************************
  *  render()
  *********************************************** */
  render() {
    console.log('render()');
    const { products } = this.state; // linter wants destructuring for call to AddItem
    const { timestamp } = this.state; // linter wants destructuring to use this value below
    const { cartItemsList } = this.state; // linter wants destructuring to use this value below
    return (
      <div>
        <Nav />

        <p>{timestamp.toString()}</p>

        <AddItem products={products} onSubmit={this.onSubmitAddItem} />
        <hr />

        <CartItems items={cartItemsList} />
        <hr />

        <Foot year={2019} />
      </div>
    );
  }
}

export default App;
