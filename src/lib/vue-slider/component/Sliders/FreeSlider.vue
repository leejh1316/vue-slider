<script setup lang="ts">
import { ref } from "vue";
import useSlider from "./useSlider";
import { SlideOption } from "../../type";

const props = defineProps<{
  option: SlideOption;
}>();
const sliderElement = ref<HTMLElement>();
const {
  onSlideEnd,
  onSlideStart,
  currentCoord,
  endCoord,
  initializeSlideStart,
  isMoved,
  isClampLimit,
  isEndCoordOver,
  slideVelocity,
  clampSlideCoord,
  resetSlideCoordOfBoundary,
} = useSlider(sliderElement, props.option);
const animationFrameId = ref(0);

function animateSlideDeceleration() {
  const friction = 0.98; // 감속계수
  let displacement = slideVelocity.value;

  if (!isClampLimit.value && Math.abs(displacement) > 0.45) {
    currentCoord.value.x += displacement;
    endCoord.value.x = currentCoord.value.x;
    slideVelocity.value *= friction;
    clampSlideCoord();
    animationFrameId.value = requestAnimationFrame(animateSlideDeceleration);
  }
  else{
    resetSlideCoordOfBoundary()
  }
}

onSlideStart.value = () => {
  cancelAnimationFrame(animationFrameId.value);
};
onSlideEnd.value = () => {
  if (!isMoved.value || isEndCoordOver.value) {
    resetSlideCoordOfBoundary();
    return;
  }
  animationFrameId.value = requestAnimationFrame(animateSlideDeceleration);
};
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
    transition: 0.2s linear all;
  }
}
</style>
