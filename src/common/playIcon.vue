<template>
  <div class="quick_button_wrapper">
    <i class="icon_play" title="播放" @click="play"></i>
    <i class="icon_add" title="添加到播放队列" @click="addPlayList"></i>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'playIcon',
  props: ['id'],
  methods: {
    play () {
      this.playCurrentSong(this.id);
    },
    addPlayList () {
      this.insertSong(this.id);
    },
    ...mapActions(['playCurrentSong', 'insertSong'])
  }
};
</script>

<style scoped>
.quick_button_wrapper{
  display: none;
}
.icon_play,
.icon_add{
  display: block;
  width: 36px;
  height: 36px;
  background-image: url('https://y.gtimg.cn/mediastyle/yqq/img/icon_list_menu@2x.png');
  background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/icon_list_menu.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/icon_list_menu@2x.png') 2x);
  background-repeat: no-repeat;
  cursor: pointer;
  margin: 0 5px;
}
.icon_play{
  background-position: 0 0;
}
.icon_add{
  background-position: 0 -80px;
}
.icon_play:hover{
  background-position: -40px 0;
}
.icon_add:hover{
  background-position: -40px -80px;
}
</style>
