<template>
  <div class="mic_singers">
    <h3 class="h3_title">热门歌手</h3>
    <ul class="singer_list">
      <li v-for="singer in singerList" :key="singer.id" class="singer_item">
        <img @click="getSinger(singer.singer_mid, singer.singer_pic)" class="singer_cover" v-lazy="singer.singer_pic" alt="" :key="singer.singer_pic">
        <span class="singer_name" @click="getSinger(singer.singer_mid, singer.singer_pic)">{{singer.singer_name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {getSingerRank} from '@/assets/connect/songsList'
import { Loading } from 'element-ui'
export default {
  name: 'singers',
  data () {
    return {
      page: 0,
      pageSize: 100,
      singerList: []
    }
  },
  created () {
    this._getSingerRank()
  },
  methods: {
    _getSingerRank () {
      let options = {
        page: this.page,
        pageSize: this.pageSize
      }
      let option = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }
      Loading.service(option)
      getSingerRank(options).then(res => {
        console.log(res.data)
        this.singerList = res.data.data
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service(option).close()
        })
      })
    },
    getSinger (id, picUrl) {
      sessionStorage.setItem('singerCover', picUrl)
      this.$router.push({
        name: 'SingerDetail',
        params: {id: id}
      })
    }
  }
}
</script>

<style scoped>
.mic_singers{
  padding: 0 50px;
}
.singer_cover{
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.singer_item{
  width: 20%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.singer_list{
  display: flex;
  flex-wrap: wrap;
}
.h3_title{
  padding: 40px 0;
  text-align: center;
}
.singer_name:hover{
  color: #31c27c;
}
</style>
