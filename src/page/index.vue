<template>
  <div class="index">
    <indexHead class="index_head"></indexHead>
    <section class="index_main">
      <router-view></router-view>
    </section>
    <footer class="index_footer">底部</footer>
  </div>
</template>

<script>
import indexHead from '@/components/indexHead'
export default {
  name: 'Index',
  components: {
    indexHead
  }
}
</script>

<style scoped>
.index_head,
.index_footer{
  padding: 0 50px;
}
.index_main{
  min-height: 500px;
  background-color: #ddd;
}
.index_footer{
  background-color: #000;
  color: #fff;
}
</style>
