<template>
  <label class="button-wrapper">
    <span class="btn" @click="click"><slot></slot></span>
  </label>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: ['type'],
    methods: {
      click() {
        this.$emit('click');
      }
    }
  };
</script>

<style lang="scss">
  .button-wrapper {
    display: inline-block;
    .btn {
      display: inline-block;
      font-size: .14rem;
      padding: 0 1em;
      line-height: 2;
      border: 1px solid #999;
      border-radius: 4px;
      color: #444;
      user-select: none;
      cursor: pointer;
      &:hover {
        border-color: #09f;
        color: #09f;
      }
    }
  }
</style>