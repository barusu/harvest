<template>
  <main class="addview">
    <p>添加卡片</p>
    <div class="content">
      <div class="template">
        <div class="item-wrapper">
          <o-box-pic class="content"></o-box-pic>
        </div>
      </div>
      <div class="config">
        <div class="preview">
          <div :is="preview" :type="pictype"></div>
        </div>
        <div class="form">
          <p>
            <o-input label="URL" placeholder="请输入图片链接"></o-input>
          </p>
          <p>
            <o-radio-group :data="pictypes" v-model="pictype" class="s"></o-radio-group>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import oBoxPic from '@/components/ui/box-pic';
  import oInput from '@/components/base/input';
  import oRadioGroup from '@/components/base/radioGroup';

  export default {
    components: {
      oBoxPic,
      oInput,
      oRadioGroup
    },
    data() {
      return {
        pictypes: [
          {name: '裁剪图片', value: 'cover', disabled: false},
          {name: '完整图片', value: 'contain', disabled: false}
        ],
        pictype: 'cover'
      };
    },
    methods: {
    },
    computed: {
      preview() {
        return 'oBoxPic';
      }
    }
  };
</script>

<style lang="scss">
  .addview {
    font-size: .16rem;
    > p {
      padding: 0 5%;
      font-size: 24px;
      line-height: 2;
      text-align: left;
    }
    > .content {
      padding: 0 5%;
    }
    .template {
      float: left;
      width: 50%;
      min-height: 300px;
      background: #fff;
    }
    .config {
      overflow: hidden;
      min-height: 300px;
      padding-left: .2rem;
    }
    .form {
      p {
        text-align: left;
        margin-bottom: 1em;
      }
    }
    .preview {
      position: relative;
      text-align: center;
      border: .1rem solid transparent;
      > div {
        position: absolute;
        left: 25%;
        width: 50%;
        height: 100%;
        background: #ccc;
      }
      &::after {
        content: '';
        display: block;
        padding-bottom: 30.9%;
      }
    }
    .item-wrapper {
      float: left;
      position: relative;
      width: 33.33%;
      border: 5px solid #fff;
      &::after {
        content: '';
        display: block;
        padding-bottom: 61.8%;
      }
      .content {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #eee;
      }
    }
  }
</style>