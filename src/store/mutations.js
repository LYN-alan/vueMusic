import * as type from './mutation-type';
const mutations = {
  [type.SET_PLAY_LIST] (state, list) {
    state.playList = list;
  },
  [type.INSERT_SONG] (state, songId) {
    if (state.playList.indexOf(songId) === -1) {
      state.playList.push(songId);
    }
  },
  [type.SET_PLAYING_STATE] (state, playing) {
    state.playing = playing;
  },
  [type.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index;
  },
  [type.CLEAR_PLAYLIST] (state) {
    state.playList = [];
  }
};
export default mutations;
