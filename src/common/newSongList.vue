<template>
  <div class="new_song_list_wrapper">
    <ul class="new_song_list">
      <li class="new_song_item" v-for="(song, index) in newSongList" :key="index">
        <div class="songs_cover_wrapper">
          <img class="songs_cover_pic" v-lazy="song.coverImgUrl" :key="song.coverImgUrl" alt="">
          <i class="songs_cover_mask"></i>
          <i class="songs_cover_icon_paly" @click="playMusic(song.id)"></i>
        </div>
        <div class="songs_info_wrapper">
          <div class="songs_info">
            <h4 class="song_info_name" :id="song.id">{{song.name}}</h4>
            <p class="song_info_singer">
              <span v-for="(item, index) in song.singer" :key="item.id">
                <span v-if="index != 0"> / </span>
                <span class="singer_name" @click="getSinger(item.id)">{{item.name}}</span>
              </span>
            </p>
            <p class="song_info_duration">{{formatDuration(song.playTime)}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatCount} from '@/assets/utils/utils';

export default {
  name: 'newSongList',
  props: ['newSongList'],
  methods: {
    formatDuration (time) {
      return formatCount(time);
    },
    getSinger (id) {
      console.log(id);
    },
    playMusic (id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
.new_song_list{
  display: flex;
  flex-wrap: wrap;
}
.new_song_item{
  width: calc(25% - 20px);
  padding: 12px 0;
  margin-right: 20px;
  border-bottom: 1px solid #ddd;
}
.songs_cover_wrapper{
  width: 86px;
  height: 86px;
}
.songs_cover_pic{
  vertical-align: middle;
}
.songs_cover_icon_paly{
  background-size: 68%;
  background-repeat: no-repeat;
  background-position: 50%;
}
.songs_cover_wrapper{
  margin: 0 15px 0 0;
  float: left;
}
.songs_info_wrapper{
  font-size: 14px;
  width: calc(100% - 91px);
  margin-left: 91px;
}
.songs_info{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 86px;
}
  .song_info_name,
  .song_info_singer{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
.song_info_name:hover,
.singer_name:hover{
  color: #31c27c;
}
</style>
