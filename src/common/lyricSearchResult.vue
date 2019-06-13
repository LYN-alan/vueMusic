<template>
  <div class="lyric_result_wrapper">
    <ul>
      <li class="lyric_result_item" v-for="(item, index) in lyricResult" :key="item.songmid">
        <div>
          <p>
            <span @click="songerDetail(item.songmid)" v-html="item.songname_hilight"></span>-
            <span>
              <span v-for="(singer, key) in item.singer" :key="singer.mid">
                <span v-if="key != 0"> / </span>
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
            <i class="el-icon-plus icon_plus" ref="iconFold"></i>
            <i ref="unfold">展开</i>
          </el-button>
          <el-button class="copy_lyric" :data-clipboard-text="item.content" @click="copyLyric">
            <i class="el-icon-document-copy"></i>
            复制歌词
          </el-button>
        </div>
        <PlayIcon :id="item.songmid"></PlayIcon>
      </li>
    </ul>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import PlayIcon from '@/common/playIcon';
export default {
  name: 'lyricSearchResult',
  props: ['lyricResult'],
  components: {
    PlayIcon
  },
  data () {
    return {
      unfoldIndex: ''
    };
  },
  methods: {
    getAlbumDetail (id) {
      console.log(id);
    },
    getSinger (id) {
      console.log(id);
    },
    songerDetail (id) {
      console.log(id);
    },
    replaceNewline (str) {
      return str.replace(/\\n/g, '<br/>');
    },
    lyricUnfold (index) {
      console.log(this.$refs.iconFold[index].className);
      if (this.$refs.iconFold[index].className.indexOf('el-icon-plus') !== -1) {
        this.$refs.iconFold[index].className = 'el-icon-minus';
        this.$refs.lyricContent[index].style.height = 'auto';
        this.$refs.unfold[index].innerHTML = '收起';
      } else {
        this.$refs.iconFold[index].className = 'el-icon-plus';
        this.$refs.lyricContent[index].style.height = '196px';
        this.$refs.unfold[index].innerHTML = '展开';
      }
    },
    copyLyric () {
      let clipboard = new Clipboard('.copy_lyric');
      clipboard.on('success', e => {
        console.log('复制成功');
        this.$message({
          type: 'success',
          message: '复制成功'
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制');
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>

<style scoped>
.lyric_result_wrapper{
  font-size: 14px;
  line-height: 28px;
}
.lyric_result_item{
  position: relative;
}
.quick_button_wrapper{
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
}
.lyric_content{
  overflow: hidden;
  color: #999;
}
.lyric_result_item{
  padding: 20px 0;
}
</style>
