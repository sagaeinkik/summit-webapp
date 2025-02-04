<template>
    <div class="flex gap-8 items-end">
        <AddButton id="add" :isActive="isActive" @buttonClick="handleAddSupplier"/>
        <SearchBar id="searchbar" :placeholder="'Sök leverantör'" @search="handleSearch"/>
        <SelectList id="select" name="product-filter" :options="supplierFilterOptions" @filterChange="handleFilterChange" class="justify-self-end" />
    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref } from 'vue'
import AddButton from "../AddButton.vue";
import SearchBar from "../SearchBar.vue";
import SelectList from "../SelectList.vue";

/* ------------ Variabler ------------ */

//Filtreringsoptions att skicka med i select list
const supplierFilterOptions = [
    { value: "id", label: "LeverantörsID"}, 
    {value: "company_name", label: "Företagsnamn"},
    { value: "street_address", label: "Gatuadress"}, 
    { value: "area", label: "Område"}, 
    { value: "telephone", label: "Telefon"}, 
    { value: "email", label: "Email"}
];

/* ------ Props, emits, expose ------- */

//Props
const props = defineProps({
    isActive: Boolean
})

//Emits att skicka vidare till supplierview
const emit = defineEmits(["search", "buttonClick", "filterChange"]);

//Knapp
const handleAddSupplier = () => {
    emit("buttonClick");
}

//Sök
const handleSearch = (searchValue ) => {
    emit("search", searchValue);
}

//Select
const handleFilterChange = (selectedValue) => {
    emit("filterChange", selectedValue);
}

/* ------------ Funktioner ----------- */


/* -------- Watch, onMounted --------- */

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms";
</style>