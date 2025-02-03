<template>
    <Banner />
    <div class="content-wrapper flex mr-8 justify-self-end justify-end">
        <div v-if="isDesktop" class="nav-cont h-full w-15percent">
            <NavbarDesktop />
        </div>
        <main class="bg-light lg:px-14 rounded-mega-xl">
            <RouterView />
        </main>
    </div>
    <div v-if="!isDesktop" class="nav-spacer">
        <NavbarMobile />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; 
import { RouterView } from 'vue-router'
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

//Runt allting
.content-wrapper {
    width: 95%; 
    height: calc(100vh - 115px);
    margin-top: 2em;
}

main {
    width: 85%;
    max-width: 1800px; 
    overflow-y: scroll;
}


//Media queries
@media (max-width: 1355px) {
    //Bredda, minska padding
    main {
        width: 100%;
        padding: 1em;
    }
}

@media (max-width: 670px) {
    .content-wrapper {
        margin-top: 1em;
    }
}

@media (max-width: 550px) {
    //Ta bort flexet
    .content-wrapper {
        display: initial;
        padding-bottom: 2em;
    }

    //Justera om Main för att anpassa till mobil-läget
    main {
        width: 96%; 
        margin: auto;
        margin-top: 1em; 
        height: calc(100vh - 170px);
        max-height: 2000px;
;       overflow-y: auto;
        border-radius: 35px; 
        margin-bottom: 2em;
        position: relative; 
    }

    //Utrymme mellan main och navbar
    .nav-spacer {
        height: 2em;
    }
}

</style>
