<template>
  <div class="head">
    <Logo></Logo>
    <indexNav></indexNav>
  </div>
</template>

<script>
import Logo from './logo'
import indexNav from './headerNav'
export default {
  name: 'indexHeader',
  components: {
    Logo,
    indexNav
  }
}
</script>

<style scoped>
.head{
  overflow: hidden;
  height: 50px;
  border-bottom: 1px solid #ddd;
  padding: 10px 80px;
}
</style>
