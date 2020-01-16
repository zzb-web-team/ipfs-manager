// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import "./assets/icon_font/iconfont.css";
import axios from "axios";


/** 引入导出Excel表格组件*/
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'

/**引入cookie组件 */
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/**挂载公用方法*/
import common from "./comm/js/util.js";
Vue.prototype.common = common

import fan from './comm/js/fankui'
Vue.prototype.fan = fan;

import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'

/**引入中国地图*/
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

/** 下面四行代码是解决ElementUi时点击同一个路由，页面报错*/
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    /** */

Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})