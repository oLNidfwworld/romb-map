<script setup lang="ts">
import type { LocationElement } from '@/helpers/types/enitities/locationElement';
defineProps<{
    element: LocationElement
}>();
</script>
<template>
    <button class="dealler-card">
        <h3 class="dealler-card__name">{{ element.name }}</h3>
        <a href="link-adress">{{ element.properties.adress }}</a>
        <a :href="`tel:${element.properties.phone}`"> {{ element.properties.phone }}</a>
    </button>
</template>
<style>
.dealler-card {
    display: flex;
    text-align: left
}
</style>