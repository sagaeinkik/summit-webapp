<template>
<div class="ctrl-grid-wrap grid gap-8 items-center">
    <AddButton @addToTable="handleAddProduct"/>
    <SearchBar @search="handleSearchFilter"/>
    <SelectList name="product-filter" :options="productFilterOptions" @filterChange="handleFilterChange" class="justify-self-end"/>
</div>
</template>

<script setup>
import AddButton from "./AddButton.vue"
import SearchBar from "./SearchBar.vue"
import SelectList from "./SelectList.vue"


//Listan med options 
const productFilterOptions = [
    { value: "product_id", label: "ProduktID"}, 
    {value: "product_name", label: "Produktnamn"},
    { value: "supplier_name", label: "Leverantör"}, 
    { value: "category_name", label: "Kategori"}, 
    { value: "size", label: "Storlek"}, 
    { value: "extra", label: "Extra"}
]; 

/* Emitta alla vidare till Stockview */
const emit = defineEmits(["addProduct", "search", "filterChange"]);


const handleAddProduct = () => {
    emit("addProduct");
}

const handleSearchFilter = (searchValue) => {
    emit("search", searchValue);
}

const handleFilterChange = (selectedValue) => {
    emit("filterChange", selectedValue);
}
</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;

.ctrl-grid-wrap {
    grid-template-columns: 1fr 2fr 1fr;
}
</style>