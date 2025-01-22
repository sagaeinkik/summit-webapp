<template>
<div class="bg-light p-4 absolute rounded-3xl form-wrapper">
    <h2 class="text-center">Registrera ny produkt</h2>
    <p v-if="errors" class="text-red-600 font-medium ml-3">{{ errors }}</p>
    <form @submit.prevent class="overlay-form mt-4">

        <!-- Grupp -->
        <div class="input-group">
            <!-- ID -->
            <div class="form-input">
                <label for="productId">ProduktID*:</label>
                <input type="text" name="productId" id="productId">
            </div>

            <!-- Produktnamn -->
            <div class="form-input">
                <label for="productName">Produktnamn*:</label>
                <input type="text" name="productName" id="productName">
            </div>
        </div>

        <!-- Grupp -->
        <div class="input-group">
            <!-- Storlek -->
            <div class="form-input">
                <label for="size">Storlek:</label>
                <input type="text" name="size" id="size">
            </div>
            <!-- Extra -->
            <div class="form-input">
                <label for="extra">Extra:</label>
                <input type="text" name="extra" id="extra">
            </div>
        </div> 

        <!-- Antal -->
        <div class="form-input">
            <label for="amount">Lagersaldo*:</label>
            <input type="number" name="amount" id="amount">
        </div>

        <!-- Grupp -->
        <div class="input-group">
            <!-- Inpris -->
            <div class="form-input">
                <label for="inPrice">Inpris*:</label>
                <input type="number" name="inPrice" id="inPrice">
            </div>
            <!-- Utpris -->
            <div class="form-input">
                <label for="outPrice">Utpris*:</label>
                <input type="number" name="outPrice" id="outPrice">
            </div>
        </div>

        <!-- Grupp -->
        <div class="input-group">
            <!-- Leverantör -->
            <div class="form-input">
                <label for="supplierId">Leverantör*:</label>
                <select name="supplierId" id="supplierId">
                    <option value="" disabled selected>Välj i listan</option>
                    <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.company_name}}</option>
                </select>
            </div>
            <!-- Kategori -->
            <div class="form-input">
                <label for="categoryId">Kategori*:</label>
                <select name="categoryId" id="categoryId">
                    <option value="" disabled selected>Välj i listan</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_name}}</option>
                </select>
            </div>
        </div>

        <!-- Knappar -->
        <div class="form-controls">
            <input type="submit" value="Lägg till">
            <input type="reset" value="Nollställ">
        </div>
    </form>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


//Reaktiva variabler
const suppliers = ref([]);
const categories = ref([]);
const errors = ref("Du måste ange ProduktID");

//Api
let apiUrl = "https://summitapi.up.railway.app";

//Fetchanrop till leverantörer och kategorier
async function fetchSuppliers() {
    try {
        const response = await fetch(apiUrl + "/suppliers");
        suppliers.value = await response.json();
    } catch (error) {
        console.error(error);
    }
}

//Kategorier
async function fetchCategories() {
    try {
        const response = await fetch(apiUrl + "/categories");
        categories.value = await response.json();
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    fetchSuppliers();
    fetchCategories();
});

</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;
@use "../assets/scss/forms" as f;

.form-wrapper {
    width: 70%;
    height: 97%;
    max-height: 800px;
    overflow-y: auto;
}
</style>