import { makeAutoObservable } from 'mobx'

export default class BasketStore{
    constructor(){
        this._basket_items = []
        makeAutoObservable(this)
    }
    setBasket_items(basket_items) {
        this._basket_items = basket_items
    }

    get basket_items(){
        return this._basket_items
    }
}