export interface SlideOption {
  sliderType: SliderType;
  direction?: Direction;
  gap: number;
}
export interface Pagination {
  customElement?: Element;
  clickToMove: boolean;
}
export type SliderType = "free" | 'left' | 'default';
export type Direction = "horizontal";