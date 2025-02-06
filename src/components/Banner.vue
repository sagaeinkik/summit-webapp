<template>
    <header class="text-light m-auto mt-4 md:mt-6 flex justify-between items-center">
        <RouterLink to="/">
            <img class="mt-3" src="../assets/images/summitlogo-white.svg" alt="Logotyp föreställande en björn">
        </RouterLink>
    <div class="logged-in text-white">
        <!-- Fixa detta. -->
        <p><span>Inloggad som </span>{{ userStore.username }}</p>
    </div>
    <button @click="logout()" class="bg-mediumdark text-white px-8 py-3 rounded-3xl hover:bg-medium">
        Logga ut
    </button>
    </header>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router"; 
import { useUserStore } from "../stores/userStore";
import { onMounted, ref } from "vue";

const router = useRouter();
const userStore = useUserStore();



//Radera cookie, rensa storage, skicka till login
function logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.clear(); 
    userStore.updateUsername("");
    router.push("/login");
}

</script>


<style lang="scss" scoped>
@use "../assets/scss/vars" as v; 

header {
    width: 95%;
    position: relative;
    top: 1em;
}

img {
    width: 10em; 
    position: absolute; 
    top: -1em;
    left: 2em;
}

//Specifikt för firefox
@supports (-moz-appearance:none) {
    img {
        width: 7em; 
        left: 0;
    }
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

    @supports (-moz-appearance:none) {
        img {
            left: 0;; 
        }
    }
}

@media(max-width: 1100px) {
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

@media (max-width: 550px) {
    header {
        top: 0.5em;
    }
}

@media (max-width: 500px) {
    button {
        font-size: 0.8em;
    }

    .logged-in span {
        display: none;
    }
}

</style>
