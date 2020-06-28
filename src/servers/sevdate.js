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
export function getday(timestamp) {
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
    return M + D + h + m; //时分秒可以根据自己的需求加上
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
        f = Math.floor(Math.log(a) / Math.log(k));
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