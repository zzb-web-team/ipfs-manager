//时间戳转日期
export function getlocaltimes(timestamp) {
    // 如果以秒为单位
    let dateObj = new Date(timestamp * 1000);
    // 如果以毫秒为单位
    // var dateObj = new Date(timestamp);
    let Y = dateObj.getFullYear() + '-';
    let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
    let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ';
    let h = ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':';
    let m = ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':';
    let s = ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
    return h + m + s //时分秒可以根据自己的需求加上
}
export function formatterDate(date) {
    let result = new Date(date);
    return result;
}
export function getymdtime(timestamp) {
    // 如果以秒为单位
    let dateObj = new Date(timestamp * 1000);
    // 如果以毫秒为单位
    // var dateObj = new Date(timestamp);
    let Y = dateObj.getFullYear() + '-';
    let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
    let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ';
    let h = ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':';
    let m = ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':';
    let s = ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
    return Y + M + D + h + m + s; //时分秒可以根据自己的需求加上
}
export function getday(timestamp, hms) {
    // 如果以秒为单位
    let dateObj = new Date(timestamp * 1000);
    // 如果以毫秒为单位
    // var dateObj = new Date(timestamp);
    let Y = dateObj.getFullYear() + '-';
    let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
    let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ';
    let h = ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':';
    let m = ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes());
    let s = ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
    if (hms == "hms") {
        return h + m;
    } else {
        return M + D + h + m; //时分秒可以根据自己的需求加上
    }
}
//日期转时间戳
export function settime(nowTime) {
    nowTime = nowTime.substring(0, 19);
    nowTime = nowTime.replace(/-/g, '/');
    var time = new Date(nowTime).getTime() / 1000;
    return time
}

//标准格式转时间戳
export function setbatime(nowTime) {
    nowTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + nowTime.getDate() + ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds();

    var time = new Date(nowTime).getTime() / 1000;
    return time
}
//时间戳转日期
export function msToDate(msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let result1 = year +
        '-' +
        ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
        '-' +
        ((date + 1) < 10 ? '0' + date : date) +
        ' ' +
        ((hour + 1) < 10 ? '0' + hour : hour) +
        ':' +
        ((minute + 1) < 10 ? '0' + minute : minute) +
        ':' +
        ((second + 1) < 10 ? '0' + second : second);

    let result2 = year +
        '-' +
        ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
        '-' +
        ((date + 1) < 10 ? '0' + date : date);

    let result = {
        hasTime: result1,
        withoutTime: result2
    };

    return result;
}


