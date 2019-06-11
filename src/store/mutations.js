import * as type from './mutation-type';
const mutations = {
  [type.SET_PLAY_LIST] (state, list) {
    state.playList = list;
  },
  [type.INSERT_SONG] (state, songId) {
    state.playList.push(songId);
  },
  [type.SET_PLAYING_STATE] (state, playing) {
    state.playing = playing;
  },
  [type.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index;
  }
};
export default mutations;
