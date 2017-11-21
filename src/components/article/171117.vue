<template>
  <o-card class="card171117" :lang="['html', 'css']" title="Switch" :author="author"  :date="1510791871458">
    <div class="line"><o-switch>base</o-switch> <o-switch :value="true" :loading="true">加载中</o-switch></div>
    <div class="line"><o-switch class="s">base</o-switch> <o-switch class="s" :disabled="true" :value="true">禁用</o-switch></div>
    <div class="line"><o-switch v-model="switch1" class="xs">base</o-switch> <span v-html="switch1"></span></div>
  </o-card>
</template>

<script>
  import oSwitch from '@/components/base/switch';
  import oCard from '@/components/ui/card';
  import author from '@/libs/author';

  export default {
    components: {
      oSwitch,
      oCard
    },
    data() {
      return {
        author: author.shiro,
        switch1: true
      };
    }
  };
</script>

<style lang="scss">
  .card171117 {
    .line {
      text-align: left;
      margin-bottom: .5em;
    }
  }
</style>