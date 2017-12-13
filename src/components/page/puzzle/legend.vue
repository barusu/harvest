<template>
  <div class="form legend">
    <p class="line">
      <o-switch class="s" v-model="option.legendShow"></o-switch>
      <span>是否显示图例</span>
    </p>
    <p class="line">
      <o-radio-group :data="types" v-model="option.legendType" class="s" :disabled="!option.legendShow"></o-radio-group>
      <span>图例类型</span>
    </p>
    <p class="line">
      <o-radio-group :data="top" v-model="option.legendY" class="s" :disabled="!option.legendShow"></o-radio-group>
      <o-radio-group :data="left" v-model="option.legendX" class="s" :disabled="!option.legendShow"></o-radio-group>
      <span>图例位置[x, y]</span>
    </p>
    <p class="line">
      <o-radio-group :data="orients" v-model="option.legendOrient" class="s" :disabled="!option.legendShow"></o-radio-group>
      <span>图例方向</span>
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
        ],
        orients: [
          {name: '水平', value: 'horizontal'},
          {name: '垂直', value: 'vertical'}
        ],
        left: [
          {name: '左', value: 'left'},
          {name: '中', value: 'center'},
          {name: '右', value: 'right'}
        ],
        top: [
          {name: '上', value: 'top'},
          {name: '中', value: 'middle'},
          {name: '下', value: 'bottom'}
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
      margin-left: .06rem;
    }
  }
</style>