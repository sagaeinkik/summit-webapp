<template>
<div class="table-wrapper mt-10 block pb-4">
    <p class="mb-4">Antal produkter: {{ filteredProducts.length }} </p>
    <table class="w-full">
        <thead class="bg-medium text-light">
            <tr>
                <th class="rounded-tl-2xl">ProduktID</th>
                <th>Produktnamn</th>
                <th>Storlek</th>
                <th>Extra</th>
                <th>Leverantör</th>
                <th>Kategori</th>
                <th>Inpris</th>
                <th>Utpris</th>
                <th>Saldo</th>
                <th class="rounded-tr-2xl">Redigera</th>
            </tr>
        </thead>
        <tbody v-if="filteredProducts.length > 0">
            <tr v-for="product in filteredProducts" :key="product.product_id">
                <td>{{ product.product_id }}</td>
                <td>{{ product.product_name }}</td>
                <td>{{ (product.size) ? product.size : "-" }}</td>
                <td>{{ (product.extra) ? product.extra : "-" }} </td>
                <td>{{ product.supplier_name }}</td>
                <td>{{ product.category_name}}</td>
                <td>{{ product.in_price }}</td>
                <td>{{ product.out_price }}</td>
                <td>{{ product.amount }}</td>
                <td class="edit"><i class="fa-solid fa-gear"></i></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"; 


//Initiera lite arrayer
const allProducts = ref([]);
let filteredProducts = ref([]);

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

//Gör en watch för sök och filter
watch([() => props.search, () => props.filter], () => {
    filterProducts(); 
})

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

</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;

.table-wrapper {
    overflow: auto;
    height: calc(100vh - 375px);
}

th, td {
    padding: 0.5em 1em; 
}

td.edit {
    text-align: center;
}

i {
    color: v.$medium;
    font-size: 1.3em;
}
</style>