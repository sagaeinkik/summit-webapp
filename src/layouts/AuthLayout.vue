<template>
    <div class="wrapper p-4 m-auto flex justify-center items-center text-light">
        <img src="../assets/images/summitlogo-white.svg" alt="Summits logotyp föreställande en björn">
        <div class="box p-8 rounded-mega-xl bg-mediumdark">
        <RouterView />
        </div>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;


.wrapper {
    width: 100%;
    height: 100vh; 
    overflow: hidden;
    gap: 5em;

    img {
        width: 30%;
        max-width: 27em;
    }

    .box {
        height: 30em;
        width: 30em;
        overflow-y: scroll;
    }
}

@media (max-width: 1000px) {
    .wrapper {
        gap: 1em; 
        display: grid; 
        grid-template-columns: 1fr 2fr; 

        img {
            width: 80%;
        }

        .box {
            margin-right: 2em;
            height: auto; 
            width: auto;
        }
    }
}

@media (max-width: 612px) {
    .wrapper {
        display: flex; 
        flex-direction: column;

        img {
            width: 10em;
        }

        .box {
            width: 100%;
            margin-right: 0; 
        }
    }
}

@media (max-width: 450px) {
    .wrapper img {
        width: 4em;
    }
}
</style>