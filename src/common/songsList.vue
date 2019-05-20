<template>
  <div class="boutique_list_wrapper">
    <el-carousel ref="carousel" indicator-position="none" height="280px" :autoplay=false :loop=true trigger="click" arrow="never">
      <el-carousel-item class="song_list_item" v-for="(item, index) in songsList" :key="index">
        <div class="songs_item_wrapper" v-for="(song, key) in item" :key="key">
          <div class="songs_cover_wrapper">
            <img class="songs_cover_pic" v-lazy="song.coverImgUrl" :key="song.coverImgUrl" alt="">
            <i class="songs_cover_mask"></i>
            <i class="songs_cover_icon_paly"></i>
          </div>
          <h4 class="songs_title">{{song.name}}</h4>
          <p>播放量：{{formatCount(song.playCount)}}</p>
        </div>>
      </el-carousel-item>
    </el-carousel>
    <div class="indicator_wrapper">
      <span @click="changeCarousel(index)" class="indicator_item" v-for="(item, index) in songsList" :class="currentActive === index ? 'currentActive' : ''" :key="index" :name="index"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songsList',
  props: ['songsList'],
  data () {
    return {
      currentActive: 0
    }
  },
  mounted () {
    this.$on('nextCarousel', () => {
      this.nextCarousel()
    })
    this.$on('prevCarousel', () => {
      this.prevCarousel()
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
    prevCarousel () {
      this.$refs.carousel.prev()
    },
    nextCarousel () {
      this.$refs.carousel.next()
    },
    changeCarousel (index) {
      this.currentActive = index
      this.$refs.carousel.setActiveItem(index)
    }
  }
}
</script>

<style scoped>
.boutique_list_wrapper{
  overflow: hidden;
  margin-right: -20px;
  margin-bottom: 20px;
  z-index: 2;
  position: relative;
}
.songs_title{
  margin: 5px 0;
  line-height: 1.6;
  cursor: pointer;
}
.songs_title:hover{
  color: #31c27c;
}
.song_list_item{
  display: flex;
  flex-direction: row;
}
.songs_cover_wrapper{
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.boutique_list>li img{
  width: 100%;
  vertical-align:top;
}
.songs_item_wrapper{
  width: 20%;
  padding-right: 20px;
  box-sizing: border-box;
}
.indicator_wrapper {
  text-align: center;
  height: 40px;
}
.indicator_item{
  display: inline-block;
  width: 10px;
  height: 10px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background-color: rgba(0,0,0,.1);
  cursor: pointer;
  margin: 8px;
}
.currentActive{
  background-color: rgba(0,0,0,.3);
}
.songs_cover_pic{
  transform: scale(1) translateZ(0);
  transition: transform .75s;
  width: 100%;
}
.songs_cover_mask{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: opacity .5s;
  transition: opacity .5s;
}
  .songs_cover_icon_paly{
    background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/cover_play.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/cover_play@2x.png') 2x);
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -35px;
    width: 70px;
    height: 70px;
    filter: alpha(opacity=0);
    opacity: 0;
    -webkit-transform: scale(.7) translateZ(0);
    -webkit-transition-property: opacity,-webkit-transform;
    -webkit-transition-duration: .5s;
    transform: scale(.7) translateZ(0);
    transition-property: opacity,transform,zoom;
    transition-duration: .5s;
    zoom: 1;
  }
  .songs_cover_wrapper:hover .songs_cover_mask{
    opacity: .2;
    transition: opacity .5s;
  }
  .songs_cover_wrapper:hover .songs_cover_icon_paly{
    opacity: 1;
    filter: none;
  }
  .songs_cover_wrapper:hover .songs_cover_pic,
  .songs_cover_wrapper:hover .songs_cover_icon_paly {
    transform: scale(1.07) translateZ(0);
    transition: transform .5s;
  }
</style>
