<template>
  <div class="form legend">
    <p class="line">
      <o-switch class="s" v-model="option.legendShow"></o-switch>
      <span>是否显示图例</span>
    </p>
    <p class="line">
      <o-radio-group :data="types" v-model="option.legendType" class="s"></o-radio-group>
      <span>图例类型</span>
    </p>
  </div>
</template>

<script>
  export default {
    props: ['option'],
    data() {
      return {
        types: [
          {name: '普通图例', value: 'plain'},
          {name: '滚动翻页', value: 'scroll'}
        ]
      }
    },
    mounted() {
      // if(!'legendShow' in this.option) this.$set(this.option, 'legendShow', true);
    }
  };
</script>

<style lang="scss">
  .legend {
    font-size: .14rem;
    .line {
      padding: 0 1em .5em;
      border-bottom: 1px solid #ddd;
    }
    .radio-group-wrapper {
      position: relative;
      top: -.08rem;
    }
    .radio-group-wrapper,
    .o-switch {
      float: right;
    }
  }
</style>