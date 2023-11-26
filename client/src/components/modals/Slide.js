import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'

import b1 from '../../res/AboutUsPage/build_1.jpg'
import b2 from '../../res/AboutUsPage/build_2.webp'
import b3 from '../../res/AboutUsPage/build_3.webp'

function Slideshow() {
  const [slideIndex, setSlideIndex] = useState(0) // использовать переменную состояния для индекса слайда
  const slides = [b1, b2, b3]
  const dots = [0, 1, 2]

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearTimeout(timer) //очищаем таймер
  }, [slideIndex, slides.length]) // зависит от индекса слайда и длины слайдов

  return (
    <div className="slideshow-container">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="mySlides fade"
          style={{ display: i === slideIndex ? 'block' : 'none' }} // исп условный рендеринг для отображения или скрытия слайда
        >
          <Image src={slide} className="build_image" />
        </div>
      ))}
      <div className="pointers">
        {dots.map((dot, i) => (
          <span
            key={i}
            className={`dot ${i === slideIndex ? 'activing' : ''}`} // исп литерал шаблона для добавления или удаления активного класса
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Slideshow
