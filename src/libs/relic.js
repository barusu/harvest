var name = '',
  img = '',
  sex = '',
  sexuality = '',
  phone = '',
  constellation = '',
  zodiac = '',
  birthday = '',
  uid = '',
  token = '';

const relic = {
  setUser(ob) {
    name = ob.name;
    img = ob.img;
    sex = ob.sex || 0;
    sexuality = ob.sexuality;
    phone = ob.phone;
    constellation = ob.constellation;
    zodiac = ob.zodiac;
    birthday = ob.birthday;
    uid = ob.login_id;
    token = ob.token;
  },
  clear() {
    name = '';
    img = '';
    sex = '';
    sexuality = '';
    phone = '';
    constellation = '';
    zodiac = '';
    birthday = '';
    uid = '';
    token = '';
  },
  get isLogin() {
    if(name && token) {
      return true;
    }else {
      return false;
    }
  }
};

export default relic;