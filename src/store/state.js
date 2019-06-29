let localPlayList = localStorage.getItem('vuexState');
const state = {
  playing: false,
  playList: localPlayList ? JSON.parse(localPlayList) : [],
  currentIndex: '',
  MvPlayIngState: false
};

export default state;
