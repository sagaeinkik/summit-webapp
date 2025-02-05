<template>
    <div class="bg-light p-4 absolute rounded-3xl form-wrapper">
        <div class="headline relative">
        <h2 class="text-center">Radera konto</h2>
        <button class="absolute close" @click="handleClick">&#10540;</button>
        </div> 

        <p v-if="errors" class="m-4">{{ errors }}</p>
        <p v-if="successMsg" class="m-4">{{ successMsg }}</p>

        <div class="m-4" v-if="showText">
            <p>Är du helt säker på att du vill radera kontot?</p>
            <p>Detta går inte att ångra.</p>
            <p class="mt-20">Jättesäker?</p>
        <button class="bg-mediumdark hover:bg-medium text-light hover:text-white px-8 py-4 text-lg rounded-somewhat-mega-xl" @click="deleteUser">Radera</button>
        </div>

    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { getCookie } from "../../utils/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

/* ------------ Variabler ------------ */
const userToken = getCookie("jwt"); //Token
const userID = sessionStorage.getItem("userID"); //användarID
const apiUrl = "https://summitapi.up.railway.app/users/id=";
const router = useRouter(); //Router

const errors = ref(""); //Eventuella error
const successMsg = ref(""); //Succémeddelande
const showText = ref(true); 

/* ------ Props, emits, expose ------- */

const emit = defineEmits(["closeDelete"]);
const handleClick = () => {
    emit("closeDelete");
}


/* ------------ Funktioner ----------- */
async function deleteUser() {
    try {
        const response = await fetch(apiUrl + userID, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        }); 

        const data = await response.json(); 

        if(response.ok) {
            successMsg.value = "Användare borttagen! Du loggas ut inom kort.";
            //Dölj texten
            showText.value = false;

            setTimeout(() => {
                //rensa storage
                sessionStorage.clear(); 
                //Ta bort cookie
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
                //Omdirigera till login
                router.push("/login");
            }, 3500);

        } else {

            errors.value = "Något gick fel vid radering av användare: " + data.message; 

        }
    } catch (error) {
        console.error(error);
        errors.value = "Något gick fel vid radering av användare"; 
    }
}

/* -------- Watch, onMounted --------- */

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms";
</style>