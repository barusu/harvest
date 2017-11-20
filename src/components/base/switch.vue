<template>
  <label class="o-switch" :class="{'disabled': disabled}">
    <span class="txt"><slot></slot></span>
    <input class="ck" type="checkbox" v-model="field" :disabled="disabled">
    <span class="cricle" :class="{'loading': loading}"></span>
  </label>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: ['value', 'disabled', 'loading'],
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
  label.o-switch {
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    line-height: 1;
    vertical-align: middle;
    user-select: none;
    &.s {
      font-size: 14px;
    }
    &.xs {
      font-size: 12px;
      &::before {
        border-width: 2px;
      }
    }
    &.disabled {
      cursor: not-allowed;
    }
    .txt {
      vertical-align: text-top;
      user-select: none;
    }
    .cricle {
      position: relative;
      display: inline-block;
      width: 3em;
      height: 1.5em;
      border-radius: .75em;
      vertical-align: sub;
      background: #09f;
      filter: grayscale(100%);
      transition: all .35s;
      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        display: block;
        width: 1.5em;
        height: 1.5em;
        border: 3px solid transparent;
        border-radius: 50%;
        background: #fff no-repeat center / contain;
        background-clip: content-box;
        transition: all .35s cubic-bezier(.78,.14,.15,.86);
      }
      &:active::before {width: 1.7em; }
      &.loading {
         &::before {
           background-image: url("../../assets/loading.gif");
         }
      }
    }
    .ck {
      position: absolute;
      clip: rect(0,0,0,0);
      &:checked + span {
        filter: grayscale(0%);
        &::before {left: 50%; }
        &:active::before {left: 1.3em; }
      }
    }
  }
</style>