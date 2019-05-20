<template>
  <div class="main_index_new_song">
    <h2 class="index_h2">新歌首发</h2>
  </div>
</template>

<script>
import {getNewestSongs} from '@/assets/connect/songsList'
export default {
  name: 'newSongStart',
  created () {
    this._getNewestSongs()
  },
  methods: {
    _getNewestSongs () {
      getNewestSongs().then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
