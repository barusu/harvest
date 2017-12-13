<template>
  <div class="radio-group-wrapper">
    <label class="o-radio" :class="{'disabled': disabled || i.disabled}" v-for="i in data">
      <input class="ck" type="radio" :name="name" v-model="field" :disabled="disabled || i.disabled" :value="i.value">
      <span class="txt" v-html="i.name"></span>
    </label>
  </div>
</template>

<script>
  var seq = 0;

  export default {
    data() {
      return {
        seq: 0
      };
    },
    props: ['value', 'data', 'disabled'],
    computed: {
      name() {
        return `radio${this.seq}`;
      },
      field: {
        set(v) {
          this.$emit('input', v);
        },
        get() {
          return this.value;
        }
      }
    },
    created() {
      this.seq = ++seq;
    }
  };
</script>

<style lang="scss">
  $radiobordercolor: #bbb;
  .radio-group-wrapper {
    display: inline-block;
    font-size: 0;
    cursor: pointer;
    line-height: 1;
    vertical-align: middle;
    user-select: none;
    &.s {
      .txt {
        font-size: 12px;
      }
    }
    &.kuro {
      .txt {
        border-color: #121212;
        background: transparent;
        box-shadow: 0 2px 3px rgba(255,255,255,.05) inset, 0 1px 0 rgba(255,255,255,.1);
      }
      .disabled {
        .txt {
          background: transparent;
          color: #999;
        }
      }
      .o-radio {
        &:first-child .txt {
          box-shadow: 0 2px 3px rgba(255,255,255,.05) inset, 0 1px 0 rgba(255,255,255,.1);
        }
      }
      .ck:checked + .txt {
        background: transparent;
        border-color: #121212;
        box-shadow: 0 2px 3px rgba(0,0,0,.4) inset, 0 1px 0 rgba(255,255,255,.1);
      }
    }
    .txt {
      display: inline-block;
      font-size: .14rem;
      border: 1px solid $radiobordercolor;
      border-left-width: 0;
      padding: .5em 1em;
      vertical-align: middle;
      line-height: 1.3;
      cursor: pointer;
      background: #fff;
      transition: all .34s;
    }
    .disabled {
      .txt {
        background: #eee;
        filter: grayscale(100%);
        cursor: not-allowed;
      }
    }
    .ck {
      position: absolute;
      clip: rect(0,0,0,0);
      &:checked + .txt {
        background: #09f;
        color: #fff;
        border-color: #09f;
        box-shadow: -1px 0 0 0 #09f;
      }
    }
    .o-radio {
      &:first-child .txt {
        border-left-width: 1px;
        border-radius: 4px 0 0 4px;
        box-shadow: none;
      }
      &:last-child .txt {
        border-radius: 0 4px 4px 0;
      }
    }
  }
</style>