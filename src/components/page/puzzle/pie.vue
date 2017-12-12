<template>
  <div class="puzzle-wrapper side">
    <div class="preview">
      <div class="content">
        <o-chart-pie class="components" :option="op"></o-chart-pie>
      </div>
    </div>
    <div class="config">
      <div class="tabs">
        <div class="tab" :class="{'select': tabIndex == 0}" @click="updateBar(0)" ref="tab0">图表数据</div>
        <div class="tab" :class="{'select': tabIndex == 1}" @click="updateBar(1)" ref="tab1">图例</div>
        <div class="bar" :style="barStyle"></div>
      </div>
      <div class="swiper-container" id="pie_swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide form">
            <p>
              <o-input label="标题" placeholder="请输入图表标题" v-model="op.title" type="single"></o-input>
            </p>
            <p>
              <o-input label="系列名称" placeholder="请输入系列名称" v-model="op.seriesName" type="single"></o-input>
            </p>
            <p>
              <o-input label="数据源" placeholder="请输入链接" v-model="url" type="single" @blur="updateUrl"></o-input>
            </p>
            <p>
              <o-select label="图例数据项" placeholder="请选择图例数据的属性" type="single" :data="keys" v-model="op.dataX"></o-select>
            </p>
            <p>
              <o-select label="数据项" placeholder="请选择显示数据的属性" type="single" :data="keys" v-model="op.dataY"></o-select>
            </p>
          </div>
          <o-legend class="swiper-slide" :option="op"></o-legend>
          <div class="swiper-slide">Slide 3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import oChartPie from '@/components/ui/chart-pie';
  import oLegend from '@/components/page/puzzle/legend';
  import $ from '@/libs/ajax';
  import Swiper from '@/libs/swiper.js';

  export default {
    components: {
      oLegend,
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
        data: [],
        keys: [],
        op: {
          component: 'oChartPie',
          title: '',
          seriesName: '',
          url: '',
          dataX: '',
          dataY: '',
          // legend
          legendShow: true,
          legendType: 'plain'
        },
        url: '',
        tabIndex: 0,
        bar: {
          left: 0,
          width: 0
        }
      };
    },
    watch: {
      op: {
        deep: true,
        handler() {
          if(this.op.url && this.op.dataX && this.op.dataY) this.$emit('update', this.op);
        }
      },
      tabIndex() {
        if(this.swiper) {
          this.swiper.slideTo(this.tabIndex);
        }
      }
    },
    methods: {
      updateBar(index) {
        if(this.$refs['tab' + index]) {
          this.tabIndex = index;
          this.bar.left = this.$refs['tab' + index].offsetLeft;
          this.bar.width = this.$refs['tab' + index].clientWidth;
        }
      },
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
      },
      initSwiper() {
        this.swiper = new Swiper('#pie_swiper', {
          initialSlide: 0,
          speed: 680,
          autoHeight: true,
          simulateTouch: false,
          allowTouchMove: false
        });
      }
    },
    computed: {
      barStyle() {
        return {
          left: this.bar.left + 'px',
          width: this.bar.width + 'px'
        };
      }
    },
    mounted() {
      this.op.title = this.option.title || '';
      this.op.seriesName = this.option.seriesName || '';
      this.op.dataX = this.option.dataX || '';
      this.op.dataY = this.option.dataY || '';
      this.op.legendShow = this.option.legendShow === false ? false : true;
      this.op.legendType = this.option.legendType || 'plain';
      this.url = this.op.url = this.option.url || 'https://easy-mock.com/mock/59b9e6b9e0dc663341a92e27/front/chart?type=dd';
      if(this.url) this.updateUrl();
      this.$forceUpdate();
      this.$nextTick(() => {
        this.updateBar(0);
        this.initSwiper();
      });
    }
  };
</script>

<!-- all style in editView.vue -->