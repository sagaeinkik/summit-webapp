<template>
  <h2 class="text-center mt-12">Senaste händelser</h2>
  <div v-if="latestLogs.length > 0" class="grid-wrap grid grid-cols-3">

    <!-- Loopa igenom loggarna -->
    <div v-for="log in latestLogs" :key="log.id" class="mt-4 gridcard">

        <!-- Produkt/Leverantör/Kategori tillagd/ändrad/borttagen -->
      <p class="text-center">{{ getTableLabel(log.table_name) }} {{ getActionLabel(log.action) }}</p>
      <div class="card bg-white p-6 rounded-somewhat-mega-xl h-full">

        <!-- Loopa igenom alla fält -->
        <template v-for="field in getOrderedFields(log.table_name)" :key="field.key">

            <!-- Skriv ut till skärm om ej null  -->
          <p v-if="log.affected_data[field.key] !== null">
            <span class="font-medium">{{ field.label }}:</span> {{ formatValue(field.key, log.affected_data[field.key]) }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
/* ------------ Importer ------------- */
import { ref, onMounted} from 'vue';

/* ------------ Variabler ------------ */
const latestLogs = ref([]);
const apiUrl = "https://summitapi.up.railway.app";

/* ÖVERSÄTTNINGAR */
//Tabellnamn
const tableLabels = {
    products: "Produkt", 
    suppliers: "Leverantör",
    categories: "Kategori",
}

//Handlingar
const actionLabels = {
    insert: "tillagd",
    update: "ändrad",
    delete: "borttagen",
}

//Fältdefinitioner
const fieldDefinitions = {
    products: [
        { key: "product_id", label: "Produkt-ID" },
        { key: "product_name", label: "Produktnamn" },
        { key: "size", label: "Storlek" }, 
        { key: "extra", label: "Extra"},
        { key: "amount", label: "Antal"}, 
        { key: "in_price", label: "Inpris"}, 
        { key: "out_price", label: "Utpris"}, 
        { key: "category_id", label: "Kategori-ID"}, 
        { key: "supplier_id", label: "Leverantör-ID"},
    ], 
    suppliers: [
        { key: "id", label: "Leverantör-ID" },
        { key: "company_name", label: "Företagsnamn" },
        { key: "street_address", label: "Gatuadress"}, 
        { key: "area", label: "Ort"}, 
        { key: "phone", label: "Telefonnummer"}, 
        { key: "email", label: "E-postadress"},
    ],
    categories: [
        { key: "id", label: "Kategori-ID" },
        { key: "category_name", label: "Kategorinamn" },
    ]
}

/* ------ Props, emits, expose ------- */


/* ------------ Funktioner ----------- */

//Hämta labels
const getTableLabel = (table) => tableLabels[table] || table;
const getActionLabel = (action) => actionLabels[action] || action;

//Ordna fält baserat på mina definitioner
const getOrderedFields = (tableName) => {
    return fieldDefinitions[tableName] || [];
}

//Formatera värden
const formatValue = (key, value) => {
    if (key === 'in_price' || key === 'out_price') {
        return `${value} kr`;
    } 
    if (key === 'amount') {
        return `${value} st`;
    }
    return value; 
}

//Hämtar loggar
async function fetchLogs() {
    try {
        const response = await fetch(apiUrl + "/logs"); 
        const data = await response.json();
        latestLogs.value = data;

        //Kapa till 3 senaste loggarna
        latestLogs.value = latestLogs.value.slice(0, 3);
    } catch (error) {
        console.error(error);
    }
}
/* -------- Watch, onMounted --------- */

onMounted(() => {
    fetchLogs();
});

</script>

<style lang="scss" scoped>
@use "../../assets/scss/vars" as v; 


.grid-wrap {
    gap: 2em;
}

@media (max-width: 890px) {
    .grid-wrap {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 612px) {
    .grid-wrap {
        display: flex; 
        flex-direction: column;
        
    }

    .gridcard {
        margin-top: 0;
    }
}
</style>
