<template>
  <div class="main_Index_boutique">
    <h2 class="index_h2">歌单推荐</h2>
    <SongsKindList :currentClass="isHot"
                   ref="SongsKindList"
                   @getSongsList="_getHotSongsList"
                   :songsListKind="songsListKind"></SongsKindList>
    <SongsList :songsList="boutiquePlaylist" ref="songsList"></SongsList>
    <div class="main_slide_wrapper">
      <span class="main_slide_left">
        <span class="main_slide_left_icon_wrapper main_slide_action_btn" @click="prevCarousel">
          <i class="main_slide_left_icon"></i>
        </span>
      </span>
      <span class="main_slide_right">
        <span class="main_slide_right_icon_wrapper main_slide_action_btn" @click="nextCarousel">
          <i class="main_slide_right_icon"></i>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import SongsList from '@/common/songsList'
import SongsKindList from '@/common/songsKind'
import {getHotSongsList, getSongsListKinds} from '@/assets/connect/songsList'
export default {
  name: 'boutiquePlaylist',
  components: {
    SongsList,
    SongsKindList
  },
  data () {
    return {
      boutiquePlaylist: [],
      isHot: true,
      songsListKind: []
    }
  },
  created () {

  },
  mounted () {
    this._getHotSongsList('全部')
    this._getSongsListKinds()
  },
  methods: {
    _getHotSongsList (cat) {
      let param = {
        cat: cat,
        pageSize: 20,
        page: 0,
        orderType: 'hot'
      }
      this.resetCarouselData()
      this.boutiquePlaylist = []
      getHotSongsList(param).then((res) => {
        console.log(res.data)
        let songsInfo = res.data
        if (songsInfo.code === 200) {
          for (let i = 0, len = songsInfo.data.length; i < len; i += 5) {
            this.boutiquePlaylist.push(songsInfo.data.slice(i, i + 5))
          }
        }
      })
    },
    prevCarousel () {
      this.$refs.songsList.$emit('prevCarousel')
    },
    nextCarousel () {
      this.$refs.songsList.$emit('nextCarousel')
    },
    resetCarouselData () {
      this.$refs.songsList.$emit('resetCarouselData')
    },
    _getSongsListKinds () {
      getSongsListKinds().then(res => {
        this.songsListKind.push({type: '全部', name: '为你推荐'})
        let hotKindsList = []
        res.data.data.sub.forEach(item => {
          if (item.hot === true) {
            hotKindsList.push(
              {
                type: item.name,
                name: item.name
              }
            )
          }
        })
        this.songsListKind = this.songsListKind.concat(this.getRandomArrayElements(hotKindsList, 5))
      })
    },
    getRandomArrayElements (arr, count) {
      let shuffled = arr.slice(0)
      let i = arr.length
      let min = i - count
      let temp
      let index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    }
  }
}
</script>

<style scoped>
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
