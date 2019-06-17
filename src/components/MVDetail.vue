<template>
  <div class="MVDetail_wrapper">
    <div class="MV_wrapper">
      <video class="video" ref="MvVideo" playsinline="playsinline" preload="metadata">
        <source :src="videoSrc" type="video/mp4">
        <source :src="videoSrc" type="video/ogg">
      </video>
      <div class="Mv_progress_wrapper">
        <el-progress class="Mv_progress" percentage="50"></el-progress>
        <span>播放</span>
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
    </div>
    <div>
      <p>视频简介</p>
      <span>{{MvDetail.desc}}</span>
    </div>
  </div>
</template>

<script>
import {getMvDetail} from '@/assets/connect/songsList';
import {mapActions} from 'vuex';
import {formatCount} from '@/assets/utils/utils';

export default {
  name: 'MVDetail',
  data () {
    return {
      videoSrc: '',
      MvDetail: {}
    };
  },
  created () {
    let MVId = this.$route.params.id;
    this.videoSrc = `https://v1.itooi.cn/tencent/mvUrl?id=${MVId}&quality=1080`;
    this._getMvDetail(MVId);
  },
  beforeDestroy () {
    console.log('close');
    this.changeMvPlayingStatus(false);
    this.load = null;
  },
  methods: {
    _getMvDetail (id) {
      getMvDetail(id).then(res => {
        console.log(res.data.data[id]);
        this.MvDetail = res.data.data[id];
        this.load();
      });
    },
    load () {
      let MVDom = this.$refs.MvVideo;
      MVDom.oncanplay = () => {
        console.log(1);
        // MVDom.play();
      };
    },
    _formatCount (num) {
      return formatCount(num);
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
  width: 100%;
  height: auto;
  outline: 0;
}
.MV_wrapper{
  background-color: #333;
  color: #fff;
}
.Mv_info{
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
}
.MV_info_playTime{
  color: #999;
  font-size: 14px;
}
.Mv_progress_wrapper{
  position: relative;
}
.Mv_progress{
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
