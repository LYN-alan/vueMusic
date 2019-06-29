<template>
  <div class="index">
    <indexHead class="index_head"></indexHead>
    <section class="index_main">
      <router-view></router-view>
    </section>
    <footer class="index_footer">
      <p>'音为有你'，一切美好开始、、、</p>
    </footer>
  </div>
</template>

<script>
import indexHead from '@/components/indexHead';
export default {
  name: 'Index',
  components: {
    indexHead
  }
};
</script>

<style scoped>
.index_head,
.index_footer{
  padding: 0 50px;
}
.index_main{
  min-height: 600px;
  background-color: #ddd;
}
.index_footer{
  background-color: #000;
  color: #fff;
  padding: 50px 50px 70px;
  text-align: center;
}
</style>
