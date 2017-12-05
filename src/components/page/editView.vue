<template>
  <main class="edit-view" :style="wrapperStyle" ref="wra">
    <div class="opration">
      <p class="section"><o-button type="info" @click="save">保存</o-button></p>
      <p class="section"><o-input type="single" label="标题" v-model="title"></o-input></p>
      <div class="section">
        <p>类型</p>
        <div class="svg-content clearfix">
          <div class="type-item" v-for="t in types" :class="{'selected': t == type}"><o-svg :type="t" @click="selectType(t)"></o-svg><span>图片</span></div>
          <div class="type-item"><o-svg type="pic" @click="selectType('pic')"></o-svg><span>图片</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
          <div class="type-item"><o-svg type="txt"></o-svg><span>文本</span></div>
        </div>
      </div>
    </div>
    <div class="content" :is="Type" :option="option"></div>
  </main>
</template>

<script>
  import picView from '@/components/page/puzzle/pic';
  import auth from '@/libs/relic';
  import $ from '@/libs/ajax';

  /* eslint-disable indent */
  export default {
    components: {
      picView
    },
    data() {
      return {
        id: 0,
        height: 0,
        title: '',
        type: '',
        types: ['pic', 'txt'],
        option: {}
      };
    },
    methods: {
      save() {
        var params = {
          a: this.type,
          b: this.title,
          f: JSON.stringify(this.option)
        };
        if(this.id) {
          params.id = this.id;
          $.post('resource/game/edit', params, data => {
            console.log(data);
          });
        }else {
          params.type = auth.uid * 10000 + 210;
           $.post('resource/game/add', params, data => {
            console.log(data);
          });
        }
      },
      selectType(type) {
        this.type = type;
      },
      resize() {
        this.height = document.documentElement.clientHeight;
      },
      loadData() {
        $.get(`resource/game/view?id=${this.id}`, data => {
          if(data && data.type == auth.uid * 10000 + 210 && data.f) {
            try {
              this.option = JSON.parse(data.f);
            }catch(e) {
              this.option = {};
              console.warn(e);
            }
            if(this.types.indexOf(data.a) !== -1) this.type = data.a;
            this.title = data.b;
          }
        });
      }
    },
    computed: {
      Type() {
        if(this.type) {
          return this.type + 'View';
        }
        return;
      },
      wrapperStyle() {
        return {
          height: this.height - (this.$refs.wra && this.$refs.wra.offsetTop || 0) + 'px'
        };
      }
    },
    mounted() {
      this.id = (this.$route.params.id || 0) - 0;
      if(this.id) this.loadData();
      this.resize();
      window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resize);
    }
  };
</script>

<style lang="scss">
  .edit-view {
    font-size: .16rem;
    > .opration {
      float: right;
      width: 4rem;
      height: 100%;
      padding: .05rem 0 0;
      background: #fff;
      box-shadow: -1px 0 6px rgba(0,0,0,.1);
      text-align: left;
      overflow-x: hidden;
      overflow-y: auto;
      .section {
        padding: .1rem 1em;
        border-top: 1px solid #eee;
        &:first-child {
          border: none;
        }
        p {
          font-size: 12px;
        }
      }
    }
    > .content {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .svg-content {
      margin-top: .5em;
      .type-item {
        float: left;
        width: 25%;
        padding: .5em .5em 1em;
        font-size: 12px;
        color: #ccc;
        transition: all .34s;
        &:hover {
          box-shadow: 0 0 3px rgba(0,0,0,.15);
        }
        > span {
          display: block;
          text-align: center;
          line-height: 1;
          color: #666;
          transition: all .34s;
        }
        &.selected {
          color: #50bfff;
          box-shadow: 0 0 3px rgba(0,0,0,.1);
          > span {
            color: #0af;
          }
        }
      }
      svg {
        display: block;
        width: 90%;
        margin: auto;
        cursor: pointer;
      }
    }
  }
</style>