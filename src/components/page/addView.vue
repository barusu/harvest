<template>
  <main class="addview">
    <p>添加卡片</p>
    <div class="content">
      <div class="template">
        <div class="item-wrapper">
          <div class="content"></div>
        </div>
      </div>
      <div class="config">
        <div class="preview"></div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  .addview {
    > p {
      padding: 0 5%;
      font-size: 24px;
      line-height: 2;
      text-align: left;
    }
    .content {
      padding: 0 5%;
    }
    .template {
      float: left;
      width: 50%;
      min-height: 300px;
      background: #fff;
    }
    .config {
      overflow: hidden;
      min-height: 300px;
    }
    .item-wrapper {
      float: left;
      position: relative;
      width: 33.33%;
      &::after {
        content: '';
        display: block;
        padding-bottom: 61.8%;
      }
      .content {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 10px;
        border: 5px solid #fff;
        background: #eee;
      }
    }
  }
</style>