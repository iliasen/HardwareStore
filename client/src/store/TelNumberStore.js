import { makeAutoObservable } from 'mobx'

export class TelNumberStore{
    constructor(){
        this._number= ''
        const storedLocation = localStorage.getItem("TelNumber");
        if (storedLocation) {
            this._number = storedLocation;
        }
    }
    setNumber(number){
         this._number = number
        localStorage.setItem("TelNumber", number);
    }

    get number(){
        return this._number
    }
}