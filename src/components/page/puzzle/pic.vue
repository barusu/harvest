<template>
  <div class="puzzle-wrapper side">
    <div class="preview">
      <div class="content">
        <o-box-pic class="components" :option="option"></o-box-pic>
      </div>
    </div>
    <div class="config">
      <div class="form">
        <p>
          <o-input label="URL" placeholder="请输入图片链接" v-model="url" @click="option.url = url" @blur="option.url = url"></o-input>
        </p>
        <p>
          <o-radio-group :data="types" v-model="option.type" class="s"></o-radio-group>
        </p>
        <p>
          <o-button type="info" @click="save">保存</o-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import oBoxPic from '@/components/ui/box-pic';
  import oInput from '@/components/base/input';
  import oButton from '@/components/base/button';
  import oRadioGroup from '@/components/base/radioGroup';

  export default {
    components: {
      oBoxPic,
      oInput,
      oButton,
      oRadioGroup
    },
    data() {
      return {
        option: {
          type: 'cover'
        },
        url: '',
        types: [
          {name: '裁剪图片', value: 'cover', disabled: false},
          {name: '完整图片', value: 'contain', disabled: false}
        ]
      };
    },
    watch: {
      option: {
        deep: true,
        handler() {
          console.log('u');
        }
      }
    },
    methods: {
      update() {
        console.log('u');
      },
      save() {}
    }
  };
</script>

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
      }
    }
    .config {
      margin-top: 1em;
      padding: 1em;
      border-top: 1px solid #ddd;
    }
    .form {
      max-width: 500px;
      margin: auto;
      > p {
        margin-bottom: 1em;
        text-align: left;
      }
    }
    &.side {
      .preview {
        float: left;
        width: 50%;
        height: 100%;
        padding: 0 1em;
        &::after {
          content: none;
        }
        .content {
          width: 100%;
        }
      }
      .config {
        overflow: hidden;
        border: none;
        margin: 0;
        padding: 0 1em 1em 0;
      }
    }
  }
</style>