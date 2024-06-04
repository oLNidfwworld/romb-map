<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { GET_POINTS } from '@/helpers/queries/getPoints';
import type { Deallers } from '@/helpers/types/enitities/deallers';
import { ref, shallowRef, watch } from 'vue';
import type { CityElement } from '@/helpers/types/enitities/cityElement';
import type { LocationElement } from '@/helpers/types/enitities/locationElement';
import { Card } from '@/components/ui/card';
import type { LngLat } from '@yandex/ymaps3-types';
import { getParam } from '@/composables/getParam';
import { setParam } from '@/composables/setParam';
import { Map } from '../ map';


const paramId = parseInt((getParam('id') as unknown) as string);
const { result, loading } = useQuery<{
    iblock: Deallers
}>(GET_POINTS);

const cities = shallowRef<CityElement[]>();
const elements = shallowRef<LocationElement[]>();

const currentCenter = ref<LngLat>([33, 55]);
const currentZoom = ref(9);
const selectedCity = ref<number>();
const selectedElements = shallowRef<LocationElement[]>();
watch(() => loading.value, () => {
    onDataLoaded();
});
const onDataLoaded = () => {
    if (result.value) {
        elements.value = result.value.iblock.deallers.elements.map(el => {
            return {
                ...el,
                city: {
                    ...el.city,
                    id: Number((el.city.id as unknown) as string)
                },
                properties: {
                    ...el.properties,
                    mapPlacemark: [Number((el.properties.mapPlacemark as string).split(',')[1]), Number((el.properties.mapPlacemark as string).split(',')[0])] as LngLat
                }
            }
        });
        cities.value = result.value.iblock.deallers.cities.map(city => {
            return {
                ...city,
                id: Number(city.id)
            }
        });

        if (paramId !== null && !isNaN(paramId) && (elements.value.filter(el => el.city.id === paramId).length > 0)) {
            selectedCity.value = cities.value.find(city => Number(city.id) === paramId)?.id as number;
            selectedElements.value = elements.value.filter(el => el.city.id === paramId);
        } else {
            selectedCity.value = cities.value[0].id as number;
            selectedElements.value = elements.value.filter(el => el.city.id === selectedCity.value);
        }

        setCenter();
    }
}
const setCenter = () => {
    if (selectedElements.value && selectedElements.value?.length > 0) {
        currentZoom.value = 9;
        currentCenter.value = [
            (selectedElements.value.reduce((a, b) => a + (b.properties.mapPlacemark as LngLat)[0], 0) / (selectedElements.value.length)),
            (selectedElements.value.reduce((a, b) => a + (b.properties.mapPlacemark as LngLat)[1], 0) / (selectedElements.value.length))
        ]
    }
}
const setViewCurrentCity = (id: string) => {
    currentZoom.value = 13;
    currentCenter.value = elements.value?.find(el => el.id === id)?.properties.mapPlacemark as LngLat;
}
watch(() => selectedCity.value, (newVal) => {
    if (elements.value) {
        selectedElements.value = elements.value.filter(el => el.city.id === newVal);
        setCenter();
        setParam('id', newVal as unknown as string);
    }
})
</script>
<template>
    <div class="deallers">
        <div class="deallers__select">
            <div class="deallers__selector-box">
                <p class="deallers__selector-title">
                    Выберите регион
                </p>
                <div>
                    <VSelect v-model="selectedCity" :items="cities" item-value="id" item-title="name"
                        variant="outlined" />
                </div>
            </div>
            <div class="deallers__list">
                <template v-if="elements">
                    <Card @click="setViewCurrentCity(element.id)" :element="element"
                        v-for="(element) in selectedElements" :key="element.id" />
                </template>
            </div>
        </div>
        <div class="deallers__map gradient-background">
            <Suspense>
                <Map :current-center="currentCenter" :current-zoom="currentZoom" :elements="elements" />
            </Suspense>
        </div>
    </div>
</template>