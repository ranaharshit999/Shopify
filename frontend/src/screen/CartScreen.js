import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../action/cartAction";
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



function CartScreen(props) {

      
    const cart=useSelector(state=>state.cart);
    const {cartItems}=cart;
    const userSignin=useSelector(state=>state.userSignin);
const {userInfo}=userSignin;
const productId=props.match.params.id;
const qty=props.location.search? Number(props.location.search.split("=")[1]):1;
const  dispatch = useDispatch();
const removeFromCartHandler=(productId)=>{
    dispatch(removeFromCart(productId))
}
useEffect(() => {
   if(productId && userInfo){
       dispatch(addToCart(productId,qty));
   }else{
       props.history.push('/signin');
   }
    
}, []);

const checkoutHandler=()=>{
    props.history.push("/signin?redirect=shipping");
}

    return <div className="cart">
    <div className="cart-list">
          <ul className='cart-list-container'>
          <li>
              <h3>
                  Shopping Cart
              </h3>
              
          </li>
          
        {
        
            cartItems.length===0?
            <div>Cart is Empty</div>
            :cartItems.map((item,id)=>
            <li key={id}>
            <div className="cart-desc">
            <div className='cart-image'>
                <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div> 
                  <Link to={'/product/'+ item.product}>
                  {item.name}
                  </Link>
                   </div>
                <div>
                
                Qty:
                    <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,e.target.value))}>
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                    </select>
                    <button type="button" className="button-delete" onClick={()=>removeFromCartHandler(item.product)}>
                        Delete
                    </button>
                </div>
            </div>
            <div className="cart-price">
            <div>
                  Price{" "}
              </div>
           
   
                    $​ {item.price}
            </div>
            </div>
            </li>

            )
    
        }

          </ul>
    
    </div>
    <div className="cart-action">
 <h3> Subtotal ({ cartItems.reduce((a,c)=>a+ c.qty,0)})
 : 
 $ {cartItems.reduce((a,c)=>a+c.price*c.qty,0)}</h3>
 <button onClick={checkoutHandler} className="button primary" disabled={cartItems.length===0}>
     Proceed To checkout
 </button>
    </div>
          
        </div>
    
}

export default CartScreen;
