<template>
  <ion-page>
    <ion-loading
      :isOpen="loading"
      message="Loading favorites ..."
      @didDismiss="setLoading(false)"
    ></ion-loading>

    <ion-header>
      <ion-toolbar>
        <ion-title>Your Favorites</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-searchbar
        placeholder="Filter by name"
        debounce="500"
        @ionClear="clearSearchBar"
        @ionChange="search($event)"
        v-if="breweries.length !== 0"
      ></ion-searchbar>

      <ion-title v-if="breweries.length !== 0">Your Favorite Breweries</ion-title>

      <template v-if="!loading">
        <template v-if="breweries.length !== 0">
          <brewery-component
            v-for="brewery in breweries"
            :key="brewery.id"
            :brewery-id="brewery.id"
          >
            <template #city>{{ brewery.city }}, {{ brewery.state }}</template>
            <template #name>{{ brewery.name }}</template>
            <template #address>{{ brewery.address }}</template>
            <template #map>
              <a href="">
                <ion-icon :icon="map" />
                Map
              </a>
            </template>
            <template v-if="brewery.website" #website>
              <a href="#" @click.prevent="openBreweryWebsite(brewery.website)">
                <ion-icon :icon="globe" />
                Website
              </a>
            </template>
            <template v-if="brewery.phone" #phone>
              <a href="tel:{{ brewery.phone }}">
                <ion-icon :icon="call" />
                Call
              </a>
            </template>
          </brewery-component>
        </template>

        <ion-card v-else>
          <ion-card-header>
            <ion-card-subtitle>START EXPLORING</ion-card-subtitle>
            <ion-card-title>No favorites!</ion-card-title>
            <ion-card-content>
              You don't have any favorites. Our recommendation is to try more beer!
            </ion-card-content>
          </ion-card-header>
        </ion-card>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonIcon,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,

  onIonViewWillEnter,
} from '@ionic/vue'
import { call, globe, map } from 'ionicons/icons'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { getFavoriteBreweries } from '@/services/BreweryAPIService'
import BreweryComponent from '@/components/BreweryComponent.vue'
import { Brewery } from '@/interfaces/interfaces'

const loading = ref(false)
const setLoading = (isOpen: boolean) => loading.value = isOpen

let breweries = ref([] as Brewery[])

const clearSearchBar = async () => {
  loading.value = true
  breweries.value = await getFavoriteBreweries()
  loading.value = false
}

const openBreweryWebsite = (url: string) => {
  InAppBrowser.create(url)
}

const search = async (event: any) => {
  const query = event.target.value

  if (query.length !== 0) {
    loading.value = true


    loading.value = false
  }
}

onIonViewWillEnter(async () => {
  loading.value = true
  breweries.value = await getFavoriteBreweries()
  loading.value = false
})
</script>
