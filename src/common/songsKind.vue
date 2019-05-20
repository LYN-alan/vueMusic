<template>
  <div class="songs_kind">
    <span
      :class="activeClass === index ? 'currentClass' : ''"
      @click="changeSongsKind(kind.type,index)"
      v-for="(kind, index) in songsListKind"
      :key="index"
      name="kind.type">{{kind.name}}</span>
  </div>
</template>

<script>
export default {
  name: 'songsKind',
  props: ['songsListKind'],
  data () {
    return {
      activeClass: 0
    }
  },
  methods: {
    changeSongsKind (type, index) {
      this.$emit('getSongsList', type)
      this.activeClass = index
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
.currentClass{
  color: #31c27c;
}
</style>
