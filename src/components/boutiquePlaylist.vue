<template>
  <div class="main_Index_boutique">
    <h2 class="index_h2">精品歌单</h2>
    <SongsList :songsList="boutiquePlaylist" ref="songsList"></SongsList>
    <div class="main_slide_wrapper">
      <span class="main_slide_left">
        <span class="main_slide_left_icon_wrapper main_slide_action_btn" @click="changeSongsListL">
          <i class="main_slide_left_icon"></i>
        </span>
      </span>
      <span class="main_slide_right" @click="changeSongsListR">
        <span class="main_slide_right_icon_wrapper main_slide_action_btn">
          <i class="main_slide_right_icon"></i>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import SongsList from '@/common/songsList'
import {getHotSongsList} from '@/assets/connect/songsList'
export default {
  name: 'boutiquePlaylist',
  components: {
    SongsList
  },
  data () {
    return {
      boutiquePlaylist: []
    }
  },
  created () {

  },
  mounted () {
    this._getHotSongsList()
  },
  methods: {
    _getHotSongsList () {
      let param = {
        pageSize: 10,
        page: 0,
        orderType: 'hot'
      }
      getHotSongsList(param).then((res) => {
        console.log(res.data)
        let songsInfo = res.data
        if (songsInfo.code === 200) {
          this.boutiquePlaylist = songsInfo.data
          this.boutiquePlaylist = this.boutiquePlaylist.concat(songsInfo.data)
        }
      })
    },
    changeSongsListL () {
      this.$refs.songsList.$emit('changeList')
    },
    changeSongsListR () {
      console.log(111)
    }
  }
}
</script>

<style scoped>
.index_h2{
  padding-top: 4.1667%;
  padding-bottom: 2%;
  font-size: 200%;
  letter-spacing: 10px;
}
.main_Index_boutique{
  padding: 0 50px;
  position: relative;
}
.main_slide_wrapper{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main_slide_left,
.main_slide_right{
  position: absolute;
  width: 50%;
  top: 0;
  height: 100%;
}
.main_slide_left{
  left: 0;
}
.main_slide_right{
  right: 0;
}
.main_slide_left_icon_wrapper{
  left: 0;
  transform: translateX(-100%);
  cursor: pointer;
}
.main_slide_right_icon_wrapper{
  right: 0;
  transform: translateX(100%);
  cursor: pointer;
}
.main_slide_left_icon_wrapper,
.main_slide_right_icon_wrapper{
  position: absolute;
  top: 50%;
  margin-top: -54px;
  width: 79px;
  height: 108px;
  background: rgba(0,0,0,.05);
  opacity: 0;
  transition-property: opacity,transform;
  transition-duration: .5s;
  z-index: 2;
}
  .main_slide_left_icon,
  .main_slide_right_icon{
    position: absolute;
    top: 50%;
    margin-top: -20px;
    width: 20px;
    height: 39px;
    background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite@2x.png?') 2x);
  }
  .main_slide_right_icon{
    right: 29px;
    background-position: 0 -120px;
  }
  .main_slide_left_icon{
    left: 29px;
    background-position: -20px -120px;
  }
  .main_Index_boutique:hover .main_slide_action_btn{
    opacity: 1;
    transform: translateX(0);
    transition-property:transform,background,width,opacity;
    transition-duration: .5s;
  }
</style>
