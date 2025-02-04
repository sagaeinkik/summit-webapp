<template>
    <div class="dashcard-grid grid grid-cols-3 gap-6 mt-12">
    <DashboardCard :count="productCount" title="produkter" description="Utveckla verksamheten genom att lägga till fler produkter, och håll lagersaldot uppdaterat." linkPath="/lager" linkText="Till lagret"/>
    <DashboardCard :count="supplierCount" title="leverantörer" description="Håll kontaktinformation uppdaterad och utöka Nordic Peaks samarbeten." linkPath="/leverantorer" linkText="Hantera leverantörer" />
    <DashboardCard :count="categoryCount" title="kategorier" description="Kartlägg verksamhetens inriktning på marknaden i takt med att den växer." linkPath="/kategorier" linkText="Till kategorier" />
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import DashboardCard from "./DashboardCard.vue";

let productCount = ref(0); 
let supplierCount = ref(0); 
let categoryCount = ref(0);

let apiUrl = "https://summitapi.up.railway.app"; 

onMounted(() => {
    fetchProducts(); 
    fetchSuppliers(); 
    fetchCategories();
}); 

//Hämta produkter
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl + '/products'); 
        const data = await response.json(); 
        productCount.value = data.length;
    } catch (error) {
        console.error(error);
    }
}

//Hämta leverantörer
async function fetchSuppliers() {
    try {
        const response = await fetch(apiUrl + "/suppliers"); 
        const data = await response.json();
        supplierCount.value = data.length;
    } catch (error) {
        console.error(error);
    }
}

//Hämta kategorier
async function fetchCategories() {
    try {
        const response = await fetch(apiUrl + "/categories"); 
        const data = await response.json();
        categoryCount.value = data.length;
    } catch (error) {
        console.error(error);
    }
}
</script>

<style lang="scss" scoped>
@media (max-width: 890px){
    .dashcard-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media(max-width: 612px) {
    .dashcard-grid {
        display: flex; 
        flex-direction: column;
    }
}


</style>
