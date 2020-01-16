import Vue from 'vue';  
let http = {}
    // nginx 作为代理服务器，解决跨域问题
    // let _baseURL="vpaas"


// 用 CorsFilter 解决前台跨域
let ContentType = "application/json";
// http.baseURL = _baseURL;


http.request = function(opt) {  
    opt = opt || {};  
    opt.method = opt.method.toUpperCase() || 'POST';  
    opt.url = opt.url || '';  
    opt.async = opt.async || true;  
    opt.data = opt.data || null;  
    opt.success = opt.success || function() {};   // 创建ajax 对象
      
    var xmlHttp = null;  
    if (XMLHttpRequest) {     xmlHttp = new XMLHttpRequest();   }  
    else {     xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');   }   // 将传入的参数转换成一个数组对象
      
    var params = [];  
    for (var key in opt.data) {     params.push(key + '=' + opt.data[key]);   }


      
    var postData = params.join('&');   //post 方法
      
    if (opt.method.toUpperCase() === 'POST') {    
        xmlHttp.open(opt.method, opt.url, opt.async);    
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');    
        xmlHttp.send(postData);  
    }   // get 方法
      
    else if (opt.method.toUpperCase() === 'GET') {    
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);    
        xmlHttp.send(null);  
    }    // 读取请求相应的状态
      
    xmlHttp.onreadystatechange = function() {     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {       //请求成功时，执行这个函数
                   opt.success(xmlHttp.responseText);     }   };
}
export default http;