import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {BASKET_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";


import '../styles/Order.css'

import {getItems} from "../http/basketAPI";
import ConfirmTel from "../components/modals/ConfirmTel";
import {addOrder} from "../http/orderAPI";
import OrderCheck from "../components/modals/OrderCheck";


const Order = observer( () => {
    const {user} = useContext(Context)
    const {location} = useContext(Context)
    const {basket} = useContext(Context)
    const {number} = useContext(Context)
    const [visible, setVisible] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const [street, setStreet] = useState(null)
    const [house, setHouse] = useState(null)
    const [corpus, setCorpus] = useState(null)
    const [entrance,setEntrance] = useState(null)
    const [floor, setFloor] = useState(null)
    const [flat, setFlat] = useState(null)
    const [comment, setComment] = useState(null)

    const address ='г.'+ location.location + ' ул.'+ street + ' д.' + house + ' к.' + corpus + ' под.' + entrance + ' этаж:' + floor + ' кв.' + flat
    console.log('Адрес доставки: ' + address + ", коментарий к заказу: " + comment)


    const innerFormRef = useRef(null)

    useEffect(() => {
        getItems(user.user.id).then((items) => {
            const adaptedItems = items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                img: item.img,
                about: item.about,
                typeId: item.type.id,
                brandId: item.brand.id,
            }));
            basket.setBasket_items(adaptedItems);
        });
    }, []);




    const total = basket.basket_items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );


    let delivery = 50;
    if (location.location !== 'Минск' && location.location !== 'Колодищи' && location.location !== 'Озерище') {
        delivery += 50; }
    if (total > 1400) {
        delivery = 0;
    } else if (total > 700 && (location.location === 'Минск' || location.location === 'Озерище' || location.location === 'Колодищи')) {
        delivery = 0; }

    let finalPrice = total > 1000 ? Math.round( total * 0.95)+delivery : total + delivery

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        let input = e.target.value;

        // Удалить все нецифровые символы
        input = input.replace(/\D/g, "");

        // всегда добавляем префикс +375
        if (!input.startsWith("375")) {
            input = "375" + input;
        }

        // Формат +375 (xx) xxx-xx-xx
        let formatted = "";
        for (let i = 0; i < input.length; i++) {
            if (i === 0) {
                formatted += "+";
            }
            if (i === 3) {
                formatted += " (";
            }
            if (i === 5) {
                formatted += ") ";
            }
            if (i === 8 || i === 10) {
                formatted += "-";
            }
            formatted += input[i];
        }

        setValue(formatted);
    };

    const submitInnerForm = (event) => {
        event.preventDefault();
        setConfirmVisible(true)
    }

    const submitOrder = (event) => {
        event.preventDefault();
        addOrder(user.user, address, comment).then(()=>setVisible(true))
    }

    // const [errors, setErrors] = useState({});
    // const submitOrder = (event) => {
    //     event.preventDefault();
    //
    //     setErrors({});
    //     // Создадим флаг для проверки валидности формы
    //     let isValid = true;
    //     for (let field of document.querySelectorAll("[required]")) {
    //         let name = field.name;
    //         let value = eval(name); // Используем eval для получения значения переменной с именем name
    //         // Если значение пустое, то добавим ошибку и установим флаг в false
    //         if (!value) {
    //             setErrors({...errors, [name]: "This field is required"});
    //             isValid = false;
    //         }
    //     }
    //     // Если форма валидна, то вызовем функцию addOrder
    //     if (isValid) {
    //         addOrder(user.user.id, address, comment).then(()=>setVisible(true));
    //     }
    // }


    return (
        <Container className='container-shop'>
            <h2 className='mt-5'>Оформление заказа</h2>
            <div className='orderContainer'>
                <form id='OrderForm' onSubmit={submitOrder}>
                    <div>
                        Населённый пункт
                        <div className='d-flex align-items-center'>
                            <input className='Location' type="text" placeholder='Введите ваш населённый пункт' defaultValue={location.location} required onChange={(e) => location.setLocation(e.target.value)}/>
                            <input type='reset' className='resetLocationButton' value='x' onClick={() => location.setLocation('')}></input>
                        </div>
                    </div>

                    <div className='deliveryAddress'>
                        <div>Доставка по адресу — {delivery === 0 ? 'бесплатно' : delivery +',00 руб'}, {location.location !== "Минск" && location.location !== "Колодищи" && location.location !== "Озерище" ? 'через 3 дня': 'через 1 день'}</div>
                        <span style={{color: '#999', fontSize: 13}}>Укажите как можно подробнее адрес доставки</span>
                        <div className='d-flex'>
                            <div className='addressInputs'>
                                <label>Улица</label>
                                <input className='Address' name='street' type='text' placeholder='Введите улицу' value={street} onChange={(e)=>setStreet(e.target.value)} required/>
                            </div>
                            <div className='addressInputs'>
                                <label>Дом</label>
                                <input className='House' name='house' value={house} onChange={(e)=> setHouse(e.target.value)} required/>
                            </div>
                            <div className='addressInputs'>
                                <div className='d-flex'><label>Корп.</label> <span style={{color: '#999', fontSize: 12 }}>(необязательно)</span></div>
                                <input className='House' name='Corpus' value={corpus} onChange={(e)=> setCorpus(e.target.value)}/>
                            </div>
                        </div>

                        <div className='d-flex'>
                            <div className='addressInputs' >
                                <label>Под.</label>
                                <input className='House' name='entrance' value={entrance} onChange={(e)=> setEntrance(e.target.value)} required/>
                            </div>
                            <div className='addressInputs'>
                                <label>Этаж</label>
                                <input className='House'  name='floor' value={floor} onChange={(e)=> setFloor(e.target.value)} required/>
                            </div>
                            <div className='addressInputs'>
                                <label>Квартира</label>
                                <input className='Flat'  name='flat' value={flat} onChange={(e)=> setFlat(e.target.value)} required/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column mt-4'>
                        <label>Коментарий к заказу <span style={{color: '#999'}}>(необязательно)</span></label>
                        <textarea className='orderComment'  rows='3' placeholder='Укажите дополнительные детали' name='orderDetails' value={comment} onChange={(e)=> setComment(e.target.value)}/>
                        <span className='mt-2' style={{maxWidth: 480, fontSize: 14, color: '#999'}}>Расскажите, вермя доставки, укажите код домофона или другую информацию, которая может пригодиться курьеру.</span>
                    </div>

                    {number.number === '' && <div className='telNumber'>
                        <strong>Телефон</strong>
                        <div style={{fontSize: 14}}>Подтвердите ваш номер телефона, на него будет отправлено SMS с кодом !</div>
                        <div className='d-flex mt-2'>
                            <form ref={innerFormRef}>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={value}
                                    onChange={handleChange}
                                    placeholder="+375 (xx) xxx-xx-xx"
                                    required
                                />
                                <button
                                    type='button'
                                    className='confirmTel'
                                    disabled={!value}
                                    // style={{backgroundColor: "grey", cursor:'not-allowed'}}
                                    onClick={submitInnerForm}
                                >
                                    Подтвердить номер
                                </button>
                            </form>
                        </div>
                        <div style={{color: '#999', fontSize: 14}} className='mt-1'>Например +375 (29) 842-05-07</div>
                    </div>}

                    <button className='orderSentButton' type='submit'>Заказать</button>
                </form>




                <div className='order'>
                    <div className='d-flex justify-content-between'>
                        <h5>Заказ</h5>
                        <NavLink className='changeOrder' to={BASKET_ROUTE}>Изменить</NavLink>
                    </div>
                    <div>
                        {basket.basket_items.map((item) => (
                            <div className='itemsContainer'>
                                <div key={item.id} className='itemsFromBasket'>
                                    <div className='item-in-order'>
                                        {item.name}{item.quantity !==1 ? ' ('+item.quantity+' шт.)': null}
                                    </div>

                                    <div style={{fontSize: 16, lineHeight: 1.4}}>{item.price * item.quantity},00 р.</div>

                                </div>
                                <div  style={{color: '#999', textAlign: "end", fontSize: 14}}>
                                    {item.quantity !==1 ? item.price + ' р./шт.': null}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='finalPrice'>
                        <div className='d-flex justify-content-between mb-2' style={{color: '#999'}}>Доставка <div style={{fontSize: 16, lineHeight: 1.4, color: '#000'}}>{delivery === 0 ? 'бесплатно' : delivery +',00 р.'}</div></div>
                        <div className='d-flex justify-content-between'><span style={{fontWeight: 500}}>Итого</span><strong>{finalPrice},00 р.</strong></div>
                    </div>
                </div>
            </div>

            <ConfirmTel show={confirmVisible} onHide={() => setConfirmVisible(false)}/>
            <OrderCheck show={visible} onHide={() => setVisible(false)}/>
        </Container>
    );
});

export default Order;

