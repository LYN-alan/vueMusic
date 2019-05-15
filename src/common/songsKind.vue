<template>
  <div class="songs_kind">
    <span @click="changeSongsKind('hot')" :class="currentClass ? 'currentActive' : ''">最热</span>
    <span @click="changeSongsKind('new')" :class="currentClass ? '' : 'currentActive'">最新</span>
  </div>
</template>

<script>
export default {
  name: 'songsKind',
  props: ['currentClass'],
  methods: {
    changeSongsKind (val) {
      this.$emit('getSongsList', val)
    }
  }
}
</script>

<style scoped>
.songs_kind{
  text-align: center;
  height: 50px;
  position: relative;
  z-index: 2;
  font-size: 15px;
  color: #333;
}
.songs_kind span{
  padding: 0 24px;
  cursor: pointer;
}
  .songs_kind span:hover{
    color: #31c27c;
  }
  .currentActive{
    color: #31c27c;
  }
</style>
