<script setup lang="ts">
const songTitles = [
    "Shape of You",
    "Bohemian Rhapsody",
    "Imagine",
    "Hotel California",
    "Yesterday",
    "Smells Like Teen Spirit",
    "Wonderwall",
    "Billie Jean",
    "Rolling in the Deep",
    "Like a Rolling Stone",
    "Hey Jude",
    "아무노래",
    "에잇",
    "Like You",
    "Snow Man",
    "Piano OST"
];

function getRandomSongTitle() {
    return songTitles[Math.floor(Math.random() * songTitles.length)];
}


</script>
<template>
    <div class="music-square-card" @click="console.log('music click')">
        <div class="square">
            <div class="play-button">
                <Icon icon="fa-play"></Icon>
            </div>
        </div>
        <div class="title fs-16px">
          {{ getRandomSongTitle() }}
        </div>
    </div>
</template>
<style scoped lang="scss">
.music-square-card{
    width: 130px;
    height: 190px;
    display:flex;
    flex-direction: column;
    gap: 6px;
}
.square {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 130px;
  background-color: #555;
  border-radius: 4px;
}
.play-button {
  position: absolute;
  display:flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #fff, $alpha: .2);
  border: 1px solid rgba($color: #fff, $alpha: .1);
  backdrop-filter: blur(2px);
}
.title{

  display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 최대 줄 수 설정 */
    overflow: hidden;
    text-overflow: ellipsis
}
</style>
