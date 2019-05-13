<template>
  <div class="boutique_list_wrapper">
    <ul class="boutique_list">
      <li v-for="(song,index) in songsList" :key="index">
        <img :src="song.coverImgUrl" alt="">
        <p>{{song.name}}</p>
        <p>播放量：{{formatCount(song.playCount)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'songsList',
  props: ['songsList'],
  methods: {
    formatCount (num) {
      if (num > 10000) {
        return (num / 10000).toFixed(2) + '万'
      } else {
        return num
      }
    }
  }
}
</script>

<style scoped>
.boutique_list_wrapper{
  overflow: hidden;
}
.boutique_list{
  position: relative;
  width: 1250%;
  left: -100%;

}
.boutique_list>li{
  position: relative;
  display: inline-block;
  width: 1.6%;
  vertical-align: top;
}
.boutique_list>li img{
  width: 100%;
  vertical-align:top;
}
</style>
