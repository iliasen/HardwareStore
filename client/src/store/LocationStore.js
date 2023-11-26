import { makeAutoObservable } from "mobx";

export default class LocationStore {
    constructor() {
        this._location = "Минск";
        this._delivery = 50;
        makeAutoObservable(this);
        // Получение location из локального хранилища при создании экземпляра класса
        const storedLocation = localStorage.getItem("location");
        if (storedLocation) {
            this._location = storedLocation;
        }
    }

    setLocation(location) {
        const result = location.charAt(0).toUpperCase() + location.slice(1) //заменяем первую букву населённого пункта на большую
        this._location = result;
        // Сохранение location в локальное хранилище при каждом изменении
        localStorage.setItem("location", result);
    }

    get location() {
        return this._location;
    }


    removeLocation() {
        localStorage.removeItem("location");
    }
}