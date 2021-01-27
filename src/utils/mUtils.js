/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    var value = window.localStorage.getItem(name);
    if (value !== null) {
        try {
            value = JSON.parse(value);
        } catch (e) {
            value = value;
        }
    }
    return value;
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

//是否为正整数
export const isInteger = (s) => {
    var re = /^[0-9]+$/;
    return re.test(s);
}

/**
 * 判断空值
 */
export const isEmpty = (keys) => {
    if (typeof keys === "string") {
        keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, "");
        if (keys == "" || keys == null || keys == "null" || keys === "undefined") {
            return true;
        } else {
            return false;
        }
    } else if (typeof keys === "undefined") {  // 未定义
        return true;
    } else if (typeof keys === "number") {
        return false;
    } else if (typeof keys === "boolean") {
        return false;
    } else if (typeof keys == "object") {
        if (JSON.stringify(keys) == "{}") {
            return true;
        } else if (keys == null) { // null
            return true;
        } else {
            return false;
        }
    }

    if (keys instanceof Array && keys.length == 0) {// 数组
        return true;
    }
}

/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == date ---> "yyyy-mm-dd"
 *   type == datetime ---> "yyyy-mm-dd hh:MM:ss"
 *   type == year ---> "yyyy"
 *   type == month ---> "yyyy-mm"
 */
export const formatDate = (date, type) => {
    var d = '';
    if (date) {
        d = new Date(date);
    } else {
        d = new Date();
    }
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var cur_hour = d.getHours();
    var cur_minute = d.getMinutes();
    var cur_seconds = d.getSeconds();
    String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
    String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
    String(cur_hour).length < 2 ? (cur_hour = "0" + cur_hour) : cur_hour;
    String(cur_minute).length < 2 ? (cur_minute = "0" + cur_minute) : cur_minute;
    String(cur_seconds).length < 2 ? (cur_seconds = "0" + cur_seconds) : cur_seconds;
    var result = '';
    if (type == "date") {
        result = curr_year + "-" + curr_month + "-" + curr_date;
    } else if (type == 'datetime') {
        result = curr_year + "-" + curr_month + "-" + curr_date + ' ' + cur_hour + ":" + cur_minute + ":" + cur_seconds;
    } else if (type == 'year') {
        result = curr_year;
    } else if (type == 'month') {
        result = curr_year + "-" + curr_month;
    }
    return result;
}

//两个日期之间相差天数
export const DateDifference = (Date1, Date2) => { //Date1和Date2是2017-07-10格式  
    var sDate, newDate1, newDate2, Days
    aDate = Date1.split("-");
    newDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为07-10-2017格式  
    aDate = Date2.split("-");
    newDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    Days = parseInt(Math.abs(newDate1 - newDate2) / 1000 / 60 / 60 / 24); //把差的毫秒数转换为天数  
    return Days;
}

//获取某一年某一月的最后一天
export const getLastDay = (year, month) => {
    var nyear = year;
    var nmonth = month++;
    if (month > 12) {
        nmonth -= 12;
        nyear++;
    }
    var n_date = new Date(nyear, nmonth, 1);
    return (new Date(n_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
}