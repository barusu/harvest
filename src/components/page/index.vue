<template>
  <main class="index">
    <div class="content" ref="content">
      <div class="card" v-for="i in list" :style="i.style"></div>
    </div>
  </main>
</template>

<script>
  var seq = 0, cw;

  function getPointInMatrix(matrix, w, h) {
    var poi = 0, x, y, t;
    while(true) {
      if(matrix[poi]) {
        x = 0;
        if(matrix[poi].some((n, i) => {
          if(n === 0) x++;
          else x = 0;
          if(x >= w) {
            y = 1;
            while(true) {
              if(y >= h) {
                x = ++i;
                return true;
              }
              if(matrix[poi + y]) {
                for(t = 0; t < w; t++) {
                  if(matrix[poi + y][i - t] !== 0) break;
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
  function addBoxToMatrix(matrix, p) {
    var w, h;
    for(w = 0; w < p.w; w++) {
      for(h = 0; h < p.h; h++) {
        matrix[p.y + h][p.x + w] = p.id;
      }
    }
  }
  function updateStyle(card) {
    if(!card.style) card.style = {};
    card.style.width = 100 * card.w / 12 + '%';
    card.style.height = cw * card.h + 'px';
    card.style.left = 100 * card.x / 12 + '%';
    card.style.top = cw * card.y + 'px';
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
        console.log(`${poi.x} ${poi.y}`);
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
      }
    },
    mounted() {
      this.$nextTick(() => {
        cw = Math.floor(this.$refs.content.clientWidth * 0.02575);
        this.addItem(2, 3);
        this.addItem(12, 6);
        this.addItem(4, 3);
        this.addItem(2, 3);
        this.addItem(7, 3);
        this.addItem(2, 3);
        this.addItem(3, 3);
        this.addItem(1, 3);
        console.log(this.matrix);
      });
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
      min-height: 100px;
    }
  }
</style>