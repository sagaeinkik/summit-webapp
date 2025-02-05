<template>
    <h1 class="intro m-auto my-6 text-center">Leverantörer</h1>
    <SupplierControls :isActive="addSupplierActivated" @buttonClick="addSupplier" @search="searchFilter" @filterChange="handleFilterChange"/>
    
    <div class="wrap relative">

        <div class="overlay" v-if="addSupplierActivated">
            <AddSupplier @closeAdd="closeAdd"/>
        </div>

        <div class="overlay" v-if="editSupplierActivated">
            <EditSupplier :editSupplier="selectedSupplier" @closeEdit="closeEdit"/>
        </div>
        <SupplierTable ref="supplierTable" :search="searchString" :filter="selectedFilter" @handleClick="editSupplier"/>
    </div>
</template>


<script setup>
/* ------------ Importer ------------- */
import { ref, watch } from 'vue'
import SupplierControls from "../components/supplier/SupplierControls.vue";
import SupplierTable from "../components/supplier/SupplierTable.vue";
import AddSupplier from "../components/supplier/AddSupplier.vue";
import EditSupplier from "../components/supplier/EditSupplier.vue";

/* ------------ Variabler ------------ */

const addSupplierActivated = ref(false);
const editSupplierActivated = ref(false);
const searchString = ref(""); //Söksträng från searchbar
const selectedFilter = ref("id"); //Select-lista
const selectedSupplier = ref(null); //Vald leverantör för redigering
const supplierTable = ref(null); //Referens till SupplierTable för att komma åt metoden getSuppliers

/* ------ Props, emits, expose ------- */
//Ta emot emits
const searchFilter = (searchValue) => {
    searchString.value = searchValue;
}

//addSupplier
const addSupplier = () => {
    addSupplierActivated.value = !addSupplierActivated.value;
}

const closeAdd = () => {
    addSupplierActivated.value = false;
}

//Selectlista
const handleFilterChange = (selectedValue) => {
    selectedFilter.value = selectedValue;
}

//Redigera-knapp tryckt
const editSupplier = (supplier) => {
    editSupplierActivated.value = !editSupplierActivated.value;
    selectedSupplier.value = supplier; 
}

const closeEdit = () => {
    editSupplierActivated.value = false;
}

/* ------------ Funktioner ----------- */


/* -------- Watch, onMounted --------- */
//Watcher för att uppdatera leverantörslistan
watch([addSupplierActivated, editSupplierActivated], (newValues) => {
    //Nya värden för add och edit
    const [newAddValue, newEditValue] = newValues;

    //Om nya värdena är false (dvs formulären har stängts) och tabellen finns
    if ((!newAddValue || !newEditValue) && supplierTable.value) {
        
        supplierTable.value.getSuppliers();
    }
})

</script>

<style lang="scss" scoped>
@use "../assets/scss/forms";
</style>