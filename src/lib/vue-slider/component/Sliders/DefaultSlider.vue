<script setup lang="ts">
import { ref } from 'vue';
import useSlider from './useSlider';
import { SlideOption } from '../../type';
const props = defineProps<{
  option : SlideOption
}>()
const sliderElement = ref<HTMLElement>()
const {currentCoord, initializeSlideStart} = useSlider(sliderElement, props.option)
</script>
<template>
  <div
    class="slider-container"
    @mousedown="initializeSlideStart"
    @touchstart="initializeSlideStart"
  >
    <div
      ref="sliderElement"
      class="slider"
      :style="{
        transform: `translateX(${currentCoord.x}px)`,
        gap: props.option.gap + 'px',
        top: currentCoord.y + 'px',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">

.slider-container {
  position: relative;
  top: 0px;
  left: 0px;
  min-width: 100%;
  height: inherit;
}
.slider {
  position: relative;
  top: 0px;
  left: 0px;
  display: flex;
  min-width: 100%;
  flex-wrap: nowrap;
  height: inherit;
  &--transition {
    transition: 0.25s linear all;
  }
}
</style>