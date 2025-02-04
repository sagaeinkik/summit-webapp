<template> 
    <div class="flex gap-8 items-end">
        <AddButton :isActive="isActive" @buttonClick="handleAddCategory"/>
        <SearchBar :placeholder="'Sök kategori'" @search="handleSearch"/>
    </div>
</template>

<script setup>
import AddButton from "../AddButton.vue";
import SearchBar from "../SearchBar.vue";
import { defineEmits } from "vue";

const props = defineProps({
    isActive: Boolean
})

//Emits att skicka vidare till categoryview
const emit = defineEmits(["search", "buttonClick"]);
const handleAddCategory = () => {
    emit("buttonClick");
}

const handleSearch = (searchValue) => {
    emit("search", searchValue);
}

</script>