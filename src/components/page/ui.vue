<template>
  <main class="ui-wrapper">
    <div class="ui-nav-wrapper clearfix">
      <o-171121 class="nav-item"></o-171121>
      <o-171120 class="nav-item"></o-171120>
      <o-171117 class="nav-item"></o-171117>
    </div>
  </main>
</template>

<script>
  import o171117 from '@/components/article/171117';
  import o171120 from '@/components/article/171120';
  import o171121 from '@/components/article/171121';

  export default {
    components: {
      'o-171121': o171121,
      'o-171120': o171120,
      'o-171117': o171117
    },
    data() {
      return {};
    }
  }
</script>

<style lang="scss">
  .ui-wrapper {
    padding: .2rem 5% .1rem;
    .nav-item {
      width: 25%;
      float: left;
    }
  }
</style>