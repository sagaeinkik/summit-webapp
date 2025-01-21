<template>
    <div class="dashcard bg-white rounded-somewhat-mega-xl">
        <div class="flex-wrap">
        <h2 class="text-center">{{ count }}</h2>
        <p class="text-lg text-center">{{ title }}</p>
        <p class="my-4">{{ description }}</p>
        <RouterLink :to="linkPath" class="bg-mediumdark text-light m-auto rounded-mega-xl">{{ linkText }}</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
//Ta emot props
defineProps({
    count: {
        type: Number, 
        required: true
    }, 
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    linkPath: {
        type: String, 
        required: true
    }, 
    linkText: {
        type: String,
        required: true
    }
});
</script>

<style scoped lang="scss">
@use "../assets/scss/vars" as v;
h2 {
    font-size: 6em;
    font-family: v.$logs;
    margin-bottom: -0.3em;
}

.flex-wrap {
    display: flex; 
    flex-direction: column; 
    justify-content: space-between;
    height: 100%; 
}

.dashcard {
    padding: 0 2em 2em 2em;
}

a {
    padding: 1em 2em;

    &:hover {
        background-color: v.$medium; 
    }
}

@media (max-width: 1220px) {
    .dashcard {
        padding: 0 1em 2em 1em;
    }
    h2 {
        font-size: 4em;
    }

    a {
        padding: 0.8em 1.4em;
        font-size: 0.9em;
    }
}

@media (max-width: 612px) {
    a {
        font-size: 1em; 
        padding: 1em 2em;
    }
}
</style>