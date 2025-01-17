<template>
    <nav>
        <ul>
            <li :class="{ current: isActive('/') }">
                <RouterLink to="/">
                        <i class="fa-solid fa-chart-simple"></i>
                        <span class="text-link">Översikt</span>
                </RouterLink>
            </li>
            <li><a href="#">
                <i class="fa-solid fa-warehouse"></i>
                <span>Lager</span></a></li>
            <li><a href="#">
                <i class="fa-solid fa-layer-group"></i>
                <span class="text-link">Kategorier</span></a></li>
            <li><a href="#">
                <i class="fa-solid fa-dolly"></i>
                <span class="text-link">Leverantörer</span></a></li>
            <li><a href="#">
                <i class="fa-solid fa-gear"></i>
                <span class="text-link">Inställningar</span></a></li>
        </ul>
    </nav>    
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";

//Funktion för aktiv undersida
const isActive = (routePath) => {
    //Hitta nuvarande
    const route = useRoute(); 
    //Returnera om det är samma som argument
    return route.path === routePath; 
}
</script>

<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

span {
    display: none;
}

nav {
    background-color: v.$dark; 
    position: fixed; 
    bottom: 0; 
    width: 100%; 
    
    ul {
        width: 90%;
        margin: auto; 
        display: flex; 
        justify-content: space-between; 
        padding: 1em; 

        li a {
            color: v.$light; 
            font-size: 1.3em;

            &:hover {
                color: v.$medium;
            }
        }
    }
}

.current {
    a {
        color: v.$medium;
    }
}
</style>