import { makeAutoObservable } from 'mobx'

export default class RatingStore{
    constructor() {
        this._rating = []
    }
    setRating(rating) {
        this._rating = rating
    }

    get rating() {
        return this._rating
    }
}