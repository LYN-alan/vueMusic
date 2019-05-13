<template>
  <div>
    <h2>精品歌单</h2>
    <SongsList :songsList="boutiquePlaylist"></SongsList>
  </div>
</template>

<script>
import SongsList from '@/common/songsList'
import {getHotSongsList} from '@/assets/connect/songsList'
export default {
  name: 'boutiquePlaylist',
  components: {
    SongsList
  },
  data () {
    return {
      boutiquePlaylist: []
    }
  },
  mounted () {
    this._getHotSongsList()
  },
  methods: {
    _getHotSongsList () {
      let param = {
        pageSize: 10,
        page: 0,
        orderType: 'hot'
      }
      getHotSongsList(param).then((res) => {
        console.log(res.data)
        let songsInfo = res.data
        if (songsInfo.code === 200) {
          this.boutiquePlaylist = songsInfo.data
          this.boutiquePlaylist = this.boutiquePlaylist.concat(songsInfo.data)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
