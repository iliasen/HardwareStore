import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from './store/UserStore'
import ItemStore from './store/ItemStore'
import RatingStore from "./store/RatingStore";
import BasketStore from "./store/BasketStore";
import LocationStore from "./store/LocationStore";
import {TelNumberStore} from "./store/TelNumberStore";
import OrderStore from "./store/OrderStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      item: new ItemStore(),
      rating: new RatingStore(),
      basket: new BasketStore(),
      order: new OrderStore(),
      location: new LocationStore(),
      number: new TelNumberStore(),
    }}
  >
    <App />
  </Context.Provider>
)
