<template>
<div class="bg-light p-4 absolute rounded-3xl form-wrapper">
    <div class="headline relative">
        <h2 class="text-center">Ändra kategori {{ props.editCategory.category_name }}</h2>
        <button class="absolute close" @click="handleClick">&#10540;</button>
    </div>

    <p v-if="errors" class="text-red-600 ml-3">{{ errors }}</p>
    <p v-if="successMsg" class="ml-3">{{ successMsg }}</p>

    <!-- Loader -->
    <p v-if="!showForm" class="ml-3">Stänger fönster...</p>
    <form v-if="showForm" @submit.prevent class="overlay-form mt-4">

        <!-- Namn-->
        <div class="form-input">
            <label for="categoryName">Kategorinamn*:</label>
            <input v-model="formData.category_name" type="text" name="categoryName" id="categoryName">
        </div>

        <!-- Knappar -->
        <div class="form-controls">
            <input @click="handleSubmit" type="submit" value="Uppdatera">
            <button @click="() => handleDelete(editCategory)" class="deleteBtn">Radera kategori</button>
        </div>
        <p class="text-right">Obs: Endast tomma kategorier kan raderas.</p>
    </form>
</div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { onMounted, ref } from 'vue';
import { getCookie } from "../../utils/auth";

/* ------------ Variabler ------------ */
const errors = ref(""); //Eventuella error
const successMsg = ref(""); //Succémeddelande
const formData = ref({
    category_name: ""
});
const showForm = ref(true); //Visa formulär

const userToken = getCookie("jwt"); //Token
let apiUrl = "https://summitapi.up.railway.app"; 

/* ------ Props, emits, expose ------- */
const props = defineProps({
    editCategory: {
        type: Object, 
        required: true
    }
})

//Emits
const emit = defineEmits(["closeEdit"]);
const handleClick = () => {
    emit("closeEdit");
}

//Vid submit
const handleSubmit = () => {
    //Kolla om kategorinamn är tomt
    if(formData.value.category_name.trim() === "" ) {
        errors.value = "Du måste fylla i kategorinamn!";
        return;
    }

    //Byt till camelCase 
    const editedCategory = {
        id: props.editCategory.id,
        categoryName: formData.value.category_name
    }

    //Nollställ felmeddelanden
    errors.value = "";

    //Anropa fetchfunktion
    updateCategory(editedCategory);
}

/* ------------ Funktioner ----------- */

//Fetchanrop PUT
async function updateCategory(category) {
    try {
        const response = await fetch(`${apiUrl}/categories/id=${category.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(category)
        });

        const data = await response.json();

        if(!response.ok) {
            errors.value = "Något gick fel: " + data.message;
        } else {
            //Succé!
            successMsg.value = category.categoryName + " har uppdaterats!";
            showForm.value = !showForm.value;

            //Stäng rutan
            setTimeout(() => {
                emit("closeEdit");
            }, 3500);
        }
    } catch (error) {
        console.error(error);
        errors.value = "Något gick fel vid uppdatering av kategori!";
    }
}


//Fetchanrop DELETE
async function handleDelete(category) {
    errors.value = ""; //Nollställ felmeddelanden


    try {
        const response = await fetch(`${apiUrl}/categories/id=${category.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        });

        const data = await response.json();

        //500-meddelande: borde vara foreign key constraints 
        if(data.statusCode === 500) {
            errors.value = "Kategorin innehåller produkter och kan inte raderas!";
        } else if (response.ok) {
            //Succé!
            successMsg.value = category.category_name + " har raderats!";
            showForm.value = !showForm.value;

            //Stäng rutan
            setTimeout(() => {
                emit("closeEdit");
            }, 3500);
        } else {    
             errors.value = "Något gick fel: " + data.message;
        }
    } catch (error) {
        console.error(error);
        errors.value = "Något gick fel vid radering av kategori!";
    }
}

/* -------- Watch, onMounted --------- */

onMounted(() => {
    //Fyll i formuläret med kategorinamn
    formData.value.category_name = props.editCategory.category_name;
})

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms";
</style>