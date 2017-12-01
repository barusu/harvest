import $ from 'flyio';
import auth from '@/libs/relic';

const host = 'http://www.yui.org.cn/';

$.config.timeout = 4000;
$.config.baseURL = host;

function error(err) {
  if(err.status === 401) {
    window.location.href = '/login';
  }
  console.error(err);
  return false;
}
/* eslint-disable no-unused-vars */
var ajax = {
  get(url, data, callback) {
    console.log(this);
    if(Object.prototype.toString.call(data) === '[object Function]') {
      callback = data;
      data = {};
    }
    data.uid = auth.uid;
    data.token = auth.token;
    $.get(url, data).then(rs => {
      var data;
      try {
        data = JSON.parse(rs.data);
      }catch(e) {
        data = rs.data;
      }
      callback(data);
    }).catch(err => {
      callback(error(err));
    });
  },
  post(url, data, callback) {
    console.log(this);
    if(Object.prototype.toString.call(data) === '[object Function]') {
      callback = data;
      data = {};
    }
    var Data = new FormData();
    for(var n in data) {
      Data.append(n, data[n]);
    }
    Data.append('uid', auth.uid);
    Data.append('token', auth.token);
    $.post(url, Data).then(rs => {
      var data;
      try {
        data = JSON.parse(rs.data);
      }catch(e) {
        data = rs.data;
      }
      callback(data);
    }).catch(err => {
      callback(error(err));
    });
  },
  login(param, callback) {
    $.get('login', null, {
      headers: {
        'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(param.name + ':' + param.psw)))
      }
    }).then(rs => {
      var data;
      try {
        data = JSON.parse(rs.data);
      }catch(e) {
        data = rs.data;
      }
      if(data && data.login_id && data.token) {
        auth.setUser(data);
        data.status = true;
      }else {
        data.info = data.info || '用户信息异常';
      }
      callback(data);
    }).catch(err => {
      callback(error(err));
    });
  }
};

export default ajax;