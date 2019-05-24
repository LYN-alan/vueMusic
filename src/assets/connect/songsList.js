/*
* 获取歌单相关的内容的网络请求
* */
import Api from 'axios'
const ajaxHost = 'https://v1.itooi.cn'
// 获取歌单分类
export function getSongsListKinds () {
  let url = ajaxHost + '/netease/songList/category'
  return Api.get(url, {})
}
// 获取热门歌单
export function getHotSongsList (data) {
  let options = {
    categoryType: data.cat,
    pageSize: data.pageSize,
    orderType: data.orderType,
    page: data.page
  }
  let url = ajaxHost + '/netease/songList/hot'
  return Api.get(url, {params: options})
}
// 新歌首发
export function getNewestSongs () {
  let url = ajaxHost + '/netease/song/newest'
  return Api.get(url)
}
// 新碟首发
export function getNewestDisc () {
  let url = ajaxHost + '/netease/album/newest'
  return Api.get(url)
}
// MV排行获取
export function getMvRank (data) {
  let url = ajaxHost + '/netease/mv/top'
  let options = {
    pageSize: data.pageSize,
    page: data.page
  }
  return Api.get(url, {params: options})
}
// 歌手排行榜
export function getSingerRank (data) {
  let url = ajaxHost + '/netease/artist/top'
  let options = {
    pageSize: data.pageSize,
    page: data.page
  }
  return Api.get(url, {params: options})
}
