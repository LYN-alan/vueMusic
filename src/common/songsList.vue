<template>
  <div class="boutique_list_wrapper">
    <ul class="boutique_list" ref="boutiqueList" style="left:-100%;">
      <li v-for="(song,index) in songsList" :key="index">
        <div class="songs_item_wrapper">
          <div class="songs_cover_wrapper">
            <img class="songs_cover_pic" v-lazy="song.coverImgUrl" :key="song.coverImgUrl" alt="">
            <i class="songs_cover_mask"></i>
            <i class="songs_cover_icon_paly"></i>
          </div>
          <h4 class="songs_title">{{song.name}}</h4>
          <p>播放量：{{formatCount(song.playCount)}}</p>
        </div>
      </li>
    </ul>
    <div class="js_jump_wrapper">
      <span
        @click="changeTransitionL"
        :class="currentActiveL?'slide_switch_item_active':''"
        class="js_jump slide_switch_item"></span>
      <span
        @click="changeTransitionR"
        :class="currentActiveR?'slide_switch_item_active':''"
        class="js_jump slide_switch_item"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songsList',
  props: ['songsList'],
  data () {
    return {
      currentTargetLeft: 0,
      currentActiveL: true,
      currentActiveR: false,
      speed: 0,
      slideKey: 1,
      repeatClick: true,
      itemWidth: 100 // 滚动一帧的宽度
    }
  },
  mounted () {
    this.$on('changeList', (val) => {
      if (val === 'LEFT') {
        this.changeSongsListL()
      } else {
        this.changeSongsListR()
      }
    })
  },
  watch: {
    songsList: {
      handler (newVal, oldVal) {
        this.currentActiveL = true
        this.currentActiveR = false
        this.$refs.boutiqueList.style.left = -100 + '%'
        this.slideKey = 1
        this.itemWidth = 100
      },
      deep: true
    }
  },
  methods: {
    formatCount (num) {
      if (num > 10000) {
        return (num / 10000).toFixed(2) + '万'
      } else {
        return num
      }
    },
    changeTransitionL () {
      if (!this.currentActiveL) {
        this.slideKey -= 1
        this.currentActiveL = true
        this.currentActiveR = false
        this.startMove('LEFT')
      }
    },
    changeTransitionR () {
      if (!this.currentActiveR) {
        this.slideKey += 1
        this.currentActiveL = false
        this.currentActiveR = true
        this.startMove('RIGHT')
      }
    },
    startMove (type) {
      let self = this
      self.speed += 0.5
      if (self.speed > 10) {
        self.speed = 10
      }
      self.itemWidth -= self.speed
      this.currentTargetLeft = this.$refs.boutiqueList.style.left
      let currentTarge = this.currentTargetLeft.split('%')[0] * 1
      if (type === 'LEFT') {
        this.$refs.boutiqueList.style.left = ((currentTarge + this.speed) < -100) ? currentTarge + this.speed + '%' : -100 + '%'
      } else if (type === 'RIGHT') {
        this.$refs.boutiqueList.style.left = (currentTarge - this.speed) > -200 ? currentTarge - this.speed + '%' : -200 + '%'
      } else if (type === 'SLIDEL') {
        if (self.itemWidth > 0) {
          this.$refs.boutiqueList.style.left = currentTarge + this.speed + '%'
        } else {
          this.$refs.boutiqueList.style.left = (self.slideKey * -100) + '%'
        }
      } else if (type === 'SLIDER') {
        if (self.itemWidth > 0) {
          this.$refs.boutiqueList.style.left = currentTarge - this.speed + '%'
        } else {
          this.$refs.boutiqueList.style.left = (self.slideKey * -100) + '%'
        }
      }
      if (type === 'LEFT' || type === 'RIGHT') {
        let timer = setInterval(function () {
          let currentLeft = self.$refs.boutiqueList.style.left.split('%')[0] * 1
          if (currentLeft > -200 && currentLeft < -100) {
            self.startMove(type)
          } else {
            self.speed = 0
            clearInterval(timer)
          }
        }, 110)
      } else if (type === 'SLIDEL' || type === 'SLIDER') {
        let slideTimer = setInterval(function () {
          if (self.itemWidth > 0) {
            self.startMove(type)
          } else {
            self.speed = 0
            clearInterval(slideTimer)
            self.$nextTick(function () {
              self.repeatClick = true
              if (self.slideKey === 0) {
                self.slideKey = 2
                self.$refs.boutiqueList.style.left = (self.slideKey * -100) + '%'
              }
              if (self.slideKey === 3) {
                self.slideKey = 1
                self.$refs.boutiqueList.style.left = (self.slideKey * -100) + '%'
              }
            })
          }
        }, 110)
      }
    },
    changeSongsListL () {
      if (this.repeatClick) {
        this.repeatClick = false
        this.currentActiveL = !this.currentActiveL
        this.currentActiveR = !this.currentActiveR
        this.slideKey -= 1
        this.itemWidth = 100
        this.startMove('SLIDEL')
      }
    },
    changeSongsListR () {
      if (this.repeatClick) {
        this.repeatClick = false
        this.currentActiveL = !this.currentActiveL
        this.currentActiveR = !this.currentActiveR
        this.slideKey += 1
        this.itemWidth = 100
        this.startMove('SLIDER')
      }
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
.boutique_list{
  position: relative;
  width: 1250%;
  padding-bottom: 15px;
}
.songs_title{
  margin: 5px 0;
  line-height: 1.6;
  cursor: pointer;
}
.songs_title:hover{
  color: #31c27c;
}
.boutique_list>li{
  position: relative;
  display: inline-block;
  width: 1.6%;
  vertical-align: top;
  font-size: 14px;
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
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  margin-right: 20px;
}
.boutique_list>li:before{
  content: "";
  display: block;
  width: 100%;
  padding-top: 100%;
  padding-bottom: 66px;
}
.js_jump_wrapper{
  text-align: center;
  margin-bottom: 10px;
}
.js_jump{
  width: 10px;
  height: 10px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  border: 8px solid #fff;
}
.slide_switch_item{
  background-color:rgba(0,0,0,.1) ;
}
.slide_switch_item_active,
.slide_switch_item:hover{
  background-color: rgba(0,0,0,.3);
}
.songs_cover_pic{
  transform: scale(1) translateZ(0);
  transition: transform .75s;
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
