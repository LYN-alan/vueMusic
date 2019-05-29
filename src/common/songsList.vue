<template>
  <div class="boutique_list_wrapper">
    <swiperSong :options="swiperOptionSong" v-if="songsList.length>1">
      <swiper-slide v-for="(item, index) in songsList" :key="index">
        <songsListView :songsList="item"></songsListView>
      </swiper-slide>
    </swiperSong>
    <div class="swiper-pagination"  slot="pagination"></div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import songsListView from '@/common/songsListView'
export default {
  name: 'songsList',
  props: ['songsList'],
  components: {
    songsListView,
    swiperSong: swiper,
    swiperSlide
  },
  data () {
    return {
      currentActive: 0,
      songsItemHigh: 300,
      swiperOptionSong: {
        notNextTick: false,
        loop: true,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: false,
        navigation: {
          nextEl: '.songsSlide_slide_next',
          prevEl: '.songsSlide_slide_prev'
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
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
  },
  methods: {
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
    updateSongsItemHigh (val) {
      this.songsItemHigh = val
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
  padding-bottom: 30px;
  min-height: 300px;
}
</style>
