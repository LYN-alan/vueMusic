<template>
  <div class="mic_search">
    <div class="search_wrapper">
      <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" class="type_select">
          <el-option v-for="type in searchType" :label="type.name" :value="type.key" :key="type.key"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchValue"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import {doSearch} from '@/assets/connect/songsList'
export default {
  name: 'search',
  data () {
    return {
      search: '',
      select: 'song',
      pageSize: 20,
      page: 0,
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
          key: 'video'
        },
        {
          name: '歌词',
          key: 'lrc'
        }
      ]
    }
  },
  methods: {
    searchValue () {
      if (this.search !== '') {
        this._doSearch()
      } else {
        this.$message({
          type: 'warning',
          message: '请输入查询内容'
        })
      }
    },
    _doSearch () {
      let params = {
        keyword: this.search,
        type: this.select,
        pageSize: this.pageSize,
        page: this.page,
        format: 0
      }
      doSearch(params).then(res => {
        console.log(res.data)
      })
    }
  }
}
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
