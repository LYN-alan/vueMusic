<template>
  <div class="boutique_list_wrapper">
    <swiperVideo :options="swiperOptionVideo" v-if="videoList.length>1">
      <swiper-slide v-for="(item, index) in videoList" :key="index">
        <videoListView :videoList="item"></videoListView>
      </swiper-slide>
    </swiperVideo>
    <div class="swiper-pagination-video"  slot="pagination"></div>
  </div>
</template>

<script>
import videoListView from '@/common/videoListView'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'songVideoList',
  props: ['videoList'],
  components: {
    videoListView,
    swiperVideo: swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOptionVideo: {
        notNextTick: false,
        loop: true,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination-video',
          clickable: true
        },
        autoplay: false,
        navigation: {
          nextEl: '.videoList_slide_next',
          prevEl: '.videoList_slide_prev'
        }
      }
    }
  },
  mounted () {},
  methods: {
    formatCount (num) {
      if (num > 10000) {
        return (num / 10000).toFixed(2) + '万'
      } else {
        return num
      }
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
  .swiper-pagination-video{
    text-align: center;
    padding: 10px 0;
  }
</style>
