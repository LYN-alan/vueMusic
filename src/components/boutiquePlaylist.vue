<template>
  <div class="main_Index_boutique">
    <h2 class="index_h2">歌单推荐</h2>
    <SongsKindList :currentClass="isHot"
                   ref="SongsKindList"
                   @getSongsList="_getHotSongsList"
                   :songsListKind="songsListKind"></SongsKindList>
    <SongsList :songsList="boutiquePlaylist" ref="songsList"></SongsList>
    <SlideCommon :slideType="songsList"></SlideCommon>
  </div>
</template>

<script>
import SongsList from '@/common/songsList';
import { Loading } from 'element-ui';
import SongsKindList from '@/common/songsKind';
import {getHotSongsList, getSongsListKinds} from '@/assets/connect/songsList';
import {getRandomArrayElements} from '@/assets/utils/utils';
import SlideCommon from '@/common/slideCommon';
export default {
  name: 'boutiquePlaylist',
  components: {
    SongsList,
    SongsKindList,
    SlideCommon
  },
  data () {
    return {
      boutiquePlaylist: [],
      isHot: true,
      songsListKind: [],
      songsList: 'songsSlide'
    };
  },
  created () {

  },
  mounted () {
    this._getHotSongsList('全部');
    this._getSongsListKinds();
  },
  methods: {
    _getHotSongsList (cat) {
      let param = {
        cat: cat,
        pageSize: 19,
        page: 1,
        orderType: 'hot'
      };
      let option = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      };
      Loading.service(option);
      getHotSongsList(param).then((res) => {
        console.log(res.data);
        this.boutiquePlaylist = [];
        let songsInfo = res.data.data.list;
        for (let i = 0, len = songsInfo.length; i < len; i += 5) {
          this.boutiquePlaylist.push(songsInfo.slice(i, i + 5));
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service(option).close();
        });
      });
    },
    _getSongsListKinds () {
      getSongsListKinds().then(res => {
        this.songsListKind.push({type: '全部', name: '为你推荐'});
        let hotKindsList = [];
        console.log(res.data);
        let arr = res.data.data;
        arr.shift();
        arr.forEach(item => {
          item.items.forEach(type => {
            hotKindsList.push(
              {
                type: type.categoryName,
                name: type.categoryName
              }
            );
          });
        });
        this.songsListKind = this.songsListKind.concat(getRandomArrayElements(hotKindsList, 5));
      });
    }
  }
};
</script>

<style>
.main_Index_boutique{
  padding: 0 50px;
  position: relative;
  background: rgba(255,255,255,.5);
}
.main_Index_boutique:hover .main_slide_action_btn{
  opacity: 1;
  transform: translateX(0);
  transition-property:transform,background,width,opacity;
  transition-duration: .5s;
}
</style>
