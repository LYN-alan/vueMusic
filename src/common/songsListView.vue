<template>
  <div class="songs_list_view">
    <div class="songs_item_wrapper" v-for="(song, key) in songsList" :key="key">
      <div class="songs_item_wrapper_box" ref="songsItemHeight">
        <div class="songs_cover_wrapper">
          <img @load="imgLoad" ref="imgHeight" class="songs_cover_pic" v-lazy="song.coverImgUrl" :key="song.coverImgUrl" alt="">
          <i class="songs_cover_mask"></i>
          <i class="songs_cover_icon_paly"></i>
        </div>
        <h4 class="songs_title">{{song.name}}</h4>
        <p>播放量：{{formatCount(song.playCount)}}</p>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'songsListView',
  props: ['songsList'],
  mounted () {
    window.addEventListener('resize', () => {
      if (this.$refs.imgHeight[0]) {
        this.songsItemHigh = this.$refs.imgHeight[0].height + 100
      }
    })
  },
  methods: {
    formatCount (num) {
      if (num > 10000) {
        return (num / 10000).toFixed(2) + '万'
      } else {
        return num
      }
    },
    imgLoad () {
      this.$nextTick(() => {
        this.$emit('songsItemHigh', this.$refs.imgHeight[0].height + 100)
      })
    }
  }
}
</script>

<style scoped>
.songs_list_view{
  width: 100%;
}
.songs_title{
  margin: 5px 0;
  line-height: 1.6;
  cursor: pointer;
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
