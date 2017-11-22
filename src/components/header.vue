<style lang="scss">
  header {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    color: #444;
    z-index: 9;
    height: .6rem;
    padding: 0 5%;
    font-size: .2rem;
    background: #fff;
    transition: box-shadow .5s;
    box-shadow: 0 1px #ddd;
    &:hover {
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    & + main {
      margin-top: .6rem;
    }
    .logo {
      width: .6rem;
      height: 100%;
      float: left;
      padding-bottom: .06rem;
      text-align: center;
      cursor: pointer;
      perspective: 1000px;
      img {
        max-width: 100%;
        max-height: 100%;
        pointer-events: none;
        animation: rotateY 6.4s ease-in-out infinite;
        transform-style: preserve-3d;
      }
    }
    .title {
      display: inline-block;
      height: 100%;
      font-size: 20px;
      padding: 0 .5em;
      line-height: 3;
      float: left;
      color: #b71c1c;
    }
    nav {
      float: right;
      height: 100%;
      a {
        display: inline-block;
        height: 100%;
        padding: .5em;
        line-height: 2;
        color: #444;
        border-width: 0;
        transition: color .2s linear, border .1s linear;
      }
      .router-link-active {
        color: #0b8;
        border-bottom: 2px solid #0da;
      }
    }
  }
  @keyframes rotateY {
    from {transform: rotateY(0deg);}
    to   {transform: rotateY(360deg);}
  }
</style>

<template>
  <header>
    <div class="logo" @click="$router.push('/')">
      <img src="../assets/ab_story_bg.png" alt="">
    </div>
    <span class="title">Rebels Against The God</span>
    <nav>
      <router-link :to="{name: 'ui'}">UI</router-link>
      <router-link :to="{name: 'component'}">Component</router-link>
      <router-link :to="{name: 'about'}">About</router-link>
    </nav>
  </header>
</template>

<script>
  export default {}
</script>