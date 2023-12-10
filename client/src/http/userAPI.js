import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'


export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role: "USER"
  })
  console.log("Push to server")
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const del = async (id) => {
  const { data } = await $authHost.delete('api/user/delete_account/'+ id);
  localStorage.clear();
  return data
}

export const change = async (id,oldPassword, newPassword) => {
  const { data } = await $authHost.put('api/user/change/'+{id}, {oldPassword, newPassword})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}