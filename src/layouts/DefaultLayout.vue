<template>
    <Banner />
    <div class="content-wrapper flex mr-8 justify-self-end justify-end">
        <div v-if="isDesktop" class="nav-cont h-full w-15percent">
            <NavbarDesktop />
        </div>
        <main class="bg-light py-4 px-6 lg:px-14 rounded-mega-xl">
            <RouterView />
        </main>
    </div>
    <div v-if="!isDesktop">
        <NavbarMobile />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; 
import { RouterLink, RouterView } from 'vue-router'
import Banner from "../components/Banner.vue";
import NavbarDesktop from '../components/NavbarDesktop.vue';
import NavbarMobile from "../components/NavbarMobile.vue";

//Reaktiv variabel för skärmbredd
const isDesktop = ref(true); 

//Funktion som uppdaterar ovan variabel
const updateScreenSize = () => {
    isDesktop.value = window.innerWidth > 550; 
}

onMounted(() => {
    //Kör funktion en gång direkt
    updateScreenSize(); 
    //Eventlyssnare som läggs till direkt när sidan laddas
    window.addEventListener("resize", updateScreenSize);
})
</script>


<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

.content-wrapper {
    width: 95%; 
    height: 90vh;
    margin-top: 2em;
}

main {
    width: 85%;
    max-width: 1800px; 
}

@media (max-width: 1290px) {
    main {
        width: 100%;
    }
}

@media (max-width: 670px) {
    .content-wrapper {
        margin-top: 1em;
    }
}

@media (max-width: 550px) {
    .content-wrapper {
        display: initial;
    }

    main {
        width: 96%; 
        margin: auto;
        margin-top: 1em; 
        min-height: 80vh;
        border-radius: 35px; 
    }
}

</style>
