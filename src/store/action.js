import * as type from './mutation-type';
// 插入一首歌
export const inserSong = ({commit, state}, songId) => {
  commit(type.INSERT_SONG, songId);
};
// 播放选中歌曲
export const playCurrentSong = ({commit, state}, songId) => {
  commit(type.INSERT_SONG, songId);
  commit(type.SET_CURRENT_INDEX, state.playList.length - 1);
  commit(type.SET_PLAYING_STATE, true);
};
// 添加播放列表
export const setPlayList = ({commit, state}, list) => {
  commit(type.SET_PLAY_LIST, list);
};
