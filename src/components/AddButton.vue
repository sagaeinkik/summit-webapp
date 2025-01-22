<template>
    <button class="bg-mediumdark font-semibold text-light px-6 py-1 hover:bg-medium" @click="handleClick">
        +
    </button>
</template>

<script setup>
//Emit
const emit = defineEmits(["addToTable"]);
const handleClick = (event) => {
    emit("addToTable");
}
</script>


<style lang="scss" scoped>
button {
    font-size: 5em;
    line-height: 1; 
    border-radius: 2rem;
    width: fit-content;
}
</style>