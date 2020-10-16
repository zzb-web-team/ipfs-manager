// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import "./assets/icon_font/iconfont.css";
import "./assets/icon_font2/iconfont.css";
import axios from "axios";
import store from './vuex/store';


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
import 'font-awesome/css/font-awesome.min.css';
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    /** */

Vue.use(Router)
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.config.productionTip = false
import { message } from './components/onlymessage';
Vue.prototype.$message = message;


//路由目录
import home from '@/views/menu/home'
import home_two from '@/views/menu/home_two'
import home_three from '@/views/menu/home_three'
import home_four from '@/views/menu/home_four'
import home_five from '@/views/menu/home_five'
import home_six from '@/views/menu/home_six'
import home_seven from '@/views/menu/home_seven'
import home_eight from '@/views/menu/home_eight'
import home_nine from '@/views/menu/home_nine'

import index from '@/views/index'

//服务器监控
import microservicelist from '@/views/deerver/microservicelist.vue'
import microservicedetails from '@/views/deerver/microservicedetails.vue'
import server_index from '@/views/deerver/server_index.vue'
import seruser from '@/views/deerver/seruser.vue'
import userlist from '@/views/deerver/userlist.vue'
import userlable from '@/views/deerver/userlable.vue'
import microservicepreview from '@/views/deerver/microservicepreview.vue'
//设备监控
import device_etails from '@/views/device/device_etails.vue'
import newsd from '@/views/device/newsd.vue'
//用户管理
import user from '@/views/account/user'
import userli from '@/views/account/userli'
import personal_center from '@/views/account/personal_center'
import authority_me from '@/views/account/authority_me'
import organization_me from '@/views/account/organization_me'
import position_me from '@/views/account/position_me'
//IPFS节点信息
import node_information from '@/views/ipfs_node/node_information'
//ipfs节点控制台
/** 华北*/
import north_region1 from '@/views/ipfs_node_console/north/north_region1'
import ipfs_node_location from '@/views/ipfs_node_console/north/ipfs_node_location'
/**华南 */
import sorth_region1 from '@/views/ipfs_node_console/south/sorth_region1'
import ipfs_sode_location from '@/views/ipfs_node_console/south/ipfs_sode_location'
/**华中central */
import central_region1 from '@/views/ipfs_node_console/central/central_region1'
import ipfs_central_location from '@/views/ipfs_node_console/central/ipfs_central_location'
/**华东east */
import east_region1 from '@/views/ipfs_node_console/east/east_region1'
import ipfs_east_location from '@/views/ipfs_node_console/east/ipfs_east_location'
/**西北northwest */
import northwest_region1 from '@/views/ipfs_node_console/northwest/northwest_region1'
import ipfs_northwest_location from '@/views/ipfs_node_console/northwest/ipfs_northwest_location'
/**东北northeast*/
import northeast_region1 from '@/views/ipfs_node_console/northeast/northeast_region1'
import ipfs_northeast_location from '@/views/ipfs_node_console/northeast/ipfs_northeast_location'
/**西南southwest */
import southwest_region1 from '@/views/ipfs_node_console/southwest/southwest_region1'
import ipfs_southwest_location from '@/views/ipfs_node_console/southwest/ipfs_southwest_location'
/**其他 other */
import other_region1 from '@/views/ipfs_node_console/other/other_region1'
import ipfs_other_location from '@/views/ipfs_node_console/other/ipfs_other_location'

//节点详情
import ipfs_location_details from '@/views/ipfs_node_console/ipfs_location_details.vue'


//ipfs节点应用
import fs_storage from '@/views/ipfs_application/fs_storage'
import ipflow from '@/views/ipfs_application/ipflow'


//ipfs节点收益
import update_parameter from '@/views/ipfs_income/update_parameter'
import xiyouji_income from '@/views/ipfs_income/xiyouji_income'
import yun_income from '@/views/ipfs_income/yun_income'
import yun_power from '@/views/ipfs_income/yun_power'

//ipfs程序管理
import program_list from '@/views/ipfs_program_management/program_list'
import program_release from '@/views/ipfs_program_management/program_release'


//操作管理
import operation_management from '@/views/operating/operation_management'
import menu_management from '@/views/operating/menu_management'
//IPFS数据统计
import nodeMap from '@/views/nodeApplication/nodeMap'
import application from '@/views/nodeApplication/application'
import nodeUse from '@/views/nodeApplication/nodeUse'
import data_monitoring from '@/views/nodeApplication/data_monitoring'

import rouji_list_statistics from '@/views/nodeApplication/rouji_list_statistics'

//概览
import preview from '@/views/overview/preview'


import VueRouter from 'vue-router';

var keymap = {
    "home": home,
    "home_two": home_two,
    "home_three": home_three,
    "home_four": home_four,
    "home_five": home_five,
    "home_six": home_six,
    "home_seven": home_seven,
    "home_eight": home_eight,
    "home_nine": home_nine,
    "userli": userli,
    "index": index,
    "microservicelist": microservicelist,
    "microservicedetails": microservicedetails,
    "server_index": "server_index",
    "server_index": server_index,
    "seruser": seruser,
    "userlist": userlist,
    "userlable": userlable,
    "microservicepreview": microservicepreview,
    "device_etails": device_etails,
    "newsd": newsd,
    "user": user,
    "personal_center": personal_center,
    "authority_me": authority_me,
    "organization_me": organization_me,
    "position_me": position_me,
    "node_information": node_information,
    "north_region1": north_region1,
    "ipfs_node_location": ipfs_node_location,
    "sorth_region1": sorth_region1,
    "ipfs_sode_location": ipfs_sode_location,
    "central_region1": central_region1,
    "ipfs_central_location": ipfs_central_location,
    "east_region1": east_region1,
    "ipfs_east_location": ipfs_east_location,
    "northwest_region1": northwest_region1,
    "ipfs_northwest_location": ipfs_northwest_location,
    "northeast_region1": northeast_region1,
    "ipfs_northeast_location": ipfs_northeast_location,
    "southwest_region1": southwest_region1,
    "ipfs_southwest_location": ipfs_southwest_location,
    "other_region1": other_region1,
    "ipfs_other_location": ipfs_other_location,
    "ipfs_location_details": ipfs_location_details,
    "fs_storage": fs_storage,
    "ipflow": ipflow,
    "update_parameter": update_parameter,
    "xiyouji_income": xiyouji_income,
    "yun_income": yun_income,
    "yun_power": yun_power,
    'program_list': program_list,
    "program_release": program_release,
    "operation_management": operation_management,
    "menu_management": menu_management,
    "nodeMap": nodeMap,
    "application": application,
    'nodeUse': nodeUse,
    "data_monitoring": data_monitoring,
    "rouji_list_statistics": rouji_list_statistics,
    "preview": preview
}
router.beforeEach((to, from, next) => {
    if (to.path == '/ipfs_location_details' || from.path == '/ipfs_location_details' || from.path == '/') {} else {
        sessionStorage.removeItem('central_location');
        sessionStorage.removeItem('search_condition');
        sessionStorage.removeItem('search_data');
        sessionStorage.removeItem('east_location');
        sessionStorage.removeItem('north_location');
        sessionStorage.removeItem('northeast_location');
        sessionStorage.removeItem('northwest_location');
        sessionStorage.removeItem('other_location');
        sessionStorage.removeItem('south_location');
        sessionStorage.removeItem('southwest_location');
    }
    next()
})


if (localStorage.getItem('menus')) {
    var routers = common.trans(JSON.parse(localStorage.getItem('menus')), keymap);
    router.addRoutes(routers);
}
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})