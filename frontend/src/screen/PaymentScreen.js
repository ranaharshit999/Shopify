import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { savePayment } from "../action/cartAction";
import CheckOutSteps from '../components/CheckoutSteps';

function PaymentScreen(props){
const [paymentMethod, setPaymentMethod] = useState('')


const dispatch = useDispatch();





const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(savePayment({paymentMethod}));
   props.history.push('placeorder')
  };


return(
<div>
  <CheckOutSteps step1 step2 step3></CheckOutSteps>

<div className="form">
<form onSubmit={submitHandler}>
    <ul className="form-container">
    <li>
        <h2>Payment Method </h2>
    </li>
    
    <li className="payment-li">
    <input type="radio"
    className="radio"
     name="paymentMethod"
      id="paymentMethod"
      value="paypal"  
    onChange={(e)=>setPaymentMethod(e.target.value)}></input>
      PayPal       
       </li>
        

    <button type="submit" className="button" >Continue</button>
    </ul>
</form>
</div>
</div>
);
};
export default PaymentScreen;