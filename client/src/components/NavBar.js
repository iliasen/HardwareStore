import React, {useContext, useEffect} from 'react'
import { Context } from '../index'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import {
  ABOUT_ROUTE,
  ACCOUNT_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts'

import '../styles/NavBar.css'

import { observer } from 'mobx-react-lite'
import { Image } from 'react-bootstrap'
import logo from '../res/лого_тем.png'
import {getItems} from "../http/basketAPI";

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { basket } = useContext(Context)

  useEffect(()=> {
    getItems(user.user.id).then((items) => basket.setBasket_items(items))
  }, [])


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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user.Auth ? (
            <Nav className="href-container">
              <NavLink className="href" to={BASKET_ROUTE}>
                Корзина {basket.basket_items.length !== 0 ? <div className='quantity-in-basket'>{basket.basket_items.length}</div> : null}
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
