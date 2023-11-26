import { $authHost, $host } from './index'
//import jwt_decode from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type)
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type')
  return data
}

export const changeType = async (id,name) => {
  const { data } = await $authHost.put('api/type/'+ id, {name})
  return data
}

export const deleteType = async (id) => {
  const { data } = await $authHost.delete('api/type/'+id)
  return data
}
export const fetchOneType = async (id) => {
  const { data } = await $host.get('api/type/'+ id)
  return data
}

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const changeBrand = async (id,name) => {
  const { data } = await $authHost.put('api/brand/'+ id, {name})
  return data
}

export const deleteBrand = async (id) => {
  const {data} = await $authHost.delete('api/brand/' + id)
  return data
}

export const createItem = async (item) => {
  const { data } = await $authHost.post('api/item', item)
  return data
}

export const fetchItems = async (typeId, brandId, page, limit = 8) => {
  const { data } = await $host.get('api/item', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  })
  return data
}

export const fetchAllItems = async () => {
  const { data } = await $authHost.get('api/item//all/get')
  return data
}

export const fetchOneItem = async (id) => {
  const { data } = await $host.get('api/item/' + id)
  return data
}

export const deleteOneItem = async (id) => {
  const { data } = await $authHost.delete('api/item/' + id)
  return data
}

export const createRating = async (itemId, rate, feedback) => {
  const {data} = await $authHost.post('api/rating/' + itemId, {rate, feedback})
  return data
}

export const fetchRating = async (itemId) => {
  const {data} = await $host.get('api/rating/' + itemId)
  return data
}

export const getAverageRating = async (itemId) => {
  const {data} = await $host.get('api/rating/average/' + itemId)
  return data
}