import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'


export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role: 'USER',
  })
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

export const change = async (email,oldPassword, newPassword) => {
  const { data } = await $authHost.put('api/user/change', {email, oldPassword, newPassword})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const fetchUserName = async (id) => {
  console.log(id)
  const { data } = await $host.get('api/user/'+ id);
  return data
}