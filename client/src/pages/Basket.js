import React, {useContext, useEffect, useState} from 'react'
import Container from "react-bootstrap/Container";
import BasketItem from "../components/BasketItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Image} from "react-bootstrap";
import {ORDER_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {getItems} from "../http/basketAPI";
import ChangeLocation from "../components/modals/ChangeLocation";

import '../styles/Basket.css'
import emptyBasket from "../res/Basket/empty_basket.png"

const Basket = observer(() => {

  const {user} = useContext(Context)
  const {location} = useContext(Context)
  const navigate = useNavigate()
  const [Visible, setVisible] = useState(false)

  const { basket } = useContext(Context)

  useEffect(()=> {
    getItems(user.user.id).then((items) => basket.setBasket_items(items))
  }, [])


  const total = basket.basket_items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
  );
  const total_quantity = basket.basket_items.reduce(
      (sum, item) => sum + item.quantity,
      0
  );

  let delivery = 50;
  if (location.location !== 'Минск' && location.location !== 'Колодищи' && location.location !== 'Озерище') {
    delivery += 50; }
    // Проверка total
    if (total > 1400) {
        delivery = 0;
    } else if (total > 700 && (location.location === 'Минск' || location.location === 'Озерище' || location.location === 'Колодищи')) {
      delivery = 0; }
      delivery = delivery === 0 ? 'бесплатно' : delivery;

  let finalPrice = total > 1000 ? Math.round(total * 0.95) : total
  function goToCheckout() {
     navigate(ORDER_ROUTE,{state: {total, delivery}});
  }

  return <Container className='basket-container'>
    <div className='basket-head'>
      <div className="basket-title">
        Корзина
      </div>
      <div className='d-flex'>
        <div className='location-image'/>
        <div>
          <div>
            Ваш населенный пункт: <a className='cart-form__link_base-alter' style={{cursor: "pointer"}} onClick={() => setVisible(true)}>{location.location !== '' ? location.location: 'Выберите населённый пункт'}</a>
            <ChangeLocation show={Visible} onHide={() => setVisible(false)} />
          </div>
          <div className="cart-form__description">
            Наличие доставки и ее стоимость зависят от выбранного населенного пункта
          </div>
        </div>
      </div>
    </div>

    {basket.basket_items.length !== 0 ? <div>
      <div className='basket-content'>
        <div>
          <div>
            <div>
              {basket.basket_items.map((item) => (
                  <BasketItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>


        <div className='making_an_order'>
          <div>
            <span className='time'>{location.location !== "Минск" && location.location !== "Колодищи" && location.location !== "Озерище" ? 'Через 3 дня': 'Через 1 день'}</span>
            <span className='disclaimer'> доставка в {location.location}</span>
            <ul>
              <li>по адресу — <strong>{delivery}</strong></li>
              <li>в пункт выдачи — <strong>бесплатно</strong></li>
            </ul>
          </div>

          <div className='d-flex flex-column justify-content-between'>
            <div className='d-flex'>
              <span className='total_quantity'>{total_quantity}</span>
              {total_quantity === 1 ? 'товар' : total_quantity < 5 ? 'товара' : 'товаров'} на сумму:ㅤ
              {total > 1000 ?
                  <div className='d-flex' >
                    <strong style={{scale: 1.2, fontSize: 15, fontWeight: 600}}>{finalPrice},00 р.</strong>
                    <div style={{fontSize:12, color: '#999'}}>*cкидка 5%</div>
                  </div> : <strong style={{scale: 1.2, fontSize: 15, fontWeight: 600}}>{finalPrice},00 р.</strong>}
            </div>
            <button onClick={goToCheckout}>Перейти к оформлению </button>
          </div>
        </div>
      </div>
    </div> :

        <div className='EmptyBasket'>
          <Image src={emptyBasket} style={{width: 360, height: 320}}/>

            <h1>Ваша корзина пуста</h1>
            <div>Перейдите в <span onClick={() => navigate(SHOP_ROUTE)}>каталог</span> и добавьте товары.</div>
        </div>}

  </Container>
})

export default Basket
