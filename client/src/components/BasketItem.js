import React, {useContext} from 'react';
import {Form, Image} from "react-bootstrap";
import '../styles/BasketItem.css'
import {fetchOneType} from "../http/itemAPI";
import AverageRating from "./modals/AverageRating";
import rate from "../res/star.png";
import {useNavigate} from "react-router-dom";
import {ITEM_ROUTE} from "../utils/consts";
import {removeItem, updateQuantity} from "../http/basketAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const BasketItem =observer(  ({ item }) => {
    const {user} = useContext(Context)

    const navigate = useNavigate()
    const [type_name, setType_name] = React.useState(null);

    React.useEffect(() => {
        fetchOneType(item.typeId).then(type => {
            setType_name(type.name);
        });
    }, []);

    return (
        <div className='Item-in-basket'>
            <div className='d-flex' style={{marginBottom: 15}}>
                <div className='type_name'>
                    {type_name}
                </div>
                <div className="rate_container">
                    <AverageRating itemId={item.id} />
                    <Image className="star_img" src={rate} />
                </div>
            </div>

            <div className='d-flex'>
                <Image
                    className="basket-item-image"
                    src={process.env.REACT_APP_API_URL + item.img}
                />
                <div className='item-description'>
                    <h5 onClick={() => navigate(ITEM_ROUTE + '/' + item.id)}>{item.name}</h5>
                    <div>{item.about}</div>
                    <span>Гарантия 9 месяцев. Наш магазин осуществляет свою работу на рынке более 5ти лет,
                        представляет ассортимент в более, чем 1000 моделей. Грамотная консультация наших менеджеров
                        поможет Вам подобрать нужную модель. Доставка в Озерище, Колодищи как по Минску.</span>
                </div>

                <div className='item-quantity-price'>
                    <div className='bind-container'>
                        <div className='bind' onClick={()=> removeItem(user.user.id, item.id).then(() => window.location.reload())}/>
                    </div>

                    <Form>
                        <Form.Control type='number' style={{textAlign:"center", width: 125}} defaultValue={item.quantity} onChange={(e) =>  updateQuantity(user.user.id, item.id, e.target.value).then(() => window.location.reload())} min='1' max='10'/>
                        <div> {item.quantity !== 1 ? <div className='price-for-one-item'>{item.price}.00 р./шт.</div> : null}</div>
                    </Form>

                    <div className='item-price'>
                        <span>На складе</span>
                        <div>{item.price*item.quantity}.00 р.</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default BasketItem;