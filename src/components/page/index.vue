<template>
  <main class="index">
    <div class="content" ref="content">
      <div class="card" v-for="i in list" :style="i.style">
        <div class="card-body" @mousedown.self="move(i)">
          <div class="card-content"></div>
          <div class="se" @mousedown.self="resize"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  var seq = 0, ucw, uch, past = null, target = null, matrix;

  // 根据宽高寻找可放置的空位坐标
  function getPointInMatrix(matrix, w, h) {
    var poi = 0, x, y, t;
    /* eslint-disable no-constant-condition */
    while(true) {
      if(matrix[poi]) {
        x = 0;
        if(matrix[poi].some((n, i) => {
          if(n === 0) x++;
          else x = 0;
          if(x >= w) {
            y = 1;
            outer:
            while(true) {
              if(y >= h) {
                x = ++i;
                return true;
              }
              if(matrix[poi + y]) {
                for(t = 0; t < w; t++) {
                  if(matrix[poi + y][i - t] !== 0) break outer;
                }
                y++;
              }else {
                matrix.push(Array(12).fill(0));
                y++;
              }
            }
          }
          return false;
        })) break;
        poi++;
      }else matrix.push(Array(12).fill(0));
    }
    return {x: x - w, y: poi};
  }
  // 添加卡片到矩阵中
  function addBoxToMatrix(matrix, p) {
    var w, h;
    for(w = 0; w < p.w; w++) {
      for(h = 0; h < p.h; h++) {
        matrix[p.y + h][p.x + w] = p.id;
      }
    }
  }
  // 更新卡片位置
  function updateStyle(card) {
    if(!card.style) card.style = {};
    card.style.width = ucw * card.w + 'px';
    card.style.height = uch * card.h + 'px';
    card.style.left = ucw * card.x + 'px';
    card.style.top = uch * card.y + 'px';
  }
  function updateBox() {}
  // 鼠标移动事件
  function move(event){
    if(target) {
      var e = event ? event: window.event;
      if(past.type) {
        target.style.left = ucw * target.x + e.clientX - past.x + 'px';
        target.style.top = uch * target.y + e.clientY - past.y + 'px';
        target.nx = target.x + Math.round((e.clientX - past.x) / ucw);
        target.ny = target.y + Math.round((e.clientY - past.y) / uch);
        updateBox()
      }
    }
  }
  function over() {
    updateStyle(target);
    target = null;
  }

  export default {
    data() {
      return {
        list: [],
        matrix: []
      };
    },
    methods: {
      addItem(w, h) {
        seq++;
        var poi = getPointInMatrix(this.matrix, w, h);
        // console.log(`${poi.x} ${poi.y}`);
        var tem = {
          id: seq,
          w: w,
          h: h,
          x: poi.x,
          y: poi.y
        };
        addBoxToMatrix(this.matrix, tem);
        updateStyle(tem);
        this.list.push(tem);
      },
      move(i) {
        // console.log(i);
        // console.log(event);
        target = i;
        past = {x: event.clientX, y: event.clientY, type: true};
      },
      resize(event) {
        console.log(event);
      }
    },
    mounted() {
      // console.log('mounted');
      this.$nextTick(() => {
        ucw = Math.floor(this.$refs.content.clientWidth / 12);
        uch = Math.floor(ucw * 0.309);
        this.addItem(2, 3);
        this.addItem(12, 6);
        this.addItem(4, 4);
        this.addItem(2, 5);
        this.addItem(7, 3);
        this.addItem(2, 2);
        this.addItem(3, 4);
        this.addItem(1, 3);
        this.addItem(1, 1);
        // console.log(this.matrix);
      });
      matrix = this.matrix;
      document.onmousemove = move;
      document.onmouseup = over;
    },
    beforeDestroy() {
      // console.log('beforeDestroy');
      matrix = null;
      document.onmousemove = null;
      document.onmouseup = null;
    }
  };
</script>

<style lang="scss">
  main.index {
    padding: .2rem 5% .1rem;
    .content {
      position: relative;
    }
    .card {
      position: absolute;
      padding: 5px;
      transition: all .1s;
    }
    .card-body {
      position: relative;
      height: 100%;
      background: #b3e5fc;
      padding: 12px;
      cursor: move;
      transition: all .34s;
      .se {
        position: absolute;
        bottom: 2px;
        right: 2px;
        display: block;
        width: 10px;
        height: 10px;
        border: 2px solid rgba(0,0,0,.15);
        border-top-color: transparent;
        border-left-color: transparent;
        opacity: 0;
        cursor: se-resize;
        transition: all .34s;
      }
      &:hover {
        box-shadow: 1px 1px 6px rgba(0,0,0,.2);
        .se {
          opacity: 1;
        }
      }
    }
    .card-content {
      height: 100%;
      cursor: default;
    }
  }
</style>