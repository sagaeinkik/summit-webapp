<template>
<div class="bg-light p-4 absolute rounded-3xl form-wrapper">
        <div class="headline relative">
            <h2 class="text-center">Registrera ny produkt</h2>
            <button class="absolute close" @click="handleClick">&#10540;</button>
        </div>
    <p v-if="errors" class="text-red-600 ml-3">{{ errors }}</p>
    <p v-if="successMsg" class="ml-3">{{ successMsg }}</p>
    <form @submit.prevent class="overlay-form mt-4">

        <!-- Grupp -->
        <div class="input-group ss-col">
            <!-- ID -->
            <div class="form-input">
                <label for="productId">ProduktID*:</label>
                <input v-model="productToAdd.productId" type="text" name="productId" id="productId">
            </div>

            <!-- Produktnamn -->
            <div class="form-input">
                <label for="productName">Produktnamn*:</label>
                <input v-model="productToAdd.productName" type="text" name="productName" id="productName">
            </div>
        </div>

        <!-- Grupp -->
        <div class="input-group">
            <!-- Storlek -->
            <div class="form-input">
                <label for="size">Storlek:</label>
                <input v-model="productToAdd.size" type="text" name="size" id="size">
            </div>
            <!-- Extra -->
            <div class="form-input">
                <label for="extra">Extra:</label>
                <input  v-model="productToAdd.extra" type="text" name="extra" id="extra">
            </div>
        </div> 

        <!-- Antal -->
        <div class="form-input">
            <label for="amount">Lagersaldo*:</label>
            <input v-model="productToAdd.amount" type="number" name="amount" id="amount">
        </div>

        <!-- Grupp -->
        <div class="input-group">
            <!-- Inpris -->
            <div class="form-input">
                <label for="inPrice">Inpris*:</label>
                <input v-model="productToAdd.inPrice" type="number" name="inPrice" id="inPrice">
            </div>
            <!-- Utpris -->
            <div class="form-input">
                <label for="outPrice">Utpris*:</label>
                <input v-model="productToAdd.outPrice" type="number" name="outPrice" id="outPrice">
            </div>
        </div>

        <!-- Grupp -->
        <div class="input-group ss-col">
            <!-- Leverantör -->
            <div class="form-input">
                <label for="supplierId">Leverantör*:</label>
                <select v-model="productToAdd.supplierId" name="supplierId" id="supplierId">
                    <option value="" disabled selected>Välj i listan</option>
                    <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.company_name}}</option>
                </select>
            </div>
            <!-- Kategori -->
            <div class="form-input">
                <label for="categoryId">Kategori*:</label>
                <select v-model="productToAdd.categoryId" name="categoryId" id="categoryId">
                    <option value="" disabled selected>Välj i listan</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_name}}</option>
                </select>
            </div>
        </div>

        <!-- Knappar -->
        <div class="form-controls">
            <input type="submit" value="Lägg till" @click="addProduct">
            <input type="reset" value="Nollställ">
        </div>
    </form>
</div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { onMounted, ref } from 'vue';
import { getCookie } from "../../utils/auth";

/* ------------ Variabler ------------ */

//Reaktiva variabler
const suppliers = ref([]);
const categories = ref([]);
const errors = ref("");
const successMsg = ref("");

//Produkt-objekt
const productToAdd = ref({
    productId: "",
    productName: "",
    size: "",
    extra: "",
    amount: 0,
    inPrice: 0,
    outPrice: 0,
    categoryId: "",
    supplierId: ""
})

//Api
let apiUrl = "https://summitapi.up.railway.app";

/* ------ Props, emits, expose ------- */

//Emit
const emit = defineEmits(["closeAdd"]);
const handleClick = (event) => {
    emit("closeAdd");
}
/* ------------ Funktioner ----------- */

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


/* LÄGG TILL */
//Kontrollera input (finns även i backend)
function validateInput() {

    //Fält är ej ifyllda/de är ifyllda med mellanslag
    if (productToAdd.value.productId.trim() === "" || productToAdd.value.productName.trim() === "" || productToAdd.value.amount === "" || productToAdd.value.inPrice === "" || productToAdd.value.outPrice === "" ||  productToAdd.value.supplierId === "" || productToAdd.value.categoryId === "") {
        errors.value = "Fyll i alla obligatoriska fält (markerade med *)!";
        return false;
    } 
    //Siffror är negativa
    if (productToAdd.value.amount < 0 || productToAdd.value.inPrice < 0 || productToAdd.value.outPrice < 0) {
        errors.value = "Siffror kan ej vara negativa!";
        return false;
    }

    return true;
}

//Nollställ produktfält 
function resetProduct() {
    productToAdd.value = {
        productId: "",
        productName: "",
        size: "",
        extra: "",
        amount: 0,
        inPrice: 0,
        outPrice: 0,
        categoryId: "",
        supplierId: ""
    }
}



//Lägg till-funktion
async function addProduct() {
    //Validera fälten 
    if(!validateInput()) {
        return;
    }
    errors.value = ""; 
    successMsg.value = "";

    //Gör en trycatch
    try {

            //Hämta token ur cookie
        const userToken = getCookie("jwt");

            //Gör anrop
        const response = await fetch(apiUrl + "/products", {
            method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(productToAdd.value)
        });

        const data = await response.json();

        // Kolla vanliga felmeddelanden:
        if (data.statusCode === 500 && data.message.includes("Duplicate entry")) {
            errors.value = "ProduktID finns redan!";
        } else if (data.statusCode === 400) {
            errors.value = "Felaktig inmatning: " + data.message;
        }
        else if (response.ok) {
            successMsg.value = data.message;
            //Nolla produktfält
            resetProduct();
        } else {
            //Logga felet och sätt errormeddelande
            console.error("Fel vid tillägg av produkt:", data);
            errors.value = data.message;
        } 
    } catch (error) {
        console.error("Något gick fel:", error);
        errors.value = "Ett oväntat fel uppstod!";
    }

}
/* -------- Watch, onMounted --------- */
onMounted(() => {
    fetchSuppliers();
    fetchCategories();
});

</script>

<style lang="scss" scoped>
@use "../../assets/scss/vars" as v;
@use "../../assets/scss/forms" as f;
</style>