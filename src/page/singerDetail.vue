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
      <router-link tag="li" :to="`/singerDetail/hotSongList/${singerId}`">热门歌曲</router-link>
      <router-link tag="li" :to="`/singerDetail/albumList/${singerId}`">所有专辑</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerInfo} from '@/assets/connect/songsList'
export default {
  name: 'singerDetail',
  data () {
    return {
      singerId: '',
      singerCover: {},
      singerInfo: {},
      singerName: ''
    }
  },
  created () {
    this.singerId = this.$route.params.id
    console.log(this.singerId)
    this.singerCover = sessionStorage.getItem('singerCover')
    this.getSingerDetail(this.singerId)
  },
  methods: {
    getSingerDetail (id) {
      getSingerInfo(id).then(res => {
        console.log(res.data)
        this.singerInfo = res.data.data
        this.singerName = res.data.data.singer_info.name
      })
    }
  }
}
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
  margin: 0 10px;
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
</style>
