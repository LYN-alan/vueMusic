/*
* 获取歌单相关的内容的网络请求
* */
import Api from 'axios';
const ajaxHost = 'https://v1.itooi.cn';
// 获取歌单分类
export function getSongsListKinds () {
  let url = ajaxHost + '/tencent/songList/category';
  return Api.get(url, {});
}
// 获取热门歌单
export function getHotSongsList (data) {
  let options = {
    categoryType: data.cat,
    pageSize: data.pageSize,
    orderType: data.orderType,
    page: data.page
  };
  let url = ajaxHost + '/tencent/songList/hot';
  return Api.get(url, {params: options});
}
// 新歌首发
export function getNewestSongs () {
  let url = ajaxHost + '/netease/song/newest';
  return Api.get(url);
}
// 新碟首发
export function getNewestDisc () {
  let url = ajaxHost + '/netease/album/newest';
  return Api.get(url);
}
// MV排行获取
export function getMvRank (data) {
  let url = ajaxHost + '/tencent/mv/hot';
  let options = {
    pageSize: data.pageSize,
    page: data.page
  };
  return Api.get(url, {params: options});
}
// 歌手排行榜
export function getSingerRank (data) {
  let url = ajaxHost + '/tencent/artist/list?sexId=-100&areaId=-100&genre=-100&index=-100&page=0&pageSize=30';
  let options = {
    pageSize: data.pageSize,
    page: data.page
  };
  return Api.get(url, {params: options});
}
// 搜索
export function doSearch (data) {
  let url = ajaxHost + '/tencent/search';
  return Api.get(url, {params: data});
}
// 获取歌单详情
export function getSongsListDetail (data) {
  let url = ajaxHost + '/tencent/songList';
  return Api.get(url, {params: data});
}
// 获取歌手信息
export function getSingerInfo (id) {
  let url = ajaxHost + '/tencent/artist';
  return Api.get(url, {params: {id: id}});
}
// 获取歌手音乐
export function getSingerSongs (data) {
  let url = ajaxHost + '/tencent/song/artist';
  return Api.get(url, {params: data});
}
// 获取歌手专辑
export function getSingerAlbum (id) {
  let url = ajaxHost + '/tencent/album/artist';
  return Api.get(url, {params: {id: id}});
}
// 获取歌手相关MV
export function getSingerMv (data) {
  let url = ajaxHost + '/tencent/mv/artist';
  return Api.get(url, {params: data});
}
