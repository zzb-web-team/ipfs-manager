import Vue from 'vue'
import Router from 'vue-router'


import index from '@/views/index'
import log from '@/views/log'

//二级路由目录
import home from '@/views/menu/home'
import home_two from '@/views/menu/home_two'
import home_three from '@/views/menu/home_three'
import home_four from '@/views/menu/home_four'
import home_five from '@/views/menu/home_five'
import home_six from '@/views/menu/home_six'
import home_seven from '@/views/menu/home_seven'
import home_eight from '@/views/menu/home_eight'

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


//操作管理
import operation_management from '@/views/operating/operation_management'
import demo from '@/views/operating/demo'
//IPFS数据统计
import nodeMap from '@/views/nodeApplication/nodeMap'
import application from '@/views/nodeApplication/application'
import nodeUse from '@/views/nodeApplication/nodeUse'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '登陆',
            component: log,
            hidden: true
        }, {
            path: '/home_two',
            name: '后台账户',
            component: index,
            icon: 'iconfont icon-guanxiaobaotubiao09',
            children: [{
                path: '/user',
                name: '账户管理',
                component: user,
                hidden: true
            }, {
                path: '/userli',
                name: '账户管理',
                component: userli,
            }]
        }, {
            path: '/home_three',
            name: '服务器监控',
            component: index,
            icon: 'iconfont icon-jiankong',
            children: [{
                    path: '/server_index',
                    name: '微服务总览',
                    component: server_index,
                },
                {
                    path: '/userlable',
                    name: '主机清单',
                    component: userlable,
                }, {
                    path: '/microservicelist',
                    name: '微服务清单',
                    component: microservicelist,
                },
                {
                    path: '/seruser',
                    name: '主机监控项',
                    component: seruser,
                    hidden: true
                }, {
                    path: '/microservicepreview',
                    name: '微服务监控项',
                    component: microservicepreview,
                    hidden: true
                }, {
                    path: '/userlist',
                    name: '主机监控详情',
                    component: userlist,
                    hidden: true
                }, {
                    path: '/microservicedetails',
                    name: '微服务监控详情',
                    component: microservicedetails,
                    hidden: true
                }
            ]
        }, {
            path: '/home_four',
            name: '设备监控',
            component: index,
            icon: 'iconfont icon-shebeijiankong',
            children: [{
                path: '/newsd',
                name: '设备监控详情',
                component: newsd,
                // hidden: true
            }, {
                path: '/device_etails',
                name: '设备异常记录',
                component: device_etails,
                // hidden: true
            }]
        }, {
            path: '/home_five',
            name: 'IPFS节点信息',
            icon: 'iconfont icon-jiedian1',
            component: index,
            children: [{
                path: '/node_information',
                name: '节点信息',
                component: node_information
            }]
        }, {
            path: '/home_six',
            name: 'IPFS节点控制台',
            icon: 'iconfont icon-kongzhitai',
            component: index,
            // hidden: true,
            children: [{
                path: '/home_seven',
                name: '华北地区',
                component: home_seven,
                children: [{
                    path: '/north_region1',
                    name: '节点网络分布',
                    component: north_region1,
                }, {
                    path: '/ipfs_node_location',
                    name: '节点区位',
                    component: ipfs_node_location,
                }]
            }, {
                path: '/home_er',
                name: '华南地区',
                component: home_seven,
                children: [{
                    path: '/sorth_region1',
                    name: '节点网络分布',
                    component: sorth_region1,
                }, {
                    path: '/ipfs_sode_location',
                    name: '节点区位',
                    component: ipfs_sode_location,
                }]
            }, {
                path: '/home_nie',
                name: '华中地区',
                component: home_seven,
                children: [{
                    path: '/central_region1',
                    name: '节点网络分布',
                    component: central_region1,
                }, {
                    path: '/ipfs_central_location',
                    name: '节点区位',
                    component: ipfs_central_location,
                }]
            }, {
                path: '/home_tene',
                name: '华东地区',
                component: home_seven,
                children: [{
                    path: '/east_region1',
                    name: '节点网络分布',
                    component: east_region1,
                }, {
                    path: '/ipfs_east_location',
                    name: '节点区位',
                    component: ipfs_east_location,
                }]
            }, {
                path: '/home_fdsfer',
                name: '西北地区',
                component: home_seven,
                children: [{
                    path: '/northwest_region1',
                    name: '节点网络分布',
                    component: northwest_region1,
                }, {
                    path: '/ipfs_northwest_location',
                    name: '节点区位',
                    component: ipfs_northwest_location,
                }]
            }, {
                path: '/home_erds',
                name: '东北地区',
                component: home_seven,
                children: [{
                    path: '/northeast_region1',
                    name: '节点网络分布',
                    component: northeast_region1,
                }, {
                    path: '/ipfs_northeast_location',
                    name: '节点区位',
                    component: ipfs_northeast_location,
                }]
            }, {
                path: '/home_edfasr',
                name: '西南地区',
                component: home_seven,
                children: [{
                    path: '/southwest_region1',
                    name: '节点网络分布',
                    component: southwest_region1,
                }, {
                    path: '/ipfs_southwest_location',
                    name: '节点区位',
                    component: ipfs_southwest_location,
                }]
            }, {
                path: '/home_edfsdcvxr',
                name: '其他地区',
                component: home_seven,
                children: [{
                    path: '/other_region1',
                    name: '节点网络分布',
                    component: other_region1,
                }, {
                    path: '/ipfs_other_location',
                    name: '节点区位',
                    component: ipfs_other_location,
                }]
            }, {
                path: '/ipfs_location_details',
                name: '节点详情',
                component: ipfs_location_details,
                hidden: true
            }]
        }, {
            path: '/home_eight',
            name: 'IPFS节点应用',
            component: index,
            icon: 'iconfont icon-yonghufenzuyingyong',
            // hidden: true,
            children: [{
                path: '/ipflow',
                name: 'IP流量',
                component: ipflow,
            }, {
                path: '/fs_storage',
                name: 'FS存储',
                component: fs_storage,
            }]
        },
        {
            path: '/c',
            name: 'IPFS 数据统计',
            component: index,
            icon: 'iconfont icon-tongji',
            children: [{
                    path: '/nodeMap',
                    name: '全国节点分布',
                    component: nodeMap
                },
                {
                    path: '/application',
                    name: '节点应用统计',
                    component: application
                },
                {
                    path: '/nodeUse',
                    name: '节点平均利用率',
                    component: nodeUse
                },
            ]
        },
        {
            path: '/bb',
            name: '操作管理',
            component: index,
            icon: 'iconfont icon-guanli',
            children: [{
                path: '/operation_management',
                name: '操作日志',
                component: operation_management
            }, {
                path: '/demo',
                name: 'demo',
                hidden: true,
                component: demo
            }]
        },

    ]
})