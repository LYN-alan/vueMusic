<template>
  <div class="boutique_list_wrapper">
    <el-carousel ref="carousel" indicator-position="none" :height="songsItemHigh + 'px'" :autoplay=false :loop=true trigger="click" arrow="never">
      <el-carousel-item class="song_list_item" v-for="(item, index) in songsList" :key="index">
        <songsListView :songsList="item" @songsItemHigh="updateSongsItemHigh"></songsListView>
      </el-carousel-item>
    </el-carousel>
    <div class="indicator_wrapper">
      <span @click="changeCarousel(index)" class="indicator_item" v-for="(item, index) in songsList" :class="currentActive === index ? 'currentActive' : ''" :key="index" :name="index"></span>
    </div>
  </div>
</template>

<script>
import songsListView from '@/common/songsListView'
export default {
  name: 'songsList',
  props: ['songsList'],
  components: {
    songsListView
  },
  data () {
    return {
      currentActive: 0,
      songsItemHigh: 300
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
}

.song_list_item{
  display: flex;
  flex-direction: row;
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
</style>
