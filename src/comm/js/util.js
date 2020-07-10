var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};


export default {
    getQueryStringByName: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        format: function(date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function(dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    //将时间格式化
    getTimes: function(b) {
        if (b == 0) { return '未登录' }
        let e = new Date(b)
        let year = e.getFullYear();
        let month = e.getMonth() + 1;
        let day = e.getDate();
        let hh =
            e.getHours() < 10 ?
            "0" + e.getHours() :
            e.getHours();
        let mm =
            e.getMinutes() < 10 ?
            "0" + e.getMinutes() :
            e.getMinutes();
        let ss =
            e.getSeconds() < 10 ?
            "0" + e.getSeconds() :
            e.getSeconds();
        let endTime = `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
        return endTime
    },
    //判断结束时间是否大于起始时间
    checkTimes: function(a, b) {
        var startTime = new Date(a).getTime()
        var endTime = new Date(b).getTime()
        if (endTime - startTime >= 0) {
            return true
        } else {
            return false
        }
    },
    //将字符串转化为GB,MB,KB,B
    formatByte: function(row, column, cellValue, index) {
        var limit = parseInt(cellValue);
        var size = "";
        if (limit < 0.1 * 1024) {
            //小于0.1KB，则转化成B
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        // if (dou == "00") {
        //   //判断后两位是否为00，如果是则删除00
        //   return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        // }
        return size;
    },

    //标准时间转时间戳
    dateToMs: function(date) {
        let result = new Date(date).getTime() / 1000;
        return result;
    },
    formatByteActive: function(cellValue, index) {
        var limit = parseInt(cellValue);
        var size = "";
        if (limit < 0.1 * 1024) {
            //小于0.1KB，则转化成B
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        // if (dou == "00") {
        //   //判断后两位是否为00，如果是则删除00
        //   return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        // }
        return size;
    },
    //kb单位转换
    ByteActive: function(cellValue, index) {
        var limit = parseInt(cellValue);
        var size = "";
        if (limit < 0.1 * 1024) {
            //小于0.1KB，则转化成B
            size = limit.toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2) + "MB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "GB";
        } else {
            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "TB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        // if (dou == "00") {
        //   //判断后两位是否为00，如果是则删除00
        //   return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        // }
        return size;
    },

    //转化为小时分钟
    formatDays: function(num) {
        if (num < 1000) {
            return num;
        } else if (num >= 1000 && num < 60000) {
            num = Number(num / 1000).toFixed(2) + 's'
            return num;
        } else if (num >= 60000 && num < 3600000) {
            num = Number(num / 60000).toFixed(2) + 'm'
            return num;
        } else if (num >= 3600000 && num < 86400000) {
            num = Number(num / 3600000).toFixed(2) + 'h'
            return num;
        } else if (num > 86400000) {
            num = Number(num / 86400000).toFixed(2) + 'd'
            return num;
        }
    },

    getTimess: function(b) {
        let e = new Date(b)
        let year = e.getFullYear();
        let month = e.getMonth() + 1;
        let day = e.getDate();
        let hh =
            e.getHours() < 10 ?
            "0" + e.getHours() :
            e.getHours();
        let mm =
            e.getMinutes() < 10 ?
            "0" + e.getMinutes() :
            e.getMinutes();
        let ss =
            e.getSeconds() < 10 ?
            "0" + e.getSeconds() :
            e.getSeconds();
        let endTime = `${year}-${month}-${day}`;
        return endTime
    },


    getTimeDay: function(b) {
        let e = new Date(b)
        let year = e.getFullYear();
        let month = e.getMonth() + 1;
        let day = e.getDate();
        // let hh =
        //     e.getHours() < 10 ?
        //     "0" + e.getHours() :
        //     e.getHours();
        // let mm =
        //     e.getMinutes() < 10 ?
        //     "0" + e.getMinutes() :
        //     e.getMinutes();
        // let ss =
        //     e.getSeconds() < 10 ?
        //     "0" + e.getSeconds() :
        //     e.getSeconds();
        let endTime = `${year}-${month}-${day}`;
        return endTime
    },

    //错误提示码返回

    getErrorcodeInfo: function(errorId) {

        var errorInfoArr = [
            { errorCode: 311, errorText: 'start_timestamp格式错误', },
            { errorCode: 312, errorText: 'end_timestamp参数格式错误', },
            { errorCode: 316, errorText: 'start_timestamp参数格式错误', },
            { errorCode: 317, errorText: 'end_timestamp参数格式错误', },
            { errorCode: 321, errorText: 'start_timestamp参数格式错误', },
            { errorCode: 322, errorText: 'end_timestamp参数格式错误', },
            { errorCode: 326, errorText: 'start_timestamp参数格式错误', },
            { errorCode: 327, errorText: 'end_timestamp参数格式错误', },
            { errorCode: 331, errorText: 'start_timestamp参数格式错误', },
            { errorCode: 332, errorText: 'end_timestamp参数格式错误', },
            { errorCode: 336, errorText: 'node_list参数格式错误', },
            { errorCode: 337, errorText: 'node_state参数格式错误', },
            { errorCode: 338, errorText: 'node_hash参数格式错误', },
            { errorCode: 339, errorText: 'node_hash参数格式错误', },
            { errorCode: 340, errorText: '无法找到指定的文件哈希', },
            { errorCode: 341, errorText: 'node_hash参数格式错误', },
            { errorCode: 346, errorText: 'start_ts json参数格式错误', },
            { errorCode: 347, errorText: 'end_ts json参数格式错误', },
            { errorCode: 351, errorText: 'owner_hash参数格式错误', },
            { errorCode: 352, errorText: 'file_name json参数格式错误', },
            { errorCode: 353, errorText: 'node_hash参数格式错误', },
            { errorCode: 354, errorText: 'file_hash参数格式错误', },
            { errorCode: 355, errorText: 'page_no参数格式错误', },
            { errorCode: 361, errorText: 'file_hash参数格式错误', },
            { errorCode: 362, errorText: 'page_num参数格式错误', },
            { errorCode: 363, errorText: '指定的文件哈希不存在', },
            { errorCode: 371, errorText: 'start_ts json参数格式错误', },
            { errorCode: 372, errorText: 'end_ts json参数格式错误', },
            { errorCode: 373, errorText: 'file_hash参数格式错误', },
            { errorCode: 374, errorText: 'log_type参数格式错误', },
            { errorCode: 375, errorText: 'node_hash参数格式错误', },
            { errorCode: 381, errorText: 'snode_hash参数格式错误', },
            { errorCode: 382, errorText: 'cmd_type参数格式错误', },
            { errorCode: 383, errorText: 'target_node参数格式错误', },
            { errorCode: 384, errorText: 'cmd_data参数格式错误', },
            { errorCode: 385, errorText: 'cmd_desc参数格式错误', },
            { errorCode: 386, errorText: '参数有误', },
            { errorCode: 901, errorText: 'file_hash参数格式错误', },
            { errorCode: 902, errorText: 'page_num参数格式错误', },
            { errorCode: 903, errorText: '文件备份所在节点未找到', },
            { errorCode: 904, errorText: '文件信息未找到', },
            { errorCode: 906, errorText: 'file_hash参数格式错误', },
            { errorCode: 907, errorText: 'page_num参数格式错误', },
            { errorCode: 908, errorText: 'target_node参数格式错误', },
            { errorCode: 911, errorText: 'file_hash参数格式错误', },
            { errorCode: 912, errorText: 'page_num参数格式错误', },
            { errorCode: 915, errorText: 'action参数格式错误', },
            { errorCode: 916, errorText: 'code参数格式错误', },
            { errorCode: 917, errorText: 'NodeSelf参数格式错误', },
            { errorCode: 918, errorText: 'NodeTarget参数格式错误', },
            { errorCode: 919, errorText: 'Arg JSON参数格式错误', },
            { errorCode: 920, errorText: 'Timestamp参数格式错误', },
            { errorCode: 921, errorText: 'Desc JSON参数格式错误', },
            { errorCode: 922, errorText: 'ID JSON参数格式错误', },
            { errorCode: 923, errorText: 'Name JSON参数格式错误', },
            { errorCode: 924, errorText: 'Owner JSON参数格式错误', },
            { errorCode: 925, errorText: 'Timestamp参数格式错误', },
            { errorCode: 926, errorText: 'Size JSON参数格式错误', },
            { errorCode: 927, errorText: 'MetaData参数格式错误', },
            { errorCode: 928, errorText: 'MsgContent参数格式错误', },
            { errorCode: 936, errorText: 'ID JSON参数格式错误', },
            { errorCode: 937, errorText: 'Addrs JSON参数格式错误', },
            { errorCode: 938, errorText: 'NodeType参数格式错误', },
            { errorCode: 939, errorText: 'RegionId参数格式错误', },
            { errorCode: 940, errorText: 'GroupId参数格式错误', },
            { errorCode: 941, errorText: 'MsgContent参数格式错误', },
            { errorCode: 946, errorText: 'ID JSON参数格式错误', },
            { errorCode: 947, errorText: 'Addrs JSON参数格式错误', },
            { errorCode: 948, errorText: 'NodeType JSON参数格式错误', },
            { errorCode: 949, errorText: 'Status JSON参数格式错误', },
            { errorCode: 950, errorText: 'MsgContent参数格式错误', },
            { errorCode: 956, errorText: 'ID JSON参数格式错误', },
            { errorCode: 957, errorText: 'Val JSON参数格式错误', },
            { errorCode: 958, errorText: 'MsgContent参数格式错误', },
            { errorCode: 961, errorText: 'MsgID参数格式错误', },
            { errorCode: 962, errorText: 'Command参数格式错误', },
            { errorCode: 963, errorText: 'Code参数格式错误', },
            { errorCode: 964, errorText: 'ID参数格式错误', },
            { errorCode: 965, errorText: 'Desc参数格式错误', },
            { errorCode: 966, errorText: 'MsgContent参数格式错误', },
            { errorCode: 600, errorText: '成功', },
            { errorCode: 601, errorText: '未知错误', },
            { errorCode: 602, errorText: 'json 格式错误', },
            { errorCode: 603, errorText: '没有这个方法', },
            { errorCode: 604, errorText: 'app 已存在', },
            { errorCode: 605, errorText: '该版本低于最新版本', },
            { errorCode: 606, errorText: '版本已存在', },
            { errorCode: 607, errorText: 'app 不存在', },
            { errorCode: 608, errorText: 'json 参数错误', },
            { errorCode: 609, errorText: '该 app 版本不存在', },
            { errorCode: 610, errorText: '设备不存在', },
            { errorCode: -900, errorText: '参数不合法', },
            { errorCode: 702, errorText: '暂无数据', },

        ]
        var queryerrorInfo = errorInfoArr.filter(item => item.errorCode == errorId)
        return queryerrorInfo[0].errorText
    },

    // 分页记忆选择核心方,
    changePageCoreRecordData(a, b, c, d) {
        //debugger
        // 标识当前行的唯一键的名称
        let idKey = d;
        // let that = this;
        // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
        if (a.length <= 0) {
            a = b;
            return a;
        }
        // 总选择里面的key集合
        let selectAllIds = [];
        a.forEach(row => {
            selectAllIds.push(row[idKey]);
        })
        let selectIds = []
            // 获取当前页选中的id
        b.forEach(row => {
            selectIds.push(row[idKey]);
            // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
            if (selectAllIds.indexOf(row[idKey]) < 0) {
                a.push(row);
            }
        })
        let noSelectIds = [];
        // 得到当前页没有选中的id
        c.forEach(row => {
            if (selectIds.indexOf(row[idKey]) < 0) {
                noSelectIds.push(row[idKey]);
            }
        })
        noSelectIds.forEach(id => {
            if (selectAllIds.indexOf(id) >= 0) {
                for (let i = 0; i < a.length; i++) {
                    if (a[i][idKey] == id) {
                        // 如果总选择中有未被选中的，那么就删除这条
                        a.splice(i, 1);
                        break;
                    }
                }
            }
        })

        return a
    },
    //获取存储的COOKIE
    get: function(name) {

        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

        return v ? v[2] : null;

    },
    //修改动态路由中的component
    trans: function trans(tree, keymap) {
        for (var i = 0; i < tree.length; i++) {
            tree[i].component = keymap[tree[i].component]
                // console.log(tree[i].component)
                //console.log(keymap[tree[i].component])
            if (tree[i].children) {
                tree[i].children = this.trans(tree[i].children, keymap)
            }
        }
        return tree
    },



};