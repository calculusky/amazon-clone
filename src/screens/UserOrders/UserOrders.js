import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { listUserOrdersAction } from '../../store/actions/orderAction';

const UserOrders = (props) => {
    const { 
        listUserOrders: { loading, error, userOrders },
        onListUserOrders
     } = props;
    

    useEffect(() => {
        onListUserOrders();
    }, [onListUserOrders])

    return ( 
            <div>
                <h1>Order History</h1>
                { loading ? <LoadingBox/> 
                  : error ? <MessageBox variant={'danger'}>{error}</MessageBox>
                  : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userOrders.length > 0 ? (
                                        userOrders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.updatedAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{ order.isPaid ? order.paidAt.substring(0, 10) : 'No' }</td>
                                                <td>{ order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                                <td>
                                                    <button className='small' onClick={() => props.history.push(`/orders/${order._id}`)}>
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                    :
                                    (
                                        <tr><td>No orders</td></tr>
                                    )
                                }
                            </tbody>
                        </table>                  
                    )//
                }
            </div>       
       );
}

const mapStateToProps = (state) => {
    return {
        listUserOrders: state.listUserOrdersReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onListUserOrders: () => dispatch(listUserOrdersAction())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);