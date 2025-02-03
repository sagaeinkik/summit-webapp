<template>
    <button class="bg-mediumdark font-semibold text-light px-6 py-1 hover:bg-medium" @click="handleClick">
       <span :class="addProductActivated ? 'close' : 'open'">&#10540;</span>
    </button>
</template>

<script setup>
import { ref } from "vue";

//Emit
const emit = defineEmits(["addToTable"]);
const handleClick = (event) => {
    emit("addToTable");
    open.value = !open.value;
}

//Props från StockView via StockControls: boolean som styr om knappen ska visa plus eller kryss
const props = defineProps({
    addProductActivated: Boolean
})
</script>


<style lang="scss" scoped>
@use "../assets/scss/vars" as v;

button {
    font-size: 4em;
    line-height: 1; 
    border-radius: 2rem;
    width: fit-content;
}

//Plustecknet
span {
    @include v.transition;
    display: block;
}

//Rotera om aktiv
span.open {
    transform: rotate(135deg);
}

//Gör mindre, minska padding
@media (max-width: 600px) {
    button {
        font-size: 3em;
        border-radius: 1.3rem;
        padding-left: 1.3rem;
        padding-right: 1.3rem;
    }
}
</style>