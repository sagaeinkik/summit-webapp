<template>
<div class="table-wrapper mt-10 block pb-4">
    <p class="mb-4">Antal kategorier: {{ filteredCategories.length }} </p>
    <table class="w-full">
        <thead class="bg-medium text-light">
            <tr class="cursor-default">
                <th class="rounded-tl-2xl" @click="sortCategories('id')">ID</th>
                <th @click="sortCategories('category_name')">Kategorinamn</th>
                <th class="rounded-tr-2xl"></th>
            </tr>
        </thead>

        <tbody v-if="filteredCategories.length > 0">
            <!-- Loopa igenom alla produkter: lägg på en dubbelklick på varje rad -->
            <tr class="cursor-pointer" v-for="category in filteredCategories" :key="category.id" @dblclick="() => handleClick(category)">
                <td :title="category.id">{{ category.id }}</td>
                <td :title="category.category_name">{{ category.category_name }}</td>
                <!-- Redigera-ikon: skicka med kategori med emit -->
                <td class="edit" @click="() => handleClick(category)"><i class="fa-solid fa-gear"></i></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref, onMounted, watch, defineExpose } from "vue"; 
import { sortArray } from "../../utils/sort";


/* ------------ Variabler ------------ */
let apiUrl = "https://summitapi.up.railway.app/categories"; //Api

//Arrayer
const allCategories = ref([]);
let filteredCategories = ref([]);

//Variabel för att hålla koll på sortering
let latestSort = ref(null); 

/* ------ Props, emits, expose ------- */

//Ta emot props
const props = defineProps({
    search: {
        type: String,
        required: false,
        default: ""
    }
});

//Klick på redigeraikon
const emit = defineEmits(["handleEdit"]);
const handleClick = (category) => {
    emit("handleEdit", category);
}

//Expose:a fetchmetoden
defineExpose({
    getCategories
});

/* ------------ Funktioner ----------- */

//Hämta kategorier
async function getCategories() {
    try {
        const response = await fetch(apiUrl);
    
        //Lagra data i både alLCategories och filteredCategories
        allCategories.value = await response.json();
        filteredCategories.value = allCategories.value;
    } catch (error) {
        console.error(error);
    }
}
    
//Sorteringar!
function sortCategories(sortBy) {
    //Använd sorteringsfunktion från utils/sort
    filteredCategories.value = sortArray(filteredCategories.value, sortBy, latestSort);
}
    
    //Sökning
function filterCategories() {
    if(props.search === "") {
        filteredCategories.value = allCategories.value; //He tillbaka till hela listan om söksträngen är tom
        return; 
    }
    
    //Filtrera 
    filteredCategories.value = allCategories.value.filter(category => {
        const searchValue = props.search.toLowerCase(); 
        const fieldValue = String(category.category_name).toLowerCase(); 
        return fieldValue.includes(searchValue);
    })
}

/* -------- Watch, onMounted --------- */
onMounted(() => {
    getCategories();
});


//Watcher för sökning
watch(() => props.search, () => {
    filterCategories();
});
</script>

<style lang="scss" scoped>
@use "../../assets/scss/tables" as t;
</style>