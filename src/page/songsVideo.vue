<template>
  <div class="mic_video">
    <div class="video_list_wrapper">
      <videoListView :videoList="videoList"></videoListView>
    </div>
    <pagination
      v-show="videoList.length>0"
      :page-index="currentPage"
      :total="count"
      :page-size="pageSize"
      @change="pageChange">></pagination>
  </div>
</template>

<script>
import {getMvRank} from '@/assets/connect/songsList';
import videoListView from '@/common/videoListView';
import pagination from '@/common/pagination';
import { Loading } from 'element-ui';
export default {
  name: 'songVideo',
  components: {
    videoListView,
    pagination
  },
  data () {
    return {
      page: 1,
      pageSize: 20,
      videoList: [],
      currentPage: 1,
      count: 1000
    };
  },
  created () {
    this._getMvRank();
  },
  methods: {
    _getMvRank () {
      let options = {
        page: this.page,
        pageSize: this.pageSize
      };
      let option = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      };
      Loading.service(option);
      getMvRank(options).then(res => {
        console.log(res.data);
        this.videoList = res.data.data.list;
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service(option).close();
        });
      });
    },
    pageChange (val) {
      this.page = val;
      this._getMvRank();
    }
  }
};
</script>

<style scoped>
.mic_video{
  padding: 20px 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.video_list_wrapper{
  padding-bottom: 20px;
}
</style>
