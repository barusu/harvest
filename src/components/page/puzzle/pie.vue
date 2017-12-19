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
        <div class="tab" :class="{'select': tabIndex == 2}" @click="updateBar(2)" ref="tab2">图表类型</div>
        <div class="tab" :class="{'select': tabIndex == 3}" @click="updateBar(3)" ref="tab3">其它</div>
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
          <div class="swiper-slide form">
            <div class="type-content clearfix">
              <div class="type-item" :class="{'selected': op.chartType == i.name}" v-for="i in types">
                <o-svg :type="i.svg" :colors="i.colors" @click="op.chartType = i.name"></o-svg>
                <span v-html="i.label"></span>
              </div>
            </div>
          </div>
          <div class="swiper-slide form legend">
            <p class="line">
              <o-switch class="s" v-model="op.tooltip"></o-switch>
              <span>是否显示提示框</span>
            </p>
            <p class="line">
              <o-radio-group :data="labels" v-model="op.labelStatus" class="s"></o-radio-group>
              <span>是否显示标签</span>
            </p>
            <p class="line">
              <o-radio-group :data="positions" v-model="op.labelPosition" class="s" :disabled="op.labelStatus == 'hidden'"></o-radio-group>
              <span>标签位置</span>
            </p>
          </div>
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
        types: [
          {name: 'pie', label: '饼图', svg: 'pie', colors: ['#50bfffff', '#50bfffbb', '#50bfff77']},
          {name: 'ring', label: '环形图', svg: 'pieRing', colors: ['#50bfffff', '#50bfffbb', '#50bfff77']},
          {name: 'roseRadius', label: '南丁格尔图', svg: 'pieRoseR', colors: ['', '#50bfffdd', '#50bfffff', '#50bfffaa', '#50bfffcc', '#50bfff88']},
          {name: 'roseArea', label: '南丁格尔图[半径]', svg: 'pieRoseA', colors: ['', '#50bfffdd', '#50bfffff', '#50bfffaa', '#50bfffcc', '#50bfff88']},
          {name: 'ringRoseRadius', label: '环形南丁格尔图', svg: 'pieRingRoseR', colors: ['', '#50bfffdd', '#50bfffff', '#50bfffaa', '#50bfffcc', '#50bfff88']},
          {name: 'ringRoseArea', label: '环形南丁格尔图[半径]', svg: 'pieRingRoseA', colors: ['', '#50bfffdd', '#50bfffff', '#50bfffaa', '#50bfffcc', '#50bfff88']}
        ],
        labels: [
          {name: '隐藏', value: 'hidden'},
          {name: '活动', value: 'emphasis'},
          {name: '显示', value: 'show'}
        ],
        positions: [
          {name: '外部', value: 'outside'},
          {name: '图内', value: 'inside'},
          {name: '中心', value: 'center'}
        ],
        data: [],
        keys: [],
        op: {
          component: 'oChartPie',
          title: '',
          seriesName: '',
          url: '',
          dataX: '',
          dataY: '',
          chartType: 'ring',
          // legend
          legendShow: true,
          legendType: 'plain',
          legendOrient: 'vertical',
          legendX: '',
          legendY: '',
          // 其它
          labelStatus: 'hidden',
          tooltip: true,
          labelPosition: 'outside'
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
      this.op.chartType = this.option.chartType || 'ring';
      this.op.legendShow = !(this.option.legendShow === false);
      this.op.legendType = this.option.legendType || 'plain';
      this.op.legendOrient = this.option.legendOrient || 'vertical';
      this.op.legendX = this.option.legendX || 'right';
      this.op.legendY = this.option.legendY || 'middle';
      this.op.labelStatus = this.option.labelStatus || 'hidden';
      this.op.labelPosition = this.option.labelPosition || 'outside';
      this.op.tooltip = this.option.tooltip !== false;
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