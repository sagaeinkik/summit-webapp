<template>
    <h1 class="intro m-auto my-6 text-center">Lager</h1>
        <StockControls @addProduct="addNewProduct" @search="searchFilter" @filterChange="handleFilterChange"/>
    <div class="wrap relative">
        <div class="overlay" v-if="addProductActivated">
            <ProductForm />
        </div>
        <ProductsTable :search="searchString" :filter="selectedFilter"/>
    </div>
</template>

<script setup>
import StockControls from "../components/StockControls.vue";
import ProductsTable from "../components/ProductsTable.vue";
import ProductForm from "../components/ProductForm.vue";
import { ref } from "vue";

let searchString = ref("");
let selectedFilter = ref("product_id"); 
let addProductActivated = ref(false); 


//Lagra om AddProduct är aktiverad, byt värde för varje knappklick
const addNewProduct = () => {
    addProductActivated.value = !addProductActivated.value;
}

//Lagra söksträng
const searchFilter = (searchValue) => {
    searchString.value = searchValue;
}

//Lagra filter som valts i sökning
const handleFilterChange = (selectedValue) => {
    selectedFilter.value = selectedValue;
}
</script>

<style lang="scss" scoped>
.overlay {
    width: 100%; 
    height: 100%; 
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute; 
    display: flex; 
    justify-content: center; 
    align-items: center;
}
</style>
