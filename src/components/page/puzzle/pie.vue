<template>
  <div class="puzzle-wrapper side">
    <div class="preview">
      <div class="content">
        <o-chart-pie class="components" :option="op"></o-chart-pie>
      </div>
    </div>
    <div class="config">
      <div class="tabs">
        <div class="tab">图表数据</div>
        <div class="tab">图表数据</div>
      </div>
      <div class="form">
        <p>
          <o-input label="标题" placeholder="请输入图表标题" v-model="op.title" type="single"></o-input>
        </p>
        <p>
          <o-input label="系列名称" placeholder="请输入系列名称" v-model="op.seriesName" type="single"></o-input>
        </p>
        <p>
          <o-input label="数据源" placeholder="请输入链接" v-model="url" type="single" @blur="updateUrl"></o-input>
          <!-- <o-radio-group :data="types" v-model="op.type" class="s"></o-radio-group> -->
        </p>
        <p>
          <o-select label="图例数据项" placeholder="请选择图例数据的属性" type="single" :data="keys" v-model="op.dataX"></o-select>
        </p>
        <p>
          <o-select label="数据项" placeholder="请选择显示数据的属性" type="single" :data="keys" v-model="op.dataY"></o-select>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import oChartPie from '@/components/ui/chart-pie';
  import $ from '@/libs/ajax';

  export default {
    components: {
      oChartPie
    },
    props: {
      option: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        // types: [
        //   {name: '裁剪图片', value: 'cover', disabled: false},
        //   {name: '完整图片', value: 'contain', disabled: false}
        // ],
        data: [],
        keys: [],
        op: {
          component: 'oChartPie',
          title: '',
          seriesName: '',
          url: '',
          dataX: '',
          dataY: ''
        },
        url: ''
      };
    },
    watch: {
      op: {
        deep: true,
        handler() {
          if(this.op.url && this.op.dataX && this.op.dataY) this.$emit('update', this.op);
        }
      }
    },
    methods: {
      updateUrl() {
        $.get(this.url, data => {
          if(Array.isArray(data.data)) {
            this.data = data.data;
            if(data.data.length) {
              this.keys = [];
              for(var i in data.data[0]) {
                this.keys.push({value: i, label: i});
              }
            }
          }
        });
      }
    },
    mounted() {
      this.op.title = this.option.title || '';
      this.op.seriesName = this.option.seriesName || '';
      this.op.dataX = this.option.dataX || '';
      this.op.dataY = this.option.dataY || '';
      this.url = this.op.url = this.option.url || 'https://easy-mock.com/mock/59b9e6b9e0dc663341a92e27/front/chart?type=dd';
      if(this.url) this.updateUrl();
      this.$forceUpdate();
    }
  };
</script>

<!-- all style in editView.vue -->