<template>
  <div class="mic_home">
    <!--    精品歌单-->
    <BoutiqueOlaylist></BoutiqueOlaylist>
    <!--    新歌首发-->
    <NewSongStart></NewSongStart>
    <!--    新碟首发-->
    <newAlbunFirst></newAlbunFirst>
    <!--    MV-->
    <songVideo></songVideo>
  </div>
</template>

<script>
import BoutiqueOlaylist from '@/components/boutiquePlaylist'
import NewSongStart from '@/components/newSongStart'
import newAlbunFirst from '@/components/newAlbumFirst'
import songVideo from '@/components/songVideo'
export default {
  name: 'home',
  components: {
    BoutiqueOlaylist,
    NewSongStart,
    newAlbunFirst,
    songVideo
  }
}
</script>

<style scoped>
.mic_home{
  background-image: url('https://y.gtimg.cn/mediastyle/yqq/img/bg_detail.jpg');
  background-position: left top;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}

</style>
