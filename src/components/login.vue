<template>
  <main class="wrapper login">
    <div class="form-wrapper">
      <div class="form-body">
        <div class="formhidden">
          <input type="text" name="name"/>
          <input type="password" name="password"/>
        </div>
        <div class="head-img">
          <img src="/src/assets/logo.png" class="whirligig" alt="headImg" id="login_btn">
        </div>
        <label class="form-group">
          <input type="text" class="form-field" placeholder="用户名" autofocus id="user">
        </label>
        <div class="form-group">
          <input type="password" class="form-field" placeholder="密码" id="psw">
        </div>
        <div class="msg" id="msg"></div>
      </div>
    </div>
    <div class="content">
    </div>
    <div class="login-title" data-en="しんだせかいせんせん">Rebels Against The God</div>
  </main>
</template>

<script>
  export default {
    methods: {
      resize() {
        
      }
    },
    mounted() {
      window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resize);
    }
  };
</script>

<style lang="scss">
  $loginformwidth: 4rem;
  .login {
    .wrapper {
      position: relative;
      height: 100%;
      min-height: 400px;
      background: url('/src/assets/demo0.jpg') 0 0 / cover no-repeat;
      overflow: hidden;
      &::before {
        content: "";
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        filter: blur(3px);
      }
      &::after {
        content: "";
        position: absolute;
        top: 0; left: -$loginformwidth;
        width: 100%;
        height: 100%;
        background: inherit;
        background-position: $loginformwidth 0;
      }
    }
    .form-wrapper {
      position: relative;
      width: $loginformwidth;
      height: 100%;
      float: right;
      background: rgba(255,255,255,.25);
    }
    .form-body {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translate3d(0,-50%,0);
      padding: 0 .4rem .8rem;
      font-size: .14rem;
    }
    .login-title {
      position: relative;
      top: 22%;
      font-size: .5rem;
      color: #c10017;
      overflow: hidden;
      text-align: center;
      z-index: 1;
      font-family: monospace, Arial, sans-serif;
      &::after {
        content: attr(data-en);
        display: block;
        font-size: 12px;
        letter-spacing: .3em;
      }
    }
    .head-img {
      padding: 1em 0;
      text-align: center;
      perspective: 1000px;
      > img {
        width: 50%;
        border-radius: 50%;
        animation: rotateY 6.4s ease-in-out infinite;
        transform-style: preserve-3d;
        cursor: pointer;
      }
    }
    .form-group {
      position: relative;
      display: block;
      width: 80%;
      margin: 0 auto 1em;
      height: 2em;
    }
    .form-field {
      width: 100%;
      height: 100%;
      padding: 0 .5em;
      border: 0;
      border-radius: 3px;
      background: hsla(0,0%,0%,.4);
      color: #eee;
      letter-spacing: 1px;
    }
    .msg {
      width: 80%;
      height: 1.5em;
      margin: -.5em auto 0;
      padding: 0 .5em;
      font-size: 12px;
      color: #f46;
    }
    .formhidden {
      input {
        position: absolute;
        clip: rect(0,0,0,0);
      }
    }
  }
</style>