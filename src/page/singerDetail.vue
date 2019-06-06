<template>
  <div class="singer_detail_wrapper">
    <div class="singer_info">
      <img class="singer_cover" v-lazy="singerCover" alt="">
      <div>
        <h2 class="singer_name">{{singerName}}</h2>
        <p class="singer_desc">{{singerInfo.singer_brief}}</p>
        <p class="singer_achievement">
          <span>单曲<i>{{singerInfo.total_song}}</i></span>
          <span>专辑<i>{{singerInfo.total_album}}</i></span>
          <span>MV<i>{{singerInfo.total_mv}}</i></span>
        </p>
      </div>
    </div>
    <ul class="singer_detail_list_tab">
      <li @click="state = 0" :class="state === 0?'currentTab':''">热门歌曲</li>
      <li @click="state = 1" :class="state === 1?'currentTab':''">所有专辑</li>
      <li @click="state = 2" :class="state === 2?'currentTab':''">相关MV</li>
    </ul>
    <HotSongList v-if="state === 0" :singerId="singerId" :totalSong="singerInfo.total_song"></HotSongList>
    <AlbumList v-if="state === 1" :singerId="singerId" :totalAlbum="singerInfo.total_album"></AlbumList>
    <MvList v-if="state === 2" :singerId="singerId" :totalMv="singerInfo.total_mv"></MvList>
  </div>
</template>

<script>
import {getSingerInfo} from '@/assets/connect/songsList';
import HotSongList from '@/components/hotSongList';
import AlbumList from '@/components/albumList';
import MvList from '@/components/mvList';
export default {
  name: 'singerDetail',
  components: {
    HotSongList,
    AlbumList,
    MvList
  },
  data () {
    return {
      singerId: '',
      singerCover: {},
      singerInfo: {},
      singerName: '',
      state: 0
    };
  },
  created () {
    this.singerId = this.$route.params.id;
    console.log(this.singerId);
    this.singerCover = sessionStorage.getItem('singerCover');
    this.getSingerDetail(this.singerId);
  },
  methods: {
    getSingerDetail (id) {
      getSingerInfo(id).then(res => {
        console.log(res.data);
        this.singerInfo = res.data.data;
        this.singerName = res.data.data.singer_info.name;
      });
    }
  }
};
</script>

<style scoped>
.singer_detail_wrapper{
  padding: 0 50px;
}
.singer_cover{
  float: left;
  width: 250px;
  height: 250px;
  border-radius: 999px;
  margin-right: 20px;
}
.singer_info{
  overflow: hidden;
  padding: 20px 0;
}
.singer_name{
  text-align: left;
  padding-bottom: 20px;
}
.singer_desc{
  font-size: 14px;
}
.singer_achievement{
  font-size: 16px;
  font-weight: 500;
  margin: 15px 0;
}
.singer_achievement i{
  margin-left: 8px;
  display: inline-block;
  font-size: 25px;
}
.singer_achievement>span{
  margin-right: 20px;
}
.singer_detail_list_tab{
  background-color: rgba(0,0,0,.01);
}
.singer_detail_list_tab>li{
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
.singer_detail_list_tab>li:hover{
  color: #31c27c;
}
.currentTab{
  color: #31c27c;
}
</style>
