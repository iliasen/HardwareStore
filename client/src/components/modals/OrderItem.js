import React from 'react';
import {observer} from "mobx-react-lite";
import '../../styles/OrderItem.css';
import {completeOrder} from "../../http/orderAPI";

const OrderItem =observer(  ({ order }) => {
    const total = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const completed = ()=>{
        completeOrder(order.id).then()
        window.location.reload()
    }
    return (
        <div className='OrderItem'>
            <div><strong>Заказ</strong> №{order.id}</div>

            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    Почта клиента: {order.username}
                    <div>Адрес доставки: {order.address}</div>
                    {order.comment && <div>Коментарий к заказу: {order.comment}</div>}
                    {order.items.map((item) => (
                        <div key={item.id} className='d-flex justify-content-between mt-2'>
                            <div>{item.name} ({item.quantity} шт)</div>
                            <div className='d-flex align-items-end flex-column'>
                                {item.price*item.quantity}.00 р.
                                {item.quantity !== 1 && <div style={{color: '#999', fontSize: 12}}>{item.price}.00 p./шт.</div>}
                            </div>
                        </div>)
                    )}
                </div>
                <button className='completeOrder' onClick={completed}>Заказ выполнен</button>
            </div>
            <div className='d-flex justify-content-end'>
                <strong>Итогоㅤ</strong>{total}.00 р.
            </div>
        </div>
    );
})

export default OrderItem;