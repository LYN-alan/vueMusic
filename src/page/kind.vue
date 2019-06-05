<template>
  <div class="mic_kind">
    <h3 class="h3_kind">全部分类</h3>
    <ul class="mic_kind_type">
      <li class="mic_kind_type_item" v-for="item in categories" :key="item.id">
        <h4 class="categories_type">{{item.categoryGroupName}}</h4>
        <p class="categories_sub">
          <span :class="currentType === category.categoryName ? 'currentTypeActive':'kindType'" @click="changeKings(category.categoryName)" v-for="(category, index) in  item.items" :key="index">{{category.categoryName}}</span>
        </p>
      </li>
    </ul>
    <h3 class="kind_list_title">
      <span :class="this.currentType === '全部'?'':'currentKinds'">{{currentType}}<i @click="getAllKingsSongs" v-show="this.currentType !== '全部'" class="el-icon-close allKinds"></i></span>
      <p class="change_box">
        <span @click="changeHotType" class="hot_btn" :class="isHot?'currentActive':''">最热</span>
        <span @click="changeNewType" class="newest_btn" :class="isHot?'':'currentActive'">最新</span>
      </p>
    </h3>
    <div class="kinds_songs_list">
      <songsListView :songsList="songsList"></songsListView>
    </div>
    <Pagination
      :page-index="currentPage"
      :total="count"
      :page-size="pageSize"
      @change="pageChange">
    </Pagination>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import songsListView from '@/common/songsListView';
import {getSongsListKinds, getHotSongsList} from '@/assets/connect/songsList';
import Pagination from '@/common/pagination';
export default {
  name: 'kind',
  components: {
    Pagination,
    songsListView
  },
  data () {
    return {
      categories: [],
      currentPage: 1,
      page: 1,
      pageSize: 19,
      count: 0,
      songsList: [],
      isHot: true,
      currentType: '全部'
    };
  },
  created () {
    this._getSongsListKinds();
    this._getHotSongsList(this.currentType, 'hot');
  },
  methods: {
    _getSongsListKinds () {
      let option = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      };
      Loading.service(option);
      getSongsListKinds().then(res => {
        this.categories = res.data.data;
        this.categories.shift();
        console.log(this.categories);
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service(option).close();
        });
      });
    },
    _getHotSongsList (cat, type) {
      let options = {
        cat: cat,
        orderType: type,
        page: this.page,
        pageSize: this.pageSize
      };
      let loadingOption = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      };
      Loading.service(loadingOption);
      getHotSongsList(options).then(res => {
        console.log(res.data);
        this.count = res.data.data.sum;
        this.songsList = res.data.data.list;
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service(loadingOption).close();
        });
      });
    },
    formatSongsListKind (type, SongsListKind) {
      let KindList = [];
      if (!SongsListKind) return;
      SongsListKind.forEach(item => {
        if (Number(type) === item.category) {
          KindList.push({name: item.name});
        }
      });
      return KindList;
    },
    changeHotType () {
      this.isHot = true;
      this._getHotSongsList(this.currentType, 'hot');
    },
    changeNewType () {
      this.isHot = false;
      this._getHotSongsList(this.currentType, 'new');
    },
    changeKings (type) {
      this.currentType = type;
      this._getHotSongsList(this.currentType, 'hot');
    },
    getAllKingsSongs () {
      this.currentType = '全部';
      this._getHotSongsList(this.currentType, 'hot');
    },
    pageChange (val) {
      this.page = val;
      this.currentPage = val;
      this._getHotSongsList(this.currentType, 'hot');
    }
  }
};
</script>

<style scoped>
.mic_kind{
  padding: 20px 50px;
}
.categories_sub{
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.categories_sub span{
  padding: 0 8px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}
.categories_sub .kindType:hover{
  color: #31c27c;
}
.categories_type{
  padding: 0 8px;
  float: left;
  line-height: 30px;
}
.mic_kind_type_item{
  margin: 15px 0;
  overflow: hidden;
}
.kind_list_title{
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}
.kinds_songs_list{
  margin-right: -20px;
}
.change_box{
  display: flex;
  font-size: 14px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.hot_btn,
.newest_btn{
  display: inline-block;
  padding: 0 16px;
  height: 38px;
  background: #fff;
  text-align: center;
  line-height: 38px;
  border: 1px solid #fff;
  cursor: pointer;
}
.hot_btn{
  -webkit-border-radius: 2px 0 0 2px;
  -moz-border-radius: 2px 0 0 2px;
  border-radius: 2px 0 0 2px;
}
.newest_btn{
  -webkit-border-radius: 0 2px 2px 0;
  -moz-border-radius: 0 2px 2px 0;
  border-radius: 0 2px 2px 0;
}
.currentActive{
  background: #31c27c;
  color: #fff;
  border-color: #31c27c;
}
.currentTypeActive{
  background-color: #31c27c;
  color: #fff;
}
.currentKinds{
  padding: 0 8px;
  height: 40px;
  line-height: 42px;
  background-color: #fff;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}
  .allKinds{
    margin-left: 10px;
  }
  .currentKinds:hover{
    background-color: #31c27c;
    color: #fff;
  }
  .pagination>ul{
    width: 40px;
    height: 40px;
  }
</style>
