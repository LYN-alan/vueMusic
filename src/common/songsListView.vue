<template>
  <div class="songs_list_view">
    <div class="songs_item_wrapper" v-for="(song, key) in songsList" :key="key">
      <div class="songs_item_wrapper_box" ref="songsItemHeight">
        <div class="songs_cover_wrapper">
          <img ref="imgHeight" class="songs_cover_pic" :src="song.imgurl" :key="song.imgurl" alt="">
          <i class="songs_cover_mask"></i>
          <i class="songs_cover_icon_paly"></i>
        </div>
        <h4 class="songs_title">{{song.dissname}}</h4>
        <h4 class="songs_name">{{song.creator.name}}</h4>
        <p>播放量：{{formatCount(song.listennum)}}</p>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'songsListView',
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
.songs_list_view{
  width: 100%;
}
.songs_title,
.songs_name{
  margin: 5px 0;
  line-height: 1.6;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.songs_title:hover{
  color: #31c27c;
}
.songs_item_wrapper{
  display: inline-block;
  width: 20%;
  overflow: hidden;
  font-size: 14px;
  vertical-align: top;
  position: relative;
}
.songs_item_wrapper:before{
  content: "";
  display: block;
  width: 100%;
  padding-top: 100%;
  padding-bottom: 66px;
}
.songs_item_wrapper_box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-right: 20px;
}
.songs_cover_pic{
  width: 100%;
  vertical-align:top;
}
.songs_item_wrapper{
  margin-bottom: 20px;
}
</style>
