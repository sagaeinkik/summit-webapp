<template>
    <h1 class="intro m-auto my-6 text-center">Kategorier</h1>
        <CategoryControls @search="searchFilter" @buttonClick="addCategory" :isActive="addCategoryActivated"/>
        <div class="wrap relative">
            <div class="overlay" v-if="addCategoryActivated">
                <AddCategory @closeAdd="closeAdd"/>
            </div>
            <div class="overlay" v-if="editCategoryActivated">
                <EditCategory @closeEdit="closeEdit" :editCategory="selectedCategory"/>
            </div>
            <CategoryTable ref="categoryTable" :search="searchString" @handleEdit="editCategory"/>
        </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref, onMounted, watch } from "vue";
import AddCategoryVue from "@/components/category/AddCategory.vue";
import CategoryControls from "../components/category/CategoryControls.vue";
import CategoryTable from "../components/category/CategoryTable.vue";
import AddCategory from "../components/category/AddCategory.vue";
import EditCategory from "../components/category/EditCategory.vue";

/* ------------ Variabler ------------ */

const searchString = ref(""); //Söksträng från searchbar
const addCategoryActivated = ref(false); //Om addCategory-formuläret ska visas
const editCategoryActivated = ref(false); //Om editCategory-formuläret ska visas
const selectedCategory = ref(null); //Vald kategori för redigering
const categoryTable = ref(null); //Referens till CategoryTable för att komma åt metoden getCategories

/* ------ Props, emits, expose ------- */

//Lagra söksträng från emit
const searchFilter = (searchValue) => {
    searchString.value = searchValue;
}

//Aktivera lägg till
const addCategory = () => {
    addCategoryActivated.value = !addCategoryActivated.value;
}

//Aktivera redigering
const editCategory = (category) => {
    editCategoryActivated.value = !editCategoryActivated.value;
    selectedCategory.value = category;
}


//Stäng formulär
const closeAdd = () => {
    addCategoryActivated.value = false;
}

const closeEdit = () => {
    editCategoryActivated.value = false;
}
/* ------------ Funktioner ----------- */


/* -------- Watch, onMounted --------- */

//Watcher för att uppdatera kategorier
watch([addCategoryActivated, editCategoryActivated], (newValues) => {
    //Nya värden för add och edit
    const [newAddValue, newEditValue] = newValues;

    //Om nya värdena är false (dvs formulären har stängts) och tabellen finns
    if ((!newAddValue || !newEditValue) && categoryTable.value) {
        
        categoryTable.value.getCategories();
    }
})

</script>


<style lang="scss" scoped>
@use "../assets/scss/forms";
</style>