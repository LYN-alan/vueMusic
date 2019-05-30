<template>
  <div class="search_result_wrapper">
    <songSearchResult :resultList="searchResult" v-if="searchType === 'song' || searchType === 'singer'"></songSearchResult>
    <lyricSearchResult :lyricResult="searchResult" v-if="searchType === 'lrc'"></lyricSearchResult>
  </div>
</template>

<script>
import songSearchResult from '@/common/songSearchResult'
import lyricSearchResult from '@/common/lyricSearchResult'
export default {
  name: 'searchResult',
  props: ['searchResult', 'searchType'],
  components: {
    songSearchResult,
    lyricSearchResult
  }
}
</script>

<style scoped>
.search_result_wrapper{
  padding: 40px 0;
}
</style>
