import axios from 'axios';
import router from '../router/index';
import { Message, Loading } from 'element-ui';
import VueCookies from 'vue-cookies';
import _ from 'lodash';
// 创建axios实例
const service = axios.create({
    timeout: 10000 // 请求超时时间
});
// 加载动画
//loading对象
var loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
    // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
    // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
    if (needLoadingRequestCount === 0 && !loading) {
        loading = Loading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(255, 255, 255, 0.5)',
            target: target || 'body'
        });
    }
    needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
    needLoadingRequestCount--;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
    if (needLoadingRequestCount === 0) {
        //关闭loading
        toHideLoading();
    }
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(() => {
    /**
     * 坑：在拦截起调用新的Loading之前检测是否有实例存在，如果有则调用close()方法关闭实例，然后再调用新的Loading！！！！！！！！！！！！
     */
    if (loading) {
        loading.close();
        loading = null;
    }
}, 300);
// 添加request拦截器
service.interceptors.request.use(
    config => {
        if (config.headers.showLoading !== false) {
            showLoading(config.headers.loadingTarget);
        }
        return config;
    },
    error => {
        //判断当前请求是否设置了不显示Loading
        if (config.headers.showLoading !== false) {
            hideLoading();
        }
        Message.error('请求超时!');
        return Promise.reject(error);
    }
);
// 添加respone拦截器
service.interceptors.response.use(
    response => {
        let res = {};
        res.status = response.status;
        res.data = response.data;
        //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
        if (response.config.headers.showLoading !== false) {
            hideLoading();
        }
        // if (res.data.status == -900) {
        //     Message.error(res.data.msg);
        // }
        return res;
    },
    error => {
        //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
        if (error.config.headers.showLoading !== false) {
            hideLoading();
        }
        if (error.response && error.response.status == 404) {
            router.push('/');
        }
        Message.error('请求数据超时！');
        return Promise.reject('请求数据超时！');
        //return Promise.reject(error.response)
    }
);

export function get(url, params = {}) {
    params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    return service({
        url: url,
        method: 'get',
        headers: {},
        params
    });
}

//封装post请求
export function post(url, data = {}) {
    //默认配置
    let sendObject = {
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    };
    sendObject.data = JSON.stringify(data);
    return service(sendObject);
}

//封装put方法 (resfulAPI常用)
export function put(url, data = {}) {
    return service({
        url: url,
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    });
}
//删除方法(resfulAPI常用)
export function deletes(url) {
    return service({
        url: url,
        method: 'delete',
        headers: {}
    });
}

//不要忘记export
export { service };