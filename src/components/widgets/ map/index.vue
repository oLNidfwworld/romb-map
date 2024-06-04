<script setup lang="ts">
import type { LocationElement } from '@/helpers/types/enitities/locationElement';
import { YandexMap, YandexMapClusterer, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps';
import type { LngLat } from '@yandex/ymaps3-types';


interface IProps {
    elements: LocationElement[] | undefined
    currentZoom: number,
    currentCenter: LngLat
}

defineProps<IProps>();

</script>
<template>

    <YandexMap :settings="{
        location: {
            center: currentCenter,
            zoom: currentZoom,
        }
    }">
        <YandexMapDefaultSchemeLayer />
        <YandexMapDefaultFeaturesLayer />
        <YandexMapClusterer v-if="elements && elements?.length > 0" zoom-on-cluster-click>
            <YandexMapMarker v-for="(element) in elements" :key="element.id" :settings="{
                coordinates: (element.properties.mapPlacemark as LngLat)
            }">
                <img class="ymap-custom-marker" src="https://romb-art.ru/upload/img/pin.svg" alt="" />
            </YandexMapMarker>
            <template #cluster="{ length }">
                <div class="ymap-custom-cluster">
                    {{ length }}
                </div>
            </template>
        </YandexMapClusterer>
    </YandexMap>

</template>