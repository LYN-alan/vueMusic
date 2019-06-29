<template>
  <div class="progress_wrapper" ref="progressWrapper">
    <p class="start_time">
       <span>{{_formatTime(currentTime)}}</span>
    </p>
    <ProgressCommon
      ref="ProgressCommon"
      :position="position"
      :currentPercentage="currentPercentage"
      :progressWrapperL="progressWrapperL"
      :songDuration="songDuration"
      @newTime="newTime"></ProgressCommon>
<!--    <div ref="progressBox" class="progress_box" @mousedown="mouseDown($event)" @mousemove="mouseMove($event)" @mouseup="mouseUp()">-->
<!--      <span class="icon_circle_progress" ref="iconProgress" style="left:-6px;"></span>-->
<!--      <el-progress class="play_progress" :percentage="currentPercentage" :show-text="false" color="#31c27c"></el-progress>-->
<!--    </div>-->
    <p class="end_time">{{_formatTime(songDuration)}}</p>
  </div>
</template>

<script>
import {formatTime} from '@/assets/utils/utils';
import ProgressCommon from '@/common/progressCommon';
export default {
  name: 'playProgress',
  props: ['currentSongTime', 'songDuration'],
  components: {
    ProgressCommon
  },
  data () {
    return {
      currentTime: this.currentSongTime,
      startTime: '',
      currentPercentage: 0,
      clickFlag: false,
      position: '-6px',
      progressWrapperL: ''
    };
  },
  mounted () {
    this.progressWrapperL = this.$refs.progressWrapper.offsetLeft;
  },
  watch: {
    currentSongTime () {
      this.$nextTick(() => {
        this.currentTime = this.currentSongTime;
        if (Number(this.currentSongTime) === 0) {
          this.currentPercentage = 0;
        } else if (Number(this.currentSongTime) !== 0 && Number(this.songDuration) !== 0) {
          let currentPer = (this.currentSongTime / this.songDuration) * 100;
          this.currentPercentage = currentPer > 100 ? 100 : currentPer;
        }
        this.position = `calc(${this.currentPercentage}% - 6px)`;
      });
    }
  },
  methods: {
    _formatTime (num) {
      return formatTime(num);
    },
    // // 手动更改进度条指针
    // // 鼠标点击
    // mouseDown (event) {
    //   this.clickFlag = true;
    //   this.currentProgress(event);
    // },
    // // 鼠标拖动
    // mouseMove (event) {
    //   if (this.clickFlag) {
    //     this.currentProgress(event);
    //   }
    // },
    // mouseUp () {
    //   this.clickFlag = false;
    // },
    // currentProgress (event) {
    //   let clientX = event.clientX;
    //   let progressBoxL = this.$refs.ProgressCommon[0].$refs.progressBox.offsetLeft;
    //   let progressBoxW = this.$refs.ProgressCommon[0].$refs.progressBox.offsetWidth;
    //   let progressWrapperL = this.$refs.progressWrapper.offsetLeft;
    //   let nowProcess = (clientX - progressWrapperL - progressBoxL) / progressBoxW;
    //   this.currentPercentage = nowProcess * 100;
    //   let newCurrentTime = Math.ceil(this.songDuration * nowProcess);
    //   this.updateCurrentTime(newCurrentTime);
    //   if (this.currentPercentage < 0) {
    //     this.currentPercentage = 0;
    //   } else if (this.currentPercentage > 100) {
    //     this.currentPercentage = 100;
    //   }
    //   this.position = `calc(${this.currentPercentage}% - 6px)`;
    // },
    newTime (time) {
      this.$emit('newCurrentTime', time);
    }
  }
};
</script>

<style scoped>
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
}
.progress_wrapper{
  display: flex;
  position: relative;
  align-items: center;
  font-size: 12px;
  color: #fff;
  width: 100%;
}
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
.start_time,
.end_time{
  width: 35px;
  text-align: center;
}
.start_time{
  margin-right: 10px;
}
.end_time{
  margin-left: 10px;
}
</style>