//标准时间转日期
export function dateFormat(d) {
    let year = d.getFullYear();
    let month = d.getMonth() + 1 + "";
    if (month <= 9) {
        month = '0' + month;
    }
    let date = d.getDate() + "";
    if (date <= 9) {
        date = '0' + date;
    }
    let hour = d.getHours() + "";
    if (hour <= 9) {
        hour = '0' + hour;
    }
    let minute = d.getMinutes() + "";
    if (minute <= 9) {
        minute = '0' + minute;
    }
    let second = d.getSeconds() + "";
    if (second <= 9) {
        second = '0' + second;
    }
    // return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return year + "-" + month + "-" + date;
}
export function formatDuring(mes) {
    var mss = mes * 1000;
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    if (days == 0 && hours != 0) {
        return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
    } else if (days == 0 && hours == 0 && minutes != 0) {
        return minutes + " 分钟 " + seconds + " 秒 ";
    } else if (days == 0 && hours == 0 && minutes == 0) {
        return seconds + " 秒 ";
    } else {
        return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
    }

}
export function get_units(a) {
    if (0 == a) return 'B';
    var k = 1024;
    var e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        f = Math.floor(Math.log(Math.abs(a)) / Math.log(k));
    return e[f];
}
export function formatBkb(a, b) {
    if (0 == a) return 0;
    if (b == 'KB') {
        return (a / 1024).toFixed(2)
    } else if (b == 'MB') {
        return (a / 1024 / 1024).toFixed(2);
    } else if (b == 'GB') {
        return (a / 1024 / 1024 / 1024).toFixed(2);
    } else if (b == 'TB') {
        return (a / 1024 / 1024 / 1024 / 1024).toFixed(4);
    } else if (b == 'PB') {
        return (a / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(4);
    }

};
export function zhuanbkbs(bytes) {
    if (bytes === 0) return '0 B';
    if (bytes < 0) {
        var byt = Math.abs(bytes);
        var b = 1024,
            bsize = [
                'B',
                'KB',
                'MB',
                'GB',
                'TB',
                'PB',
                'EB',
                'ZB',
                'YB',
            ],
            n = Math.floor(Math.log(byt) / Math.log(b));
        return '-' + (byt / Math.pow(b, n)).toFixed(2) + ' ' + bsize[n];
    }
    var k = 1024,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};
export function arrTrans(num, arr) {
    const newArr = [];
    while (arr.length > 0) {
        newArr.push(arr.splice(0, num));
    }
    return newArr;
};

export function delshang(arr) {
    arr.forEach((item) => {
        item.component = item.component.replace("\"", "").replace("\"", "");
        if (item.children) {
            delshang(item.children);
        }
    })
}
export function menudisable(arr, name) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].children) {
            for (var k = 0; k < arr[i].children.length; k++) {
                if (arr[i].children[k].children) {
                    for (var n = 0; n < arr[i].children[k].children.length; n++) {
                        if (arr[i].children[k].children[n].path == name) {
                            return arr[i].children[k].children[n];
                        }
                    }

                }
                if (arr[i].children[k].path == name) {
                    return arr[i].children[k];
                }
            }

        } else {
            // if (arr[i].path == name) {
            //     return arr[i];

            // }
        }
    }

}
//带宽自动转换
export function bandwidth_unit_conversion(data) {
    let num = 0;
    if (data == 0) {
        return [0, 'Kbps'];
    } else {
        if (data < 1000) {
            num = data
            return [num, "Kbps"]
        } else if (data / 1024 < 1000) {
            num = (data / 1024).toFixed(2)
            return [num, "Mbps"]
        } else if (data / 1024 / 1024 < 1000) {
            num = (data / 1024 / 1024).toFixed(2)
            return [num, "Gbps"]
        } else if (data / 1024 / 1024 / 1024 < 1000) {
            num = (data / 1024 / 1024 / 1024).toFixed(2)
            return [num, "Tbps"]
        } else if (data / 1024 / 1024 / 1024 / 1024 < 1000) {
            num = (data / 1024 / 1024 / 1024 / 1024).toFixed(2)
            return [num, "Pbps"]
        } else if (data / 1024 / 1024 / 1024 / 1024 / 1024 < 1000) {
            num = (data / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)
            return [num, "Ebps"]
        } else if (data / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 < 1000) {
            num = (data / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)
            return [num, "Zbps"]
        } else {
            num = (data / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)
            return [num, "Zbps"]
        }

    }
}
//带宽转指定单位
export function bandwidth_unit(data, data_unit) {
    let num = 0;
    if (data == 0) {
        return 0;
    } else {
        if (data_unit == 'Kbps') {
            return data
        } else if (data_unit == "Mbps") {
            num = (data / 1024).toFixed(2);
            return num
        } else if (data_unit == "Gbps") {
            num = (data / 1024 / 1024).toFixed(2);
            return num
        } else if (data_unit == "Tbps") {
            num = (data / 1024 / 1024 / 1024).toFixed(2);
            return num
        } else if (data_unit == "Pbps") {
            num = (data / 1024 / 1024 / 1024 / 1024).toFixed(2);
            return num
        } else if (data_unit == "Ebps") {
            num = (data / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2);
            return num
        } else if (data_unit == "Zbps") {
            num = (data / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2);
            return num
        } else {
            num = (data / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2);
            return num
        }

    }
}