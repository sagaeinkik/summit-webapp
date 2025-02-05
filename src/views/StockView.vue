<template>
    <h1 class="intro m-auto my-6 text-center">Lager</h1>
        <StockControls @buttonClick="addNewProduct" @search="searchFilter" @filterChange="handleFilterChange" :isActive="addProductActivated"/>
    <div class="relative">
        <div class="overlay" v-if="addProductActivated">
            <ProductForm @closeAdd="closeAdd"/>
        </div>
        <div class="overlay" v-if="editProductActivated">
            <EditProduct :product="selectedProduct" @closeEdit="closeEdit" />
        </div>
        <ProductsTable ref="productsTable" @editProduct="editProduct" :search="searchString" :filter="selectedFilter"/>
    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import StockControls from "../components/stock/StockControls.vue";
import ProductsTable from "../components/stock/ProductsTable.vue";
import ProductForm from "../components/stock/AddProduct.vue";
import EditProduct from "../components/stock/EditProduct.vue";
import { ref, watch } from "vue";


/* ------------ Variabler ------------ */
//Reaktiva variabler
let searchString = ref(""); //För sökning
let selectedFilter = ref("product_id"); //Select-lista
let addProductActivated = ref(false);  //Om addProduct-formuläret ska visas
let editProductActivated = ref(false); //Om editProduct-formulär ska visas
let selectedProduct = ref(null); //Vald produkt för redigering
let productsTable = ref(null); //Referens till ProductsTable för att komma åt metoden fetchProducts


/* ------ Props, emits, expose ------- */

//Om Add-knapp är klickad på, byt värde för varje klick
const addNewProduct = () => {
    addProductActivated.value = !addProductActivated.value;
}

//Stäng AddProduct
const closeAdd = () => {
    addProductActivated.value = addProductActivated.value = false;
}

//Byt värde på om edit product är aktiverat, lagra produkten som är vald
const editProduct = (product) => {
    editProductActivated.value = !editProductActivated.value;
    selectedProduct.value = product;
}

//Stäng EditProduct
const closeEdit = () => {
    editProductActivated.value = false;
}

//Lagra söksträng
const searchFilter = (searchValue) => {
    searchString.value = searchValue;
}

//Lagra filter som valts i sökning
const handleFilterChange = (selectedValue) => {
    selectedFilter.value = selectedValue;
}
/* ------------ Funktioner ----------- */


/* -------- Watch, onMounted --------- */

//watcher för att hämta tabellen igen baserat på om formulären har stängts
watch([addProductActivated, editProductActivated], (newValues) => {
    //Nya värden för add och edit
    const [newAddValue, newEditValue] = newValues;

    //Om nya värdena är false (dvs formulären har stängts) och tabellen finns
    if ((!newAddValue || !newEditValue) && productsTable.value) {
        //Anropa metoden från ProductsTable
        productsTable.value.fetchProducts();
    }
})

</script>

<style lang="scss" scoped>
@use "../assets/scss/forms" as f;
</style>
