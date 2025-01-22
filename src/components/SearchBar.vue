<template>
        <div class="search bg-white p-2 pl-6 gap-4 rounded-3xl w-full flex items-center">
        <label for="searchbox"><i class="fa-solid fa-magnifying-glass text-medium"></i></label>
        <input type="text" id="searchbox" name="searchbox" placeholder="Sök produkt" @input="handleSearch" />
    </div>
</template>

<script setup>
//Emit
const emit = defineEmits(["search"]);
const handleSearch = (event) => {
    emit("search", event.target.value);
}

</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;

input {
    width: 95%; 
    border: none; 

    &:focus {
        outline: none; 
        border-bottom: 2.5px dotted v.$mediumlight;
    }
}
</style>