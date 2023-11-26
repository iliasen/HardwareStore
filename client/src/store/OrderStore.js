import { makeAutoObservable } from "mobx";

export default class OrderStore {
    constructor() {
        this._orders = [];
        makeAutoObservable(this);
    }

    setOrder(order){
        this._orders=order;
    }
    get order(){
        return this._orders
    }
}
