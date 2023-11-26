import {$authHost} from './index'

export const addOrder = async (userId, address, comment) => {
    const { data } = await $authHost.post('api/order/',{userId,address, comment})
    return data
}

export const getOrder = async ()=> {
    const { data } = await $authHost.get('api/order')
    return data
}

export const completeOrder = async (id)=>{
    const { data } = await $authHost.delete('api/order/'+id)
    return data
}