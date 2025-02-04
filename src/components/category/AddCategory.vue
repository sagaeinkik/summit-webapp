<template>
<div class="bg-light p-4 absolute rounded-3xl form-wrapper">
        <div class="headline relative">
            <h2 class="text-center">Registrera ny kategori</h2>
            <button class="absolute close" @click="handleClick">&#10540;</button>
        </div>
    <p v-if="errors" class="text-red-600 font-medium ml-3">{{ errors }}</p>
    <p v-if="successMsg">{{ successMsg }}</p>
    <form @submit.prevent class="overlay-form mt-4">

        <!-- Namn-->
        <div class="form-input">
            <label for="categoryName">Kategorinamn*:</label>
            <input v-model="categoryToAdd.categoryName" type="text" name="categoryName" id="categoryName">
        </div>

        <!-- Knappar -->
        <div class="form-controls">
            <input type="submit" value="Lägg till" @click="addCategory">
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

const userToken = getCookie("jwt");

//Reaktiva variabler
const errors = ref("");
const successMsg = ref("");
const categoryToAdd = ref({
    categoryName: ""
});

/* ------ Props, emits, expose ------- */

//Stäng formulär
const emit = defineEmits(["closeAdd"]);
const handleClick = () => {
    emit("closeAdd");
}

/* ------------ Funktioner ----------- */

//Lägg till kategori
const addCategory = async () => {
    if(categoryToAdd.value.categoryName.trim() === "" ) {
        errors.value = "Du måste fylla i kategorinamn!";
        return;
    }

    //Nollställ felmeddelanden
    errors.value = ""; 
    try {
        const response = await fetch("https://summitapi.up.railway.app/categories", {
            method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(categoryToAdd.value)
        });

        const data = await response.json(); 

        //Succé om status är ok
        if(response.ok) {
            successMsg.value = data.message;
            //Töm formulärfält
            categoryToAdd.value = {
                categoryName: ""
            }
        } else if (data.statusCode === 400) {
            //Bad request
            errors.value = "Du har inte fyllt i fälten korrekt!";
        } else {
            //Annat error
            errors.value = data.message;
        }
    } catch (error) {
        console.error(error);
        errors.value = "Något gick fel, kunde inte lägga till kategori";
    }
}

/* -------- Watch, onMounted --------- */

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms" as f; 
</style>