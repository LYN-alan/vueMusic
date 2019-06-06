<template>
  <div class="index_video">
    <h2 class="index_h2">MV</h2>
    <SongVideo :videoList="songVideoList" ref="videoList" ></SongVideo>
    <SlideCommon :slideType="slideType"></SlideCommon>
  </div>
</template>

<script>
import {getMvRank} from '@/assets/connect/songsList';
import SongVideo from '@/common/songVideoList';
import SlideCommon from '@/common/slideCommon';
export default {
  name: 'songVideo',
  data () {
    return {
      page: 0,
      pageSize: 40,
      type: 'VIDEO',
      songVideoList: [],
      slideType: 'videoList'
    };
  },
  components: {
    SongVideo,
    SlideCommon
  },
  created () {
    this._getMvRank();
  },
  methods: {
    _getMvRank () {
      let option = {
        page: this.page,
        pageSize: this.pageSize
      };
      getMvRank(option).then(res => {
        console.log(res.data.data);
        let videoList = res.data.data.list;
        for (let i = 0, len = videoList.length; i < len; i += 10) {
          this.songVideoList.push(videoList.slice(i, i + 10));
        }
      });
    }
  }
};
</script>

<style>
.index_video{
  padding: 0 50px;
  position: relative;
}
.index_video:hover .main_slide_action_btn{
  opacity: 1;
  transform: translateX(0);
  transition-property:transform,background,width,opacity;
  transition-duration: .5s;
}
</style>
