var auth = {
  name: '',
  img: '',
  sex: '',
  sexuality: '',
  phone: '',
  constellation: '',
  zodiac: '',
  birthday: '',
  uid: '',
  token: ''
};

const relic = {
  setUser(ob) {
    auth.name = ob.name;
    auth.img = ob.img;
    auth.sex = ob.sex || 0;
    auth.sexuality = ob.sexuality;
    auth.phone = ob.phone;
    auth.constellation = ob.constellation;
    auth.zodiac = ob.zodiac;
    auth.birthday = ob.birthday;
    auth.uid = ob.login_id;
    auth.token = ob.token;
    localStorage.ELPSYCONGROO = window.btoa(window.encodeURIComponent(JSON.stringify(ob))).split('T').map(function(i){ return i.split('').reverse().join('');}).join('T');
  },
  clear() {
    localStorage.removeItem('ELPSYCONGROO');
    auth.name = '';
    auth.img = '';
    auth.sex = '';
    auth.sexuality = '';
    auth.phone = '';
    auth.constellation = '';
    auth.zodiac = '';
    auth.birthday = '';
    auth.uid = '';
    auth.token = '';
  },
  get isLogin() {
    if(auth.name && auth.token) {
      return true;
    }else {
      return false;
    }
  },
  get uid() {return auth.uid; },
  get token() {return auth.token; }
};

if(localStorage.ELPSYCONGROO) {
  var cache = JSON.parse(window.decodeURIComponent(window.atob(localStorage.ELPSYCONGROO.split('T').map(function(i){ return i.split('').reverse().join('');}).join('T'))));
  relic.setUser(cache);
}

export default relic;