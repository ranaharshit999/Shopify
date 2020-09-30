import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { update,logout } from '../action/userAction';
import { useSelector ,useDispatch} from 'react-redux';
import ErrorScreen from './ErrorScreen';

function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('');
const  dispatch = useDispatch();
const userSignin=useSelector(state=>state.userSignin);
const {userInfo}=userSignin;

const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(update({userId:userInfo._id,email,name,password}))
}
const userUpdate=useSelector(state=>state.userUpdate);
const{loading,success,error}=userUpdate;

    return (userInfo?
    <div className="profile">
           <div className="profile-info">
           <div className="form">
               <form onSubmit={submitHandler}>
                   <ul>
                       <li>
                           <h2>User Profile</h2>
                       </li>
                       <li>
                           {loading && <div>Loading...</div>}
                           {error && <div>{error}</div>}
                           {success && <div>Profile saved successfully</div>}
                       </li>
                       <li>
                           <label htmlFor="name"> Name </label>
                           <input value={name} 
                           type="text" 
                           name="name" 
                           id="name"
                          onChange={(e)=>setName(e.target.value)}>
                           </input>
                           </li>
                           <li>
                           <label htmlFor="email"> Email </label>
                           <input value={email} 
                           type="text" 
                           name="email" 
                           id="email"
                          onChange={(e)=>setEmail(e.target.value)}>
                           </input>
                           </li>
                          
                           <li>
                           <label htmlFor="password">Password</label>
                           <input type="password" 
                           value={password} 
                           name="password" 
                           id="password" 
                           onChange={(e)=>setPassword(e.target.value)}>
                           </input>
                       </li>
                       <li>
                           <button type="submit" className="button primary">Update</button>
                       </li>
                       
                   </ul>
               </form>
           </div>

           </div>
         
        </div>:
        <ErrorScreen />
    )
}

export default ProfileScreen
