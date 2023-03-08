import axios from 'axios'
import qs from 'qs';

let baseURL = 'http://101.43.251.185:8080/'
let that = this;

let config = {
  baseURL: baseURL,
  timeout: 30000    //设置最大请求时间
}
const _axios = axios.create(config)

/** 请求拦截器 */
_axios.interceptors.request.use(
  config => {
    return config;
  },
  err => Promise.reject(err)
);

/** 请求后的操作 */
_axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    if (err) {

    }
    return Promise.reject(err);
  }
);

// 封装post,get,post,delete方法
const http = {
  get(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'GET'
      }).then(res => {
        resolve(res)
        return res
      }).catch(err => {
        reject(err)
      })
    })
  },
  post(url = '', params = {}) {

    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: qs.parse(params),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error)
      })
    })
  },
  postParams(url = '', params = {}) {

    return new Promise((resolve, reject) => {
      _axios({
        url,
        params: qs.parse(params),
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': localStorage.getItem("token") },
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res.data
      }).catch(error => {
        reject(error)
      })
    })
  },
  put(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'PUT'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'DELETE'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default http