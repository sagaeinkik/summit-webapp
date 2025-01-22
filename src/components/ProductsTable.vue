<template>
<div class="table-wrapper mt-10 block pb-4">
    <p class="mb-4">Antal produkter: {{ filteredProducts.length }} </p>
    <table class="w-full">
        <thead class="bg-medium text-light">
            <tr>
                <th class="rounded-tl-2xl" @click="sortProducts('product_id')">ProduktID</th>
                <th @click="sortProducts('product_name')">Produktnamn</th>
                <th @click="sortProducts('size')">Storlek</th>
                <th @click="sortProducts('extra')">Extra</th>
                <th @click="sortProducts('supplier_name')">Leverantör</th>
                <th @click="sortProducts('category_name')">Kategori</th>
                <th @click="sortProducts('in_price')">Inpris</th>
                <th @click="sortProducts('out_price')">Utpris</th>
                <th @click="sortProducts('amount')">Saldo</th>
                <th class="rounded-tr-2xl"></th>
            </tr>
        </thead>
        <tbody v-if="filteredProducts.length > 0">
            <tr v-for="product in filteredProducts" :key="product.product_id">
                <td :title="product.product_id">{{ product.product_id }}</td>
                <td :title="product.product_name">{{ product.product_name }}</td>
                <td :title="product.size">{{ (product.size) ? product.size : "-" }}</td>
                <td :title="product.extra">{{ (product.extra) ? product.extra : "-" }} </td>
                <td :title="product.supplier_name">{{ product.supplier_name }}</td>
                <td :title="product.category_name">{{ product.category_name}}</td>
                <td :title="product.in_price">{{ product.in_price }}</td>
                <td :title="product.out_price">{{ product.out_price }}</td>
                <td :title="product.amount">{{ product.amount }}</td>
                <td class="edit"><i class="fa-solid fa-gear"></i></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"; 
import { sortArray } from "../utils/sort";


//Initiera lite arrayer
const allProducts = ref([]);
let filteredProducts = ref([]);

//Variabel för att hålla koll på sortering
let latestSort = ref(null); 

//Props från StockView
const props = defineProps({
    search: {
        type: String,
        required: false,
        default: ""
    },
    filter: {
        type: String,
        required: false,
        default: "product_id"
    }
}); 

onMounted(() => {
    fetchProducts();
    filterProducts();
})

async function fetchProducts() {
    try {
        const response = await fetch("https://summitapi.up.railway.app/products");
        allProducts.value = await response.json();
        filteredProducts.value = allProducts.value; //Lagra i båda så utgångspunkten alltid är hela listan
    } catch (error) {
        console.error(error);
    }
}

//Filterfunktion
function filterProducts() {
    if(props.search === "") {
        filteredProducts.value = allProducts.value; //He tillbaka till hela listan om söksträngen är tom
        return; 
    }

    //Filtrera produkter
    filteredProducts.value = allProducts.value.filter(product => {
        const searchVaue = props.search.toLowerCase(); 
        const fieldValue = String(product[props.filter]).toLowerCase(); 
        return fieldValue.includes(searchVaue);
    })
}

//Gör en watch för sök och filter
watch([() => props.search, () => props.filter], () => {
    filterProducts(); 
})


//Sortera produkter vid klick
function sortProducts(sortBy) {
    //Använd sorteringsfunktion från utils/sort
    filteredProducts.value = sortArray(filteredProducts.value, sortBy, latestSort);
}
</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;
@use "../assets/scss/tables" as t;

.table-wrapper {
    overflow: auto;
    height: calc(100vh - 375px);
}

@media (max-width: 1500px) {
td {  
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
}
</style>