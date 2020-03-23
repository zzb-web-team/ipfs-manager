import {get, post } from './http';
//import axios from 'axios'

var href = window.location.href;

if (href.indexOf('xyj.grapefruitcloud.com') >= 0) {
    var serverUrl = 'http://xyj.grapefruitcloud.com'; //PHP服务域名
} else {
    var serverUrl = 'http://zzb.onezen.net'; //PHP服务域名
}

//服务器监控
/**获取微服务信息 */
export const login = params => {
    return post(`${serverUrl}/admin/system/login`, params).then(
        res => res.data
    );
};
export const get_ser = params => {
    return post(`${serverUrl}/monitor/get_server`, params).then(
        res => res.data
    );
};
/**获取当前服务器进程状态信息 */
export const get_curprocess = params => {
    return post(`${serverUrl}/monitor/get_cur_process_info`, params).then(
        res => res.data
    );
};
/**获取当前服务器状态信息 */
export const get_curmachine = params => {
    return post(`${serverUrl}/monitor/get_cur_machine_info`, params).then(
        res => res.data
    );
};
/** 获取当前进程状态信息*/
export const get_allprocess = params => {
    return post(`${serverUrl}/monitor/get_all_process_info`, params).then(
        res => res.data
    );
};
/**获取当前服务器状态信息 */
export const get_allmachine = params => {
    return post(`${serverUrl}/monitor/get_all_machine_info`, params).then(
        res => res.data
    );
};
/**获取当前服务器状态信息 */
export const get_machine = params => {
    return post(`${serverUrl}/monitor/get_machine`, params).then(
        res => res.data
    );
};
/**获取当前服务器状态信息 */
export const get_cur_machine_info2 = params => {
    return post(`${serverUrl}/monitor/get_cur_machine_info2`, params).then(
        res => res.data
    );
};
/**获取当前服务器状态信息 */
export const get_all_machine_info2 = params => {
    return post(`${serverUrl}/monitor/get_all_machine_info2`, params).then(
        res => res.data
    );
};

//用户管理
/** 获取用户列表*/
export const userlist = params => {
    return post(`${serverUrl}/admin/system/userlist`, params).then(
        res => res.data
    );
};
//添加用户
export const userinsert = params => {
    return post(`${serverUrl}/admin/system/userinsert`, params).then(
        res => res.data
    );
};
//修改用户
export const userupdate = params => {
    return post(`${serverUrl}/admin/system/userupdate`, params).then(
        res => res.data
    );
};

//删除用户列表
export const userdelete = params => {
    return post(`${serverUrl}/admin/system/userdelete`, params).then(
        res => res.data
    );
};
//批量启用，禁用，删除，
export const userctrl = params => {
    return post(`${serverUrl}/admin/system/userctrl`, params).then(
        res => res.data
    );
};

//设备监控
/**获取所有设备列表 */
export const query_devinfo_by_conditions = params => {
    return post(
        `${serverUrl}/miner_ctrl/query_devinfo_by_conditions`,
        params
    ).then(res => res.data);
};

//ipfs节点控制台
/**获取节点网络分布 */
export const node_distribute = params => {
    return post(`${serverUrl}/node_mgmt/node_distribute`, params).then(
        res => res.data
    );
};
/**查询节点 */
export const query_node = params => {
    return post(`${serverUrl}/node_mgmt/query_node`, params).then(
        res => res.data
    );
};
/**节点分布--顶部区域汇总信息 */
export const ipfs_region_summary = params => {
    return post(
        `${serverUrl}/ipfs_node_monit/ipfs_region_summary`,
        params
    ).then(res => res.data);
};
/**节点详情--顶部区域汇总信息 */
export const ipfs_basic_info = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_basic_info`, params).then(
        res => res.data
    );
};

//ipfs节点应用
/**IP流量，FS存储，节点平均利用率 页面顶部的查询条件 下拉列表 */
export const ipfs_dataflow_query_conditions = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_data/ipfs_dataflow_query_conditions`,
        params
    ).then(res => res.data);
};
/**ip流量信息列表 */
export const query_ip_usage_table = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_data/query_ip_usage_table`,
        params
    ).then(res => res.data);
};
/**全国节点分布地图 */
export const query_ipfs_node_region_dist = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_data/query_ipfs_node_region_dist`,
        params
    ).then(res => res.data);
};
/**IP节点应用—IP流量 */
export const query_ipfs_dataflow_curve = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_data/query_ipfs_dataflow_curve`,
        params
    ).then(res => res.data);
};
/**IP节点应用—IP流量-表格 */
export const query_ipfs_dataflow_table = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_data/query_ipfs_dataflow_table`,
        params
    ).then(res => res.data);
};
/**节点平均利用率 曲线 */
export const query_ipfs_dataflow_avg_usage_curve = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_data/query_ipfs_dataflow_avg_usage_curve`,
        params
    ).then(res => res.data);
};
/**节点平均利用率 表格 */
export const query_ipfs_dataflow_avg_usage_table = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_data/query_ipfs_dataflow_avg_usage_table`,
        params
    ).then(res => res.data);
};
/**FS存储 表格 */
export const query_ip_store_usage_table = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_store/query_ip_store_usage_table`,
        params
    ).then(res => res.data);
};
/**FS存储 顶部 汇总信息和中间曲线 */
export const query_ip_store_details_curve = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_store/query_ip_store_details_curve`,
        params
    ).then(res => res.data);
};
/**FS存储 底部 表格 */
export const query_ip_store_details_table = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_store/query_ip_store_details_table`,
        params
    ).then(res => res.data);
};
/**节点平均利用率-FS存储利用曲线 */
export const query_ip_store_avg_usage_curve = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_store/query_ip_store_avg_usage_curve`,
        params
    ).then(res => res.data);
};
/**节点平均利用率-FS存储利用 表格 */
export const query_ip_store_avg_usage_table = params => {
    return post(
        `${serverUrl}/ipfs_node_ip_store/query_ip_store_avg_usage_table`,
        params
    ).then(res => res.data);
};

//操作管理
/**操作日志信息列表*/
export const actionlog = params => {
    return post(`${serverUrl}/cloudterminal/actionlog`, params).then(
        res => res.data
    );
};

//西柚机设备监控
//所有设备数据查询
export const query_general_info_list = params => {
    return post(
        `${serverUrl}/dev_status/query_general_info_list `,
        params
    ).then(res => res.data);
};
//获取设备最新状态
export const query_node_info = params => {
    return post(`${serverUrl}/dev_status/query_node_info `, params).then(
        res => res.data
    );
};

//单个设备详情
export const query_detail_info_list = params => {
    return post(`${serverUrl}/dev_status/query_detail_info_list `, params).then(
        res => res.data
    );
};

//导出反馈

export const setactionlog = params => {
    return post(`${serverUrl}/cloudterminal/setactionlog `, params).then(
        res => res.data
    );
};
//节点信息--启用禁用
export const filter_node = params => {
    return post(`${serverUrl}/node_mgmt/filter_node `, params).then(
        res => res.data
    );
};