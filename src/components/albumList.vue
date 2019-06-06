<template>
  <div class="album_list_wrapper">
      <div class="album_list_title">
        <span>专辑名</span>
        <span>发布时间</span>
      </div>
      <div class="album_list" v-for="(album, index) in albumList" :key="album.album_mid">
        <span>{{index + 1}}</span>
        <span class="album_name">{{album.album_name}}</span>
        <span class="album_pubTime">{{album.pub_time}}</span>
      </div>
  </div>
</template>

<script>
import {getSingerAlbum} from '@/assets/connect/songsList';
export default {
  name: 'albumList',
  data () {
    return {
      albumList: []
    };
  },
  created () {
    let singerId = this.$route.params.id;
    this._getSingerAlbum(singerId);
  },
  methods: {
    _getSingerAlbum (id) {
      getSingerAlbum(id).then(res => {
        console.log(res.data.data);
        this.albumList = res.data.data;
      });
    }
  }
};
</script>

<style scoped>
.album_list_wrapper{
  font-size: 14px;
  min-height: 500px;
}
.album_list_title,
.album_list{
  padding-left: 46px;
  line-height: 50px;
  overflow: hidden;
  position: relative;
}
.album_list_title>span:first-child,
.album_name{
  width: 45%;
  float: left;
}
.album_list_title>span:last-child,
.album_pubTime{
  width: 20%;
  float: left;
}
.album_list>span:first-child{
  position: absolute;
  left: 10px;
  width: 36px;
  top: 0;
}
.album_name{
  cursor: pointer;
}
.album_name:hover{
  color: #31c27c;
}
</style>
