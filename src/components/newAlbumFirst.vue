<template>
  <div class="new_album_first_wrapper">
    <h2 class="index_h2">新碟首发</h2>
    <div class="new_album_first_list">
      <div class="songs_item_wrapper" v-for="album in newAlbumFirstList" :key="album.id">
        <div class="songs_item_wrapper_box" ref="songsItemHeight">
          <div class="songs_cover_wrapper">
            <img class="songs_cover_pic" v-lazy="album.coverImgUrl" :key="album.coverImgUrl" alt="">
            <i class="songs_cover_mask"></i>
            <i class="songs_cover_icon_paly"></i>
          </div>
          <h4 class="songs_title" :title="album.name">{{album.name}}</h4>
          <p class="song_info_singer">
              <span v-for="(item, index) in album.singer" :key="item.id">
                <span v-if="index != 0"> / </span>
                <span class="singer_name" @click="getSinger(item.id)">{{item.name}}</span>
              </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNewestDisc} from '@/assets/connect/songsList'
export default {
  name: 'newAlbumFirst',
  data () {
    return {
      newAlbumFirstList: []
    }
  },
  created () {
    this._getNewestDisc()
  },
  methods: {
    _getNewestDisc () {
      getNewestDisc().then(res => {
        console.log(res.data.data)
        let songsList = res.data.data
        if (songsList && songsList.length > 0) {
          songsList.forEach((item) => {
            let songsItem = {
              id: item.id,
              name: item.name,
              coverImgUrl: item.picUrl,
              singer: item.artists
            }
            this.newAlbumFirstList.push(songsItem)
          })
        }
      })
    },
    imgLoad () {
      console.log(1)
    },
    getSinger (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
.new_album_first_wrapper{
  padding: 0 50px;
}
.new_album_first_list{
  display: flex;
  flex-wrap: wrap;
  margin-right: -14px;
}
.songs_item_wrapper{
  width: 16.667%;
  font-size: 14px;
  margin: 14px 0;
}
.songs_item_wrapper_box{
  margin-right: 14px;
}
.songs_title,
.singer_name {
  cursor: pointer;
}
.songs_title,
.song_info_singer {
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
.songs_title:hover,
.singer_name:hover{
  color: #31c27c;
}
</style>
