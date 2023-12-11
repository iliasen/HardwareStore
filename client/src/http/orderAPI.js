import {$authHost} from './index'

export const addOrder = async (user, address, comment) => {
    const { data } = await $authHost.post('api/order',{user,address, comment})
    return data
}


export const getOrder = async () => {
    const { data } = await $authHost.get('api/order');

    const adaptedOrders = data.map((order) => ({
        id: order.id,
        username: order.username,
        address: order.address,
        comment: order.comment,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        items: order.orderItems.map((orderItem) => ({
            id: orderItem.item.id,
            name: orderItem.item.name,
            price: orderItem.item.price,
            quantity: orderItem.quantity,
        })),
    }));

    return adaptedOrders;
};

export const completeOrder = async (id)=>{
    const { data } = await $authHost.delete('api/order/'+id)
    return data
}