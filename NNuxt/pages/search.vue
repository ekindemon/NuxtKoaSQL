<template>
  <div>
    <h2>search page</h2>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <nuxt-link to="/"> 主頁 </nuxt-link>
  </div>
</template>
<script>
export default {
  layout: 'search-layout',
  data() {
    return {
      list: ['11', '22', '33']
    }
  },
  async mounted() {
    // console.log(this.$route)
    await this.$axios.get('/city/list').then((res) => {
      console.log(res)
      this.list = res.data.list
    })
  }
}
</script>
