<script setup lang="ts">
import { computed } from "vue";
import { SlideOption } from "../type";
import FreeSlider from "./Sliders/FreeSlider.vue";
import LeftSlider from "./Sliders/LeftSlider.vue";
import DefaultSlider from "./Sliders/DefaultSlider.vue";
const props = defineProps<{ slideOption: SlideOption }>();
const sliderComponent = computed(()=>{
  if(props.slideOption.sliderType === 'free') return FreeSlider
  else if(props.slideOption.sliderType === 'left') return LeftSlider
  else if(props.slideOption.sliderType === 'default') return DefaultSlider
})
</script>
<template>
  <div class="slide-container">
    <component :is="sliderComponent" :option="props.slideOption">
      <slot></slot>
    </component>
  </div>
</template>
<style scoped lang="scss">
.slide-container {
  height: inherit;
}
</style>
