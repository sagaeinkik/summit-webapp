<template>
    <h1 class="intro m-auto my-6 text-center">Lager</h1>
        <StockControls @addProduct="addNewProduct" @search="searchFilter" @filterChange="handleFilterChange" :addProductActivated="addProductActivated"/>
    <div class="wrap relative">
        <div class="overlay" v-if="addProductActivated">
            <ProductForm @closeAdd="closeAdd"/>
        </div>
        <div class="overlay" v-if="editProductActivated">
            <EditProduct :product="selectedProduct" @closeEdit="closeEdit" />
        </div>
        <ProductsTable  @editProduct="editProduct" :search="searchString" :filter="selectedFilter"/>
    </div>
</template>

<script setup>
import StockControls from "../components/StockControls.vue";
import ProductsTable from "../components/ProductsTable.vue";
import ProductForm from "../components/ProductForm.vue";
import EditProduct from "../components/EditProduct.vue";
import { ref } from "vue";


//Reaktiva variabler
let searchString = ref(""); //För sökning
let selectedFilter = ref("product_id"); //Select-lista
let addProductActivated = ref(false);  //Om addProduct-formuläret ska visas
let editProductActivated = ref(false); //Om editProduct-formulär ska visas
let selectedProduct = ref(null); //Vald produkt för redigering


//Lagra om AddProduct är aktiverad, byt värde för varje knappklick
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
