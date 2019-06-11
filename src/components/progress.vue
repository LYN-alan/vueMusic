<template>
  <div class="progress_wrapper">
    <span></span>
    <el-progress :percentage="percentage" :show-text="false"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'progress',
  props: ['percentage']
}
</script>

<style scoped>

</style>
