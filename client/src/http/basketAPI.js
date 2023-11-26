import {$authHost} from './index'
import {observer} from "mobx-react-lite";

export const addItem = async (userId, itemId, quantity) => {
    const { data } = await $authHost.post('api/basket/'+ userId+'/'+ itemId, quantity)
    return data
}

export const getItems = async (userId) => {
    const { data } = await $authHost.get('api/basket/'+ userId)
    return data.basket_items
}

export const updateQuantity = async (userId,itemId,quantity) => {
    const { data } = await $authHost.put('api/basket/'+ userId +'/'+ itemId, {quantity: quantity})
    return data
}

export const removeItem = async (userId,itemId) => {
    const { data } = await $authHost.delete('api/basket/'+ userId +'/'+ itemId)
    return data
}