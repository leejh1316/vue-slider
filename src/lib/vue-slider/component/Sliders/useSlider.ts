import { computed, ref, unref, watch } from "vue";
import type { MaybeRef } from "vue";
import type { SlideOption } from "../../type/SlideOption";

const useSlider = (element: MaybeRef<HTMLElement>, option: SlideOption) => {
  const elSlider = computed(() => unref(element));
  const startTime = ref(0);
  const endTime = ref(0);
  const startCoord = ref({ x: 0, y: 0 });
  const currentCoord = ref({ x: 0, y: 0 });
  const endCoord = ref({ x: 0, y: 0 });
  const moveCoord = ref({ x: 0, y: 0 });
  const sliderBounds = ref<{
    width: number;
    height: number;
    maxLeft: number;
    minLeft: number;
  }>(calculateSliderBounds());
  const countSlideItem = ref(elSlider.value?.childElementCount ?? 0);
  const isSlideTransition = ref<boolean>(false);
  const directionOfSlide = ref<"left" | "right" | "up" | "down">();
  const isMoved = ref(false);
  const isClampLimit = ref(false);
  const canSliderMove = ref(undefined);
  const onSlideEnd = ref<() => any>(() => {});
  const onSlideMove = ref<() => any>(() => {});
  const onSlideStart = ref<() => any>(() => {});
  const slideVelocity = ref(0);
  const transitionTimerId = ref();
  const isEndCoordOver = ref(false);
  const deltaTime = computed(() => endTime.value - startTime.value);
  const deltaMove = computed(() => {
    return {
      x: endCoord.value.x - startCoord.value.x,
      y: endCoord.value.y - startCoord.value.y,
    };
  });
  function handleMove(
    moveX: number,
    moveY: number,
    event: MouseEvent | TouchEvent,
  ) {
    if (canSliderMove.value === undefined) {
      canSliderMove.value = Math.abs(moveX) > Math.abs(moveY);
    } else if (canSliderMove.value) {
      isMoved.value = true;
      moveCoord.value.x = moveX;
      currentCoord.value.x = endCoord.value.x + moveX;
      clampSlideCoord();
      onSlideMove.value();
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (canSliderMove.value) event.preventDefault();
    handleMove(
      event.pageX - startCoord.value.x,
      event.pageY - startCoord.value.y,
      event,
    );
  }

  function handleTouchMove(event: TouchEvent) {
    if (canSliderMove.value) event.preventDefault();
    handleMove(
      event.touches[0].pageX - startCoord.value.x,
      event.touches[0].pageY - startCoord.value.y,
      event,
    );
  }

  function toggleEventListeners(add: boolean) {
    const method = add ? "addEventListener" : "removeEventListener";
    window[method]("mousemove", handleMouseMove, { passive: false });
    window[method]("touchmove", handleTouchMove, { passive: false });
    window[method]("mouseup", finalizeSlideEnd);
    window[method]("touchend", finalizeSlideEnd);
  }

  function initializeSlideStart(event: MouseEvent | TouchEvent) {
    toggleEventListeners(true);
    isSlideTransition.value = false;
    startCoord.value = {
      x: event?.pageX ?? event.touches[0].pageX,
      y: event?.pageY ?? event.touches[0].pageY,
    };
    startTime.value = Date.now();
    sliderBounds.value = calculateSliderBounds();
    countSlideItem.value = elSlider.value.childElementCount;
    onSlideStart.value();
  }

  function finalizeSlideEnd(event: MouseEvent | TouchEvent) {
    endTime.value = Date.now();
    directionOfSlide.value = moveCoord.value.x < 0 ? "left" : "right";
    endCoord.value = { x: currentCoord.value.x, y: currentCoord.value.y };
    checkEndCoordOver();
    slideVelocity.value = calculateVelocity();
    onSlideEnd.value();
    isMoved.value = false;
    isClampLimit.value = false;
    moveCoord.value.x = 0;
    if (option.sliderType !== "free") {
      resetSlideCoordOfBoundary();
    }
    isEndCoordOver.value = false;
    canSliderMove.value = undefined;
    toggleEventListeners(false);
  }

  function startSlideTransition() {
    clearTimeout(transitionTimerId.value);
    isSlideTransition.value = true;
    elSlider.value?.classList.add("slider--transition");
    transitionTimerId.value = setTimeout(() => {
      elSlider.value?.classList.remove("slider--transition");
      isSlideTransition.value = false;
    }, 250);
  }

  function calculateVelocity() {
    const speed = !!moveCoord.value.x
      ? moveCoord.value.x / (deltaTime.value * 0.1)
      : 0;
    return speed;
  }

  function calculateSliderBounds() {
    const offsetWidth = Array.from(elSlider.value?.children ?? []).reduce(
      (width, child) => width + (child?.offsetWidth ?? 0) + (option?.gap ?? 0),
      -option?.gap ?? 0,
    );
    const parentOffsetWidth = elSlider.value?.parentElement?.offsetWidth || 0;
    return {
      width: offsetWidth,
      height: elSlider.value?.offsetHeight,
      maxLeft: 0,
      minLeft:
        offsetWidth < parentOffsetWidth ? 0 : parentOffsetWidth - offsetWidth,
    };
  }

  function clampSlideCoord() {
    const minLeftLimit = sliderBounds.value.minLeft - 60;
    currentCoord.value.x = Math.min(
      60,
      Math.max(currentCoord.value.x, minLeftLimit),
    );
    isClampLimit.value =
      currentCoord.value.x === 60 || currentCoord.value.x === minLeftLimit;
  }

  function checkEndCoordOver() {
    const { maxLeft, minLeft } = sliderBounds.value;
    isEndCoordOver.value =
      endCoord.value.x > maxLeft || endCoord.value.x < minLeft;
  }

  function resetSlideCoordOfBoundary() {
    let isLimit = false;
    const { maxLeft, minLeft } = sliderBounds.value;

    if (endCoord.value.x > maxLeft) {
      endCoord.value.x = maxLeft;
      isLimit = true;
    } else if (endCoord.value.x < minLeft) {
      endCoord.value.x = minLeft;
      isLimit = true;
    }

    if (isLimit) {
      currentCoord.value.x = endCoord.value.x;
      startSlideTransition();
    }
  }

  // watch(countSlideItem, () => {
  //   sliderBounds.value = calculateSliderBounds();
  // });

  return {
    elSlider,
    countSlideItem,
    startCoord,
    currentCoord,
    sliderBounds,
    endCoord,
    moveCoord,
    isSlideTransition,
    isMoved,
    directionOfSlide,
    deltaMove,
    deltaTime,
    initializeSlideStart,
    resetSlideCoordOfBoundary,
    slideVelocity,
    handleMove,
    startSlideTransition,
    isClampLimit,
    isEndCoordOver,
    onSlideMove,
    onSlideEnd,
    onSlideStart,
    clampSlideCoord,
    calculateSliderBounds,
  };
};

export default useSlider;
