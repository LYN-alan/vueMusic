import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/home'
import Singers from '@/page/singers'
import NewSongs from '@/page/newSongs'
import Rank from '@/page/rank'
import Kind from '@/page/kind'
import Video from '@/page/video'
import Search from '@/page/search'

Vue.use(Router)

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
      component: Video
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }

  ]
})
