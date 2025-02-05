<template>
    <h1 class="text-center pb-4">Registrera dig</h1>
        <form @submit.prevent="onSubmit" class="authform">
        <span class="error text-red-400">{{ errorMessage }}</span>
        <!-- Användarnamn -->
        <div class="auth-input">
            <label for="username" class="block mt-8">Användarnamn:</label>
            <input type="text" name="username" id="username" v-model="username"  class="w-full p-2 mt-4 bg-mediumdark">
        </div>

        <!-- Lösenord -->
        <div class="auth-input">
            <label for="password" class="block mt-8">Lösenord:</label>
            <input type="password" name="password" id="password" v-model="password"  class="w-full p-2 mt-4 bg-mediumdark">
        </div>

        <input type="submit" :value="registerInProgress ? 'Registrerar...' : 'Registrera'">
    </form>
    <p class="text-xs pt-4">Har du redan ett konto? <RouterLink to="/login">Logga in</RouterLink> istället.</p>
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

const registerInProgress = ref(false); 
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

//Kontrollera 
async function onSubmit() {
    registerInProgress.value = true; 
    //Validera
    if(!validateInput()) {
        registerInProgress.value = false; 
        return; 
    }
    console.log('Form submitted');

    await signup(); 
}

//Registrera
async function signup() {
    try {
        const response = await fetch('https://summitapi.up.railway.app/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            //Logga in användare direkt: 

            //Skapa cookie
            cookieCreator(data);
            // Lagra användarnamn och ID
            sessionStorage.setItem("username", data.newUser.username); 
            sessionStorage.setItem("userID", data.newUser.id);
             
            //Omdirigera till dashboard
            router.push('/');
        } else {
            // Visa felmeddelande
            console.log(data);
            errorMessage.value = data.message;
        }
    } catch (error) {
        console.error('Något gick fel vid registrering:', error);
    } finally {
        registerInProgress.value = false;
    }
}

/* -------- Watch, onMounted --------- */

</script>

<style lang="scss" scoped>
@use "../assets/scss/forms" as f; 
</style>