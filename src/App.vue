<template>
  <div id="app">
    <Index></Index>
    <Player v-if="!MvPlayIngState"></Player>
  </div>
</template>

<script>
import Index from '@/page/index';
import Player from '@/components/playMusic';
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'App',
  components: {
    Index,
    Player
  },
  mounted () {
    console.log(this.MvPlayIngState);
    window.addEventListener('beforeunload', e => {
      localStorage.setItem('vuexState', JSON.stringify(this.$store.state.playList));
    });
  },
  computed: {
    ...mapGetters(['MvPlayIngState'])
  },
  methods: {
    ...mapActions(['changePlayingState'])
  }
};
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
html,body{
  min-width: 1024px;
  color: #000;
}
.index_h2{
  padding-top: 4.1667%;
  padding-bottom: 2%;
  font-size: 200%;
  letter-spacing: 10px;
}
.swiper-pagination-bullet-active{
  background-color: #31c27c!important;
  outline: none;
}
.swiper-pagination{
  width: 100%;
}
.swiper-pagination-bullet{
  padding: 2px!important;
  margin: 0 5px;
}
em{
  color: #31c27c;
}
.songs_cover_wrapper{
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.songs_cover_pic{
  transform: scale(1) translateZ(0);
  transition: transform .75s;
  width: 100%;
}
.songs_cover_mask{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: opacity .5s;
  transition: opacity .5s;
}
.songs_cover_icon_paly{
  background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/cover_play.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png') 2x);
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -35px;
  width: 70px;
  height: 70px;
  filter: alpha(opacity=0);
  opacity: 0;
  -webkit-transform: scale(.7) translateZ(0);
  -webkit-transition-property: opacity,-webkit-transform;
  -webkit-transition-duration: .5s;
  transform: scale(.7) translateZ(0);
  transition-property: opacity,transform,zoom;
  transition-duration: .5s;
  zoom: 1;
}
.songs_cover_wrapper:hover .songs_cover_mask{
  opacity: .2;
  transition: opacity .5s;
}
.songs_cover_wrapper:hover .songs_cover_icon_paly{
  opacity: 1;
  filter: none;
}
.songs_cover_wrapper:hover .songs_cover_pic,
.songs_cover_wrapper:hover .songs_cover_icon_paly {
  transform: scale(1.07) translateZ(0);
  transition: transform .5s;
}
</style>
