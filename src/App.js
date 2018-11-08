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
*  Format numeric cents to $12.34
*********************************************** */
function formatDollars(cents) {
  const s = String(cents);
  return `$${s.slice(0, -2)}.${s.slice(-2)}`;
}

/* ********************************************
*  Row display of a cart item
*********************************************** */
const CartItem = ({ item }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-md-8">{item.product.name}</div>
      <div className="col-md-2">{formatDollars(item.product.priceInCents)}</div>
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
          <div className="col-md-8"><b>Product</b></div>
          <div className="col-md-2"><b>Price</b></div>
          <div className="col-md-2"><b>Quantity</b></div>
        </div>
      </div>
      { items.map(item => <CartItem key={item.id} item={item} />) }
      <CartTotalRow items={items} />
    </div>
  </div>
);
CartItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/* ********************************************
*  Cart total row for listing table
*********************************************** */
const CartTotalRow = ({ items }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-md-8"><b>TOTALS</b></div>
      <div className="col-md-2"><b>{formatDollars(items.reduce((a, c) => a + c.product.priceInCents * c.quantity, 0))}</b></div>
      <div className="col-md-2"><b>{items.reduce((a, c) => a + c.quantity, 0)}</b></div>
    </div>
  </div>
);
CartTotalRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/* ********************************************
*  Form to add a new item to the cart
*********************************************** */
const AddItem = ({ products, onSubmit }) => (
  <div className="container">
    <br />
    <form id="myform" onSubmit={onSubmit}>
      ADD: &nbsp;Quantity:&nbsp;
      <input type="text" name="quantity" size="5" width="20px" required />
      &nbsp;&nbsp;Product:&nbsp;
      <select id="selProduct" name="selProduct">
        { products.map(product => (
          <option key={product.id} data-priceincents={product.priceInCents} value={product.id}>{product.name}</option>)) }
      </select>
      &nbsp;&nbsp;<button type="submit">Submit</button>
    </form>
  </div>
);

AddItem.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};




/* ********************************************
***********************************************
*  Main app
***********************************************
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
    cartItemsList: [
      { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
      { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
      { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
    ],
  };

  /* ********************************************
  *  Helper to add a new item to the cart
  *********************************************** */
  addToCart(_item) {
    const item = _item;
    item.id = globalThis.state.cartItemsList.reduce((a, c) => Math.max(a, c.id), 0) + 1;
    const newCart = [item, ...globalThis.state.cartItemsList];
    globalThis.setState((prevState) => ({
      cartItemsList: newCart,
    }));
    console.log('---------');
    console.log('cartItemsList: ', globalThis.state.cartItemsList);
    console.log('---------');
  }

  componentDidMount() {
    globalThis = this;
  }

  /* ********************************************
  *  onSubmitAddItem()
  *  TODO: push this function into the Form
  *********************************************** */
  onSubmitAddItem = (e) => {
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
    globalThis.addItem(newItem);
    // globalThis.addToCart(newItem);
  }

  /* ********************************************
  *  addItem(), called by form's onSubmit
  *********************************************** */
  addItem(newItem) {
    this.addToCart(newItem);
  }

  /* ********************************************
  *  render()
  *********************************************** */
  render() {
    console.log('render()');
    const { products } = this.state; // linter wants destructuring for call to AddItem
    const { cartItemsList } = this.state; // linter wants destructuring to use this value below
    return (
      <div>
        <Nav />

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
