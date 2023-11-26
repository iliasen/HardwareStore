import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Footer } from './components/Footer'
import { observer } from 'mobx-react-lite'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import { Context } from './index'
const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //подзагрузка
    //для иметации запроста можно использовать setTimeout(()=>{},1000)
    check()
      .then((data) => {
        //для иметации запроста можно использовать setTimeout(()=>{},1000)
        user.setUser(data)
        user.setAuth(true)
      })
      .finally(() => setLoading(false)) //запрос на сервер
  }, []) //так как массив пустой то подзагрузка будет 1 раз при запуске

  if (loading) {
    return <Spinner animation={'grow'} /> // пока ждём ответ(проверка нашего локального токена) появляется загрузка
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  )
})

export default App
