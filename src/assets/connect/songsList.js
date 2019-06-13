/*
* 获取歌单相关的内容的网络请求
* */
import Api from 'axios';
// 获取歌单分类
export function getSongsListKinds () {
  return Api.get('/api/tencent/songList/category', {});
}
// 获取热门歌单
export function getHotSongsList (data) {
  let options = {
    categoryType: data.cat,
    pageSize: data.pageSize,
    orderType: data.orderType,
    page: data.page
  };
  return Api.get('/api/tencent/songList/hot', {params: options});
}
// 新歌首发
export function getNewestSongs () {
  return Api.get('/api/netease/song/newest');
}
// 新碟首发
export function getNewestDisc () {
  return Api.get('/api/netease/album/newest');
}
// MV排行获取
export function getMvRank (data) {
  let options = {
    pageSize: data.pageSize,
    page: data.page
  };
  return Api.get('/api/tencent/mv/hot', {params: options});
}
// 歌手排行榜
export function getSingerRank (data) {
  return Api.get('/api/tencent/artist/list?sexId=-100&areaId=-100&genre=-100&index=-100&page=0&pageSize=30');
}
// 搜索
export function doSearch (data) {
  return Api.get('/api/tencent/search', {params: data});
}
// 获取歌单详情
export function getSongsListDetail (data) {
  return Api.get('/api/tencent/songList', {params: data});
}
// 获取歌手信息
export function getSingerInfo (id) {
  return Api.get('/api/tencent/artist', {params: {id: id}});
}
// 获取歌手音乐
export function getSingerSongs (data) {
  return Api.get('/api/tencent/song/artist', {params: data});
}
// 获取歌手专辑
export function getSingerAlbum (id) {
  return Api.get('/api/tencent/album/artist', {params: {id: id}});
}
// 获取歌手相关MV
export function getSingerMv (data) {
  return Api.get('/api/tencent/mv/artist', {params: data});
}
// 获取音乐详情
export function getSongDetail (id) {
  return Api.get('/api/tencent/song', {params: {id: id}});
}
// 获取歌曲歌词
export function getSongLrc (id) {
  return Api.get('/api/tencent/lrc', {params: {id: id}});
}
