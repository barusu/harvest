<template>
  <div class="o-message">
    <div>
      <div class="o-message-content" :class="type">
        <span class="message-icon" v-if="icon" :class="icon">
          <o-svg :type="icon"></o-svg>
        </span>
        <span v-html="message"></span>
      </div>
    </div>
  </div>
</template>

<script>
  const icons = {
    success: 'ok',
    warning: 'warn'
  };

  export default {
    data() {
      return {
        type: '',
        message: '',
        closed: null,
        duration: 300000,
        isClose: false,
        icon: ''
      };
    },
    methods: {
      close() {
        this.isClose = true;
        if (typeof this.closed === 'function') {
          this.closed();
        }
        this.$el.parentNode.removeChild(this.$el);
      },
      keydown(e) {
        if (e.keyCode === 27) { // esc关闭消息
          if (!this.isClose) {
            this.close();
          }
        }
      },
      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.isClose) {
              this.close();
            }
          }, this.duration);
        }
      }
    },
    mounted() {
      this.startTimer();
      if(this.type && !this.icon) {
        this.icon = icons[this.type];
      }
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>

<style lang="scss" scoped>
  .o-message {
    position: fixed;
    top: 16px;
    left: 0;
    width: 100%;
    z-index: 210;
    pointer-events: none;
    font-size: .14rem;
    > div {
      margin: auto;
    }
    .o-message-content {
      padding: 10px 16px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      background: #fff;
      display: inline-block;
      pointer-events: all;
      > span {
        line-height: 1.5;
        display: inline-block;
      }
    }
    .message-icon {
      position: relative;
      top: -2px;
      width: 1.5em;
      height: 1.5em;
      &.ok {color: #52c41a; }
      &.warn {color: #faad14; }
      &.error{color: #f5222d; }
    }
  }
</style>