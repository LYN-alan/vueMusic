import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/home';
import Singers from '@/page/singers';
import NewSongs from '@/page/newSongs';
import Rank from '@/page/rank';
import Kind from '@/page/kind';
import songsVideo from '@/page/songsVideo';
import Search from '@/page/search';
import SongListDetail from '@/page/songListDetail';
import SingerDetail from '@/page/singerDetail';
Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: '/dist/',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/index',
      component: Index
    },
    {
      path: '/index',
      name: 'home',
      component: Index
    },
    {
      path: '/singers',
      name: 'singers',
      component: Singers

    },
    {
      path: '/newSongs',
      name: 'newSongs',
      component: NewSongs
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/kind',
      name: 'kind',
      component: Kind
    },
    {
      path: '/video',
      name: 'video',
      component: songsVideo
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/songListDetail/:id',
      name: 'SongListDetail',
      component: SongListDetail
    },
    {
      path: '/singerDetail/:id',
      name: 'SingerDetail',
      component: SingerDetail
    }

  ]
});
