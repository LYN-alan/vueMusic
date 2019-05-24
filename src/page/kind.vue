<template>
  <div class="mic_kind">
    <ul>
      <li v-for="item in categories" :key="item.category">
        <span class="categories_type">{{item.name}}</span>
        <p class="categories_sub">
          <span v-for="(category, index) in  item.SongsListKind" :key="index">{{category.name}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getSongsListKinds} from '@/assets/connect/songsList'
export default {
  name: 'kind',
  data () {
    return {
      categories: []
    }
  },
  created () {
    this._getSongsListKinds()
  },
  methods: {
    _getSongsListKinds () {
      getSongsListKinds().then(res => {
        console.log(res.data)
        let categorie = res.data.data.categories
        for (let item in categorie) {
          this.categories.push({category: item, name: categorie[item], SongsListKind: this.formatSongsListKind(item, res.data.data.sub)})
        }
        console.log(this.categories)
      })
    },
    formatSongsListKind (type, SongsListKind) {
      let KindList = []
      if (!SongsListKind) return
      SongsListKind.forEach(item => {
        if (Number(type) === item.category) {
          KindList.push({name: item.name})
        }
      })
      return KindList
    }
  }
}
</script>

<style scoped>

</style>
