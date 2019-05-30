<template>
  <div class="lyric_result_wrapper">
    <ul>
      <li class="lyric_result_item" v-for="(item, index) in lyricResult" :key="item.albumid">
        <div>
          <p>
            <span @click="songerDetail(item.songmid)" v-html="item.songname_hilight"></span>-
            <span>
              <span v-for="(singer, index) in item.singer" :key="singer.mid">
                <span v-if="index != 0"> / </span>
                <span class="song_res_singer" :title="singer.name" @click="getSinger(singer.mid)" v-html="singer.name_hilight"></span>
              </span>
            </span>
          </p>
          <p>
            <span @click="getAlbumDetail(item.albummid)" v-html="item.albumname_hilight"></span>
          </p>
        </div>
        <div>
          <p class="lyric_content" style="height: 196px" v-html="replaceNewline(item.content)" ref="lyricContent"></p>
        </div>
        <div>
          <el-button class="lyric_unfold" @click="lyricUnfold(index)">
            <i class="el-icon-plus"></i>
            展开
          </el-button>
          <el-button>
            <i class="el-icon-document-copy"></i>
            复制歌词
          </el-button>
          <el-button>
            <i class="el-icon-download"></i>
            下载歌词
          </el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'lyricSearchResult',
  props: ['lyricResult'],
  methods: {
    getAlbumDetail (id) {
      console.log(id)
    },
    getSinger (id) {
      console.log(id)
    },
    songerDetail (id) {
      console.log(id)
    },
    replaceNewline (str) {
      return str.replace(/\\n/g, '<br/>')
    },
    lyricUnfold (index) {
      this.$refs.lyricContent[index].style.height = 'auto'
    }
  }
}
</script>

<style scoped>
.lyric_result_wrapper{
  font-size: 14px;
  line-height: 28px;

}
.lyric_content{
  overflow: hidden;
  color: #999;
}
.lyric_result_item{
  padding: 20px 0;
}
</style>
