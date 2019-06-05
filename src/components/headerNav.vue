<template>
  <div class="header-nav">
    <router-link v-for="(item,index) in navList" tag="span" :key="index" :to="item.path">{{item.name}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
  data () {
    return {
      navList: [
        {path: '/index', name: '首页'},
        {path: '/singers', name: '歌手'},
        {path: '/kind', name: '分类歌单'},
        {path: '/video', name: 'MV'},
        {path: '/search', name: '搜索'}
      ]
    };
  }
};
</script>

<style scoped>
.header-nav{
  height: 100%;
  line-height: 50px;
}
.header-nav span{
  padding: 0 10px;
  cursor: pointer;
}
.header-nav span:hover{
  color: #31c27c;
}
.router-link-active{
  color: #31c27c;
}
</style>
