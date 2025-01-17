<template>
    <header class="text-light m-auto mt-3 md:mt-6 flex justify-between items-center">
        <RouterLink to="/">
            <img class="mt-3" src="../assets/images/summitlogo-white.svg" alt="Logotyp föreställande en björn">
        </RouterLink>
    <div class="logged-in text-white">
        <p>Inloggad som [användarnamn]</p>
    </div>
    <button class="bg-mediumdark text-white px-8 py-3 rounded-3xl hover:bg-medium">
        Logga ut
    </button>
    </header>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router"; 
//Hämta användare ur cookies

//Redirect om det inte finns användare

//Redirect till inlogg vid klick på logga ut
</script>


<style lang="scss" scoped>
@use "../assets/scss/vars" as v; 

header {
    width: 95%;
    position: relative;
}

img {
    width: 10em; 
    position: absolute; 
    top: -1em;
    left: 3em;
}

.logged-in {
    position: relative; 
    left: 10%;
}

@media (max-width: 1500px) {
    img {
        width: 7em;
        left: 1em; 
    }
}

@media(max-width: 1000px) {
    img {
        left: 0; 
        width: 6em;
    }
}

@media(max-width: 710px) {
    img {
        width: 4em;
        position: static; 
        margin-top: 0; 
    }

    .logged-in {
        left: 0; 
    }
}

</style>
