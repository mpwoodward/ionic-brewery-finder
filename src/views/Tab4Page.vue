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
        placeholder="Enter a name"
        debounce="500"
        @ionClear="clearSearchBar"
        @ionChange="search($event)"
      ></ion-searchbar>

      <ion-title>Your Favorite Watering Holes</ion-title>

      <!-- <template v-if="!loading">
        <template v-if="breweries.length !== 0">
          <brewery-component
            v-for="brewery in breweries"
            :key="brewery.id"
            :brewery-id="brewery.id"
          >
            <template #city>{{ brewery.city }}, {{ brewery.state }}</template>
            <template #name>{{ brewery.name }}</template>
            <template #address>{{ brewery.street }}</template>
            <template #map>
              <a href="">
                <ion-icon :icon="map" />
                Map
              </a>
            </template>
            <template v-if="brewery.website_url" #website>
              <a href="#" @click.prevent="openBreweryWebsite(brewery.website_url)">
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
            <ion-card-subtitle>BUMMER DUDE</ion-card-subtitle>
            <ion-card-title>No beer for you!</ion-card-title>
            <ion-card-content>
              We couldn't find any breweries there. We recommend not going to whatever place 
              you searched, because it is clearly a location entirely without joy.
            </ion-card-content>
          </ion-card-header>
        </ion-card>
      </template> -->
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
import {
  getBreweriesByCity, 
  getBreweriesByLocation, 
  getBreweriesByZip
} from '@/services/BreweryAPIService'
import BreweryComponent from '@/components/BreweryComponent.vue'

const loading = ref(false)
const setLoading = (isOpen: boolean) => loading.value = isOpen

let breweries = ref([] as any[])

const clearSearchBar = async () => {
  loading.value = true
  breweries.value = await getBreweriesByLocation()
  loading.value = false
}

const openBreweryWebsite = (url: string) => {
  InAppBrowser.create(url)
}

const search = async (event: any) => {
  const query = event.target.value

  if (query.length !== 0) {
    loading.value = true

    // if it's not a number search by city, if it is, search by zip
    if (isNaN(query)) {
      breweries.value = await getBreweriesByCity(query)
    } else {
      breweries.value = await getBreweriesByZip(query)
    }

    loading.value = false
  }
}

// onIonViewWillEnter(async () => {
//   loading.value = true
//   breweries.value = await getBreweriesByLocation()
//   loading.value = false
// })
</script>
