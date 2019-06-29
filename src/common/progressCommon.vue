<template>
  <div ref="progressBox" class="progress_box" @mouseenter="mouseenter()" @mousedown="mouseDown($event)" @mousemove="mouseMove($event)" @mouseup="mouseUp()" @mouseleave="mouseleave()">
    <span class="icon_circle_progress" ref="iconProgress" style="left:0;"></span>
    <el-progress class="play_progress" :percentage="currentPercent" :show-text="false" color="#31c27c" :stroke-width="onMouseHeight"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'progressCommon',
  props: ['position', 'currentPercentage', 'progressWrapperL', 'songDuration', 'progressHeight'],
  data () {
    return {
      currentPercent: this.currentPercentage,
      onMouseHeight: 2
    };
  },
  watch: {
    position () {
      this.$refs.iconProgress.style.left = this.position;
    },
    currentPercentage () {
      this.currentPercent = this.currentPercentage;
    }
  },
  mounted () {
    this.$refs.iconProgress.style.left = this.position;
  },
  methods: {
    // 手动更改进度条指针
    // 鼠标点击
    mouseDown (event) {
      this.clickFlag = true;
      this.currentProgress(event);
    },
    // 鼠标拖动
    mouseMove (event) {
      if (this.clickFlag) {
        this.currentProgress(event);
      }
    },
    mouseUp () {
      this.clickFlag = false;
    },
    mouseleave () {
      this.clickFlag = false;
      this.onMouseHeight = 2;
    },
    mouseenter () {
      this.onMouseHeight = 6;
    },
    currentProgress (event) {
      let clientX = event.clientX;
      let progressBoxL = this.$refs.progressBox.offsetLeft;
      let progressBoxW = this.$refs.progressBox.offsetWidth;
      let nowProcess = (clientX - this.progressWrapperL - progressBoxL) / progressBoxW;
      this.currentPercent = nowProcess * 100;
      let newCurrentTime = Math.ceil(this.songDuration * nowProcess);
      this.updateCurrentTime(newCurrentTime);
      if (this.currentPercent < 0) {
        this.currentPercent = 0;
      } else if (this.currentPercent > 100) {
        this.currentPercent = 100;
      }
      this.$refs.iconProgress.style.left = `calc(${this.currentPercent}% - 6px)`;
    },
    updateCurrentTime (time) {
      this.$emit('newTime', time);
    }
  }
};
</script>

<style scoped>
.progress_box{
  position: relative;
  display: flex;
  align-items: center;
  height: 12px;
  width: calc(100% - 90px);
}
.play_progress{
  width: 100%;
}
.icon_circle_progress{
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #31c27c;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  border: 3px solid #fff;
  display: none;
}
.progress_box:hover .icon_circle_progress{
  display: inline-block;
}
</style>
