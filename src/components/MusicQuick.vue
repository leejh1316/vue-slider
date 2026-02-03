<script setup lang="ts">
import { computed } from 'vue';

const songs = [
    { title: "Shape of You", author: "Ed Sheeran" },
    { title: "Bohemian Rhapsody", author: "Queen" },
    { title: "Imagine", author: "John Lennon" },
    { title: "Hotel California", author: "Eagles" },
    { title: "Yesterday", author: "The Beatles" },
    { title: "Smells Like Teen Spirit", author: "Nirvana" },
    { title: "Wonderwall", author: "Oasis" },
    { title: "Billie Jean", author: "Michael Jackson" },
    { title: "Rolling in the Deep", author: "Adele" },
    { title: "Like a Rolling Stone", author: "Bob Dylan" },
    { title: "Happy", author: "Pharrell Williams" },
    { title: "Thinking Out Loud", author: "Ed Sheeran" },
    { title: "Radioactive", author: "Imagine Dragons" },
    { title: "Uptown Funk", author: "Mark Ronson ft. Bruno Mars" },
    { title: "All of Me", author: "John Legend" },
    { title: "Shake It Off", author: "Taylor Swift" },
    { title: "Shape of My Heart", author: "Sting" },
    { title: "Let It Be", author: "The Beatles" },
    { title: "Despacito", author: "Luis Fonsi ft. Daddy Yankee" },
    { title: "Smooth", author: "Santana ft. Rob Thomas" }
];

function getRandomSong() {
    return songs[Math.floor(Math.random() * songs.length)];
}

const song = computed(()=>getRandomSong())

</script>
<template>
    <div class="music-quick">
        <div class="square-img"></div>
        <div class="content-wrap">
            <div class="title">{{ song.title }}</div>
            <div class="author">{{ song.author }}</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.music-quick{
    display:flex;
    gap:8px;
}
.square-img{
    width:62px;
    height:62px;
    border-radius: 8px;
    background-color: #555;
}
.content-wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:4px;
}
.title{
    font-size: 16px;
    font-weight: bold;
}
.author{
    font-size: 14px;
    color:#999
}
</style>
