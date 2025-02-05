'use strict';
import { ref, computed } from 'vue';

//Hitta användarnamnet
const username = ref(sessionStorage.getItem('username'));

export const useUserStore = () => {
    // Skapa en computed property som kommer reagera på ändringar
    const currentUsername = computed(() => username.value);

    //Uppdatera användarnamnet
    const updateUsername = (newUsername) => {
        username.value = newUsername;
        sessionStorage.setItem('username', newUsername);
    };

    //Returnera användarnamn och funktion för att uppdatera det
    return {
        username: currentUsername,
        updateUsername,
    };
};
