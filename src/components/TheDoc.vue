<script setup>

</script>

<template>
  <div p-md>
    <div class="DLetter" mt-xs>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.DLetter {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
/* .DLetter {
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 100%;
  padding: 48rpx 24rpx;
  position: relative;
}
.DLetter::before, .DLetter::after {
  content: "";
  background: var(--main-bg-c);
  height: 98%;
  position: absolute;
  width: 100%;
  z-index: -1;
}
.dark {
  .DLetter::before, .DLetter::after {
    background: var(--dark-main-bg-c);
  }
}
.DLetter::before {
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  left: -3px;
  top: 2px;
  transform: rotate(-1.6deg);
}
.DLetter::after {
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
  right: -3px;
  top: 1px;
  transform: rotate(1.4deg);
} */
</style>
