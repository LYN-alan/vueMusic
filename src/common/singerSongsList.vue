<template>
  <ul class="singer_songs_list">
    <li class="songs_list_title">
      <span>歌曲</span>
      <span>专辑</span>
      <span>时长</span>
    </li>
    <li class="song_list" v-for="(song, index) in songsList" :key="song.musicData.songmid">
      <span>{{index + 1}}</span>
      <div class="song_name">
        <p class="song_name_wrapper">
          <span class="song_name_text" @click="songDetail(song.musicData.songmid)">{{song.musicData.songname}}</span>
          <span class="song_albumdesc">{{song.musicData.albumdesc}}</span>
        </p>
        <PlayIcon :id="song.musicData.songmid"></PlayIcon>
      </div>
      <span class="song_album" @click="albumDetail(song.musicData.songmid)">{{song.musicData.albumname}}</span>
      <span class="song_time">{{_formatTime(song.musicData.interval)}}</span>
    </li>
  </ul>
</template>

<script>
import PlayIcon from '@/common/playIcon';
import {formatTime} from '@/assets/utils/utils';

export default {
  name: 'singerSongsList',
  props: ['songsList'],
  components: {
    PlayIcon
  },
  methods: {
    songDetail (id) {
      console.log(id);
    },
    albumDetail (id) {
      console.log(id);
    },
    _formatTime (num) {
      return formatTime(num);
    }
  }
};
</script>

<style scoped>
.singer_songs_list{
  font-size: 14px;
  margin-bottom: 20px;
}
.songs_list_title,
.song_list{
  overflow: hidden;
  padding: 0 95px 0 46px;
  line-height: 50px;
  position: relative;
}
.songs_list_title>span{
  width:25%;
  float: left;
}
.songs_list_title>span:first-child{
  width: 50%;
  float: left;
}
.songs_list_title>span:last-child,
.song_time{
  width: 60px;
  right: 35px;
  position: absolute;
  top: 0;
  height: 50px;
}
.song_list>span:first-child{
  width: 36px;
  position: absolute;
  left: 10px;
}
.song_name{
  align-items: center;
  position: relative;
  width: 50%;
  float: left;
  display: inline-flex;
}
.quick_button_wrapper{
  position: absolute;
  right: 10px;
}
.song_name_wrapper{
  white-space: nowrap;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song_list:hover .quick_button_wrapper{
  display: flex;
}
.song_list:hover .song_name_wrapper{
  width: 70%;
}
.song_album{
  width: 25%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
  cursor: pointer;
}
.song_albumdesc{
  color: #999;
}
.song_name_text{
  cursor: pointer;
}
.song_name_text:hover,
.song_album:hover{
  color: #31c27c;
}
.singer_songs_list>li:nth-of-type(even){
  background-color: rgba(0,0,0,.01);
}
</style>
