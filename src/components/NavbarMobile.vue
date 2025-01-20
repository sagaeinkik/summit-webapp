<template>
    <nav class="bg-dark">
        <ul class="m-auto flex justify-between p-4">
            <li :class="{ current: isActive('/') }">
                <RouterLink to="/">
                        <i class="fa-solid fa-chart-simple"></i>
                        <span class="text-link">Översikt</span>
                </RouterLink>
            </li>
            <li :class="{ current: isActive('/lager') }">
                <RouterLink to="/lager">
                        <i class="fa-solid fa-warehouse"></i>
                        <span class="text-link">Lager</span>
                </RouterLink>
            </li>
            <li :class="{ current: isActive('/kategorier') }">
                <RouterLink to="/kategorier">
                        <i class="fa-solid fa-layer-group"></i>
                        <span class="text-link">Kategorier</span>
                </RouterLink>
            </li>
            <li :class="{ current: isActive('/leverantorer') }">
                <RouterLink to="/leverantorer">
                        <i class="fa-solid fa-dolly"></i>
                        <span class="text-link">Leverantörer</span>
                </RouterLink>
            </li>
            <li :class="{ current: isActive('/settings') }">
                <RouterLink to="/settings">
                        <i class="fa-solid fa-gear"></i>
                        <span class="text-link">Inställningar</span>
                </RouterLink>
            </li>
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
    position: fixed; 
    bottom: 0; 
    width: 100%; 
    
    ul {
        width: 90%;

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