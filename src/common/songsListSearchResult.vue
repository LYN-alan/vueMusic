<template>
  <div class="songs_list_result">
    <div class="songs_list_title">
      <span>歌单</span>
      <span>创建人</span>
      <span>收听</span>
    </div>
    <div class="songs_list_item" v-for="item in songsListSearchResult" :key="item.docid">
      <div class="song_list_name_box">
        <img class="songs_list_pic" v-lazy="item.imgurl" alt="" :key="item.imgurl">
        <span class="song_list_name" @click="getSongsListDetail(item.dissid)">{{item.dissname}}</span>
        <PlayIcon></PlayIcon>
      </div>
      <span class="item_creator">{{item.creator.name}}</span>
      <span>{{_formatCount(item.listennum)}}</span>
    </div>
  </div>
</template>

<script>
import PlayIcon from '@/common/playIcon'
import {formatCount} from '@/assets/utils/utils'

export default {
  name: 'songsListSearchResult',
  props: ['songsListSearchResult'],
  components: {
    PlayIcon
  },
  methods: {
    _formatCount (num) {
      formatCount(num)
    },
    getSongsListDetail (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
.songs_list_title>span{
  width: 30%;
  display: inline-block;
  font-size: 14px;
  color: #999;
}
.songs_list_item,
.song_list_name_box{
  display: flex;
  align-items: center;
  position: relative;
}
.songs_list_item{
  height: 70px;
}
.songs_list_title>span:first-child,
.song_list_name_box{
  width: 57%;
}
.songs_list_title>span:last-child,
.songs_list_item>span:last-child{
  width: 7.5%;
}
.songs_list_item>span{
  width: 30%;
  display: inline-block;
}
.songs_list_pic{
  width: 50px;
  height: 50px;
}
.songs_list_item:hover .quick_button_wrapper{
  display: flex;
}
.songs_list_item:hover .song_list_name{
  width: 70%;
}
.quick_button_wrapper{
  position: absolute;
  right: 10px;
}
.song_list_name{
  margin-left: 10px;
  white-space: nowrap;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.song_list_name:hover{
  color: #31c27c;
}
.item_creator:hover{
  color: #31c27c;
}
.item_creator{
  cursor: pointer;
}
</style>
