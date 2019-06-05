<template>
  <div class="main_index_new_song">
    <h2 class="index_h2">新歌首发</h2>
    <newSongList :newSongList="newSongList"></newSongList>
  </div>
</template>

<script>
import newSongList from '@/common/newSongList';
import {getNewestSongs} from '@/assets/connect/songsList';
export default {
  name: 'newSongStart',
  components: {
    newSongList
  },
  data () {
    return {
      newSongList: []
    };
  },
  created () {
    this._getNewestSongs();
  },
  methods: {
    _getNewestSongs () {
      getNewestSongs().then(res => {
        console.log(res.data.data);
        let songsList = res.data.data;
        if (songsList && songsList.length > 0) {
          songsList.forEach((item) => {
            let songsItem = {
              id: item.id,
              name: item.name,
              coverImgUrl: item.song.album.picUrl,
              singer: item.song.artists,
              playTime: item.song.duration,
              singerId: item.song.artists[0].id
            };
            this.newSongList.push(songsItem);
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.main_index_new_song{
  padding: 0 50px;
}
</style>
