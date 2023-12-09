import React, {useContext, useEffect} from 'react'
import { Context } from '../index'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import {
  ABOUT_ROUTE,
  ACCOUNT_ROUTE, ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts'

import '../styles/NavBar.css'

import { observer } from 'mobx-react-lite'
import { Image } from 'react-bootstrap'
import logo from '../res/лого_тем.png'
import {getItems} from "../http/basketAPI";
import SearchForm from "./SearchForm";

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { basket } = useContext(Context)

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


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Image className="image" src={logo}></Image>
        <NavLink className="brand" to={SHOP_ROUTE}>
          Гефест
        </NavLink>
        <div className="slogan">создавай божественно</div>
        <NavLink className="href" to={ABOUT_ROUTE}>
          О нас
        </NavLink>
        {user.user.role ==="ADMIN" && <NavLink className="href" to={ADMIN_ROUTE}>Админ панель</NavLink>}
        <SearchForm/>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user.Auth ? (
            <Nav className="href-container">
              <NavLink className="href" to={BASKET_ROUTE}>
                Корзина
                {basket.basket_items.length !== 0 && <div className='quantity-in-basket'>{basket.basket_items.length}</div>}
              </NavLink>
              <NavLink className="href d-flex" to={ACCOUNT_ROUTE}>

                  {user.user.email}
                  <div className='profile_image' />

              </NavLink>
            </Nav>
          ) : (
            <Nav className="href-container">
              <NavLink className="href" to={LOGIN_ROUTE}>
                Авторизация
              </NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
})

export default NavBar
