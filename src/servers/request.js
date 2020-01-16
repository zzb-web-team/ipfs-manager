import axios from 'axios'
axios.defaults.timeout = 10000
axios.defaults.baseURL = ''
import http from "./ajax"
import VueCookies from 'vue-cookies'

// http request 拦截器
axios.interceptors.request.use(
    config => {

        config.cancelToken = new CancelToken(function(cancel) {
            // store.commit('pushToken', {
            //     cancelToken: cancel
            // })
        })
        config.data = JSON.stringify(config.data)
        config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            // if(token){
            //   config.params = {'token':token}
            // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errCode === 2) {
            router.push({
                path: '/',
                querry: {
                    redirect: router.currentRoute.fullPath
                } // 从哪个页面跳转
            })
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function Get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

export function postblob(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}