<template>
  <main class="index">
    <div class="content" ref="content" :style="wrapperStyle">
      <div class="card" v-for="i in list" :style="i.style">
        <div class="card-body" @mousedown.self="move(i)" :class="{'murderer': i.id == murdererID}">
          <div class="card-content">{{i.id}}</div>
          <div class="se" @mousedown.self="resize(i)"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  var seq = 0,      // id序列
    ucw,            // 矩阵单点宽度
    uch,            // 矩阵单点高度
    past = null,    // 储存鼠标按下时的信息
    target = null,  // 当前操作的元素
    matrix,         // 矩阵（二维数组）
    that,           // vue对象的引用
    victim = [],    // 由于此次操作造成位置变化的元素列表
    victimFlag;     // 善后的递归操作是否正在进行中

  /* eslint-disable no-constant-condition */
  /* eslint-disable no-unused-vars */
  /* eslint-disable no-use-before-define */
  // 根据宽高寻找可放置的空位坐标
  function getPointInMatrix(w, h) {
    var poi = 0, x, y, t;
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
  function addBoxToMatrix(p) {
    var w, h;
    for(w = 0; w < p.w; w++) {
      for(h = 0; h < p.h; h++) {
        matrix[p.y + h][p.x + w] = p.id;
      }
    }
    that.lines = matrix.length;
  }
  // 从矩阵中移除卡片
  function removeBoxMatrix(id) {
    matrix.forEach(i => {
      i.forEach((j, index) => {
        if(j === id) i[index] = 0;
      });
    });
  }
  // 插入卡片到矩阵中
  function insertBoxToMatrix(p) {
    var tem, w, h, victim = [];
    for(w = 0; w < p.w; w++) {
      for(h = 0; h < p.h; h++) {
        if(!matrix[p.y + h]) matrix[p.y + h] = Array(12).fill(0);
        else {
          if(matrix[p.y + h][p.x + w] !== 0) {
            tem = matrix[p.y + h][p.x + w];
            victim[tem] = victim[tem] || tem;
            removeBoxMatrix(tem);
          }
        }
      }
    }
    addBoxToMatrix(p);
    victim.forEach(i => {
      resetBox(that.getItem(i), p);
    });
  }
  function checkMatrix(x1, x2, y1, y2, id) {
    var i;
    id = id || 0;
    if(x1 < 0 || x2 > 12 || y1 < 0) return false;
    var rs = {x: x1, y: y1};
    for(;y1 < y2; y1++) {
      if(!matrix[y1]) matrix[y1] = Array(12).fill(0);
      else {
        for(i = x1; i < x2; i++) {
          if(matrix[y1][i]) {
            rs = null;
            if(matrix[y1][i] !== id) return false;
          }
        }
      }
    }
    return rs;
  }
  // 重新排列卡片
  function resetBox(card, murderer) {
    var list = [], time = 4, distance = 0, direction = [true, true, true, true, true], point;
    victim[card.id] = card;
    while(time) {
      distance++;
      if(direction[4]) {
        point = checkMatrix(card.ox, card.ox + card.w, card.oy, card.oy + card.h, murderer.id);
        if(point === false) {
          direction[4] = false;
        }
        if(point) break;
      }
      if(direction[0]) {
        point = checkMatrix(card.ox, card.ox + card.w, card.oy - distance, card.oy + card.h - distance, murderer.id);
        if(point === false) {
          direction[0] = false;
          time--;
        }
        if(point) break;
      }
      if(direction[1]) {
        point = checkMatrix(card.ox - distance, card.ox + card.w - distance, card.oy, card.oy + card.h, murderer.id);
        if(point === false) {
          direction[1] = false;
          time--;
        }
        if(point) break;
      }
      if(direction[2]) {
        point = checkMatrix(card.ox + distance, card.ox + card.w + distance, card.oy, card.oy + card.h, murderer.id);
        if(point === false) {
          direction[2] = false;
          time--;
        }
        if(point) break;
      }
      if(direction[3]) {
        point = checkMatrix(card.ox, card.ox + card.w, card.oy + distance, card.oy + card.h + distance, murderer.id);
        if(point === false) {
          direction[3] = false;
          time--;
        }
        if(point) break;
      }
    }
    if(point) {
      card.x = point.x;
      card.y = point.y;
      addBoxToMatrix(card);
      updateStyle(card);
      return true;
    }else if(murderer) {
      card.y = murderer.y + murderer.h;
      insertBoxToMatrix(card);
      updateStyle(card);
    }
    return false;
  }
  // 更新卡片位置
  function updateStyle(card) {
    if(!card.style) card.style = {};
    card.style.width = ucw * card.w + 'px';
    card.style.height = uch * card.h + 'px';
    card.style.left = ucw * card.x + 'px';
    card.style.top = uch * card.y + 'px';
  }
  // 检查善后情况（防止dealVictim执行次数过多）
  function inspectVictim() {
    if(victimFlag) {
      setTimeout(inspectVictim, 40);
    }else dealVictim();
  }
  // 善后工作 （移动过的元素尝试向其原坐标移动）
  function dealVictim() {
    var flag = false;
    victim.forEach(i => {
      if(i) {
        removeBoxMatrix(i.id);
        if(resetBox(i, false)) {
          if(i.ox === i.x && i.oy === i.y) {
            victim[i.id] = null;
          }
          flag = true;
        }else {
          addBoxToMatrix(i);
        }
      }
    });
    if(flag) {
      setTimeout(dealVictim, 40);
      victimFlag = true;
    }else {
      victimFlag = false;
    }
  }
  // 删除空白行
  function deleteBlankLine() {
    var waitForDeathList = [], poi = 0, flag, mark = [], card;
    matrix.forEach((i, index) => {
      flag = true;
      i.forEach(item => {
        if(item !== 0) {
          flag = false;
          if(!mark[item]) {
            mark[item] = true;
            if(poi) {
              card = that.getItem(item);
              card.oy = card.y = card.y - poi;
              updateStyle(card);
            }
          }
        }
      });
      if(flag) {
        poi++;
        waitForDeathList.push(index);
      }
    });
    while(waitForDeathList.length) {
      matrix.splice(waitForDeathList.pop(), 1);
    }
  }
  // 鼠标移动事件
  function move(event){
    if(target) {
      var e = event ? event: window.event;
      if(past.type) { // 区分移动与缩放
        target.style.left = ucw * target.ox + e.clientX - past.x + 'px';
        target.style.top = uch * target.oy + e.clientY - past.y + 'px';
        target.x = target.ox + Math.round((e.clientX - past.x) / ucw);
        target.y = target.oy + Math.round((e.clientY - past.y) / uch);
        if(target.x < 0) target.x = 0;
        if(target.y < 0) target.y = 0;
        if(target.x + target.w > 12) target.x = 12 - target.w;
      }else {
        target.style.width = ucw * past.w + e.clientX - past.x + 'px';
        target.style.height = uch * past.h + e.clientY - past.y + 'px';
        if((ucw * past.w + e.clientX - past.x) < ucw * target.minx) target.style.width = ucw * target.minx + 'px';
        if((uch * past.h + e.clientY - past.y) < uch * target.miny) target.style.height = uch * target.miny + 'px';
        target.w = past.w + Math.round((e.clientX - past.x) / ucw);
        target.h = past.h + Math.round((e.clientY - past.y) / uch);
        if(target.x + target.w > 12) target.w = 12 - target.x;
        if(target.w < target.minx) target.w = target.minx;
        if(target.h < target.miny) target.h = target.miny;
      }
      removeBoxMatrix(target.id);
      insertBoxToMatrix(target);
      inspectVictim();
    }
  }
  // 单次操作结束事件
  function over() {
    if(target) {
      target.ox = target.x;
      target.oy = target.y;
      victim.forEach(i => {
        if(i) {
          i.ox = i.x;
          i.oy = i.y;
        }
      });
      victim = [];
      updateStyle(target);
      target = null;
      deleteBlankLine();
      that.lines = matrix.length;
      that.murdererID = 0;
    }
  }

  export default {
    data() {
      return {
        list: [],
        lines: 0,
        murdererID: 0
      };
    },
    methods: {
      addItem(w, h) {
        seq++;
        var poi = getPointInMatrix(w, h);
        var tem = {
          id: seq,
          w: w,
          h: h,
          x: poi.x,
          y: poi.y,
          ox: poi.x,
          oy: poi.y,
          minx: 2,
          miny: 2
        };
        addBoxToMatrix(tem);
        updateStyle(tem);
        this.list.push(tem);
      },
      move(i) {
        over();
        this.murdererID = i.id;
        target = i;
        past = {x: event.clientX, y: event.clientY, type: true};
      },
      resize(i) {
        over();
        this.murdererID = i.id;
        target = i;
        past = {x: event.clientX, y: event.clientY, w: i.w, h: i.h, type: false};
      },
      getItem(id) {
        for(var i = 0; i < this.list.length; i++) {
          if(this.list[i].id === id) return this.list[i];
        }
      }
    },
    computed: {
      wrapperStyle() {
        return {
          height: this.lines * uch + 'px'
        };
      }
    },
    mounted() {
      this.$nextTick(() => {
        ucw = Math.floor(this.$refs.content.clientWidth / 12);
        uch = Math.floor(ucw * 0.618);
        this.addItem(2, 2);
        this.addItem(12, 3);
        this.addItem(4, 2);
        this.addItem(2, 3);
        this.addItem(7, 2);
        this.addItem(2, 2);
        this.addItem(3, 2);
        this.addItem(2, 2);
        this.addItem(2, 2);
      });
      matrix = [];
      that = this;
      document.onmousemove = move;
      document.onmouseup = over;
    },
    beforeDestroy() {
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
      transition: all .04s;
    }
    .card-body {
      position: relative;
      height: 100%;
      background: #fff;
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
      &.murderer {
        z-index: 19930210;
      }
      &.murderer,
      &:hover {
        box-shadow: 1px 1px 6px rgba(0,0,0,.1);
        .se {
          opacity: 1;
        }
      }
    }
    .card-content {
      height: 100%;
      cursor: default;
      font-size: .16rem;
      user-select: none;
    }
  }
</style>