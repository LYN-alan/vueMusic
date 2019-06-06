import * as type from './mutation-type';
const mutations = {
  [type.ADD_SONG_ID] (state, id) {
    state.songIds = state.songIds.concat(id);
  }
};
export default mutations;
