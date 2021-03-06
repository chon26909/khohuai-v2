import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BasketItem from './basketItem';

function Basket() {

    let cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const [loading, setloading] = useState(true)
    const [myCart, setmyCart] = useState();
    const [clearCart, setclearCart] = useState();

    const payfromcart = () => {
        alert("ชำระเงิน")
    }

    const clearBasket = () => {
        dispatch({ type: "CLEAR_CART" })
        setclearCart(true);
    }

    useEffect(async () => {
        await setmyCart(cart);
        // await setclearCart(false);
        await setloading(false);

    }, [clearCart]);

    return (
        <div className="container mt-3 p-3">

            {loading ? (
                <div>loading...</div>
            ) : (
                    <div className="row">
                        <section className="col-8 from-group bg-white p-3">

                            {myCart.cart.map((item, index) => {
                                return <BasketItem key={index} item={item} />
                            })}
                            {/* <pre>
                                {JSON.stringify(myCart, null, 2)}
                            </pre> */}
                        </section>
                        <aside className="col-4 from-group bg-white p-3">
                            <h4>ตะกร้าสินค้า</h4>
                            <h5>ทั้งหมด {myCart.cart.length} รายการ</h5>
                            <h5>ราคารวม {myCart.totalPrice} บาท</h5>
                            <button type="button" className="btn btn-danger m-2" onClick={clearBasket}>ล้างตะกร้า</button>
                            <button type="button" className="btn btn-success m-2" onClick={payfromcart}>ชำระเงิน</button>
                        </aside>
                    </div>
                )}



        </div>
    )
}

export default withRouter(Basket)
