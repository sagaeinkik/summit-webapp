<template>
        <div class="card flex flex-col items-center bg-white p-8 rounded-somewhat-mega-xl">
            <span class="text-7xl text-medium mb-4"><i :class="props.icon"></i></span>
            <div class="info">
                <h2 class="my-2">{{ props.headline }}</h2>
                <p class="mb-3">{{ props.paragraph}}</p>
            </div>
            <button @click="handleClick" class="px-8 py-3 bg-mediumdark text-light rounded-mega-xl my-3 hover:bg-medium hover:text-white">{{ props.buttonText }}</button>
        </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref } from "vue";

/* ------------ Variabler ------------ */


/* ------ Props, emits, expose ------- */

const props = defineProps({
    icon: String,
    headline: String, 
    paragraph: String, 
    buttonText: String
});


const emit = defineEmits(["buttonClick"]); 
const handleClick = () => emit("buttonClick");

/* ------------ Funktioner ----------- */


/* -------- Watch, onMounted --------- */

</script>