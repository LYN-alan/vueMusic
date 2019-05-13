<template>
    <div class="logo" @click="refresh">
      <img class="icon-logo" src="../assets/logo.png" alt="">
      <h2>音为有你</h2>
    </div>
</template>

<script>
export default {
  name: 'logo',
  methods: {
    refresh () {
      console.log(1)
    }
  }
}
</script>

<style scoped>
.icon-logo{
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.logo{
  display: flex;
  align-items: center;
  margin-right: 40px;
  float: left;
}
</style>
