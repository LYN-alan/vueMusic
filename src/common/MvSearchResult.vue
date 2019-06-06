<template>
  <div class="mv_result_list_wrapper">
    <div class="songs_item_wrapper" v-for="(video, key) in mvResultList" :key="key">
      <div class="songs_item_wrapper_box">
        <div class="songs_cover_wrapper">
          <img ref="videoImgHeight" class="songs_cover_pic" v-lazy="video.mv_pic_url" :key="video.mv_pic_url" alt="">
          <i class="songs_cover_mask"></i>
          <i class="songs_cover_icon_paly"></i>
        </div>
        <h4 class="video_title text_elli" :title="video.title">{{video.mvName_hilight}}</h4>
        <h4 class="songs_title text_elli">
          <span v-for="(item, index) in video.singer_list" :key="item.id">
            <span v-if="index != 0"> / </span>
            <span class="singer_name" :title="item.name_hilight" @click="getSinger(item.id)">{{item.name_hilight}}</span>
          </span>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvSearchResult',
  props: ['mvResultList'],
  methods: {
    getSinger (id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
  .songs_item_wrapper{
    display: inline-block;
    width: 20%;
    overflow: hidden;
    font-size: 14px;
    vertical-align: top;
    position: relative;
  }
  .songs_item_wrapper:before{
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;
  }
  .songs_item_wrapper_box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-right: 20px;
  }
  .songs_cover_pic{
    width: 100%;
    vertical-align:top;
  }
  .songs_title{
    margin: 5px 0;
    line-height: 1.6;
    cursor: pointer;
  }
  .singer_name:hover{
    color: #31c27c;
  }
  .video_title{
    cursor: pointer;
  }
  .text_elli{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .video_title:hover{
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
