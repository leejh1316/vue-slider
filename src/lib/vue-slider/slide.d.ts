import type { DefineComponent } from 'vue';
import type { SlideOption } from "./type/SlideOption"
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Slide: DefineComponent<{slideOption:SlideOption}>;
  }
}
