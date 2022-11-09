<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>
        <slot name="city"></slot>
      </ion-card-subtitle>
      <ion-card-title>
        <ion-grid>
          <ion-row>
            <ion-col size="10" class="ion-no-padding">
              <slot name="name"></slot>
            </ion-col>
            <ion-col size="2">
              <ion-icon
                :icon="starIcon"
                :color="starColor"
                @click="toggleFavorite()"
              />
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-title>
      <ion-card-content class="ion-no-padding">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-text>
                <slot name="address"></slot>
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="4">
              <slot name="map"></slot>
            </ion-col>
            <ion-col size="4" v-if="hasWebsite">
              <slot name="website"></slot>
            </ion-col>
            <ion-col size="4">
              <slot name="phone"></slot>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, useSlots } from 'vue'
import { storeToRefs } from 'pinia'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/vue'
import { star, starOutline } from 'ionicons/icons'
import { useFavoritesStore } from '@/stores/FavoritesStore'

const props = defineProps({
  breweryId: {
    type: String,
    required: true
  }
})

const favoritesStore = useFavoritesStore()
const { favorites } = storeToRefs(favoritesStore)

const starIcon = ref(starOutline)
const starColor = ref()

const isFavorite = (breweryId: string) => {
  const favorite = favorites.value.indexOf(breweryId) !== -1 ? true : false
  return favorite
}

const toggleFavorite = () => {
  if (isFavorite(props.breweryId)) {
    favoritesStore.removeFavorite(props.breweryId)
    starIcon.value = starOutline
    starColor.value = ''
  } else {
    favoritesStore.addFavorite(props.breweryId)
    starIcon.value = star
    starColor.value = 'primary'
  }
}

const slots = useSlots()
const hasWebsite = ref(false)

if (slots.website && slots.website().length) {
  hasWebsite.value = true
}

onMounted(() => {
  if (isFavorite(props.breweryId)) {
    starIcon.value = star
    starColor.value = 'primary'
  }
})
</script>

<style scoped>
.ion-card-content {
  width: 100%;
}
</style>