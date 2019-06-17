<template>
  <div class="songs_list_view">
    <div class="songs_item_wrapper" v-for="(song, key) in songsList" :key="key">
      <div class="songs_item_wrapper_box" ref="songsItemHeight">
        <div class="songs_cover_wrapper">
          <img ref="imgHeight" class="songs_cover_pic" :src="song.imgurl" :key="song.imgurl" alt="">
          <i class="songs_cover_mask" @click="getSongListDetail(song.dissid)"></i>
          <i class="songs_cover_icon_paly" @click="palyAll(song.dissid)"></i>
        </div>
        <h4 class="songs_title" @click="getSongListDetail(song.dissid)">{{song.dissname}}</h4>
        <h4 class="songs_name">{{song.creator.name}}</h4>
        <p>播放量：{{_formatCount(song.listennum)}}</p>
      </div>
  </div>
  </div>
</template>

<script>
import {formatCount} from '@/assets/utils/utils';
import {getSongsListDetail} from '@/assets/connect/songsList';
import {mapActions} from 'vuex';
export default {
  name: 'songsListView',
  props: ['songsList'],
  data () {
    return {
      songListIds: []
    };
  },
  methods: {
    _formatCount (num) {
      return formatCount(num);
    },
    palyAll (id) {
      console.log(id);
      let options = {
        id: id,
        format: 0
      };
      getSongsListDetail(options).then(res => {
        console.log(res.data);
        res.data.data[0].songlist.forEach(item => {
          this.songListIds.push(item.mid);
        });
        this.playSongListAll(this.songListIds);
      });
    },
    getSongListDetail (id) {
      console.log(id);
      this.$router.push({
        name: 'SongListDetail',
        params: {id: id}
      });
    },
    ...mapActions(['playSongListAll'])
  }
};
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
