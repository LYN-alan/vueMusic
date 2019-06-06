<template>
  <div class="search_result_wrapper">
    <songSearchResult :resultList="searchResult" v-show="searchClick" v-if="searchType === 'song' || searchType === 'singer'"></songSearchResult>
    <lyricSearchResult :lyricResult="searchResult" v-if="searchType === 'lrc' && searchClick"></lyricSearchResult>
    <songsListSearchResult :songsListSearchResult="searchResult" v-if="searchType === 'songList' && searchClick"></songsListSearchResult>
    <albumSearchResult :albumList="searchResult" v-if="searchType === 'album' && searchClick"></albumSearchResult>
    <MvSearchResult :mvResultList="searchResult" v-if="searchType === 'mv' && searchClick"></MvSearchResult>
  </div>
</template>

<script>
import songSearchResult from '@/common/songSearchResult';
import lyricSearchResult from '@/common/lyricSearchResult';
import songsListSearchResult from '@/common/songsListSearchResult';
import albumSearchResult from '@/common/albumSearchresult';
import MvSearchResult from '@/common/MvsearchResult';
export default {
  name: 'searchResult',
  props: ['searchResult', 'searchType', 'searchClick'],
  components: {
    songSearchResult,
    lyricSearchResult,
    songsListSearchResult,
    albumSearchResult,
    MvSearchResult
  }
};
</script>

<style scoped>
.search_result_wrapper{
  padding: 40px 0;
}
</style>
