<template>
    <div class="bg-light p-4 absolute rounded-3xl form-wrapper">
        <div class="headline relative">
        <h2 class="text-center">Ändra kontouppgifter</h2>
        <button class="absolute close" @click="handleClick">&#10540;</button>
    </div>

    <p v-if="errors" class="text-red-600 ml-3">{{ errors }}</p>
    <p v-if="successMsg" class="ml-3">{{ successMsg }}</p>
    <!-- Loader -->
    <p v-if="!showForm" class="ml-3">Stänger fönster...</p>

    <form @submit.prevent v-if="showForm"  class="overlay-form mt-4">

        <!-- Användarnamn -->
        <div class="form-input">
            <label for="username">Användarnamn*:</label>
            <input v-model="user.username" type="text" name="username" id="username">
        </div>

        <!-- Lösenord -->
        <div class="form-input">
            <label for="password">Lösenord*:</label>
            <input v-model="user.password" type="password" name="password" id="password">
        </div>


    <!-- Knappar -->
        <div class="form-controls">
            <input @click="handleSubmit" type="submit" value="Uppdatera">
        </div>


    </form>
    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { onMounted, ref, watch } from 'vue';
import { getCookie, cookieCreator } from "../../utils/auth";
import { useUserStore } from "../../stores/userStore";

/* ------------ Variabler ------------ */

let apiUrl = "https://summitapi.up.railway.app";
let userToken = getCookie("jwt"); //Token
const userID = sessionStorage.getItem("userID"); //AnvändarID (Används i anrop)
const userStore = useUserStore();

const errors = ref(""); //Eventuella error
const successMsg = ref(""); //Succémeddelande
const showForm = ref(true); //Visa formulär

const user = ref({
    username: userStore.usernameRef.value,
    password: ""
});



/* ------ Props, emits, expose ------- */

const emit = defineEmits(["closeEdit"]);
const handleClick = () => {
    emit("closeEdit");
}

const handleSubmit = () => {
    //Töm meddelanden
    errors.value = "";
    successMsg.value = "";

    //Kolla om användarnamn och lösenord är tomt
    if(user.value.username.trim() === "" || user.value.password.trim() === "" ) {
        errors.value = "Du måste fylla i användarnamn och lösenord!";
        return;
    }

    //Anropa funktion som gör fetch
    updateUser();
}

/* ------------ Funktioner ----------- */

//Byt ut saker i storage och cookie
function updateStorage(data) {

    //Uppdatera tokenvariabel
    userToken = data.token; 


    //Ta bort gammal cookie
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //Sätt ny cookie med ny token
    cookieCreator(data);

    //Uppdatera användarnamnet i store
    userStore.updateUsername(data.updatedUser.username);
}


async function updateUser() {
    console.log("Token being sent:", userToken);
    console.log("User data being sent:", user.value);
    console.log("Current username in store:", userStore.username);

    try {
        const response = await fetch(`${apiUrl}/users/id=${userID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(user.value)
        });

        const data = await response.json(); 

        //OK svar
        if(response.ok) {
            //Succémeddelande
            successMsg.value = data.message;

            //Uppdatera användarnamn osv
            updateStorage(data);

            //Dölj formulär, stäng efter 3.5sek
            showForm.value = false;
            setTimeout(() => {
                emit("closeEdit");
            }, 2000);

        //Felhantering
        } else if (data.statusCode && data.statusCode === 400) {

                errors.value = "Något gick fel vid uppdatering: " + data.message;

        } else if(data.https_response && data.https_response.code === 403 || data.statusCode && data.statusCode === 500) {
            console.error(data.message);
            errors.value = "Användarnamnet är upptaget."; 
        } else {

            errors.value = "Något gick fel vid uppdatering: " + data.message;
        }
    } catch (error) {
        console.log(error);
        errors.value = "Något gick fel vid uppdatering av användare."; 
    }
}


/* -------- Watch, onMounted --------- */
onMounted(() => {
    console.log("Username from store:", userStore.username);
    console.log("Username from sessionStorage:", sessionStorage.getItem('username'));
    user.value.username = sessionStorage.getItem('username') || userStore.username;
})

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms";
</style>