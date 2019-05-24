<template>
  <div class="boutique_list_wrapper">
    <el-carousel ref="carousel" indicator-position="none" :height="videoHigh + 'px'" :autoplay=false :loop=true trigger="click" arrow="never">
      <el-carousel-item class="song_list_item" v-for="(item, index) in videoList" :key="index">
        <div class="songs_item_wrapper" v-for="(video, key) in item" :key="key">
          <div class="songs_item_wrapper_box" ref="videoItemHeight">
            <div class="songs_cover_wrapper">
              <img @load="imgLoad" ref="videoImgHeight" class="songs_cover_pic" v-lazy="video.cover" :key="video.cover" alt="">
              <i class="songs_cover_mask"></i>
              <i class="songs_cover_icon_paly"></i>
            </div>
            <h4 class="video_title text_elli" :title="video.name">{{video.name}}</h4>
            <h4 class="songs_title text_elli">
               <span v-for="(item, index) in video.artists" :key="item.id">
                <span v-if="index != 0"> / </span>
                <span class="singer_name" :title="item.name" @click="getSinger(item.id)">{{item.name}}</span>
              </span>
            </h4>
            <p><i class="mv_icon_play"></i>{{formatCount(video.playCount)}}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="indicator_wrapper">
      <span @click="changeCarousel(index)" class="indicator_item" v-for="(item, index) in videoList" :class="currentActive === index ? 'currentActive' : ''" :key="index" :name="index"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songVideoList',
  props: ['videoList'],
  data () {
    return {
      currentActive: 0,
      videoHigh: 300
    }
  },
  mounted () {
    this.$on('nextCarousel', () => {
      this.nextCarousel()
    })
    this.$on('prevCarousel', () => {
      this.prevCarousel()
    })
    this.$on('resetCarouselData', () => {
      this.currentActive = 0
    })
    window.addEventListener('resize', () => {
      if (this.$refs.videoImgHeight[0]) {
        this.videoHigh = (this.$refs.videoImgHeight[0].height + 100) * 2
      }
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
      this.currentActive = this.$refs.carousel.activeIndex
    },
    nextCarousel () {
      this.$refs.carousel.next()
      this.currentActive = this.$refs.carousel.activeIndex
    },
    changeCarousel (index) {
      this.currentActive = index
      this.$refs.carousel.setActiveItem(index)
    },
    imgLoad () {
      this.$nextTick(() => {
        // console.log(this.$refs.imgHeight[0].height)
        this.videoHigh = (this.$refs.videoImgHeight[0].height + 100) * 2
      })
    },
    getSinger (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
  .boutique_list_wrapper{
    overflow: hidden;
    margin-right: -20px;
    z-index: 2;
    position: relative;
  }
  .songs_title{
    margin: 5px 0;
    line-height: 1.6;
    cursor: pointer;
  }
  .singer_name:hover{
    color: #31c27c;
  }
  .song_list_item{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .boutique_list>li img{
    width: 100%;
    vertical-align:top;
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
  }
  .songs_item_wrapper_box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-right: 20px;
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
  .video_title{
    cursor: pointer;
  }
  .text_elli{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .video_title:hover{
    color: #31c27c;
  }
  .mv_icon_play{
    display: inline-block;
    width: 19px;
    height: 12px;
    background-position: -180px -20px;
    margin-right: 5px;
    vertical-align: -1px;
    background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite@2x.png') 2x);
  }
</style>
