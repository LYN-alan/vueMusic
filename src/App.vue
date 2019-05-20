<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from '@/page/index'
export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h2{
  margin: 0;
  text-align: center;
}
body{
  min-width: 1024px;
  color: #000;
}
.index_h2{
  padding-top: 4.1667%;
  padding-bottom: 2%;
  font-size: 200%;
  letter-spacing: 10px;
}
</style>
