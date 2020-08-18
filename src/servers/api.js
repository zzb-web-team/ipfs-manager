import {get, post } from './http';
import axios from 'axios'

var href = window.location.href;
if (href.indexOf('xyj.grapefruitcloud.com') >= 0) {
    var serverUrl = 'http://xyj.grapefruitcloud.com'; //PHP服务URL
} else if (href.indexOf('service.kclgames.com') >= 0) {
    var serverUrl = 'http://service.kclgames.com'; //PHP服务URL
} else {
    var serverUrl = 'http://zzb.onezen.net';
}
// var serverUrl = 'http://service.kclgames.com'; //PHP服务域名

//服务器监控
/**获取微服务信息 */
// export const login = params => {
//     return post(`${serverUrl}/admin/ipfssystem/login`, params).then(
//         res => res.data
//     );
// };
// export const check_login = params => {
//     return post(`${serverUrl}/admin/system/check_login`, params).then(
//         res => res.data
//     );
// };
export const login = params => {
    return post(`${serverUrl}/admin/ipfssystem/login`, params).then(
        res => res.data
    );
};
export const check_login = params => {
    return post(`${serverUrl}/admin/ipfssystem/check_login`, params).then(
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
    return post(`${serverUrl}/admin/ipfssystem/userlist`, params).then(
        res => res.data
    );
};
//添加用户
export const userinsert = params => {
    return post(`${serverUrl}/admin/ipfssystem/userinsert`, params).then(
        res => res.data
    );
};
//修改用户
export const userupdate = params => {
    return post(`${serverUrl}/admin/ipfssystem/userupdate`, params).then(
        res => res.data
    );
};
//绑定二级密码
export const bind_login = params => {
    return post(`${serverUrl}/admin/ipfssystem/bind_login`, params).then(
        res => res.data
    );
};



//删除用户列表
export const userdelete = params => {
    return post(`${serverUrl}/admin/ipfssystem/userdelete`, params).then(
        res => res.data
    );
};
//批量启用，禁用，删除，
export const userctrl = params => {
    return post(`${serverUrl}/admin/ipfssystem/userctrl`, params).then(
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

//西柚机节点收益
export const node_pf = params => {
    return post(`${serverUrl}/ipfs_profit/node_pf`, params).then(
        res => res.data
    );
};
//云链节点收益明细
export const node_pf_detail = params => {
    return post(`${serverUrl}/ipfs_profit/node_pf_detail`, params).then(
        res => res.data
    );
};
//云链节点算力值
export const node_pv = params => {
    return post(`${serverUrl}/ipfs_profit/node_pv`, params).then(
        res => res.data
    );
};
//云链节点算力明细
export const node_pv_detail = params => {
    return post(`${serverUrl}/ipfs_profit/node_pv_detail`, params).then(
        res => res.data
    );
};
//收益参数修改
export const update_net_info = params => {
    return post(`${serverUrl}/ipfs_profit/update_net_info`, params).then(
        res => res.data
    );
};
//收益参数获取
export const get_net_info = params => {
    return post(`${serverUrl}/ipfs_profit/get_net_info`, params).then(
        res => res.data
    );
};
//导出
export const export_excel = params => {
    return post(`${serverUrl}/ipfs_profit/export_excel`, params).then(
        res => res.data
    );
};
//查询搜索条件
export const get_nodetype_enum = params => {
    return post(`${serverUrl}/node_mgmt/get_nodetype_enum`, params).then(
        res => res.data
    );
};
//带宽查询接口
export const ipfs_monit_bandwidth = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_bandwidth`, params).then(
        res => res.data
    );
};
//节点质量-CPU占用率查询接口
export const ipfs_monit_cpuusage = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_cpuusage`, params).then(
        res => res.data
    );
};
//节点质量-错误率查询接口
export const ipfs_monit_etf = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_etf`, params).then(
        res => res.data
    );
};
//节点质量-在线率查询接口
export const ipfs_monit_itf = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_itf`, params).then(
        res => res.data
    );
};
//节点质量-LT（失联计数）查询接口
export const ipfs_monit_lt = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_lt`, params).then(
        res => res.data
    );
};
//节点质量-内存占用率查询接口
export const ipfs_monit_memory = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_memory`, params).then(
        res => res.data
    );
};
//节点质量-离线率查询接口
export const ipfs_monit_otf = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_otf`, params).then(
        res => res.data
    );
};
//节点质量-PING_MS查询接口
export const ipfs_monit_ping_ms = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_ping_ms`, params).then(
        res => res.data
    );
};
//节点质量-PING_TTL查询接口
export const ipfs_monit_ping_ttl = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_ping_ttl`, params).then(
        res => res.data
    );
};
//节点质量-重连计数）查询接口
export const ipfs_monit_rcnt = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_rcnt`, params).then(
        res => res.data
    );
};
//存储空间查询接口
export const ipfs_monit_storage = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_storage`, params).then(
        res => res.data
    );
};
//节点质量-TID（响应时差）查询接口
export const ipfs_monit_tid = params => {
    return post(`${serverUrl}/ipfs_node_monit/ipfs_monit_tid`, params).then(
        res => res.data
    );
};

//导出节点信息
export const nodeinfo_export = params => {
    return post(`${serverUrl}/node_mgmt/nodeinfo_export`, params).then(
        res => res.data
    );
};
//部门列表
export const departmentlist = params => {
    return post(`${serverUrl}/system/departmentlist`, params).then(
        res => res.data
    );
};
//添加部门
export const adddepartment = params => {
    return post(`${serverUrl}/system/adddepartment`, params).then(
        res => res.data
    );
};
//修改部门
export const updatedepartment = params => {
    return post(`${serverUrl}/system/updatedepartment`, params).then(
        res => res.data
    );
};
//删除部门
export const deldepartment = params => {
    return post(`${serverUrl}/system/deldepartment`, params).then(
        res => res.data
    );
};
//职位列表
export const positionlist = params => {
    return post(`${serverUrl}/system/positionlist`, params).then(
        res => res.data
    );
};
//添加职位
export const addposition = params => {
    return post(`${serverUrl}/system/addposition`, params).then(
        res => res.data
    );
};
//修改职位
export const updateposition = params => {
    return post(`${serverUrl}/system/updateposition`, params).then(
        res => res.data
    );
};
//删除职位
export const delposition = params => {
    return post(`${serverUrl}/system/delposition`, params).then(
        res => res.data
    );
};
//权限列表
export const rolelist = params => {
    return post(`${serverUrl}/system/rolelist`, params).then(
        res => res.data
    );
};
//添加权限
export const addrole = params => {
    return post(`${serverUrl}/system/addrole`, params).then(
        res => res.data
    );
};
//权限更新
export const updaterole = params => {
    return post(`${serverUrl}/system/updaterole`, params).then(
        res => res.data
    );
};
//删除权限
export const delrole = params => {
    return post(`${serverUrl}/system/delrole`, params).then(
        res => res.data
    );
};
//搜索权限
export const searchuser = params => {
    return post(`${serverUrl}/system/searchuser`, params).then(
        res => res.data
    );
};
//获取一级部门
export const gettopdepartment = params => {
    return post(`${serverUrl}/system/gettopdepartment`, params).then(
        res => res.data
    );
};

//获取分组用户
export const userlistaddrole = params => {
    return post(`${serverUrl}/system/userlistaddrole`, params).then(
        res => res.data
    );
};
//获取用户所属部门id
export const getuserdepartment = params => {
    return post(`${serverUrl}/system/getuserdepartment`, params).then(
        res => res.data
    );
};

//配置权限
export const updateroleinfo = params => {
    return post(`${serverUrl}/system/updateroleinfo`, params).then(
        res => res.data
    );
};
//用户菜单
export const menulistuser = params => {
    return post(`${serverUrl}/system/menulistuser`, params).then(
        res => res.data
    );
};
//获取全国地图分布--实时
export const node_countinfo = params => {
    return post(`${serverUrl}/node_mgmt/node_countinfo`, params).then(
        res => res.data
    );
};
//节点区位总览信息--实时
export const nodesinfo_byarea = params => {
    return post(`${serverUrl}/node_mgmt/nodesinfo_byarea`, params).then(
        res => res.data
    );
};
//获取rouji安装列表
export const error_log_list = params => {
    return post(`${serverUrl}/ipfs_node_monit/error_log_list`, params).then(
        res => res.data
    );
};
//新增菜单
export const addmenu = params => {
    return post(`${serverUrl}/system/addmenu`, params).then(
        res => res.data
    );
};