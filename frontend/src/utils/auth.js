import * as token from '../utils/token';
import { checkResponse } from './utils';
import { BASE_URL } from './utils.js';

export function request(endpoint, options) {
  const baseUrl = `${BASE_URL}${endpoint}`
  return fetch(baseUrl, options)
    .then((res) => {
      return checkResponse(res)
    })
}

export const register = (email, password) => {
  return request(`/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export const authorize = (email, password) => {
  return request(`/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((data) => {
      if (data.token) {
        token.setToken(data.token);
        return data;
      } else {
        return null
      }
    })
}

export const checkToken = (token) => {
  return request(`/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
