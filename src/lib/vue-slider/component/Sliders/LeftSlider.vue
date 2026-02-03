<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import useSlider from "./useSlider";
import { SlideOption } from "../../type";
const props = defineProps<{
  option: SlideOption;
}>();
const sliderElement = ref<HTMLElement>();
const {
  currentCoord,
  endCoord,
  initializeSlideStart,
  moveCoord,
  startSlideTransition,
  directionOfSlide,
  slideVelocity,
  onSlideEnd,
} = useSlider(sliderElement, props.option);
const currentSlide = ref(0);

const VELOCITY_THRESHOLD = 3;

const clampIndex = (index: number, max: number) => {
  return Math.max(0, Math.min(index, max));
};
const moveToSlide = (slideIndex: number) => {
  const clampedIndex = clampIndex(
    slideIndex,
    sliderElement.value.childElementCount - 1
  );
  currentCoord.value.x = -sliderElement.value.children[clampedIndex].offsetLeft;
  currentSlide.value = clampedIndex;
  endCoord.value.x = currentCoord.value.x;
  startSlideTransition();
};

/**
 * 중앙을 기점으로 index를 내뱉자
 *
 */
const calculateNextSlideIndex = () => {
  const slideItems = Array.from(sliderElement.value.children);
  let findIndex;

  for (const [index, slideItem] of slideItems.entries()) {
    const absEndCoordX = Math.abs(endCoord.value.x);
    const left = slideItem.offsetLeft;
    const center = left + (slideItem.offsetWidth + props.option.gap) / 2;
    const isInside =
      left < absEndCoordX &&
      absEndCoordX < left + slideItem.offsetWidth + props.option.gap;

    // 슬라이드가 현재 선택 범위 안에 있는지 확인
    if (isInside) {
      const isRightSlide = directionOfSlide.value === "right";
      // 다음 슬라이드를 선택해야 하는지 여부 결정
      const shouldSelectNext =
        (isRightSlide && absEndCoordX >= center) ||
        (!isRightSlide && absEndCoordX > center);

      // 인덱스를 범위 내로 제한
      findIndex = shouldSelectNext
        ? clampIndex(index + 1, slideItems.length - 1)
        : index;
      break;
    }
  }

  // 선택된 인덱스 반환, 없다면 현재 슬라이드 인덱스 반환
  return findIndex ?? currentSlide.value;
};

onSlideEnd.value = () => {
  const isNextSlide = slideVelocity.value <= -VELOCITY_THRESHOLD;
  const isPreviousSlide = slideVelocity.value >= VELOCITY_THRESHOLD;
  if (
    Math.abs(moveCoord.value.x) >
    sliderElement.value.children[0].offsetWidth / 2 
  ) {
    moveToSlide(calculateNextSlideIndex());
  } else if (isNextSlide) {
    moveToSlide(currentSlide.value + 1);
  } else if (isPreviousSlide) {
    moveToSlide(currentSlide.value - 1);
  } else {
    moveToSlide(currentSlide.value);
  }
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
    transition: 0.25s linear all;
  }
}
@media (max-width: 380px) {
  .slider--transition {
    transition: 0.2s ease all;
  }
}
</style>
