<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        <slot name="beerName"></slot>
      </ion-card-title>
      <ion-card-content>
        <div>
          <img :src="props.photoDataUrl" />
        </div>
        <slot name="tastingNotes"></slot>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/vue'

const props = defineProps({
  photoDataUrl: String
})
</script>

<style scoped>
img {
  width: 100%;
  max-width: 400px;
}
</style>
