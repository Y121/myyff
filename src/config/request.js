import { baseUrl } from './env'
import axios from 'axios'
import router from '../router'
import { Message, Loading  } from 'element-ui'
import store from '../store'
import { getToken, setToken, removeToken } from '@/utils/auth'

// 创建axios实例
let axiosInstance = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 1000 * 120 // 请求超时时间
})

var reqNum = 0;
let loadingInstance = null;
//把页面的多个loading整合成一个loading
function startLoading(msg) {
    if (reqNum == 0) {
        loadingInstance = Loading.service({ fullscreen: true });
    }
    reqNum++;
}
function endLoading() {
    //setTimeout(closeLoading, 300);
    closeLoading();
}
function closeLoading() {
    if (reqNum <= 0)
        return;
    reqNum--;
    if (reqNum === 0) {
        loadingInstance.close();
    }
}
// 把URL的参数解析为对象
function parseQueryString(url) {
    var str = url.split("?")[1],    //通过?得到一个数组,取?后面的参数
        items = str.split("&");    //分割成数组
    var arr, name, value;

    for (var i = 0; i < items.length; i++) {
        arr = items[i].split("=");    //["key0", "0"]
        name = arr[0];
        value = arr[1];
        this[name] = value;

    }
}
axiosInstance.interceptors.request.use(config => {
    var url = config.url;
    var msg = '加载中...';
    if (url.indexOf('Jionbrake') > -1) {//阀控
        var url_data = new parseQueryString(url);
        if (url_data.type == 'D' && (url_data.state == 'true' || url_data.State == 'true')) {
            msg = '电表正在合闸中...';
        } else if (url_data.type == 'D' && (url_data.state == 'false' || url_data.State == 'false')) {
            msg = '电表正在断闸中...';
        } else if (url_data.type == 'S' && (url_data.state == 'true' || url_data.State == 'true')) {
            msg = '水表正在开阀中...';
        } else if (url_data.type == 'S' && (url_data.state == 'false' || url_data.State == 'false')) {
            msg = '水表正在关阀中...';
        }
    } else if (url.indexOf('ForCopyOption') > -1) {//结算
        msg = '正在抄读中...';
    } else if (url.indexOf('ProtectWaterMeter') > -1) {//保水
        var url_data = new parseQueryString(url);
        if (url_data.state == 'true') {
            msg = '正在保水中...';
        } else if (url_data.state == 'false') {
            msg = '正在解除保水中...';
        }
    } else if (url.indexOf('ProtectAmmeter') > -1) {//保电，解除保电
        var url_data = new parseQueryString(url);
        if (url_data.hardLock == 'true' && url_data.lockState == 'true') {
            msg = '正在硬件保电中...';
        } else if (url_data.hardLock == 'true' && url_data.lockState == 'false') {
            msg = '正在解除硬件保电中...';
        } else if (url_data.softLock == 'true' && url_data.lockState == 'true') {
            msg = '正在软件保电中...';
        } else if (url_data.softLock == 'true' && url_data.lockState == 'false') {
            msg = '正在解除软件保电中...';
        }
    } else if (url.indexOf('ConcentratorReadAmmeter') > -1) {//读取集中器内档案信息
        msg = '系统正在读取集中器内档案信息...';
    }
    var loadingFlag = true;
    var noLoading = ['Home', '/MeterCopy/GetCopysInfo', '/MeterCopy/ForCopyOption', '/MeterCopy/Jionbrake', '/Search/SearchQuery'];
    noLoading.forEach(item => {
        if (config.url.indexOf(item) > -1) {
            loadingFlag = false;
        }
    })
    if (loadingFlag) {
        startLoading(msg);
    }
    if (store.getters.token) {
        config.headers['Token'] = getToken('token'); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// http响应拦截器
axiosInstance.interceptors.response.use(response => {// 响应成功关闭loading
    endLoading();
    return response;
}, error => {
    endLoading();
    const { response } = error;
    const { status, data = {} } = response || {};
    switch (status) {
        case 401:
            // 未登录或过期
            Message.error(data.Message);
            router.push('/login');
            break;
        case 404:
            Message.error('请求错误，未找到该资源！');
            break;
        case 405:
            Message.error(data.Message);
            router.push('/login');
            break;
        default:
            Message.error('服务器错误！');
    }
    return Promise.reject(error);
});

/**
 * 请求方法封装，主要是为了新增或者修改的接口请求成功后，生成一个记录，其他页面根据此记录来决定数据是否需要刷新
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {string=} module - 请求模块，新增或者修改的接口传此参数会生成一个以module为key记录
 * @return {object} - 查找结果
 */

// get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
            params,
        }).then((res) => {
            resolve(res.data);
        }).catch((err = {}) => {
            reject(err);
        });
    });
}

// post方法
export function post(url,param) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, param).then((res) => {
            resolve(res.data);
        }).catch((err = {}) => {
            reject(err);
        });
    });
}
