<template>
  <div class="main_Index_boutique">
    <h2 class="index_h2">歌单推荐</h2>
    <SongsKindList :currentClass="isHot"
                   ref="SongsKindList"
                   @getSongsList="_getHotSongsList"
                   :songsListKind="songsListKind"></SongsKindList>
    <SongsList :songsList="boutiquePlaylist" ref="songsList"></SongsList>
    <SlideCommon @prevCarousel="prevCarousel" @nextCarousel="nextCarousel"></SlideCommon>
  </div>
</template>

<script>
import SongsList from '@/common/songsList'
import SongsKindList from '@/common/songsKind'
import {getHotSongsList, getSongsListKinds} from '@/assets/connect/songsList'
import {getRandomArrayElements} from '@/assets/utils/utils'
import SlideCommon from '@/common/slideCommon'
export default {
  name: 'boutiquePlaylist',
  components: {
    SongsList,
    SongsKindList,
    SlideCommon
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
        this.songsListKind = this.songsListKind.concat(getRandomArrayElements(hotKindsList, 5))
      })
    }
  }
}
</script>

<style>
.main_Index_boutique{
  padding: 0 50px;
  position: relative;
  background: rgba(255,255,255,.5);
}
.main_Index_boutique:hover .main_slide_action_btn{
  opacity: 1;
  transform: translateX(0);
  transition-property:transform,background,width,opacity;
  transition-duration: .5s;
}
</style>
