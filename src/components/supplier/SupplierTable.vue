<template>
    <div class="table-wrapper mt-10 block pb-4">
        <p class="mb-4">Antal kategorier: {{ filteredSuppliers.length }} </p>

        <table class="w-full">

            <thead class="bg-medium text-light">
                <tr class="cursor-default">
                    <th class="rounded-tl-2xl" @click="sortSuppliers('id')">ID</th>
                    <th @click="sortSuppliers('company_name')">Företagsnamn</th>
                    <th @click="sortSuppliers('street_address')">Gatuadress</th>
                    <th @click="sortSuppliers('area')">Ort</th>
                    <th @click="sortSuppliers('telephone')">Telefon</th>
                    <th @click="sortSuppliers('email')">Email</th>
                    <th class="rounded-tr-2xl"></th>
                </tr>
            </thead>

            <tbody v-if="filteredSuppliers.length > 0">
                <!-- Loopa igenom alla produkter: lägg på en dubbelklick på varje rad -->
                <tr v-for="supplier in filteredSuppliers" :key="supplier.id" @dblclick="() => handleClick(supplier)" class="cursor-pointer">
                    <td :title="supplier.id">{{ supplier.id }}</td>
                    <td :title="supplier.company_name">{{ supplier.company_name }}</td>
                    <td :title="supplier.street_address">{{ supplier.street_address }}</td>
                    <td :title="supplier.area">{{ supplier.area }}</td>
                    <td :title="supplier.telephone">{{ supplier.telephone }}</td>
                    <td :title="supplier.email">{{ supplier.email }}</td>
                    <!-- Redigera-ikon: skicka med kategori med emit -->
                    <td class="edit" @click="() => handleClick(supplier)"><i class="fa-solid fa-gear"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref, watch, onMounted, defineExpose } from "vue";
import { sortArray } from "../../utils/sort";

/* ------------ Variabler ------------ */

let apiUrl = "https://summitapi.up.railway.app/suppliers";
const allSuppliers = ref([]);
let filteredSuppliers = ref([]);
let latestSort = ref(null); //Variabel för att hålla koll på sortering

/* ------ Props, emits, expose ------- */

const props = defineProps({
    search: {
        type: String,
        required: false,
        default: ""
    }, 
    filter: {
        type: String,
        required: false,
        default: "id"
    }
});


const emit = defineEmits(["handleClick"]);
const handleClick = (supplier) => {
    emit("handleClick", supplier);
}

//Expose 
defineExpose({
    getSuppliers
})

/* ------------ Funktioner ----------- */

//Hämta alla leverantörer
async function getSuppliers() {
    try {
        const response = await fetch(apiUrl);
        allSuppliers.value = await response.json();
        filteredSuppliers.value = allSuppliers.value; //Lagra i båda arrayerna
    } catch (error) {
        console.error(error);
    }
}

//Sökfunktion enligt filter
function filterSuppliers() {
    if(props.search === "") {
        filteredSuppliers.value = allSuppliers.value; //He tillbaka till hela listan om söksträngen är tom
        return; 
    }

    //Filtrera produkter
    filteredSuppliers.value = allSuppliers.value.filter(supplier => {
        const searchValue = props.search.toLowerCase(); 
        const fieldValue = String(supplier[props.filter]).toLowerCase(); 
        return fieldValue.includes(searchValue);
    })
}

//Sortera vid klick
function sortSuppliers(sortBy) {
    //Använd sorteringsfunktion från utils/sort
    filteredSuppliers.value = sortArray(filteredSuppliers.value, sortBy, latestSort);
}

/* -------- Watch, onMounted --------- */

onMounted(() => {
    getSuppliers();
    filterSuppliers();
});

//Gör en watch för sök och filter
watch([() => props.search, () => props.filter], () => {
    filterSuppliers(); 
})

</script>

<style lang="scss" scoped>
@use "../../assets/scss/tables";
</style>