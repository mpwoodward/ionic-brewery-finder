<template>
  <ion-page>
    <ion-loading
      :isOpen="loading"
      message="Loading map ..."
      @didDismiss="setLoading(false)"
    ></ion-loading>

    <ion-header>
      <ion-toolbar>
        <ion-title>Brewery Map</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Brewery Map</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <capacitor-google-map id="map"></capacitor-google-map>

      <ion-modal
        ref="infoModal"
        :initial-breakpoint="0.25"
        :breakpoints="[0, 0.25]"
        :backdropBreakpoint="0"
        @willDismiss="onWillDismiss"
        :isOpen="infoModalIsOpen">
        <ion-toolbar>
          <ion-header>
            <ion-title>{{ modalInfo.title }}</ion-title>
          </ion-header>
        </ion-toolbar>
        <ion-content class="ion-padding-horizontal">
          {{ modalInfo.name }}
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonModal,
  IonLoading,

  onIonViewDidEnter,
} from '@ionic/vue'
import { Geolocation } from '@capacitor/geolocation'
import { GoogleMap, Marker } from '@capacitor/google-maps'
import { MarkerClickCallbackData } from '@capacitor/google-maps/dist/typings/definitions'
import { getBreweriesByLocation } from '@/services/BreweryAPIService'

const loading = ref(false)
const setLoading = (isOpen: boolean) => loading.value = isOpen

const loc = ref()
const breweries = ref([] as any [])
const markers = [] as Marker[]

let breweryMap: GoogleMap

const createMap = async () => {
  const mapRef = document.getElementById('map') as HTMLElement

  breweryMap = await GoogleMap.create({
    id: 'brewery-map',
    element: mapRef,
    apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    config: {
      center: {
        lat: loc.value.coords.latitude,
        lng: loc.value.coords.longitude,
      },
      zoom: 12
    }
  })

  breweryMap.setOnMarkerClickListener(marker => mapMarkerClick(marker))
  await breweryMap.addMarkers(markers)
}

const mapMarkerClick = (marker: MarkerClickCallbackData) => {
  const clickedMarker = markers.filter(m => (
    m.coordinate.lat === marker.latitude && m.coordinate.lng === marker.longitude
  ))
  modalInfo.title = clickedMarker[0].title
  modalInfo.name = clickedMarker[0].snippet
  infoModalIsOpen.value = true
}

const infoModal = ref()
const infoModalIsOpen = ref(false)
const modalInfo = reactive({
  title: '' as string | undefined,
  name: '' as string | undefined,
})

const onWillDismiss = () => {
  infoModal.value.$el.dismiss(null, 'cancel')
  infoModalIsOpen.value = false
}

onIonViewDidEnter(async () => {
  loading.value = true

  loc.value = await Geolocation.getCurrentPosition()

  breweries.value = await getBreweriesByLocation()
  breweries.value.forEach((brewery: any) => {
    markers.push({
      coordinate: {
        lat: parseFloat(brewery.latitude),
        lng: parseFloat(brewery.longitude),
      },
      title: brewery.name,
      snippet: `${brewery.street} - ${brewery.city}`,
    })
  })

  await createMap()
  
  loading.value = false
})
</script>

<style scoped>
capacitor-google-map {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
