import Admin from './pages/Admin'
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  ITEM_ROUTE,
  LOGIN_ROUTE,
  PAYMENT_ROUTE,
  REGISTRATION_ROUTE,
  GUARANTEES_ROUTE,
  SHOP_ROUTE,
  ACCOUNT_ROUTE, ORDER_ROUTE,
} from './utils/consts'

import Basket from './pages/Basket'
import Shop from './pages/Shop'
import Auth from './pages/Auth'
import ItemPage from './pages/ItemPage'
import AboutUs from './pages/AboutUs'
import Payment from './pages/Payment'
import Guarantees from './pages/Guarantees'
import Account from './pages/AccountPage'
import Order from "./pages/Order";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
  },
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: ITEM_ROUTE + '/:id',
    Component: ItemPage,
  },
  {
    path: ABOUT_ROUTE,
    Component: AboutUs,
  },
  {
    path: PAYMENT_ROUTE,
    Component: Payment,
  },
  {
    path: GUARANTEES_ROUTE,
    Component: Guarantees,
  },
]
