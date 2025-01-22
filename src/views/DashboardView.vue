<template>
    <div class="intro m-auto my-6 text-center">
        <h1>Välkommen till Summit</h1>
        <p class="text-lg">Lagerhanteringssystemet för Nordic Peak</p>
    </div>
    <div class="info-wrapper m-auto">
        <DashInfoComponent />
        <LogComponent />
    </div>
</template>

<script setup>
import LogComponent from "../components/LogComponent.vue";
import DashInfoComponent from "../components/DashInfo.vue";
</script>


<style lang="scss" scoped>

.intro {
    width: fit-content;
}

.info-wrapper {
    width: 80%;
}

@media (max-width: 1600px) {
    .info-wrapper {
        width: 100%;
    }
}

@media (max-width: 612px) {
    .info-wrapper {
        width: 90%;
    }
}

@media (max-width: 349px) {
    .info-wrapper {
        width: 100%;
    }
}
</style>