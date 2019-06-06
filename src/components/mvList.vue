<template>
  <div class="mv_list_wrapper">
    <div class="mv_list_item" v-for="video in videoList" :key="video.id">
      <div class="songs_cover_wrapper">
        <img ref="videoImgHeight" class="songs_cover_pic" v-lazy="video.pic" :key="video.pic" alt="">
        <i class="songs_cover_mask"></i>
        <i class="songs_cover_icon_paly"></i>
      </div>
      <p class="video_title">
        <span :title="video.title">{{video.title}}</span>
      </p>
      <p><i class="mv_icon_play"></i>{{_formatCount(video.listenCount)}}</p>
    </div>
    <Pagination
      v-if="videoList.length > 0"
      :page-index="page"
      :total="totalMv"
      :page-size="pageSize"
      @change="changePage"></Pagination>
  </div>
</template>

<script>
import {getSingerMv} from '@/assets/connect/songsList';
import {formatCount} from '@/assets/utils/utils';
import Pagination from '@/common/pagination';
export default {
  name: 'mvList',
  props: ['totalMv'],
  components: {
    Pagination
  },
  data () {
    return {
      page: 1,
      pageSize: 20,
      format: 1,
      singerId: '',
      videoList: []
    };
  },
  created () {
    this.singerId = this.$route.params.id;
    this._getSingerMv();
  },
  methods: {
    _getSingerMv () {
      let options = {
        page: this.page,
        pageSize: this.pageSize,
        id: this.singerId,
        format: this.format
      };
      getSingerMv(options).then(res => {
        console.log(res.data);
        this.videoList = res.data.data;
      });
    },
    _formatCount (num) {
      return formatCount(num);
    },
    changePage (val) {
      this.page = val;
      this._getSingerMv();
    }
  }
};
</script>

<style scoped>
.mv_list_wrapper{
  font-size: 14px;
  min-height: 600px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
}
.mv_list_item{
  width: 25%;
  padding-right: 20px;
  box-sizing: border-box;
  margin: 20px 0;
}
.video_title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;
  cursor: pointer;
}
.video_title>span:hover{
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
