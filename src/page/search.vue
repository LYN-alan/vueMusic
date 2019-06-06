<template>
  <div class="mic_search">
    <div class="search_wrapper">
      <el-input placeholder="请输入内容" v-model="search" class="input-with-select" @keydown.enter.native="_doSearch">
        <el-select v-model="select" slot="prepend" placeholder="请选择" class="type_select" @change="searchClickChange">
          <el-option v-for="type in searchType" :label="type.name" :value="type.key" :key="type.key"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchValue"></el-button>
      </el-input>
    </div>
    <searchResult :searchResult="searchResult" :searchType="select" :searchClick="searchClick"></searchResult>
    <Pagination
      v-show="searchResult.length>0"
      :page-index="page"
      :total="count"
      :page-size="pageSize"
      @change="pageChange">></Pagination>
  </div>
</template>

<script>
import {doSearch} from '@/assets/connect/songsList';
import searchResult from '@/components/searchResult';
import Pagination from '@/common/pagination';
import {Loading} from 'element-ui';
export default {
  name: 'search',
  components: {
    searchResult,
    Pagination
  },
  data () {
    return {
      search: '',
      select: 'song',
      pageSize: 20,
      page: 1,
      count: 0,
      searchType: [
        {
          name: '音乐',
          key: 'song'
        },
        {
          name: '歌手',
          key: 'singer'
        },
        {
          name: '专辑',
          key: 'album'
        },
        {
          name: '歌单',
          key: 'songList'
        },
        {
          name: '视频',
          key: 'mv'
        },
        {
          name: '歌词',
          key: 'lrc'
        }
      ],
      searchResult: [],
      searchClick: false
    };
  },
  methods: {
    searchValue () {
      if (this.search !== '') {
        this._doSearch();
      } else {
        this.$message({
          type: 'warning',
          message: '请输入查询内容'
        });
      }
    },
    _doSearch () {
      let params = {
        keyword: this.search,
        type: this.select,
        pageSize: this.pageSize,
        page: this.page,
        format: 0
      };
      let option = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      };
      Loading.service(option);
      doSearch(params).then(res => {
        console.log(res.data);
        this.searchClick = true;
        if (this.select === 'singer') {
          this.searchResult = res.data.data.song.list;
          this.count = res.data.data.song.totalnum;
        } else if (this.select === 'songList') {
          this.searchResult = res.data.data.list;
          this.count = res.data.data.sum;
        } else {
          this.searchResult = res.data.data.list;
          this.count = res.data.data.totalnum;
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service(option).close();
        });
      });
    },
    searchClickChange () {
      this.searchClick = false;
      this.searchResult.length = 0;
      if (this.search !== '') {
        this._doSearch();
      }
    },
    pageChange (val) {
      this.page = val;
      this._doSearch();
    }
  }
};
</script>

<style scoped>
.mic_search{
  padding: 20px 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.search_wrapper{
  max-width: 500px;
  margin: 0 auto;
}
.type_select{
  width: 80px;
  text-align: center;
  padding: 0 12px;
}
</style>
