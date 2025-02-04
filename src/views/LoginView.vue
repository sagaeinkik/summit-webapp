<template>
    <h1 class="text-center pb-4">Logga in</h1>
    <form @submit.prevent="onSubmit" class="authform">
        <span class="error text-red-400">{{ errorMessage }}</span>
        <!-- Användarnamn -->
        <div class="auth-input">
            <label for="username" class="block mt-8">Användarnamn:</label>
            <input type="text" name="username" id="username" v-model="username" class="w-full p-2 mt-4 bg-mediumdark">
        </div>

        <!-- Lösenord -->
        <div class="auth-input">
            <label for="password" class="block mt-8">Lösenord:</label>
            <input type="password" name="password" id="password" v-model="password" class="w-full p-2 mt-4 bg-mediumdark">
        </div>

        <input type="submit" :value="loginInProgress ? 'Loggar in...' : 'Logga in'">
    </form>
    <p class="loginfo text-xs pt-4">Har du inget konto? <RouterLink to="/register">Registrera dig</RouterLink> på nolltid.</p>
</template>

<script setup>
/* ------------ Importer ------------- */
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { cookieCreator } from '../utils/auth';

/* ------------ Variabler ------------ */
//Router
const router = useRouter();

//lagra inloggningsuppgifter
const username = ref(""); 
const password = ref(""); 

const loginInProgress = ref(false); 
const errorMessage = ref(""); // Lagra felmeddelanden


/* ------ Props, emits, expose ------- */


/* ------------ Funktioner ----------- */

//Validera input
const validateInput = () => {
    if (username.value === "" || password.value === "") {
        document.querySelector('.error').textContent = "Fyll i alla fält";
        return false;
    }
    return true;
}

//gör post-anrop till API för inloggning
async function onSubmit() {
    loginInProgress.value = true; 

    //Validera
    if(!validateInput()) {
        loginInProgress.value = false; 
        return; 
    }

    //Annars, anropa fetch-funktion
    await login();
}

async function login() {
    try {
        const response = await fetch('https://summitapi.up.railway.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });

        const data = await response.json(); 

        //Om felmeddelande
        if (response.status === 404 || response.status === 401) {
            errorMessage.value = data.message;
            loginInProgress.value = false; 
            return; 
        }

        // Dubbelkolla så det är ett bra meddelande
        if (data.message === "Inloggning lyckades") {
            // Skapa cookie
            cookieCreator(data);
            // Lagra användarnamn
            sessionStorage.setItem("username", data.loggedInUser.username);  
            // Skicka användaren till startsidan
            router.push("/")
        }

    } catch (error) {
        console.error("Error logging in:", error);
        errorMessage.value = "Ett fel uppstod vid inloggning. Försök igen senare.";
    } finally {
        loginInProgress.value = false;
    }

}

/* -------- Watch, onMounted --------- */

</script>

<style lang="scss" scoped>
@use "../assets/scss/forms" as f; 
</style>