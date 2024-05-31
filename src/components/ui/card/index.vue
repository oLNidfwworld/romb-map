<script setup lang="ts">
import type { LocationElement } from '@/helpers/types/enitities/locationElement';

interface IProps {
    element: LocationElement
}

const props = defineProps<IProps>();
</script>
<template>
    <div class="dealler-card">
        <h3 class="dealler-card__name">{{ element.name }}</h3>
        <a href="link-adress">{{ element.properties.adress }}</a>
        <a :href="`tel:${element.properties.phone}`"> {{ element.properties.phone }}</a>
    </div>
</template>