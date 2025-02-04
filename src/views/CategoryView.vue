<template>
    <h1 class="intro m-auto my-6 text-center">Kategorier</h1>
        <CategoryControls @search="searchFilter" @buttonClick="addCategory" :isActive="addCategoryActivated"/>
        <div class="wrap relative">
            <div class="overlay" v-if="addCategoryActivated">
                <p>Formulär här</p>
            </div>
            <div class="overlay" v-if="editCategoryActivated">
                <p>Redigera formulär</p>
            </div>
            <CategoryTable :search="searchString" @handleEdit="editCategory"/>
        </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CategoryControls from "../components/category/CategoryControls.vue";
import CategoryTable from "../components/category/CategoryTable.vue";

//Variabler
const searchString = ref(""); //Söksträng från searchbar
const addCategoryActivated = ref(false); //Om addCategory-formuläret ska visas
const editCategoryActivated = ref(false); //Om editCategory-formuläret ska visas
const selectedCategory = ref(null); //Vald kategori för redigering


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

</script>


<style lang="scss" scoped>
@use "../assets/scss/forms";
</style>