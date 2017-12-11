<template>
  <main class="edit-view" :style="wrapperStyle" ref="wra">
    <div class="opration">
      <p class="section"><o-button type="info" @click="save" :disabled="!verify">保存</o-button></p>
      <p class="section"><o-input type="single" label="标题" v-model="title"></o-input></p>
      <div class="section">
        <p>类型</p>
        <div class="svg-content clearfix">
          <div class="type-item" v-for="t in types" :class="{'selected': t.name == type}"><o-svg :type="t.name" :colors="t.colors || []" @click="selectType(t)"></o-svg><span v-html="t.txt"></span></div>
        </div>
      </div>
    </div>
    <div class="content" :is="Type" :option="option" @update="update"></div>
  </main>
</template>

<script>
  import picView from '@/components/page/puzzle/pic';
  import pieView from '@/components/page/puzzle/pie';
  import auth from '@/libs/relic';
  import $ from '@/libs/ajax';

  /* eslint-disable indent */
  export default {
    components: {
      picView,
      pieView
    },
    data() {
      return {
        pUrl: '/',
        id: 0,
        height: 0,
        title: '',
        type: '',
        types: [
          {name: 'pic', txt: '图片'},
          {name: 'pie', txt: '饼图', colors: [, '#50bfffbb', '#50bfff77']}
        ],
        option: {
          component: ''
        },
        cache: null
      };
    },
    methods: {
      update(op) {
        for(var i in op) {
          this.option[i] = op[i];
        }
      },
      save() {
        var params = {
          a: this.type,
          b: this.title,
          f: JSON.stringify(this.option)
        };
        if(this.id) {
          params.id = this.id;
          $.post('resource/game/edit', params, data => {
            if(data == '1') {
              this.$msg.success('修改成功');
              this.$router.push(this.pUrl);
            }else {
              this.$msg.error('修改失败');
            }
          });
        }else {
          params.type = auth.uid * 10000 + 210;
           $.post('resource/game/add', params, data => {
            if(data == '1') {
              this.$msg.success('修改成功');
              this.$router.push(this.pUrl);
            }else {
              this.$msg.error('保存失败');
            }
          });
        }
      },
      selectType(type) {
        this.type = type.name;
      },
      resize() {
        this.height = document.documentElement.clientHeight;
      },
      loadData() {
        $.get(`resource/game/view?id=${this.id}`, data => {
          if(data && data.type == auth.uid * 10000 + 210 && data.f) {
            this.cache = data;
            try {
              this.option = JSON.parse(data.f);
            }catch(e) {
              this.option = {};
              console.warn(e);
            }
            if(this.types.some(i => {return i.name == data.a;}) !== -1) this.type = data.a;
            this.title = data.b;
          }
        });
      }
    },
    computed: {
      verify() {
        if(this.cache) {
          return this.type != this.cache.a || this.title != this.cache.b || JSON.stringify(this.option) != this.cache.f;
        }else {
          return this.type && this.option.component;
        }
      },
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
          svg {
            filter: grayscale(0%);
          }
        }
      }
      svg {
        display: block;
        width: 84%;
        margin: 0 auto .5em;
        filter: grayscale(100%);
        cursor: pointer;
      }
    }
  }
</style>
<!-- puzzle style -->
<style lang="scss">
  .puzzle-wrapper {
    padding: 1em 0;
    .preview {
      .content {
        position: relative;
        width: 50%;
        min-width: 300px;
        margin: auto;
        overflow: hidden;
        &::after {
          content: "";
          display: block;
          margin-bottom: 61.8%;
        }
      }
      .components {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #eee;
      }
    }
    .config {
      margin-top: 1em;
      padding: 1em;
      border-top: 1px solid #ddd;
    }
    .form {
      max-width: 800px;
      margin: auto;
      > p {
        margin-bottom: 1em;
        text-align: left;
      }
    }
    &.side {
      .preview {
        float: left;
        width: 40%;
        height: 100%;
        padding: 0 1em;
        &::after {
          content: none;
        }
        .content {
          width: 100%;
          &::after {
            margin-bottom: 92.7%;
          }
        }
      }
      .config {
        overflow: hidden;
        border: none;
        margin: 0;
        padding: 0 1em 1em 0;
      }
    }
    .tabs {
      overflow: hidden;
      font-size: .14rem;
      border-bottom: 2px solid #ccc;
      margin-bottom: 1em;
      .tab {
        float: left;
        height: 2em;
        padding: 0 1em;
      }
    }
  }
</style>