import * as type from './mutation-type';
// 插入一首歌
export const insertSong = ({commit, state}, songId) => {
  commit(type.INSERT_SONG, songId);
};
// 播放选中歌曲
export const playCurrentSong = ({commit, state}, songId) => {
  commit(type.INSERT_SONG, songId);
  let index = state.playList.indexOf(songId);
  commit(type.SET_CURRENT_INDEX, index);
  commit(type.SET_PLAYING_STATE, true);
};
// 添加播放列表
export const setPlayList = ({commit, state}, list) => {
  commit(type.SET_PLAY_LIST, list);
};
// 切换下一首
export const changeNextSong = ({commit, state}, index) => {
  if (index > state.playList.length - 1) {
    commit(type.SET_CURRENT_INDEX, 0);
  } else {
    commit(type.SET_CURRENT_INDEX, index);
  }
};
// 切换上一首
export const changePrevSong = ({commit, state}, index) => {
  if (index < 0) {
    commit(type.SET_CURRENT_INDEX, state.playList.length - 1);
  } else {
    commit(type.SET_CURRENT_INDEX, index);
  }
};
// 播放、暂停状态切换
export const changePlayingState = ({commit, state}) => {
  commit(type.SET_PLAYING_STATE, !state.playing);
};
