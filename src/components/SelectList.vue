<template>
    <div class="search-select">
        <label :for="name" class="mr-2">Sök enligt:</label>
        <select :name="name" :id="name" @change="handleChange" class="py-2 px-3 rounded-3xl">
            <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>

<script setup>
//Props
defineProps({
    name: {
        type: String,
        required: true
    },
    options: {
        type: Array, 
        required: true
    }
})

//Gör ny emit med hjälp av handleChange från select-listan
const emit = defineEmits(['filterChange']);
const handleChange = (event) => {
    emit('filterChange', event.target.value);
}

</script>

<style lang="scss" scoped>
@use "../assets/scss/vars" as v;

select:focus {
    outline: 2px solid v.$medium;
}

</style>
