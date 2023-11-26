import React from 'react'
import '../styles/AboutUs.css'

import Slideshow from '../components/modals/Slide'

const AboutUs = () => {
  return (
    <div className="aboutUs-container">
      <div className="title_about">
        <h1>About Us</h1>
      </div>

      <div className="logo_about" />

      <div className="content d-flex">
        <div>
          <div className="strip" />
          <div className="for_what">
            <h1>Наша история</h1>
            <span>C чего мы начали ?</span>
          </div>
        </div>
        <div>
          Гефест - это сеть строительных магазинов, которая была основана в 2018
          году супругами Ильёй и Юлией Семенкович. Они начали свой бизнес с
          небольшого склада на окраине Минска, где продавали строительные
          материалы и инструменты по низким ценам. Спрос на их товары быстро
          рос, и они решили открыть свой первый магазин в центре города. С тех
          пор компания расширила свою сеть до 15 магазинов по всей Беларуси и
          стала одним из лидеров на рынке строительных товаров. Гефест
          отличается от конкурентов своим широким ассортиментом, высоким
          качеством, гибкой системой скидок и бонусов, а также профессиональным
          обслуживанием клиентов. Компания также активно участвует в социальных
          проектах, спонсируя строительство детских площадок, школ и больниц в
          разных регионах страны. Гефест - это компания, которая строит не
          только дома, но и доверие.
        </div>
      </div>

      <Slideshow />

      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <span style={{fontSize: 24}}> Наш головной офис находится в бизнес-центре Порт</span>
        <iframe className='mt-5'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4696.302853133946!2d27.67887032188863!3d53.94681811710926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbc934c15fba9d%3A0x691690e2c6be7d85!2z0J_QvtGA0YI!5e0!3m2!1sru!2sby!4v1684426691201!5m2!1sru!2sby"
            width="1000" height="550" style={{border:0}} allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default AboutUs
