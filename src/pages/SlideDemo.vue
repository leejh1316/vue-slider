<script setup lang="ts">
import MusicSquareCard from "@components/MusicSquareCard.vue";
import MusicQuick from "@components/MusicQuick.vue";
</script>
<template>
  <div id="slide-demo">
    <div class="section">
      <div class="section-title">다시듣기</div>
      <div class="over-container">
        <Slide :slide-option="{ sliderType: 'free', gap: 16 }">
          <SlideItem v-for="_ of 20" class="music-cards-container">
            <MusicSquareCard></MusicSquareCard>
            <MusicSquareCard></MusicSquareCard>
          </SlideItem>
        </Slide>
      </div>
    </div>
    <div class="section">
      <div class="section-title">
        <div class="section-subtitle">이 노래로 뮤직 스테이션 시작하기</div>
        빠른 선곡
      </div>
      <div class="over-container">
        <Slide :slide-option="{ sliderType: 'left', gap: 16 }">
          <SlideItem v-for="_ of 10" class="music-quicks-container">
            <MusicQuick v-for="_ of 4"></MusicQuick>
          </SlideItem>
        </Slide>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
#slide-demo {
  padding-top: 120px;
  margin-left: 80px;
}
@media (max-width: 380px) {
  #slide-demo {
    padding-top: 80px;
    margin-left: 20px;
  }
}
.section {
  position: relative;
  margin-bottom: 80px;
}
.section-title {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: bold;
}
.section-subtitle {
  font-size: 16px;
  font-weight: normal;
  color: #aaa;
  margin-bottom: 4px;
}
.over-container {
  position: relative;
  margin-right: 80px;
  user-select: none;
}
.music-cards-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.music-quicks-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 320px;
  max-width: 550px;
  width: 100%;
}
</style>
