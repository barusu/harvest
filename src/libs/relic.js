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
  },
  clear() {
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

export default relic;