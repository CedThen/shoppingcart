import React from 'react';
import './App.css';
import ItemsDisplay from './Components/ItemsDisplay';
import NavBar from './Components/NavBar.js';
import CartBar from './Components/CartBar.js';
import Title from './Components/Title.js';
import SignIn from './Components/SignIn';
import Register from './Components/Register.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      user: {},
      currentRoute: 'shop',
      itemCatalog: [],
      currentCart: []
    }
  }

  componentDidMount () { 
    fetch('http://localhost:3001/')
    .then(response => response.json())    
    .then(data => {
      this.setState({
        itemCatalog: data
      })
      console.log(this.state.itemCatalog);
    })
    
  }

  onAddCartClick = (itemId) => {    
    if(this.state.currentCart.filter(item => item.id === itemId).length === 0){
      let newItem = this.state.itemCatalog.filter(item => item.id === itemId)[0];
      newItem.amount = 1;      
      let updatedCart = this.state.currentCart.concat(newItem);
      this.setState({
        currentCart: updatedCart
      })
    }
    else {
      this.setState(
        this.state.currentCart.map(item => {
          if(item.id === itemId){
            item.amount++;
          }
          return item;
        })
      )
    }
  }

  onSignOut = () => {
    this.setState({isSignedIn: false});
    if(this.currentCart.length > 0){
      //TODO: save cart into database
    }
  }

  onRemoveFromCartClick = (itemId) => {
    const updatedCart = this.state.currentCart.filter(item => item.id !== itemId);
    this.setState({
      currentCart: updatedCart
    });
  }

  onRouteChange = (newRoute) => {
    this.setState({currentRoute: newRoute}); 
    console.log(this.state.currentRoute)
  }

  loadUser = (loadUser) => {
    this.setState({
      user: loadUser,
      userCart: this.state.currentCart
    })
    console.log("loading user: ", this.state.user);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <NavBar onRouteChange={this.onRouteChange} isSignedIn={this.isSignedIn} accountEmail={this.state.user.email}/>
        {this.state.currentRoute === "shop" ?
          <div>
            <Title />
            <ItemsDisplay itemList={this.state.itemCatalog}
            onAddCartClick={this.onAddCartClick}/>
            <CartBar cartList={this.state.currentCart} onRemoveFromCartClick={this.onRemoveFromCartClick}/>
          </div>
        : (
          this.state.currentRoute === "signin" 
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )}        
      </div>
    );
  }
}

export default App;

// items: 
// id,
// name,
// amount,
// picture,
// date added,
// picture,
// price