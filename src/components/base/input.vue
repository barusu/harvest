<template>
  <label class="input-wrapper">
    <span v-html="label" class="label" @click="click"></span>
    <input type="text" v-model="field" :placeholder="placeholder">
  </label>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: ['label', 'value', 'placeholder'],
    methods: {
      click() {
        this.$emit('click');
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
  .input-wrapper {
    display: inline-table;
    width: 100%;
    font-size: .12rem;
    > * {
      display: table-cell;
    }
    .label {
      width: 1px;
      height: 2.5em;
      padding: 0 .1rem;
      border-radius: 4px 0 0 4px;
      border: 1px solid #bbb;
      border-right: 0;
      line-height: 2.4;
      vertical-align: middle;
    }
    input {
      width: 100%;
      height: 2.5em;
      padding: 0 1em;
      vertical-align: middle;
      background: #fff;
      border: 1px solid #bbb;
      border-radius: 0 4px 4px 0;
      line-height: 2.5;
      &:hover {
        border-color: #999;
      }
      &:focus {
        border-color: #09f;
      }
    }
  }
</style>