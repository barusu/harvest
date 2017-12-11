<template>
  <div class="puzzle-wrapper side">
    <div class="preview">
      <div class="content">
        <o-box-pic class="components" :option="op"></o-box-pic>
      </div>
    </div>
    <div class="config">
      <div class="form">
        <p>
          <o-input label="URL" placeholder="请输入图片链接" v-model="url" @click="op.url = url" @blur="op.url = url"></o-input>
        </p>
        <p>
          <o-radio-group :data="types" v-model="op.type" class="s"></o-radio-group>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import oBoxPic from '@/components/ui/box-pic';

  export default {
    components: {
      oBoxPic
    },
    props: {
      option: {
        type: Object,
        default() {
          return {
            component: 'oBoxPic',
            type: 'cover',
            url: ''
          };
        }
      }
    },
    data() {
      return {
        url: '',
        types: [
          {name: '裁剪图片', value: 'cover', disabled: false},
          {name: '完整图片', value: 'contain', disabled: false}
        ],
        op: {
          component: 'oBoxPic',
          type: 'cover',
          url: ''
        }
      };
    },
    watch: {
      op: {
        deep: true,
        handler() {
          this.$emit('update', this.op);
        }
      }
    },
    methods: {},
    mounted() {
      this.op.url = this.url = this.option.url || '';
      this.op.type = this.option.type = 'cover';
      this.$forceUpdate();
    }
  };
</script>

<!-- all style in editView.vue -->