import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'
import { Context } from '../index'

const AppRouter = () => {
  const { user } = useContext(Context)

  console.log(user)
  return (
    <Routes>
      {user.Auth &&
        authRoutes.map(
          (
            { path, Component } //для авторизованных пользователей
          ) => <Route key={path} path={path} element={<Component />} exact />
        )}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />} />
      {/*возращает страницу магазина если проприсан левый URL*/}
    </Routes>
  )
}

export default AppRouter
