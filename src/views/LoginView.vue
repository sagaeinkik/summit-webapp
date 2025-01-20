<template>
    <h1 class="text-center pb-4">Logga in</h1>
    <form @submit.prevent="onSubmit">
        <span class="error text-red-400">{{ errorMessage }}</span>
        <!-- Användarnamn -->
        <div class="form-group">
            <label for="username">Användarnamn:</label>
            <input type="text" name="username" id="username" v-model="username">
        </div>

        <!-- Lösenord -->
        <div class="form-group">
            <label for="password">Lösenord:</label>
            <input type="password" name="password" id="password" v-model="password">
        </div>

        <input type="submit" :value="loginInProgress ? 'Loggar in...' : 'Logga in'">
    </form>
    <p class="loginfo text-xs pt-4">Har du inget konto? <RouterLink to="/register">Registrera dig</RouterLink> på nolltid.</p>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';

//Router
const router = useRouter();

//lagra inloggningsuppgifter
const username = ref(""); 
const password = ref(""); 

const loginInProgress = ref(false); 
const errorMessage = ref(""); // Lagra felmeddelanden

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
        if (response.status === 404) {
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
            loginInProgress.value = false;
            router.push("/")
        }

    } catch (error) {
        console.error("Error logging in:", error);
        errorMessage.value = "Ett fel uppstod vid inloggning. Försök igen senare.";
        loginInProgress.value = false;
    }

}

async function cookieCreator(data) {
    document.cookie = `jwt=${data.token}; max-age=10800; path=/;`; //3h, samma som JWT-token
}

</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;

//Sätter regler på upprepande taggar här
label {
    display: block;
    margin-top: 2em;
}

input:not(input[type="submit"]) {
    width: 100%;
    padding: 0.5em;
    margin-top: 0.5em;
    background-color: v.$mediumdark;

    //Gradient
    border: 5px solid;
    border-image-slice: 1;
    border-width: 2px;
    border-left: 0; 
    border-top: 0; 
    border-right: 0; 
    border-image-source: linear-gradient(to right, v.$mediumlight, v.$mediumdark);

}


//Submit-knapp
input[type="submit"] {
    background-color: v.$dark;
    color: v.$light;
    margin-top: 2em;
    border-radius: 3em;
    padding: 0.5em 2em;

    &:hover {
        background-color: v.$mediumlight;
        color: v.$dark;
    }
}

input:focus {
    outline: 1px solid v.$mediumlight; 
}

</style>

