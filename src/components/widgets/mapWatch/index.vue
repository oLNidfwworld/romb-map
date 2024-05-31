<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_POINTS } from '@/helpers/queries/getPoints';
import type { Deallers } from '@/helpers/types/enitities/deallers';
import { shallowRef, watch } from 'vue';
import type { CityElement } from '@/helpers/types/enitities/cityElement';
import type { LocationElement } from '@/helpers/types/enitities/locationElement';
import { Card } from '@/components/ui/card';

const { result, loading } = useQuery<{
    iblock: Deallers
}>(GET_POINTS);

const cities = shallowRef<CityElement[]>();
const elements = shallowRef<LocationElement[]>();

watch(() => loading.value, () => {

    if (result.value) {
        elements.value = result.value.iblock.deallers.elements;
        cities.value = result.value.iblock.deallers.cities;
    }
})

</script>
<template>
    <div class="deallers">
        <div class="deallers__select">
            <div class="">
                <p>
                    Выберите регион
                </p>
                <div>
                    Здесь выбор
                </div>
            </div>
            <div class="deallers__list">
                <template v-if="elements">
                    <Card :element="element" v-for="(element) in elements" :key="element.id" />
                </template>
            </div>
        </div>
        <div class="deallers__map gradient-background" />
    </div>
</template>