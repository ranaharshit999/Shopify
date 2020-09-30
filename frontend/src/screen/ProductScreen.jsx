import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {detailsProduct, saveProductReview } from '../action/productAction';


function ProductScreen(props){
     
const [qty, setQty] = useState(1);
const productDetails = useSelector(state=> state.productDetails);
const {product, loading, error} = productDetails;
const userSignin=useSelector(state=>state.userSignin);
const {loadingUser,userInfo,errorUser}=userSignin;
const [comment, setComment] = useState("");
const [rating,setRating]=useState(0);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
        
    }
}, []);
const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
        
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
const handleAddToCart=()=>{
    props.history.push('/cart/'+props.match.params.id +'?qty=' + qty)
}

return(<>
<div>
<div className="back-to-result">
<Link to="/" >Back to result</Link>
</div>

{
    loading?<div>Loading...</div>:
     error?<div>{error}</div>:
(


<div className="details">
<div className="details-image">
    <img src={product.image} alt={product.name}></img>

</div>
<div className="details-info">
    <ul>
        <li>
            <h3>{product.name}</h3>
        </li>
        <li>{product.rating} Stars({product.numReviews} Reviews)</li>
<li>
    Description
    <div> {product.description}</div>
</li>
    </ul>
</div>
<div className="details-action">
<ul>
    <li>
        Price :<b>
${product.price}
        </b>
    </li>
    <li>
        Status: {product.countInstock>0?<span>In Stock</span>:<span>Out Of Stock</span>}
    </li>
    <li>
     Qty: {"   "}  
      <select value={qty} 
      onChange={(e)=>{ setQty(e.target.value)}}>
    
      {[...Array(product.countInstock).keys()].map((x)=>(
      <option key={x+1} value={x+1}>{x+1}</option>
      )
      )
      }
        </select>
    </li>
    <li>
    {product.countInstock>0?<button onClick={handleAddToCart} className="button-cart">
        Add to cart
    </button>:<div>Out of Stock</div>
    }
    </li>
</ul>
    </div>
   
</div>


)}

</div>
</>
);
};
export default ProductScreen;