<template>
    <div class="bg-light p-4 absolute rounded-3xl form-wrapper">
        <div class="headline relative">
            <h2 class="text-center">Registrera ny leverantör</h2>
            <button class="absolute close" @click="handleClick">&#10540;</button>
        </div>

        <p v-if="errors" class="text-red-600 ml-3">{{ errors }}</p>
        <p v-if="successMsg" class="ml-3">{{ successMsg }}</p>

        <form @submit.prevent class="overlay-form mt-4">

            <!-- Namn-->
            <div class="form-input">
                <label for="companyName">Företagsnamn*:</label>
                <input v-model="supplierToAdd.companyName" type="text" name="companyName" id="companyName">
            </div>

            <!-- Grupp -->
            <div class="input-group">
                <!-- Gatuadress -->
                <div class="form-input">
                    <label for="streetAddress">Gatuadress:</label>
                    <input v-model="supplierToAdd.streetAddress" type="text" name="streetAddress" id="streetAddress">
                </div>
                <!-- Ort -->
                <div class="form-input">
                    <label for="area">Ort:</label>
                    <input v-model="supplierToAdd.area" type="text" name="area" id="area">
                </div>
            </div>

            <!-- Grupp -->
            <div class="input-group">
                <!-- Telefon -->
                <div class="form-input">
                    <label for="telephone">Telefon*:</label>
                    <input v-model="supplierToAdd.telephone" type="text" name="telephone" id="telephone">
                </div>
                <!-- Epost -->
                <div class="form-input">
                    <label for="email">Email*:</label>
                    <input v-model="supplierToAdd.email" type="email" name="email" id="email">
                </div>
            </div>

            <!-- Knappar -->
            <div class="form-controls">
                <input type="submit" value="Lägg till" @click="handleAddSupplier">
                <input type="reset" value="Nollställ">
            </div>
        </form>
    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref } from "vue"; 
import { getCookie } from "../../utils/auth";

/* ------------ Variabler ------------ */
const userToken = getCookie("jwt");
let apiUrl = "https://summitapi.up.railway.app/suppliers";

//Reaktiva variabler
const errors = ref("");
const successMsg = ref("");

//Leverantör att lägga till
const supplierToAdd = ref({
    companyName: "",
    streetAddress: "",
    area: "",
    telephone: "",
    email: ""
});

/* ------ Props, emits, expose ------- */

const emit = defineEmits(["closeAdd"])
const handleClick = () => {
    emit("closeAdd");
}

const handleAddSupplier = () => {
    //Töm error
    errors.value = "";
    //Töm succé
    successMsg.value = "";
    addSupplier(supplierToAdd); 

}
/* ------------ Funktioner ----------- */

//Validera input
function validateInput(supplier) {
    if(supplier.companyName.trim() === "" || supplier.telephone.trim() === "" || supplier.email.trim() === "") {
        errors.value = "Du måste fylla i alla obligatoriska fält (markerade med *)!";
        return false;
    }

    return true; 
}

//Lägg till
async function addSupplier(supplier) {

    //Validera
    if(!validateInput(supplier.value)) {
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }, 
            body: JSON.stringify(supplier.value)
        });

        const data = await response.json();

        //Kolla om ok
        if(response.ok) {
            successMsg.value = data.message; 

            //Töm formulärfält
            supplierToAdd.value = {
                companyName: "",
                streetAddress: "",
                area: "",
                telephone: "",
                email: ""
            }
        } else if (data.statusCode === 400) {
            errors.value = "Fyll i alla obligatoriska fält med korrekta uppgifter!";
            return;
        } else if (data.https_response.code === 409) {
            //Eget felmeddelande från API:et
            errors.value = "Leverantör finns redan registrerad!"
            return;
        } else {
            errors.value = "Någonting gick fel vid tillägg av leverantör: " + data.message;
            return;
        }

    } catch (error) {
        errors.value = "Någonting gick fel vid tillägg av leverantör";
        console.error(error);
    }
}

/* -------- Watch, onMounted --------- */

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms" as f; 
</style>