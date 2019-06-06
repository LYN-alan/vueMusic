<template>
  <div class="main_slide_wrapper">
    <span class="main_slide_left">
      <span class="main_slide_left_icon_wrapper main_slide_action_btn" :class="slideType + '_slide_prev'">
        <i class="main_slide_left_icon"></i>
      </span>
    </span>
    <span class="main_slide_right">
      <span class="main_slide_right_icon_wrapper main_slide_action_btn" :class="slideType + '_slide_next'">
        <i class="main_slide_right_icon"></i>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'slideCommon',
  props: ['slideType']
};
</script>

<style scoped>
  .main_slide_wrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .main_slide_left,
  .main_slide_right{
    position: absolute;
    width: 50%;
    top: 0;
    height: 100%;
  }
  .main_slide_left{
    left: 0;
  }
  .main_slide_right{
    right: 0;
  }
  .main_slide_left_icon_wrapper{
    left: 0;
    transform: translateX(-100%);
    cursor: pointer;
  }
  .main_slide_right_icon_wrapper{
    right: 0;
    transform: translateX(100%);
    cursor: pointer;
  }
  .main_slide_left_icon_wrapper,
  .main_slide_right_icon_wrapper{
    position: absolute;
    top: 50%;
    margin-top: -54px;
    width: 79px;
    height: 108px;
    background: rgba(0,0,0,.05);
    opacity: 0;
    transition-property: opacity,transform;
    transition-duration: .5s;
    z-index: 2;
    outline: none;
  }
  .main_slide_left_icon,
  .main_slide_right_icon{
    position: absolute;
    top: 50%;
    margin-top: -20px;
    width: 20px;
    height: 39px;
    background-image: -webkit-image-set(url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite.png') 1x,url('https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite@2x.png?') 2x);
  }
  .main_slide_right_icon{
    right: 29px;
    background-position: 0 -120px;
  }
  .main_slide_left_icon{
    left: 29px;
    background-position: -20px -120px;
  }
</style>
