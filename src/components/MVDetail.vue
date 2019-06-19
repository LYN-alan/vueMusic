<template>
  <div class="MVDetail_wrapper">
    <div class="MV_wrapper" :class="fullScreen?'fullScreen':''" ref="MvWrapper">
      <video class="video" ref="MvVideo" playsinline="playsinline" preload="metadata">
        <source :src="videoSrc" :key="videoSrc" ref="MvVideoSource" type="video/mp4">
      </video>
      <div class="Mv_progress_wrapper">
        <ProgressCommon
          class="progress_common"
          ref="ProgressCommon"
          :position="position"
          :currentPercentage="currentPercentage"
          :progressWrapperL="progressWrapperL"
          :songDuration="songDuration"
          @newTime="newTime"></ProgressCommon>
        <div class="Mv_control_wrapper">
          <div class="Mv_control_time">
            <span :class="MvStatus?'Mv_pause':'Mv_play'" @click="changeMvPlayStatus"></span>
            <span>{{_formatTime(currentVideoTime)}}</span><span>/</span><span>{{_formatTime(MvDetail.duration)}}</span>
          </div>
          <div>
            <span @click="EnterFullscreen" :title="fullScreen?'退出全屏':'全屏'" :class="!fullScreen?'enter_fullScreen':'exit_fullScreen'"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="Mv_info">
      <span class="Mv_info_name">{{MvDetail.name}}</span>
      <span> - </span>
      <span>
        <span v-for="(singer, index) in MvDetail.singers" :key="index">
          <span v-if="index !== 0">/</span>
          <span>{{singer.name}}</span>
        </span>
        </span>
      <span class="MV_info_playTime">播放量:{{_formatCount(MvDetail.playcnt)}}</span>
    </div>
    <div class="Mv_desc">
      <p>视频简介</p>
      <span>{{MvDetail.desc}}</span>
    </div>
  </div>
</template>

<script>
import {getMvDetail} from '@/assets/connect/songsList';
import {mapActions} from 'vuex';
import {formatCount, formatTime} from '@/assets/utils/utils';
import ProgressCommon from '@/common/progressCommon';

export default {
  name: 'MVDetail',
  components: {
    ProgressCommon
  },
  data () {
    return {
      videoSrc: '',
      MvDetail: {},
      MvStatus: false,
      currentVideoTime: 0,
      fullScreen: false,
      currentPercent: 0,
      progressWrapperL: 0,
      position: '',
      songDuration: 0,
      currentPercentage: 0
    };
  },
  created () {
    let MVId = this.$route.params.id;
    this.videoSrc = `https://v1.itooi.cn/tencent/mvUrl?id=${MVId}&quality=1080`;
    this._getMvDetail(MVId);
  },
  mounted () {
    this.progressWrapperL = this.$refs.MvWrapper.offsetLeft;
  },
  beforeDestroy () {
    this.changeMvPlayingStatus(false);
    this.$refs.MvVideo.pause();
    this.videoSrc = '';
    console.log(this.videoSrc);
  },
  methods: {
    _getMvDetail (id) {
      getMvDetail(id).then(res => {
        console.log(res.data.data[id]);
        this.MvDetail = res.data.data[id];
        this.songDuration = this.MvDetail.duration;
        this.load();
      });
    },
    load () {
      let MVDom = this.$refs.MvVideo;
      let self = this;
      if (MVDom) {
        MVDom.oncanplay = () => {
          MVDom.play();
          self.MvStatus = true;
        };
        MVDom.addEventListener('timeupdate', () => {
          self.currentVideoTime = Math.floor(MVDom.currentTime);
          self.currentPercentage = (self.currentVideoTime / self.MvDetail.duration) * 100;
          if (self.currentPercentage < 0) self.currentPercentage = 0;
          if (self.currentPercentage > 100) self.currentPercentage = 100;
          this.position = `calc(${self.currentPercentage}% - 6px)`;
        }, false);
      }
    },
    _formatCount (num) {
      return formatCount(num);
    },
    _formatTime (num) {
      return formatTime(num);
    },
    EnterFullscreen () {
      this.fullScreen = !this.fullScreen;
    },
    changeMvPlayStatus () {
      this.MvStatus = !this.MvStatus;
      if (this.MvStatus) {
        this.$refs.MvVideo.play();
      } else {
        this.$refs.MvVideo.pause();
      }
    },
    newTime (time) {
      console.log(time);
      this.$refs.MvVideo.currentTime = time;
    },
    ...mapActions(['changeMvPlayingStatus'])
  }
};
</script>

<style scoped>
.MVDetail_wrapper{
  max-width: 1200px;
  margin: 0 auto;
  min-height: 800px;
  padding: 0 50px;
}
.video{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  outline: 0;
}
.MV_wrapper{
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 674px;
}
.Mv_info{
  font-size: 18px;
  line-height: 50px;
  background-color: #333;
  color: #fff;
  padding: 0 20px;
}
.MV_info_playTime{
  color: #999;
  font-size: 14px;
}
.Mv_progress_wrapper{
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: none;
}
.Mv_desc{
  padding: 15px 0;
  font-size: 14px;
}
.Mv_progress{
  position: absolute;
  top: 0;
  width: 100%;
}
.MV_wrapper:hover .Mv_progress_wrapper{
  display: block;
}
.Mv_pause,
.Mv_play{
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  margin-right: 20px;
  cursor: pointer;
}
.Mv_pause{
  background-image: url("../assets/image/pause.svg");
}
.Mv_play{
  background-image: url("../assets/image/play.svg");
}
.Mv_control_wrapper{
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 10px 0;
  justify-content: space-between;
}
.Mv_control_time{
  display: flex;
  align-items: center;
}
.MV_wrapper:before{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 183px;
  background: linear-gradient(to top,rgba(46,46,46,.5) 0,rgba(0,0,0,0) 100%);
  z-index: 2;
}
.fullScreen{
  object-fit: contain;
  position: fixed !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  box-sizing: border-box !important;
  min-width: 0px !important;
  max-width: none !important;
  min-height: 0px !important;
  max-height: none !important;
  width: 100% !important;
  height: 100% !important;
  transform: none !important;
  margin: 0px !important;
}
.enter_fullScreen,
.exit_fullScreen{
  width: 30px;
  height: 30px;
  display: inline-block;
  cursor: pointer;
  background-size: 100% 100%;
}
.enter_fullScreen{
  background-image: url("../assets/image/fullscreen.svg");
}
.exit_fullScreen{
  background-image: url("../assets/image/exitFullScreen.svg");
}
.progress_common{
  width: 100% !important;
}
</style>
