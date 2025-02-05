<template>
    <nav class="h-full text-light flex">
        <ul class="flex flex-col justify-between self-center w-full">
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

<style lang="scss" scoped>
@use "../assets/scss/vars" as v; 


nav ul {
    height: 60%; 

    /* Jag lägger li- och a-regler här för jag vill inte upprepa klasserna på varje */
    li {
        border-radius: 20px 0 0 20px; 
        position: relative; 

        a {
            display: block;
            margin: 0.7em 1em;
            color: v.$light;

            &:hover {
                color: v.$medium;
            }

            i {
                margin-left: 0.5em;
                margin-right: 1em;
            }
        }
    }
}

/* Indikation för aktiv länk */
.current {
    background-color: v.$light; 
    
    a {
        color: v.$mediumdark;
    }

    /* Nedre konturen */
    &::before {
        content: ""; 
        position: absolute; 
        background-color: rgba(0,0,0,0); 
        bottom: -5em; 
        right: 0; 
        height: 80px; 
        width: 30px; 
        border-top-right-radius: 30px; 
        box-shadow: 0 -30px 0 0 v.$light;
    }
    /* Övre konturen */
    &::after {
        content: ""; 
        position: absolute; 
        background-color: rgba(0,0,0,0); 
        bottom: 2.9em; 
        right: 0;
        height: 80px; 
        width: 30px; 
        border-bottom-right-radius: 30px; 
        box-shadow: 0 30px 0 0 v.$light;
    }
}


//Media queries för tablet-storlekar
@media (max-width: 1290px) {
    nav ul {
        height: 70%;
    }
    nav ul li span {
        display: none; 
    }

    nav ul li a {
        font-size: 1.4em;
    }

    /* Övre kontur */
    .current::after {
     bottom: 4em;

    }
}

@media (max-width: 800px) {
    nav ul {
        margin-left: 0.4em;

        li a i {
            font-size: 1em;
            margin-left: 0.1em;
        }
    }

    /* Konturer */
    .current::after, .current::before {
        width: 20px;
    }
}

@media(max-width: 720px) {
    .current::after, .current::before {
        right: 1.7%;
    }
}
</style>
