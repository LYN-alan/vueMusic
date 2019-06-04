<template>
  <div class="album_list_wrapper">
    <div class="album_list_title">
      <span>专辑</span>
      <span>歌手</span>
      <span>发行时间</span>
    </div>
    <div class="album_list_item" v-for="item in albumList" :key="item.albumID">
      <div class="album_info">
        <img class="album_cover" v-lazy="item.albumPic" alt="" :key="item.albumPic">
        <span class="album_title" v-html="item.albumName_hilight"></span>
        <PlayIcon></PlayIcon>
      </div>
      <div class="album_singer">
        <span v-html="item.singerName_hilight"></span>
      </div>
      <div class="album_publicTime">
        <span>{{item.publicTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PlayIcon from '@/common/playIcon'
export default {
  name: 'albumSearchResult',
  props: ['albumList'],
  components: {
    PlayIcon
  }
}
</script>

<style scoped>
.album_list_wrapper{
  font-size: 14px;
}
.album_list_title{
  color: #999;
}
.album_list_title,
.album_list_item{
  display: flex;
  line-height: 70px;
}
.album_list_title>span{
  width: 30%;
  display: inline-block;
}
.album_list_title>span:first-child{
  width: 60%;
}
.album_list_title>span:last-child{
  width: 10%;
}
.album_cover{
  width: 50px;
  height: 50px;
}
.album_info{
  width: 60%;
  display: flex;
  align-items: center;
  position: relative;
}
.album_singer{
  width: 30%;
}
.album_publicTime{
  width: 10%;
}
.album_title{
  margin-left: 10px;
}
.album_title,
.album_singer>span{
  cursor: pointer;
}
.album_title:hover,
.album_singer>span:hover{
  color: #31c27c;
}
.quick_button_wrapper{
  position: absolute;
  right: 20px;
  display: none;
}
.album_info:hover .quick_button_wrapper{
  display: flex;
}
.quick_button_wrapper{
  position: absolute;
  right: 10px;
}
</style>
