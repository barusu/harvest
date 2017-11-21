<template>
  <div class="o-card">
    <div class="content">
      <div class="preview">
        <div class="lang">
          <span :class="i" v-for="i in lang"></span>
        </div>
        <div class="stage"><slot></slot></div>
      </div>
      <div class="info">
        <p class="title" v-html="title"></p>
        <a class="author" :href="url" v-html="name"></a>
        <time v-html="time"></time>
      </div>
    </div>
  </div>
</template>

<script>
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  export default {
    props: ['author', 'date', 'title', 'lang'],
    computed: {
      url() {
        if(this.author && this.author.weibo) {
          return this.author.weibo;
        }
        return;
      },
      name() {
        if(this.author && this.author.name) {
          return this.author.name;
        }
        return;
      },
      time() {
        var d;
        if(this.date) {
          d = new Date(this.date);
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${week[d.getDay()]}`;
        }
        return;
      }
    }
  }
</script>

<style lang="scss">
  $uicardborder: #ddd;
  .o-card {
    position: relative;
    border-bottom: 1px solid $uicardborder;
    border-right: 1px solid $uicardborder;
    box-shadow: -1px 0 0 0 $uicardborder, 0 -1px 0 0 $uicardborder, -1px -1px 0 0 $uicardborder;
    background: #fff;
    transition: all .34s;
    &:hover {
      z-index: 8;
      box-shadow: 0 1px 6px rgba(0,0,0,.3);
      border-right: 1px solid transparent;
      border-bottom: 1px solid #fff;
      .content {
        > div {
          margin-right: -1px;
        }
      }
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 61.8%;
    }
    &.dark {
      .preview {
        background: #333;
      }
      .lang {
        filter: brightness(160%);
      }
    }
    .content {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: .36rem;
      .info {
        height: 3em;
        margin-top: -3em;
        font-size: .16rem;
        background: #fff;
      }
    }
    .preview {
      height: 100%;
      padding: .16rem 0 .48rem;
      background: #eee;
      .stage {
        height: 100%;
        font-size: .12px;
        line-height: 1;
        padding: 1em;
      }
    }
    .lang {
      font-size: 0;
      line-height: 1;
      text-align: left;
      padding: 0 .16rem;
      margin-top: -.16rem;
      > span {
        display: inline-block;
        font-size: 12px;
        line-height: 1.5;
        height: 1.5em;
        margin-right: 1em;
        &::before {
          content: '';
          display: inline-block;
          width: .5em;
          height: .5em;
          margin-right: .25em;
          border-radius: 50%;
        }
      }
      .css::before {background: #4caf50;}
      .css::after {
        content: 'css';
        color: #4caf50;
      }
      .js::before {background: #d32f2f;}
      .js::after {
        content: 'js';
        color: #d32f2f;
      }
      .html::before {background: #8e24aa;}
      .html::after {
        content: 'html';
        color: #8e24aa;
      }
    }
    .info {
      padding: 0 1em;
      .author {
        float: left;
        font-size: 12px;
        line-height: 1;
        padding: 0;
        font-style: italic;
        color: #09f;
        margin-right: 1em;
        &::before {
          content: 'By ';
          color: #444;
        }
      }
      .title {
        font-size: 1.5em;
        line-height: 1;
        padding: .04rem 0;
        text-align: left;
        overflow: hidden;
      }
      time {
        float: left;
        font-size: 12px;
        height: .16rem;
        line-height: 1;
        color: #999;
      }
    }
  }
</style>