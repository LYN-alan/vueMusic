<template>
  <div class="mic_home">
    <BoutiqueOlaylist></BoutiqueOlaylist>

  </div>
</template>

<script>
import BoutiqueOlaylist from '@/components/boutiquePlaylist'
export default {
  name: 'home',
  components: {
    BoutiqueOlaylist
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
