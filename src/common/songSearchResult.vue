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
          <span v-html="item.songname_hilight" class="result_highlight"></span>
          <span class="result_highlight_lyric">{{item.lyric_hilight}}</span>
        </span>
        <span>
          <span v-for="(singer, index) in item.singer" :key="singer.mid">
            <span v-if="index != 0"> / </span>
            <span class="song_res_singer" :title="singer.name" @click="getSinger(singer.mid)" v-html="singer.name_hilight"></span>
          </span>
        </span>
        <span class="song_res_album" @click="getAlbum(item.albummid)" v-html="item.albumname_hilight"></span>
        <span>{{formatTime(item.interval)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'songSearchResult',
  props: ['resultList'],
  methods: {
    getSinger (id) {
      console.log(id)
    },
    getAlbum (id) {
      console.log(id)
    },
    formatTime (num) {
      let second = ''
      let minutes = ''
      if (num > 60) {
        second = num % 60
        second = second > 10 ? second : '0' + second
        minutes = Math.floor(num / 60)
        minutes = minutes > 10 ? minutes : '0' + minutes
      } else {
        if (num > 10) {
          second = num
        } else {
          second = '0' + num
        }
        minutes = '00'
      }
      return minutes + ':' + second
    }
  }
}
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
.result_highlight_lyric{
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
  white-space: nowrap;
}
</style>
