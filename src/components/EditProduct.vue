<template>
<div class="bg-light p-4 absolute rounded-3xl form-wrapper">
    <div class="headline relative">
        <h2 class="text-center">Ändra produkt</h2>
        <button class="absolute close" @click="handleClick">&#10540;</button>
    </div>
    <p v-if="errors" class="text-red-600 font-medium ml-3">{{ errors }}</p>
    <form @submit.prevent class="overlay-form mt-4">

        <!-- Grupp -->
        <div class="input-group ss-col">
            <!-- ID -->
            <div class="form-input">
                <label for="productId">ProduktID*:</label>
                <input type="text" v-model="formData.product_id" name="productId" id="productId">
            </div>

            <!-- Produktnamn -->
            <div class="form-input">
                <label for="productName">Produktnamn*:</label>
                <input type="text"  v-model="formData.product_name" name="productName" id="productName">
            </div>
        </div>

        <!-- Grupp -->
        <div class="input-group">
            <!-- Storlek -->
            <div class="form-input">
                <label for="size">Storlek:</label>
                <input type="text" v-model="formData.size"  name="size" id="size">
            </div>
            <!-- Extra -->
            <div class="form-input">
                <label for="extra">Extra:</label>
                <input type="text"  v-model="formData.extra" name="extra" id="extra">
            </div>
        </div> 

        <!-- Antal -->
        <div class="form-input">
            <label for="amount">Lagersaldo*:</label>
            <input type="number"  v-model="formData.amount" name="amount" id="amount">
        </div>

        <!-- Grupp -->
        <div class="input-group">
            <!-- Inpris -->
            <div class="form-input">
                <label for="inPrice">Inpris*:</label>
                <input type="number"  v-model="formData.in_price" name="inPrice" id="inPrice">
            </div>
            <!-- Utpris -->
            <div class="form-input">
                <label for="outPrice">Utpris*:</label>
                <input type="number"  v-model="formData.out_price" name="outPrice" id="outPrice">
            </div>
        </div>

        <!-- Grupp -->
        <div class="input-group ss-col">
            <!-- Leverantör -->
            <div class="form-input">
                <label for="supplierId">Leverantör*:</label>
                <select v-model="formData.supplier_id" name="supplierId" id="supplierId">
                    <option value="" disabled selected>Välj i listan</option>
                    <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.company_name}}</option>
                </select>
            </div>
            <!-- Kategori -->
            <div class="form-input">
                <label for="categoryId">Kategori*:</label>
                <select v-model="formData.category_id" name="categoryId" id="categoryId">
                    <option value="" disabled selected>Välj i listan</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_name}}</option>
                </select>
            </div>
        </div>

        <!-- Knappar -->
        <div class="form-controls">
            <input type="submit" value="Uppdatera">
            <input type="reset" value="Radera produkt">
        </div>
    </form>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


//Reaktiva variabler
const suppliers = ref([]); //Leverantörslista
const categories = ref([]); //Kategorilista
const errors = ref(""); //Eventuella errormeddelanden
const formData = ref({
    product_id: "", 
    product_name: "", 
    size: "", 
    extra: "", 
    amount: 0, 
    in_price: 0, 
    out_price: 0, 
    supplier_id: 0, 
    category_id: 0
}); //Reaktivt formulär


//Ta emot produkt från StockView 
const props = defineProps({
    product: {
        type: Object, 
        required: true
    }
})

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

onMounted(async () => {
    // Vänta på att båda fetch-anropen är klara
    await Promise.all([fetchSuppliers(), fetchCategories()]);
    
    //Matcha supplier-name med supplier-id
    const matchedSupplier = suppliers.value.find(
        s => s.company_name === props.product.supplier_name
    );
    
    //Samma sak med kategori
    const matchedCategory = categories.value.find(
        c => c.category_name === props.product.category_name
    );

    //Fyll i formuläret med produktens data (och matchad leverantör/kategori)
    formData.value = {
        product_id: props.product.product_id,
        product_name: props.product.product_name,
        size: props.product.size || '',
        extra: props.product.extra || '',
        amount: props.product.amount,
        in_price: props.product.in_price,
        out_price: props.product.out_price,
        supplier_id: matchedSupplier?.id,
        category_id: matchedCategory?.id
    }
});

//Emit för att stänga edit-formuläret.
const emit = defineEmits(["closeEdit"]);
const handleClick = (event) => {
    emit("closeEdit");
}

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

//stäng-knapp: 
.close {
    top: -0.4em; 
    right: 0.2em;
    font-size: 3em; 
}

//Bredda formulär
@media (max-width: 900px) {
    .form-wrapper {
        width: 90%;
    }
}


//Ännu mer!
@media (max-width: 670px) {
    .form-wrapper {
        width: 95%;
    }
}
</style>