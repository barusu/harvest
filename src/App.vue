<template>
  <div id="app">
    <o-header></o-header>
    <router-view/>
  </div>
</template>

<script>
  import header from '@/components/header';

  export default {
    name: 'app',
    components: {
      oHeader: header
    }
  }
</script>

<style>
  html {
    font-size: 100px;
  }
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
    color: #2c3e50;
    background: #fafafa;
  }
  /* reset css */
  html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, a, cite, img, sub, sup, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    border: 0;
    margin: 0;
    padding: 0;
    font-weight: normal;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, main {
    display: block;
  }
  button {
    outline: none;
  }
  ol, ul {
    margin: 0;
    padding: 0;
  }
  ol, ul, li {
    list-style: none;
  }
  i, em {
    font-style: normal;
  }
  blockquote {
    quotes: none;
  }
  blockquote:before, blockquote:after {
    content: '';
    content: none;
  }
  a {
    outline: none;
    text-decoration: none;
  }
  input, textarea{
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    outline: none;
    border: 0;
    margin: 0;
    padding: 0;
  }
  select, option{
    font-family: inherit;
  }
  *::before,
  *::after,
  * {
    box-sizing: border-box;
  }
  .clearfix::after {
    content: "";
    display: table;
    clear: both;
    float: none;
    *zoom: 1;
  }
</style>

<!-- chart style -->
<style lang="scss">
  .o-chart {
    font-size: .14rem;
    .chart-content {
      height: 100%;
      padding: .5em 1em;
      background: #fff;
    }
    .chart-head {
      text-align: left;
      height: 3em;
      .title {
        display: inline-block;
        font-weight: 600;
        line-height: 3;
        text-indent: 1em;
      }
    }
    .chart-wrapper {
      height: 100%;
      margin-top: -3em;
      padding-top: 3em;
      .chart {
        height: 100%;
      }
    }
    &.no-title {
      .chart-head {
        display: none;
      }
      .chart-wrapper {
        margin: 0;
        padding: 0;
      }
    }
  }
</style>