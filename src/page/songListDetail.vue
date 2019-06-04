<template>
  <div class="songList_detail_wrapper">
    <div class="songList_detail_top">
      <img class="songList_detail_cover" v-lazy="songListData.logo" alt="" :key="songListData.logo">
      <h3 class="songList_detail_title">{{songListData.dissname}}</h3>
      <p class="songList_detail_creator">
        <i class="icon_user"></i>
        <span>{{songListData.nickname}}</span>
      </p>
      <p>
        <span>标签:</span>
        <span v-for="tag in songListData.tags" :key="tag.id" class="tag_name">{{tag.name}}</span>
      </p>
      <p class="songList_detail_listennum">播放量:{{_formatCount(songListData.visitnum)}}</p>
      <el-button class="btn_play_all">
        <i class="icon_play_all"></i>
        <span>播放全部</span>
      </el-button>
    </div>
    <div class="songList_detail_bottom">
      <ul class="song_detail_list">
        <li class="song_list_title_menu">
          <span>歌曲</span>
          <span>歌手</span>
          <span>专辑</span>
          <span>时长</span>
        </li>
        <li class="song_list_detail" v-for="(item, index) in songListData.songlist" :key="item.id">
          <span>{{index + 1}}</span>
          <div class="song_item_title">
            <span class="song_item_title_text" :title="item.name">{{item.name}}</span>
            <PlayIcon></PlayIcon>
          </div>
          <span>
            <span v-for="(name, key) in item.singer" :key="key">
              <span v-if="key !== 0 "> / </span>
              <span class="song_item_singer" :title="name.name">{{name.name}}</span>
            </span>
          </span>
          <span class="song_item_album" :title="item.album.name">{{item.album.name}}</span>
          <span>{{_formatTime(item.interval)}}</span>
        </li>
      </ul>
      <div class="song_list_detail_desc">
        <h3>简介:</h3>
        <p v-html="songListData.desc"></p>
      </div>
    </div>
  </div>
</template>

<script>
import {getSongsListDetail} from '@/assets/connect/songsList'
import {Loading} from 'element-ui'
import PlayIcon from '@/common/playIcon'
import {formatCount, formatTime} from '@/assets/utils/utils'
export default {
  name: 'songListDetail',
  components: {
    PlayIcon
  },
  data () {
    return {
      songListData: {}
    }
  },
  created () {
    let songListId = this.$route.params.id
    console.log(songListId)
    console.log(this.songListData)
    this.initSongListDetail(songListId)
  },
  methods: {
    initSongListDetail (id) {
      let options = {
        id: id,
        format: 0
      }
      let loadOptions = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }
      Loading.service(loadOptions)
      getSongsListDetail(options).then(res => {
        console.log(res.data)
        this.songListData = res.data.data[0]
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service(loadOptions).close()
        })
      })
    },
    _formatCount (num) {
      return formatCount(num)
    },
    _formatTime (num) {
      return formatTime(num)
    }
  }
}
</script>

<style scoped>
.songList_detail_wrapper{
  padding: 0 50px;
}
.icon_play_all{
  width: 13px;
  height: 16px;
  display: inline-block;
  background-position: -80px -220px;
  vertical-align: -3px;
  background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite@2x.png') 2x);
}
.icon_user{
  float: left;
  width: 16px;
  height: 16px;
  background-position: -20px -240px;
  margin: 5px 7px 0 0;
  background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite@2x.png') 2x);
}
.btn_play_all{
  border: 1px solid #31c27c;
  background-color: #31c27c;
  color: #fff;
}
.songList_detail_cover{
  width: 250px;
  height: 250px;
  float: left;
  margin-right: 30px;
}
.songList_detail_top{
  overflow: hidden;
  padding: 35px 0;
}
.songList_detail_title{
  padding: 15px 0;
}
.songList_detail_creator,
.songList_detail_listennum{
  margin: 15px 0;
}
.tag_name{
  margin: 0 5px;
  cursor: pointer;
}
.tag_name:hover,
.song_item_title_text:hover,
.song_item_singer:hover,
.song_item_album:hover{
  color: #31c27c;
}
.song_list_title_menu,
.song_list_detail{
  position: relative;
  padding-left: 46px;
  padding-right: 95px;
  display: flex;
}
.song_list_title_menu>span,
.song_list_detail>span{
  display: inline-block;
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
  box-sizing: border-box;
}
.song_list_title_menu>span:first-child,
.song_list_detail .song_item_title{
  width: 60%;
}
.song_list_title_menu>span:last-child,
.song_list_detail>span:last-child{
  position: absolute;
  top: 0;
  right: 30px;
  width: 60px;
}
.song_list_detail>span:first-child{
  position: absolute;
  top: 0;
  left: 10px;
  color: #999;
  width: 36px;
}
.song_detail_list>li{
  line-height: 50px;
}
.song_detail_list>li:nth-of-type(odd){
  background-color: rgba(0,0,0,.01);
}
.song_list_detail_desc{
  float: right;
  position: relative;
  width: 290px;
  margin-right: -343px;
  padding-bottom: 20px;
  font-size: 14px;
}
.song_list_detail_desc>h3{
  padding: 15px 0;
}
.song_detail_list{
  float: left;
  width: 100%;
}
.songList_detail_bottom{
  overflow: hidden;
  padding-right: 343px;
}
.song_item_title{
  position: relative;
  display: flex;
  align-items: center;
}
.quick_button_wrapper{
  position: absolute;
  right: 10px;
}
.song_list_detail:hover .quick_button_wrapper{
  display: flex;
}
.song_list_detail:hover .song_item_title_text{
  width: 65%;
}
.song_item_singer,
.song_item_album{
  cursor: pointer;
}
.song_item_title_text{
  display: inline-block;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
