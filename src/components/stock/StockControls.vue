<template>
<div class="ctrl-grid-wrap grid gap-8 items-end">
    <AddButton id="add" @buttonClick="handleAddProduct" :isActive="isActive"/>
    <SearchBar id="searchbar" :placeholder="'Sök produkt'" @search="handleSearchFilter"/>
    <SelectList id="select" name="product-filter" :options="productFilterOptions" @filterChange="handleFilterChange" class="justify-self-end"/>
</div>
</template>

<script setup>
/* ------------ Importer ------------- */
import AddButton from "../AddButton.vue"
import SearchBar from "../SearchBar.vue"
import SelectList from "../SelectList.vue"


/* ------------ Variabler ------------ */

//Listan med options 
const productFilterOptions = [
    { value: "product_id", label: "ProduktID"}, 
    {value: "product_name", label: "Produktnamn"},
    { value: "supplier_name", label: "Leverantör"}, 
    { value: "category_name", label: "Kategori"}, 
    { value: "size", label: "Storlek"}, 
    { value: "extra", label: "Extra"}
]; 

/* ------ Props, emits, expose ------- */

//Ta emot props från StockView: 
const props = defineProps({
    isActive: Boolean
})

/* Emitta alla vidare till Stockview */
const emit = defineEmits(["buttonClick", "search", "filterChange"]);


const handleAddProduct = () => {
    emit("buttonClick");
}

const handleSearchFilter = (searchValue) => {
    emit("search", searchValue);
}

const handleFilterChange = (selectedValue) => {
    emit("filterChange", selectedValue);
}

/* ------------ Funktioner ----------- */


/* -------- Watch, onMounted --------- */

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms";
</style>