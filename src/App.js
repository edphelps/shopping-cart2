import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

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
      &copy;&nbsp;
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
*  Row display of a cart item with delete button
*********************************************** */
const CartItem = ({ item, removeItemCB }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-md-1">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            removeItemCB(item.id);
          }}
        >
          <i className="fas fa-trash-alt" />
        </button>
        {/* <a
          onClick={(e) => {
            e.preventDefault();
            removeItemCB(item.id);
          }}
          href="#"
        >
          X
        </a> */}
      </div>
      <div className="col-md-7">{item.product.name}</div>
      <div className="col-md-2">{formatDollars(item.product.priceInCents)}</div>
      <div className="col-md-2">{item.quantity}</div>
    </div>
  </div>
);
CartItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  removeItemCB: PropTypes.func.isRequired,
};

/* ********************************************
*  Row display for the cart totals
*********************************************** */
const CartTotalRow = ({ items }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-7"><b>TOTALS</b></div>
      <div className="col-md-2"><b>{formatDollars(items.reduce((a, c) => a + c.product.priceInCents * c.quantity, 0))}</b></div>
      <div className="col-md-2"><b>{items.reduce((a, c) => a + c.quantity, 0)}</b></div>
    </div>
  </div>
);
CartTotalRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/* ********************************************
*  Table display of all items in cart
*********************************************** */
const CartItems = ({ items, removeItemCB }) => (
  <div className="container">
    <h1>Cart Items</h1>
    <div className="list-group">
      <div className="list-group-item">
        <div className="row">
          <div className="col-md-1">&nbsp;del</div>
          <div className="col-md-7"><b>Product</b></div>
          <div className="col-md-2"><b>Price</b></div>
          <div className="col-md-2"><b>Quantity</b></div>
        </div>
      </div>
      { items.map(item => <CartItem key={item.id} item={item} removeItemCB={removeItemCB} />) }
      <CartTotalRow items={items} />
    </div>
  </div>
);
CartItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItemCB: PropTypes.func.isRequired,
};

/* ********************************************
*  Form to add a new item to the cart
      <form id="myform" onSubmit={onSubmit}>
*********************************************** */
const AddItemForm = ({ products, addItemCB }) => {
  /* ************************
  * onSumbit() handler
  *************************** */
  const onSubmit = (e) => {
    console.log('onSubmit()');
    e.preventDefault();

    // create item to add to cart
    const elemSelProduct = e.target.selProduct;
    const elemSelectedProduct = elemSelProduct.options[elemSelProduct.selectedIndex];
    const newItem = {
      product: {
        id: parseInt(elemSelectedProduct.value, 10),
        name: elemSelectedProduct.text,
        priceInCents: parseInt(elemSelectedProduct.dataset.priceincents, 10),
      },
      quantity: parseInt(document.forms.myform.quantity.value, 10),
    };

    // CB sent by parent to get the date back from the form
    addItemCB(newItem);

    // clear the form
    e.target.reset();
  };

  /* ************************
  * return, html for the form
  *************************** */
  return (
    <div className="container">
      <br />
      <form id="myform" onSubmit={onSubmit}>
        <b>ADD</b> &nbsp;Quantity:&nbsp;
        <input type="text" name="quantity" size="5" width="20px" required />
        &nbsp;&nbsp;Product:&nbsp;
        <select id="selProduct" name="selProduct">
          { products.map(product => (
            <option key={product.id} data-priceincents={product.priceInCents} value={product.id}>{product.name}</option>)) }
        </select>
        &nbsp;&nbsp;
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
AddItemForm.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  addItemCB: PropTypes.func.isRequired,
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
  *  Callback used by the form's onSubmit to add a new item to cart
  *********************************************** */
  addToCart = (_item) => {
    // set the new item's ID to the next ID value available
    const item = _item; // happy linter
    const { cartItemsList } = this.state; // happy linter
    item.id = cartItemsList.reduce((a, c) => Math.max(a, c.id), 0) + 1;

    // add the new item to the state
    this.setState(prevState => ({
      cartItemsList: [item, ...prevState.cartItemsList],
    }));
  }

  /* ********************************************
  *  Callback used by the cart list to delete an item
  *********************************************** */
  removeFromCart = (id) => {
    this.setState(prevState => ({
      cartItemsList: prevState.cartItemsList.filter(item => item.id !== id),
    }));
  }

  /* ********************************************
  *  render()
  *********************************************** */
  render() {
    console.log('render()');
    const { products } = this.state; // linter wants destructuring for call to AddItemForm
    const { cartItemsList } = this.state; // linter wants destructuring to use this value below
    return (
      <div>
        <Nav />

        <AddItemForm products={products} addItemCB={this.addToCart} />
        <hr />

        <CartItems items={cartItemsList} removeItemCB={this.removeFromCart} />
        <hr />

        <Foot year={2019} />
      </div>
    );
  }
}

export default App;
