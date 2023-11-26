import React from 'react'
import '../styles/Footer.css'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  GUARANTEES_ROUTE,
  PAYMENT_ROUTE,
} from '../utils/consts'

export const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <div className="footer-content">
          <h3
            style={{
              fontFamily: 'Trebuchet MS',
              fontSize: '2em',
            }}
          >
            Гефест
          </h3>
          <div className="d-flex mb-4 justify-content-between">
            <div>
              <div>Интернет-магазин</div>
              <div>7748 (МТС, Life, А1)</div>
              <div>Для заявок: cc@gefest.by</div>
              <div>Прием звонков: c 8.00 до 22.00</div>
            </div>

            <p>
              Гефест зарегистрирован компанией под названием IlichBoss Pvt. Ltd.
            </p>

            <div className="sub">
              <NavLink className="href" to={ABOUT_ROUTE}>
                About us
              </NavLink>
              <NavLink className="href" to={PAYMENT_ROUTE}>
                Способы оплаты
              </NavLink>
              <NavLink className="href" to={GUARANTEES_ROUTE}>
                Гарантии
              </NavLink>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            Все права защищены
            <div>© 2018-2023 OAO «Гефест»</div>
          </div>
        </div>
      </Container>
    </div>
  )
}
