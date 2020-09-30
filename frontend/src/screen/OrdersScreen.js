import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {listOrders, deleteOrder} from '../action/orderAction'
import {useSelector,useDispatch} from 'react-redux'
function OrdersScreen(props) {
const orderList=useSelector(state=>state.orderList);
const {loading,orders,error}=orderList;

const orderDelete=useSelector(state=>state.orderDelete);
const {loading:loadingDelete,success: successDelete,error:errorDelete}=orderDelete;

const dispatch = useDispatch();


    useEffect(() => {
        dispatch(listOrders())
    }, [successDelete]);
    const deleteHandler=(order)=>{
        dispatch(deleteOrder(order._id));
    }
    return (loading?<div>Loading...</div>:
    error?<h2>{error}</h2>:
        <div className="content content-margined">
            <div className="order-header">
                <h3>Orders</h3>

            </div>

            <div className="order-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>USER</th>
                            <th>PAID</th>
                            <th>PAID AT</th>
                            <th>DELIVERED</th>
                            <th>DELIVERED AT</th>
                        </tr>
                    
                    </thead>
                    {orders===undefined? setTimeout(orderList,5000):
                    <tbody>
                    

                         {orders.map(order=>(
                            <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.user.name}</td>
                            <td>{order.isPaid.toString()}</td>
                            <td>{order.isDelivered.toString()}</td>
                            <td>{order.deliveredAt}</td>
                            <td>
                                <button className="button-active"><Link to={"/order/"+order._id} >Details</Link></button>{" "}
                            {"  "}
                            
                                <button type="button" onClick={()=>deleteHandler(order)} className="button-active">Delete</button>
                                </td>    
                        </tr>))} 

                   
                    </tbody>
                    }
                </table>
                
            </div>
            
        </div>
                
    )
}
export default OrdersScreen;
