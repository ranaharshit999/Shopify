import React, { useState } from 'react';
import './App.css';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import { useSelector, useDispatch } from 'react-redux';
import RegisterScreen from './screen/RegisterScreen';
import ProductsScreen from './screen/ProductsScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import OrdersScreen from './screen/OrdersScreen';
import ProfileScreen from './screen/ProfileScreen';
import { listProducts } from './action/productAction';
import ErrorScreen from './screen/ErrorScreen';
import EndScreen from './screen/EndScreen';
import { logout } from './action/userAction';


function App() {
const userSignin=useSelector(state=>state.userSignin);
const {userInfo}=userSignin;
const dispatch = useDispatch()
  const openMenu=()=>{
    document.querySelector(".sidebar").classList.add('open');
}
const closeMenu=()=>{
    document.querySelector(".sidebar").classList.remove('open');
}
window.addEventListener('mouseup',function(event){
  let sidebar=document.querySelector(".sidebar");
  if(event.target!==sidebar && event.target.parentNode!==sidebar){
      sidebar.classList.remove('open');
  }
})
const category="";
const sortOrder="";
const [searchKeyword, setSearchKeyword] = useState("")
const submitHandler=(e)=>{
    e.preventDefault();
     dispatch(listProducts(category,searchKeyword,sortOrder))    
}
const handleLogout=()=>{
    dispatch(logout());
    window.location.reload();
}
  return (
      <BrowserRouter>
    <div className="grid-container">
    <header className="header">
        <div className="brand">
        <div className="brand-1">
            <button onClick={openMenu}>
                &#9776;
            </button>
            </div>
            <div className="brand-2">
            <Link  to="/">

            Shopify
            </Link>
            </div>
            </div>
            <div className="main-header">
            <form className="example"
         onSubmit={submitHandler}>
        <input name="searcKeyword"
        onChange={(e)=>setSearchKeyword(e.target.value)} 
        placeholder="search for products"></input>
        <button type="submit">Search<i className="fa fa-search" 
        style={{height:"10px",width:"10px",color:'white'}}></i></button>
                </form>
            </div>
        
        <div className="header-links">
        
        <div className="header-links-1">
            {
                userInfo && !userInfo.isAdmin ?<Link to="/cart/:id?">Cart </Link>:''
         
            }
            </div>
            <div className="header-links-2">
            {
                userInfo && !userInfo.isAdmin?
                <Link to="/profile">{userInfo.name}</Link>
                :userInfo && userInfo.isAdmin?'':
                                                
                <Link to='/signin'> Sign In</Link>
            }
            </div> 
         
        
  
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}

        
        </div>
    </header>
    <aside className="sidebar">
    <div className="top">
    <button className="sidebar-close-button" onClick={closeMenu} >&#9776;</button>
        <h4>Shopping Categories</h4>
        </div>
        <ul>
            <li><Link to="/category/Pant">Pants</Link></li>
            <hr />
            <li><Link to="/category/shirts">Shirts</Link></li>
            <hr />
            <li><Link to="/category/Phone">Phones</Link></li>
            <hr />
            <li><Link to="/category/refrigerator">Refrigerator</Link></li>
            <hr />
           

        </ul>
        <div className="settings">
            <h4>Settings</h4>
            <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <hr />
            <li className="header-links-1">
            {
                userInfo?(userInfo.isAdmin ?(<Link to='/products'>Products</Link>,
                <Link to="/orders">Orders</Link>): 
                <Link to="/cart/:id?">Cart </Link>):" "
         
            }
            <hr />
            </li>
            <li className="header-links-2">
            {
                userInfo?<Link to="/profile">{userInfo.name}</Link>:
                                                
                <Link to='/signin'> Sign In</Link>
            }
            <hr />
            </li>
            <li>
            <button type="button" onClick={handleLogout} className="button primary">Logout</button>

            </li>
            </ul>

        </div>
    </aside>
 
    <main className="main" >
        <div className="content" >
        <Switch>
        <Route exact path="/orders" component={OrdersScreen} />
        <Route exact path="/products" component={ProductsScreen} />
        <Route exact path="/shipping" component={ShippingScreen} />
        <Route exact path="/payment" component={PaymentScreen} />
        <Route exact path="/placeorder" component={PlaceOrderScreen} />
        <Route exact path="/order/:id" component={OrderScreen} />
        <Route exact path="/signin" component={SigninScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/product/:id" component={ProductScreen} />
        <Route exact path="/cart/:id?" component={CartScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/end" component={EndScreen} />
        <Route  path="/category/:id"  component={HomeScreen} />
        <Route  path="/" exact={true} component={HomeScreen} />
        <Route component={ErrorScreen} />
        </Switch>
    </div>
    </main>
    <footer className="footer">
        All rights reserved
    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
