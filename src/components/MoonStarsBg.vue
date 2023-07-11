<script setup lang="ts">

</script>

<template>
  <div class="background-container" z="-1">
    <img src="/public/img/moon2.png" alt="">
    <div class="stars" />
    <div class="twinkling" />
    <div class="clouds" />
  </div>
</template>

<style lang="scss" scoped>
@keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}
@-webkit-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
  -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

@-moz-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

    @-webkit-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

.background-container{
  position: fixed;
  top: 0;
  left:0;
  bottom: 0;
  right: 0;
}

.stars {
  background: black url("/public/img/stars.png") repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  z-index: 0;
}

.twinkling{
  width:10000px;
  height: 100%;
  background: transparent url("/public/img/twinkling.png") repeat;
  background-size: 1000px 1000px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  -moz-animation:move-background 70s linear infinite;
  -ms-animation:move-background 70s linear infinite;
  -o-animation:move-background 70s linear infinite;
  -webkit-animation:move-background 70s linear infinite;
  animation:move-background 70s linear infinite;

}
.clouds{
  width:10000px;
  height: 100%;
  background: transparent url("/public/img/clouds_repeat.png") repeat;
  background-size: 1000px 1000px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
  -moz-animation:move-background 150s linear infinite;
  -ms-animation:move-background 150s linear infinite;
  -o-animation:move-background 150s linear infinite;
  -webkit-animation:move-background 150s linear infinite;
  animation:move-background 150s linear infinite;
}
img{
  height: 36vh;
  width:36vh;
  position: absolute;
  z-index: 3;
  right: 20px;
}
</style>
