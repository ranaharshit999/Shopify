import React,{useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import { saveProduct, listProducts, deleteProduct, } from "../action/productAction";
import { urlencoded } from "body-parser";


function ProductsScreen(props){
     
const [modalVisible,setModalVisible] = useState(false);

const [id,setId]=useState('');
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState('');
const [brand, setBrand] = useState('');
const [category, setCategory] = useState('');
const [countInstock, setCountInstock] = useState('');
const [description, setDescription] = useState('');
const [url,setUrl]=useState("");
const [uploading, setUploading] = useState(false);
const productList =useSelector((state)=>state.productList);
const {loading,products,error}=productList;

const productSave=useSelector((state)=>state.productSave);
const {loading:loadingSave,
  success:successSave ,
  error:errorSave}=productSave;


const productDelete=useSelector((state)=>state.productDelete);
const {loading:loadingDelete,
  success:successDelete ,
  error:errorDelete,}=productDelete;

const dispatch = useDispatch();

useEffect(() => {
  if(successSave){
   setModalVisible(false);
  }
  
   dispatch(listProducts());
  
    return () => {
        
    }
}, [successSave,successDelete,url]);
useEffect(()=>{
  if(url){
    uploadFields()
  }
},[url])
const openModal = (product)=>{
  setModalVisible(true);
  setId(product._id);
  setName(product.name);
  setPrice(product.price);
  setImage(product.image);
  setBrand(product.brand);
  setCategory(product.category);
  setCountInstock(product.countInstock);
  setDescription(product.description);

};
const uploadFields=()=>{
  dispatch(
    saveProduct({
    _id: id,
    name,
    price,
    image:url,
    brand,
    category,
    countInstock,
    description,
  })
    );
}

const submitHandler=(e)=>{
    e.preventDefault();
    if(image){
      uploadFileHandler()
    }else{
      uploadFields();
    
  }
};


const deleteHandler=(product)=>{
dispatch(deleteProduct(product._id));
}
const uploadFileHandler = (e) => {
  // const file = e.target.files[0];
  const data = new FormData();
  data.append("file",image);
  data.append("upload_preset","E-Commerce")
  data.append("cloud_name","harshit-rana")
  setUploading(true);
  fetch('https://api.cloudinary.com/v1_1/harshit-rana/image/upload',  {
     
      method:"post",
      body:data
    })
    .then((response) => response.json())
    .then(data=>{
      console.log(data)
       setUrl(data.url)
      setUploading(false);
    })
    .catch((err) => {

      console.log(err);
      setUploading(false);
    });
};

return (<div className="content content-margined">
   <div className="product-header">
     <h3>Products</h3>
     <button className="button primary" onClick={()=>openModal({})}>
      Create Product
     
     </button>
     </div>
{modalVisible && (

 <div className="form">
  <form onSubmit={submitHandler}>
     <ul className="form-container">
      <li>
        <h3>
        {id?"Update Product":"Create Product"}</h3>
      </li>
      <li>
        {loadingSave && <div>Loading...</div>}
        {errorSave && <div>{errorSave}</div>}
      </li>
      <li>
        <label htmlFor="name">
              Name
        </label>
        <input type="text"
         name="name"
        id="name"
        value={name}
        onChange={(e)=>setName(e.target.value)}>

        </input>

      </li>
      <li>
        <label htmlFor="price">
              Price
        </label>
        <input type="text" 
        name="price" 
        id="price"  
        value={price} 
        onChange={(e)=>setPrice(e.target.value)}>

        </input>

      </li>
      <li>
        <label htmlFor="image">
              Image
        </label>
        <div className="file-field input-field">
      <div>
     
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
      <div className="file-path-wrapper">
        <input placeholder="Add Profile Pic" className="file-path validate" type="text" />
      </div>
      </div>
                {uploading && <div>Uploading...</div>}
      </li>
      <li>
        <label htmlFor="brand">
              Brand
        </label>
        <input type="text" 
        name="brand"
         id="brand" 
         value={brand} 
         onChange={(e)=>setBrand(e.target.value)}>

        </input>

      </li>
      <li>
        <label htmlFor="countInstock">
              countInStock
        </label>
        <input type="text" 
        name="countInstock"
         id="countInstock" 
         value={countInstock} 
          onChange={(e)=>setCountInstock(e.target.value)}>

        </input>

      </li>
      <li>
        <label htmlFor="category">
              Category
        </label>
        <input type="text"
         name="category" 
         id="category"
          value={category} 
          onChange={(e)=>setCategory(e.target.value)}>

        </input>

      </li>
     
      <li>
        <label htmlFor="description">
              Description
        </label>
        <textarea 
        name="description"
         id="description" 
         value={description} 
         onChange={(e)=>setDescription(e.target.value)}>

        </textarea>

      </li>
     
     
      <li>
            <button type="submit" 
            className="button primary"  >
            {id ? "Update":"Create"} </button>
       </li>
       <li>
            <button type="button" 
            onClick={()=>setModalVisible(false)}
             className="button secondary" >Back
             </button>
       </li>
     </ul>
    </form>
 </div>
)
}
 <div className="product-list">
       <table className="table">
         <thead>
           <tr>
           <th>ID</th>
           <th>Name</th>
           <th>Price</th>
           <th>Category</th>
           <th>Brand</th>
           <th>Action</th>

           </tr>

         </thead>
         <tbody>
         {products.map((product)=>(
           <tr key={product._id}>
           <td>{product._id}</td>
           <td>{product.name}</td>
           <td>{product.price}</td>
           <td>{product.category}</td>
           <td>{product.brand}</td> 
           <td>
             <button className="button-active"
             onClick={()=>openModal(product)}>
             Edit
             </button>{' '}
             <button className="button-active"
              onClick={()=>deleteHandler(product)}>
              Delete
              </button>
           </td>
           </tr>
           )
           )}
         </tbody>
       </table>
     </div>
   </div>

 );
};

export default ProductsScreen;