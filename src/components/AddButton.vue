<template>
    <button class="bg-mediumdark font-semibold text-light px-6 py-1 hover:bg-medium" @click="handleClick">
       <span :class="open ? 'open' : 'close'">&#10540;</span>
    </button>
</template>

<script setup>
import { ref } from "vue";

//Klick-boolean: med open menas "öppna formuläret". Med false menas "stäng formuläret"
let open = ref(true)

//Emit
const emit = defineEmits(["addToTable"]);
const handleClick = (event) => {
    emit("addToTable");
    open.value = !open.value;
}

//Props
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
span {
    @include v.transition;
    display: block;
}

span.open {
    transform: rotate(135deg);
}
</style>