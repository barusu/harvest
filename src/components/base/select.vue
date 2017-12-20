<template>
  <div class="o-select" :class="type">
    <span v-html="label"></span>
    <select class="select" v-model="field" :class="{'placeholder': !field}">
      <option value="" v-html="placeholder" disabled></option>
      <option :value="i.value" v-for="i in data" v-html="i.label">test</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
      value: [String, Number],
      placeholder: String,
      type: {
        type: String,
        default: 'base'
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      field: {
        set(v) {
          this.$emit('input', v);
        },
        get() {
          return this.value;
        }
      }
    }
  };
</script>

<style lang="scss">
  .o-select {
    width: 100%;
    font-size: .12rem;
    &.single {
      display: block;
      border-bottom: 1px solid #ddd;
      > span {
        display: block;
        line-height: 1.5;
      }
    }
    .select {
      display: block;
      width: 100%;
      padding: 0 .2em;
      border: 0;
      font-size: .14rem;
      line-height: 2;
      height: .28rem;
      color: #555;
      background: transparent;
      outline: none;
      &.placeholder {
        color: #aaa;
        font-size: 12px;
      }
    }
  }
</style>