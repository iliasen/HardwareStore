import { makeAutoObservable } from 'mobx'

export default class ItemStore {
  constructor() {
    this._types = []
    this._brands = []
    this._items = []
    this._selectedType = {}
    this._selectedBrand = {}
    this._selectedDelItem = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 8
    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }
  setBrands(brands) {
    this._brands = brands
  }
  setItems(items) {
    this._items = items
  }

  setSelectedType(type) {
    this._selectedType = type
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand
  }

  setSelectedDelItem(item){
    this._selectedDelItem = item
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }
  get types() {
    return this._types
  }
  get brands() {
    return this._brands
  }
  get items() {
    return this._items
  }

  get selectedType() {
    return this._selectedType
  }

  get selectedBrand() {
    return this._selectedBrand
  }

  get selectedDelItem(){
    return this._selectedDelItem
  }

  get totalCount() {
    return this._totalCount
  }

  get page() {
    return this._page
  }

  get limit() {
    return this._limit
  }
}
