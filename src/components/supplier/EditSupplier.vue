<template>
        <div class="bg-light p-4 absolute rounded-3xl form-wrapper">
        <div class="headline relative">
            <h2 class="text-center">Ändra leverantör {{ props.editSupplier.company_name }} </h2>
            <button class="absolute close" @click="handleClick">&#10540;</button>
        </div>

        <p v-if="errors" class="text-red-600 ml-3">{{ errors }}</p>
        <p v-if="successMsg" class="ml-3">{{ successMsg }}</p>

        <p v-if="!showForm" class="ml-3">Stänger fönster...</p>
        <form v-if="showForm" @submit.prevent class="overlay-form mt-4">

            <!-- Namn-->
            <div class="form-input">
                <label for="companyName">Företagsnamn*:</label>
                <input v-model="formData.company_name" type="text" name="companyName" id="companyName">
            </div>

            <!-- Grupp -->
            <div class="input-group">
                <!-- Gatuadress -->
                <div class="form-input">
                    <label for="streetAddress">Gatuadress:</label>
                    <input v-model="formData.street_address" type="text" name="streetAddress" id="streetAddress">
                </div>
                <!-- Ort -->
                <div class="form-input">
                    <label for="area">Ort:</label>
                    <input v-model="formData.area" type="text" name="area" id="area">
                </div>
            </div>

            <!-- Grupp -->
            <div class="input-group">
                <!-- Telefon -->
                <div class="form-input">
                    <label for="telephone">Telefon*:</label>
                    <input v-model="formData.telephone" type="text" name="telephone" id="telephone">
                </div>
                <!-- Epost -->
                <div class="form-input">
                    <label for="email">Email*:</label>
                    <input v-model="formData.email" type="email" name="email" id="email">
                </div>
            </div>

            <!-- Knappar -->
            <div class="form-controls">
            <input @click="handleSubmit" type="submit" value="Uppdatera">
            <button @click="() => handleDelete(editSupplier)" class="deleteBtn">Radera leverantör</button>
        </div>
        <p class="text-right">Obs: Endast produktlösa leverantörer kan raderas.</p>
        </form>
    </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref, onMounted } from "vue"; 
import { getCookie } from "../../utils/auth";

/* ------------ Variabler ------------ */
const userToken = getCookie("jwt");
let apiUrl = "https://summitapi.up.railway.app/suppliers/id="; 

const showForm = ref(true); //Visa formulär
const errors = ref(""); 
const successMsg = ref("");

//Formulär
const formData = ref({
    company_name: "",
    street_address: "",
    area: "",
    telephone: "",
    email: ""
})

/* ------ Props, emits, expose ------- */
const props = defineProps({
    editSupplier: {
        type: Object, 
        required: true
    }
})

const emit = defineEmits(["closeEdit"]);
const handleClick = () => {
    emit("closeEdit");
}

const handleSubmit = () => {
    //Töm errors 
    errors.value = ""; 

    //Byt från snake_case till camelCase
    const updatedSupplier = {
        companyName: formData.value.company_name,
        streetAddress: formData.value.street_address,
        area: formData.value.area,
        telephone: formData.value.telephone,
        email: formData.value.email
    }

    //Put-anrop
    updateSupplier(updatedSupplier); 
}

const handleDelete = (supplier) => {
    errors.value = ""; 
    deleteSupplier(supplier);
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

/* Uppdatera */
async function updateSupplier(supplier) {
    //Validering
    if(!validateInput(supplier)) return;

    try {
        const response = await fetch(apiUrl + props.editSupplier.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }, 
            body: JSON.stringify(supplier)
        });

        const data = await response.json();

        //Kolla om ok
        if(response.ok) {
            successMsg.value = supplier.companyName + " har uppdaterats!"; 

            //dölj formulärfält
            showForm.value = false;
            
            //Stäng automatiskt rutan 
             setTimeout(() => {
                emit("closeEdit");
            }, 3500);

        } else if(response.status === 400) {
            errors.value = "Fyll i alla obligatoriska fält (markerade med *) med korrekta uppgifter!"
        } else {
            errors.value = data.message; 
                
        }
    } catch (error) {
        console.error(error);
        errors.value = "Något gick fel vid uppdatering av leverantör."
    }
}

/* Radera */
async function deleteSupplier(supplier) {
    try {
        const response = await fetch(apiUrl + supplier.id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        });

        const data = await response.json();

        if(response.ok) {
            successMsg.value = supplier.company_name + " har tagits bort!";
            showForm.value = false; //Dölj formulärfält

            //Stäng automatiskt rutan
            setTimeout(() => {
                emit("closeEdit");
            }, 3500);

        } else if (data.statusCode === 500) {
            errors.value = "Leverantören har registrerade produkter! Endast leverantörer utan produkter kan raderas."; 
        } else {
            errors.value = "Någonting gick fel vid radering av leverantör: " + data.message;
        }
    } catch (error) {
        console.error(error);
        errors.value = "Något gick fel vid radering av leverantör."
    }
}

/* -------- Watch, onMounted --------- */
onMounted(() => {
    //Fyll i formuläret med props-data
    formData.value = {
        company_name: props.editSupplier.company_name,
        street_address: props.editSupplier.street_address,
        area: props.editSupplier.area,
        telephone: props.editSupplier.telephone,
        email: props.editSupplier.email
    }
})

</script>

<style lang="scss" scoped>
@use "../../assets/scss/forms";
</style>