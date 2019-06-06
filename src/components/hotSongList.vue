<template>
  <div class="hot_song_list_wrapper">
    <SingerSongsList :songsList="songsList"></SingerSongsList>
    <Pagination
      v-if="songsList.length > 0"
      :page-index="page"
      :total="totalSong"
      :page-size="pageSize"
      @change="pageChange"></Pagination>
  </div>
</template>

<script>
import {getSingerSongs} from '@/assets/connect/songsList';
import SingerSongsList from '@/common/singerSongsList';
import Pagination from '@/common/pagination';
export default {
  name: 'hotSongList',
  props: ['singerId', 'totalSong'],
  components: {
    SingerSongsList,
    Pagination
  },
  data () {
    return {
      page: 1,
      pageSize: 20,
      format: 0,
      songsList: []
    };
  },
  created () {
    this.singerId = this.$route.params.id;
    this._getSingerSongs();
  },
  methods: {
    _getSingerSongs () {
      let options = {
        id: this.singerId,
        page: this.page,
        pageSize: this.pageSize,
        format: this.format
      };
      getSingerSongs(options).then(res => {
        console.log(res.data);
        this.songsList = res.data.data;
      });
    },
    pageChange (val) {
      this.page = val;
      this._getSingerSongs();
    }
  }
};
</script>

<style scoped>
.hot_song_list_wrapper{
  padding-bottom: 20px;
}
</style>
