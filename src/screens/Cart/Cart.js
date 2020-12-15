const CartScreen = (props) => {
    return ( 
        <div>
            <h1>Cart screen</h1>
            <h2>product ID: {props.match.params.id}</h2>
            <h2>Quantity: {parseInt(props.location.search.split('=')[1])}</h2>

        </div>
     );
}
 
export default CartScreen;