<template>
    <div class="wrapper p-4 m-auto flex justify-center items-center gap-8 text-light">
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
    height: 100vh; 
    gap: 5em;

    img {
        width: 27em;
    }

    .box {
        height: 30em;
        width: 30em;
        overflow-y: scroll;
    }
}
</style>