<template>
  <div class="player_wrapper">
    <div class="player_larger" v-show="showPlayerLarge">
      <!--    播放列表-->
      <div class="player_songs_list">
        <div class="player_song_list_wrapper">
          <p class="player_list_title">
            <span>播放列表({{playList.length}})</span>
            <span class="clear_play_list" @click="clearPlayListUser()">清空列表</span>
          </p>
          <scroll-lock class="player_list_lock_scroll">
            <ul class="player_list">
              <li @click="playCurrentSong(item.mid)" class="player_list_item" v-for="item in playListDetail" :key="item.mid" :class="currentSongId === item.mid ? 'currentSongItem' : ''">
                <span :class="currentSongId === item.mid ? 'icon_current_play' : ''"></span>
                <span>{{item.name}}</span>
                <span>
                  <span v-for="(singer, index) in item.singer" :key="singer.mid">
                    <span v-if="index !== 0">/</span>
                    <span>{{singer.name}}</span>
                  </span>
                </span>
                <span>{{_formatTime(item.interval)}}</span>
              </li>
            </ul>
          </scroll-lock>
        </div>
        <!--    歌词展示-->
        <div class="player_lyric_wrapper">
          <p class="player_lyric_title">
            <span>{{currentSongTitle}}</span>
            <span class="hidden_play_list" @click="showPlayerLarge = !showPlayerLarge">收起</span>
          </p>
          <div class="play_lyric_box">
            <scroll-lock class="play_lyric_box_inner">
              <div class="play_lyric_text" ref="playerLyric">
                <p ref="songLyric" :class="currentLyric === index? 'currentLyric':''" :data-time="lyric.substr(1, 8)" v-for="(lyric, index) in currentSongLrc" :key="index">{{lyric.slice(10)}}</p>
              </div>
            </scroll-lock>
          </div>
        </div>
      </div>
      <!--    播放组件-->
      <div>
        <audio :src="songSrc" ref="playControl"></audio>
      </div>
    </div>
    <div class="player_small">
      <div class="player_control_icon_box">
        <span class="icon_prev_control icon_prev" title="上一首" @click="prevSong"></span>
        <span class="icon_play_control" :class="playing?'icon_play':'icon_paused'" @click="pausedBtn" title="播放/暂停"></span>
        <span class="icon_next_control icon_next" title="下一首" @click="nextSong"></span>
      </div>
      <div class="player_song_info">
        <img v-lazy="currentSongCover" alt="" :key="currentSongCover">
        <div class="player_progress_wrapper">
          <p class="player_song_info_box">
            <span class="player_song_title">{{currentSongTitle}}</span>
            <span v-for="(item, index) in currentSongSinger" :key="item.id" class="player_song_singer">
              <span v-if="index != 0"> / </span>
              <span class="singer_name">{{item.name}}</span>
            </span>
          </p>
          <PlayProgress :currentSongTime="percentage" :songDuration="songDuration" @newCurrentTime="newCurrentTime"></PlayProgress>
        </div>
      </div>
      <div class="player_list_icon_box">
        <span class="icon_loop_type" @click="changePlayType">
          <i v-show="playType === 1" class="icon_loop_single" title="单曲循环"></i>
          <i v-show="playType === 0" class="icon_loop_order" title="列表循环"></i>
          <i v-show="playType === 2" class="icon_loop_random" title="随机播放"></i>
        </span>
        <span class="icon_playList" @click="showPlayerLarge = !showPlayerLarge">
          <i class="icon_play_list" title="播放列表"></i>
          <span class="player_list_num">{{playList.length}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {formatTime} from '@/assets/utils/utils';
import PlayProgress from '@/components/playProgress';
import {getSongDetail, getSongLrc} from '@/assets/connect/songsList';

export default {
  name: 'playMusic',
  data () {
    return {
      songSrc: '',
      showPlayerLarge: false,
      currentSongCover: '',
      percentage: 0,
      songDuration: 0,
      playType: 0,
      currentSongTitle: '',
      currentSongSinger: '',
      currentSongTime: 0,
      playListDetail: [],
      currentSongLrc: '',
      currentLyricTime: 0,
      currentSongId: '',
      currentLyric: {
        type: Number
      },
      currentLyricTop: 0
    };
  },
  components: {
    PlayProgress
  },
  computed: {
    ...mapGetters(['playList', 'playing', 'currentIndex'])
  },
  mounted () {
    this.watchMusicEnded();
    this._getPlayList();
    this._getSongLrc();
  },
  watch: {
    playList () {
      this._getPlayList();
    },
    currentIndex () {
      this.songUrl();
      this._getSongLrc();
    },
    songSrc (src) {
      if (src !== '') {
        let songId = this.playList[this.currentIndex];
        this.$nextTick(() => {
          this.$refs.playControl.play();
          this._getSongDetail(songId);
          this.currentSongCover = `https://v1.itooi.cn/tencent/pic?id=${songId}&isRedirect=1`;
          this.watchMusicTime();
        });
      }
    },
    currentSongTime () {
      this.percentage = this.currentSongTime;
    },
    currentLyricTop () {
      this.$refs.playerLyric.style.top = `-${this.currentLyricTop - 100}px`;
    }
  },
  methods: {
    songUrl () {
      if (this.playing) {
        let songId = this.playList[this.currentIndex];
        this.currentSongId = this.playList[this.currentIndex];
        this.songSrc = `https://v1.itooi.cn/tencent/url?id=${songId}&quality=128&isRedirect=1`;
      }
    },
    _getSongDetail (id) {
      getSongDetail(id).then(res => {
        this.$nextTick(() => {
          this.songDuration = res.data.data[0].interval;
          this.currentSongSinger = res.data.data[0].singer;
          this.currentSongTitle = res.data.data[0].title;
        });
      });
    },
    _getPlayList () {
      if (this.playList.length > 0) {
        let songIds = this.playList.join(',');
        getSongDetail(songIds).then(res => {
          console.log(res.data);
          this.playListDetail = res.data.data;
        });
      } else {
        this.playListDetail = [];
      }
    },
    _getSongLrc () {
      let songId = this.playList[this.currentIndex];
      if (songId !== undefined) {
        getSongLrc(songId).then(res => {
          let lyric = res.data.split('[').map(e => '[' + e).slice(6);
          lyric.map((e, index) => {
            if (e.slice(10).length === 1) {
              lyric.splice(index, 1);
            }
          });
          this.currentSongLrc = lyric;
        });
      }
    },
    prevSong () {
      let index = this.currentIndex;
      if (this.playType === 2) {
        index = this.randomIndex(0, this.playList.length - 1);
      } else {
        index--;
      }
      this.changeNextSong(index);
    },
    nextSong () {
      let index = this.currentIndex;
      if (this.playType === 2) {
        index = this.randomIndex(0, this.playList.length - 1);
      } else {
        index++;
      }
      this.changeNextSong(index);
    },
    pausedBtn () {
      let musicDom = this.$refs.playControl;
      this.changePlayingState();
      if (musicDom.paused) {
        musicDom.play();
      } else {
        musicDom.pause();
      }
    },
    _formatTime (num) {
      return formatTime(num);
    },
    // 切换播放顺序
    changePlayType () {
      this.playType++;
      if (this.playType === 3) {
        this.playType = 0;
      }
    },
    // 监听音乐实时播放的时间
    watchMusicTime () {
      let _this = this;
      // 监听播放时间
      let musicDom = _this.$refs.playControl;// 获取Audio的DOM节点
      // 使用事件监听方式捕捉事件
      musicDom.addEventListener('timeupdate', function () { // 监听音频播放的实时时间事件
        // 用秒数来显示当前播放进度
        _this.currentLyricTime = musicDom.currentTime.toFixed(2);
        if (_this.$refs.songLyric) {
          for (let i = 0; i < _this.$refs.songLyric.length; i++) {
            if (_this.$refs.songLyric[i].className === 'currentLyric') {
              _this.currentLyricTop = _this.$refs.songLyric[i].offsetTop;
            }
          }
        }
        let newTime = musicDom.currentTime.toFixed(2);
        if (_this.$refs.songLyric) {
          for (let i = 0; i < _this.$refs.songLyric.length; i++) {
            if (_this.compareTime(_this.$refs.songLyric[i].dataset.time) < (Number(newTime) + 0.6)) {
              _this.currentLyric = i;
            }
          }
        }
        _this.currentSongTime = Math.floor(musicDom.currentTime);// 获取实时时间
      }, false);
    },
    watchMusicEnded () {
      let musicDom = this.$refs.playControl;
      musicDom.addEventListener('ended', () => {
        let index = this.currentIndex;
        if (this.playType === 2) {
          index = this.randomIndex(index, this.playList.length - 1);
        } else if (this.playType === 0) {
          index++;
        }
        if (this.playType === 1) {
          this.$refs.playControl.play();
        } else {
          this.changeNextSong(index);
        }
      }, false);
    },
    newCurrentTime (newTime) {
      this.$refs.playControl.currentTime = newTime;
    },
    randomIndex (Min, Max) {
      let Range = Max - Min;
      let Rand = Math.random();
      let num = Min + Math.round(Rand * Range); // 四舍五入
      return num;
    },
    compareTime (loveStory) {
      let lrcTime;
      // 分钟转数字可以去掉前面的0
      let lrcTimeMin = parseInt(loveStory.split(':')[0]);
      // 虽然末尾有0，不过要转成数字比大小
      let lrcTimeSec = parseFloat(loveStory.split(':')[1]).toFixed(0);
      lrcTime = lrcTimeMin * 60 + Number(lrcTimeSec);
      return lrcTime;
    },
    clearPlayListUser () {
      console.log(1);
      this.clearPlayList();
      this._getPlayList();
    },
    playCurrentSong (id) {
      console.log(id);
      this.playCurrentSong(id);
    },
    ...mapActions([
      'changeNextSong',
      'changePrevSong',
      'changePlayingState',
      'playCurrentSong',
      'clearPlayList'
    ])
  }
};
</script>

<style scoped>
.player_wrapper{
  position: fixed;
  left: 0;
  bottom: 0;
  background:rgba(0,0,0,1);
  width: 100%;
  z-index: 2019;
  padding: 0 50px;
  color: #fff;
  box-sizing: border-box;
}
.player_larger{
  height: 300px;
  overflow: hidden;
  font-size: 12px;
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
  height: 70px;
}
.player_song_info img{
  margin: 0 20px;
  width: 60px;
  height: 60px;
}
.player_song_info{
  width: 50%;
  min-width: 480px;
  display: flex;
}
.player_control_icon_box{
  min-width: 150px;
}
.player_progress_wrapper{
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.player_song_info_box{
  width: 100%;
  color: #fff;
  font-size: 14px;
  line-height: 35px;
  height: 35px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon_loop_single,
.icon_loop_order,
.icon_loop_random,
.icon_play_list{
  display: inline-block;
  width: 40px;
  height: 24px;
  cursor: pointer;
  background-size: 100% 100%;
}
.icon_loop_single{
  background-image: url('../assets/image/single.svg');
}
.icon_loop_order{
  background-image: url('../assets/image/loop.svg');
}
.icon_loop_random{
  background-image: url("../assets/image/random.svg");
}
.icon_play_list{
  background-image: url("../assets/image/play-list.svg");
}
.player_list_icon_box{
  margin-left: 40px;
  width: 100px;
  display: flex;
  justify-content: space-between;
}
.icon_playList{
  position: relative;
  width: 70px;
}
.player_list_num{
  color: #fff;
  position: absolute;
  font-size: 12px;
  bottom: 2px;
  right: 5px;
  width: 20px;
}
.player_song_list_wrapper{
  width: 60%;
  float: left;
}
.player_lyric_wrapper{
  width: 40%;
  float: left;
}
.play_lyric_box_inner{
  height: 250px;
  overflow: auto;
  text-align: center;
  position: relative;
}
.play_lyric_box_inner{
  line-height: 26px;
}
.currentLyric{
  font-size: 14px;
  color: #31c27c;
}
.play_lyric_text{
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
}
.player_lyric_title,
.player_list_title{
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
}
.player_list_title{
  justify-content: space-between;
}
.player_lyric_title{
  justify-content: center;
}
.player_songs_list{
  overflow: hidden;
  height: 100%;
}
.hidden_play_list{
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.icon_current_play{
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url(../assets/image/playing.svg);
  background-size: 100% 100%;
}
.currentSongItem{
  color: #31c27c;
}
.player_list_item{
  box-sizing: border-box;
  padding: 0 66px 0 20px;
  position: relative;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
}
.player_list_item:hover{
  color: #31c27c;
}
.player_list_item>span{
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.player_list_item>span:nth-of-type(1){
  position: absolute;
  left: 0;
  top: 7px;
}
.player_list_item>span:nth-of-type(2){
  width: 47%;
}
.player_list_item>span:nth-of-type(3){
  width: 40%;
}
.player_list_item>span:nth-of-type(4){
  position: absolute;
  right: 30px;
  top: 7px;
}
.player_list_lock_scroll{
  height: 250px;
  overflow: auto;
}
.clear_play_list{
  padding: 6px 10px;
  border: 1px solid #fff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
