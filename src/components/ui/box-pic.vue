<template>
  <div class="box-pic">
    <div class="img" :style="style"></div>
  </div>
</template>

<script>
  export default {
    props: {
      option: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      style() {
        var t = {};
        if(this.option.url) t.backgroundImage = `url('${this.option.url}')`;
        if(this.option.type == 'contain') t.backgroundSize = 'contain';
        return t;
      }
    }
  };
</script>

<style lang="scss">
  .box-pic {
    .img {
      height: 100%;
      background: url('/src/assets/demo0.jpg') no-repeat center center / cover;
    }
  }
</style>