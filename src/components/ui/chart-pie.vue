<template>
  <div class="o-chart pie" :class="{'no-title': !option.title}">
    <div class="chart-content">
      <div class="chart-head">
        <span class="title" v-html="option.title"></span>
      </div>
      <div class="chart-wrapper">
        <div class="chart" ref="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import $ from '@/libs/ajax';

  export default {
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
        chart: null,
        op: null,
        lock: false,
        url: ''
      };
    },
    watch: {
      option: {
        deep: true,
        handler: 'loadDate'
      }
    },
    methods: {
      loadDate() {
        if(this.option.url && this.url != this.option.url) {
          this.url = this.option.url;
          if(this.lock) {
            this.update();
            return;
          }
          this.lock = true;
          $.get(this.url, data => {
            this.data = data.data;
            this.update();
          });
        }else this.update();
      },
      update() {
        if(this.chart) {
          this.op = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              show: this.option.legendShow,
              type: this.option.legendType,
              orient: this.option.legendOrient || 'horizontal',
              left: this.option.legendX || 'right',
              top: this.option.legendY || 'middle',
              formatter: function (name) {
                return echarts.format.truncateText(name, 60, '12px Microsoft Yahei', '…');
              },
              tooltip: {
                show: true
              },
              x: 'left',
              data: this.pieData.map(i => i.name)
            },
            series: [
              {
                name: this.option.seriesName || '',
                type: 'pie',
                data: this.pieData
              }
            ]
          };
          // 根据图例位置对图表进行偏移
          if(this.option.legendShow) {
            if(this.option.legendOrient == 'horizontal') {
              if(this.option.legendY == 'top') this.op.series[0].center = ['50%', '55%'];
              if(this.option.legendY == 'bottom') this.op.series[0].center = ['50%', '45%'];
            }else {
              if(this.option.legendX == 'left') this.op.series[0].center = ['60%', '50%'];
              if(this.option.legendX == 'right') this.op.series[0].center = ['40%', '50%'];
            }
          }
          // 切换图表类型
          switch(this.option.chartType) {
          case 'pie': break;
          case 'roseRadius':
            this.op.series[0].roseType = 'radius';
            break;
          case 'roseArea':
            this.op.series[0].roseType = 'area';
            break;
          case 'ringRoseRadius':
            this.op.series[0].roseType = 'radius';
            this.op.series[0].radius = ['20%', '70%'];
            break;
          case 'ringRoseArea':
            this.op.series[0].roseType = 'area';
            this.op.series[0].radius = ['20%', '70%'];
            break;
          default:
            this.op.series[0].radius = ['50%', '70%'];
            this.op.series[0].avoidLabelOverlap = false;
            this.op.series[0].label = {
              normal: {show: false, position: 'center'},
              emphasis: {show: true, textStyle: {fontSize: '14', fontWeight: 'bold'}}
            };
            this.op.series[0].labelLine = {normal: {show: false}};
          }
          this.chart.setOption(this.op, true);
          this.$nextTick(() => {
            this.chart.resize();
          });
        }
      }
    },
    computed: {
      pieData() {
        if(this.option.dataX && this.option.dataY) {
          return this.data.map(i => ({value: i[this.option.dataY], name: i[this.option.dataX]}));
        }else {
          return [];
        }
      },
      style() {
        var t = {};
        if(this.option.url) t.backgroundImage = `url('${this.option.url}')`;
        if(this.option.type == 'contain') t.backgroundSize = 'contain';
        return t;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart);
        this.loadDate();
      });
    },
    beforeDestroy () {
      this.chart.dispose();
    }
  };
</script>

<!-- public style in App.vue -->
<style lang="scss">
  .o-chart {
    
  }
</style>