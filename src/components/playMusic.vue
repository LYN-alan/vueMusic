<template>
  <div class="player_wrapper">
    <div class="player_larger" v-show="!playMini">
      <!--    播放列表-->
      <div class="player_songs_list">
        <p>player_large</p>
      </div>
      <!--    歌词展示-->
      <div></div>
      <!--    播放组件-->
      <div>
        <audio :src="songSrc" ref="playControl"></audio>
      </div>
    </div>
    <div class="player_small" v-show="playMini">
      <div class="player_control_icon_box">
        <span class="icon_prev_control icon_prev" title="上一首" @click="prevSong"></span>
        <span class="icon_play_control" :class="playing?'icon_play':'icon_paused'" @click="pausedBtn" title="播放/暂停"></span>
        <span class="icon_next_control icon_next" title="下一首" @click="nextSong"></span>
      </div>
      <div class="player_song_info">
        <img v-lazy="currentSongCover" alt="">
        <div>
          <span class="player_song_title"></span>
        </div>
      </div>
      <div class="player_list_icon_box">
        <span class="icon_loop_type"></span>
        <span class="icon_playList"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'playMusic',
  data () {
    return {
      songSrc: '',
      playMini: true,
      currentSongCover: '',
      percentage: 50
    };
  },
  computed: {
    ...mapGetters(['playList', 'playing', 'currentIndex'])
  },
  mounted () {
    console.log(this.playList, this.playing);
  },
  watch: {
    playList () {
      console.log(this.playList);
      this.songUrl();
    },
    songSrc (src) {
      if (src !== '') {
        this.$nextTick(() => {
          this.$refs.playControl.play();
        });
      }
    }
  },
  methods: {
    songUrl () {
      if (this.playing) {
        let songId = this.playList[this.currentIndex];
        this.songSrc = `https://v1.itooi.cn/tencent/url?id=${songId}&quality=128&isRedirect=1`;
      }
    },
    format () {
      return this.percentage === 100 ? '满' : `${this.percentage}%`;
    },
    prevSong () {
      console.log('prev');
    },
    nextSong () {
      console.log('next');
    },
    pausedBtn () {
      console.log('play');
    }
  }
};
</script>

<style scoped>
.player_small{
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  background:rgba(0,0,0,1);
  width: 100%;
  z-index: 2019;
  padding: 0 50px;
}
.icon_prev,
.icon_next,
.icon_play,
.icon_paused{
  display: inline-block;
  width: 1.8em;
  height: 1.8em;
  background-size: 100% 100%;
  cursor: pointer;
  margin: 0 8px;
}
.icon_prev{
  background-image: url('../assets/image/icon_prev.svg');
}
.icon_next{
  background-image: url('../assets/image/icon_next.svg');
}
.icon_play{
  background-image: url('../assets/image/icon_play.svg');
}
.icon_paused{
  background-image: url('../assets/image/icon_paused.svg');
}
.player_small{
  display: flex;
  align-items: center;
}
.player_song_info img{
  margin-left: 25px;
  width: 60px;
  height: 60px;
}
.player_song_info{
  width: 50%;
  min-width: 480px;
}
.player_control_icon_box{
  min-width: 150px;
}
</style>
