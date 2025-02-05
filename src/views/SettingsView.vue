<template>
    <h1 class="intro m-auto my-6 text-center">Inställningar</h1>
    <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div class="overlay" v-if="editUserActivated">
            <EditUser @closeEdit="closeEdit"/>
        </div>
        <div class="overlay" v-if="deleteUserActivated">
            <p>Ta bort-varning osv</p>
        </div>
        <div class="overlay" v-if="addUserActivated">
            <p>Lägg till-formulär här</p>
        </div>
        <SettingsCard @buttonClick="handleEdit" icon="fa-regular fa-address-card" headline="Uppdatera konto&shy;uppgifter" paragraph="Ändra ditt användarnamn och/eller lösenord." buttonText="Ändra konto" />
        <SettingsCard @buttonClick="handleDelete" icon="fa-solid fa-user-slash" headline="Radera ditt konto" paragraph="Denna åtgärd är permanent. Observera att du endast kan radera det konto du är inloggad på." buttonText="Radera konto" />
        <SettingsCard @buttonClick="handleAdd" icon="fa-solid fa-user-plus" headline="Lägg till användare" paragraph="Du som medarbetare kan lägga till dina nya kollegor till lagerhanteringssystemet. Snabbt, smidigt och enkelt." buttonText="Lägg till" />
    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref } from "vue";
import SettingsCard from "../components/settings/SettingsCard.vue";
import EditUser from "../components/settings/EditUser.vue";

/* ------------ Variabler ------------ */

//Variabler för att hålla reda på overlay-rutor
const editUserActivated = ref(false);
const deleteUserActivated = ref(false);
const addUserActivated = ref(false);

/* ------ Props, emits, expose ------- */

//Redigera användare-relaterat
const handleEdit = () => {
    editUserActivated.value = !editUserActivated.value;
}

const closeEdit = () => {
    editUserActivated.value = false;
}

//Radera användare-relaterat
const handleDelete = () => {
    deleteUserActivated.value = !deleteUserActivated.value;
}

//Lägg till användare-relaterat
const handleAdd = () => {
    addUserActivated.value = !addUserActivated.value;
}

/* ------------ Funktioner ----------- */


/* -------- Watch, onMounted --------- */


</script>

<style lang="scss" scoped>
@use "../assets/scss/forms"; 

.overlay {
    height: calc(100vh - 280px);
}
</style>