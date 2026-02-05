# vue-slider

Vue 3용 터치/마우스 드래그 기반 슬라이더 컴포넌트 라이브러리입니다.

## 특징

- **3가지 슬라이더 타입 지원**: `free`, `left`, `default` 모드로 다양한 슬라이딩 동작 구현.
- **터치 & 마우스 지원**: 모바일 터치 및 데스크탑 마우스 드래그 모두 지원.
- **관성 스크롤**: 드래그 속도에 따른 자연스러운 감속 애니메이션 (free 모드).
- **경계 처리**: 슬라이더 범위를 벗어날 경우 자동으로 경계로 복귀.
- **간격 설정**: 슬라이드 아이템 간의 간격(gap)을 설정 가능.

## 설치 (Installation)

```bash
npm install @leejaehyeok/vue-slider
```

## 사용 방법 (Usage)

### 플러그인 등록

```typescript
// main.ts
import { createApp } from "vue";
import { VueSlidePlugin } from "@leejaehyeok/vue-slider";
import App from "./App.vue";

const app = createApp(App);
app.use(VueSlidePlugin);
app.mount("#app");
```

### 기본 사용법 (Basic Example)

```vue
<template>
  <Slide :slide-option="{ sliderType: 'free', gap: 16 }">
    <SlideItem v-for="item of items" :key="item.id">
      <div class="card">{{ item.title }}</div>
    </SlideItem>
  </Slide>
</template>

<script setup lang="ts">
const items = [
  { id: 1, title: "아이템 1" },
  { id: 2, title: "아이템 2" },
  { id: 3, title: "아이템 3" },
  // ...
];
</script>
```

### 슬라이더 타입별 예시

#### Free 슬라이더

자유롭게 드래그하며 관성 스크롤이 적용되는 슬라이더입니다.

```vue
<template>
  <Slide :slide-option="{ sliderType: 'free', gap: 16 }">
    <SlideItem v-for="_ of 20">
      <div class="card">콘텐츠</div>
    </SlideItem>
  </Slide>
</template>
```

#### Left 슬라이더

슬라이드 단위로 이동하며, 항상 아이템이 왼쪽에 정렬되는 슬라이더입니다.

```vue
<template>
  <Slide :slide-option="{ sliderType: 'left', gap: 16 }">
    <SlideItem v-for="_ of 10">
      <div class="card">콘텐츠</div>
    </SlideItem>
  </Slide>
</template>
```

#### Default 슬라이더

기본 드래그 슬라이더입니다.

```vue
<template>
  <Slide :slide-option="{ sliderType: 'default', gap: 16 }">
    <SlideItem v-for="_ of 10">
      <div class="card">콘텐츠</div>
    </SlideItem>
  </Slide>
</template>
```

## API

### `<Slide>` 컴포넌트

슬라이더 컨테이너 컴포넌트입니다.

- **Props**
  - `slideOption`: `SlideOption` - 슬라이더 설정 옵션 객체 (필수)

### `<SlideItem>` 컴포넌트

슬라이드 아이템을 감싸는 래퍼 컴포넌트입니다. `<Slide>` 컴포넌트 내부에서 사용합니다.

### 설정 옵션 (`SlideOption`)

```typescript
interface SlideOption {
  sliderType: SliderType;
  direction?: Direction;
  gap: number;
}

type SliderType = "free" | "left" | "default";
type Direction = "horizontal";
```

#### 1. `sliderType` (필수)

슬라이더의 동작 방식을 결정합니다.

| 옵션 값   | 설명                                                                 |
| --------- | -------------------------------------------------------------------- |
| `free`    | 자유 드래그 모드. 관성 스크롤이 적용되어 부드러운 스크롤 경험 제공.  |
| `left`    | 슬라이드 단위 이동. 드래그 종료 시 가장 가까운 아이템이 왼쪽에 정렬. |
| `default` | 기본 드래그 모드. 드래그한 만큼 이동.                                |

#### 2. `gap` (필수)

슬라이드 아이템 간의 간격(px)을 설정합니다.

```vue
<Slide :slide-option="{ sliderType: 'free', gap: 20 }">
  <!-- 아이템 간 20px 간격 -->
</Slide>
```

#### 3. `direction` (Optional, Default: `'horizontal'`)

슬라이드 방향을 설정합니다. 현재는 `horizontal`(가로) 방향만 지원합니다.

## 스타일링

슬라이더 컨테이너의 높이는 부모 요소의 높이를 상속받습니다. 필요에 따라 부모 요소나 `SlideItem`에 적절한 스타일을 적용하세요.

```vue
<template>
  <div class="slider-wrapper">
    <Slide :slide-option="{ sliderType: 'free', gap: 16 }">
      <SlideItem v-for="item of items" :key="item.id" class="custom-item">
        <div class="card">{{ item.title }}</div>
      </SlideItem>
    </Slide>
  </div>
</template>

<style scoped>
.slider-wrapper {
  height: 200px;
  overflow: hidden;
}

.custom-item {
  width: 150px;
}

.card {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border-radius: 8px;
}
</style>
```
