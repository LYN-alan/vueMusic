<template>
  <div class="song_result_list">
    <ul class="song_res_list">
      <li class="song_res_list_item song_res_list_item_title">
        <span>歌曲</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </li>
      <li class="song_res_list_item" v-for="item in resultList" :key="item.songmid">
        <span class="song_res_title">
          <span class="song_res_name_wrapper">
            <span v-html="item.songname_hilight" class="result_highlight"></span>
            <span class="result_highlight_lyric">{{item.lyric_hilight}}</span>
          </span>
          <PlayIcon :id="item.songmid"></PlayIcon>
        </span>
        <span>
          <span v-for="(singer, index) in item.singer" :key="singer.mid">
            <span v-if="index != 0"> / </span>
            <span class="song_res_singer" :title="singer.name" @click="getSinger(singer.mid)" v-html="singer.name_hilight"></span>
          </span>
        </span>
        <span class="song_res_album" @click="getAlbum(item.albummid)" v-html="item.albumname_hilight"></span>
        <span>{{_formatTime(item.interval)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatTime} from '@/assets/utils/utils';
import PlayIcon from '@/common/playIcon';
export default {
  name: 'songSearchResult',
  props: ['resultList'],
  components: {
    PlayIcon
  },
  methods: {
    getSinger (id) {
      console.log(id);
    },
    getAlbum (id) {
      console.log(id);
    },
    _formatTime (num) {
      formatTime(num);
    }
  }
};
</script>

<style scoped>
.song_result_list{
  font-size: 14px;
}
.song_res_list_item_title{
  color: #999;
}
.song_res_list_item{
  display: flex;
  position: relative;
  padding-right: 100px;
  line-height: 50px;
  align-items: center;
}
.song_res_list_item>span{
  width: 25%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song_res_list_item>span:first-child{
  width: 47%;
}
.song_res_list_item>span:last-child{
  width: 50px;
  position: absolute;
  top: 0;
  right: 50px;
}
.song_res_title,
.song_res_singer,
.song_res_album{
  cursor: pointer;
}
.song_res_title{
  position: relative;
  display: flex;
  align-items: center;
}
.result_highlight:hover,
.song_res_singer:hover,
.song_res_album:hover{
  color: #31c27c;
}
.song_res_list_item:nth-of-type(even){
  background-color: #ddd;
}
.song_res_list_item:nth-of-type(odd){
  background-color: rgba(0,0,0,.01);
}
.song_res_name_wrapper{
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
  white-space: nowrap;
  max-width: 90%;
  display: inline-block;
}
.result_highlight_lyric{
  color: #999;
}
.song_res_list_item:hover .quick_button_wrapper{
  display: flex;
}

.quick_button_wrapper{
  position: absolute;
  right: 10px;
}
.song_res_list_item:hover .song_res_name_wrapper{
  width: 70%;
}
</style>
