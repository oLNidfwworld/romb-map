<script setup lang="ts">
import type { LocationElement } from '@/helpers/types/enitities/locationElement';
import { YandexMap, YandexMapClusterer, YandexMapControl, YandexMapControls, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapGeolocationControl, YandexMapMarker, YandexMapZoomControl } from 'vue-yandex-maps';
import type { LngLat } from '@yandex/ymaps3-types';
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components'

interface IProps {
    elements: LocationElement[] | undefined
    currentZoom: number,
    currentCenter: LngLat
}

defineProps<IProps>();

const openMarker = ref<null | string>(null);

</script>
<template>

    <YandexMap :settings="{
        location: {
            center: currentCenter,
            zoom: currentZoom,
        },
        behaviors: ['drag']
    }">
        <YandexMapDefaultSchemeLayer />
        <YandexMapDefaultFeaturesLayer />
        <YandexMapClusterer v-if="elements && elements?.length > 0" zoom-on-cluster-click>
            <YandexMapMarker v-for="(element) in elements" :key="element.id" :settings="{
                coordinates: (element.properties.mapPlacemark as LngLat),  
            }">
            <div class="ymap-custom-marker" >
            
                <img @click="openMarker = element.id" src="https://romb-art.ru/upload/img/pin.svg"/>
                <div v-on-click-outside="() => { openMarker = null }" @click.stop="openMarker = null" v-if="openMarker === element.id"
                    class="ymap-popup" 
                >
                    <span class="ymap-popup__title">{{  element.name }}</span><br/><br/>
                    Номер: {{ element.properties.phone }}<br/>
                    Адрес: {{ element.properties.adress }}<br/>

                </div>
            </div>
            </YandexMapMarker>
            <template #cluster="{ length }">
                <div class="ymap-custom-cluster">
                    {{ length }}
                </div>
            </template>
        </YandexMapClusterer>
        <YandexMapControls :settings="{ position: 'right' }">
            <YandexMapGeolocationControl />
            <YandexMapZoomControl />
        </YandexMapControls>
    </YandexMap>

</template>
<style lang="css">
.ymap-popup {
    position: absolute;
    background: var(--white);
    left: 0;
    bottom: 100%; 
    left: -89px;
    width: 230px; 
    padding: 10px 15px;
    border-radius: 9px;
}
.ymap-popup__title {
    font-size: 18px;
    font-weight: 600;
}
</style>