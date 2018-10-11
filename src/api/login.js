import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post',
    data: { }
  })
}

export function qyWxlogin() {
  return request({
    url: '/api/qyWxlogin',
    method: 'get'
  })
}
