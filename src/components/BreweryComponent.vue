<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>
        <slot name="city"></slot>
      </ion-card-subtitle>
      <ion-card-title>
        <slot name="name"></slot>
      </ion-card-title>
      <ion-card-content>
        <ion-text><slot name="address"></slot></ion-text>

        <div class="flex-container">
          <div class="flex-child">
            <slot name="map"></slot>
          </div>
          <div class="flex-child" v-if="hasWebsite">
            <slot name="website"></slot>
          </div>
          <div class="flex-child">
            <slot name="phone"></slot> 
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from '@ionic/vue'

const slots = useSlots()
const hasWebsite = ref(false)

if (slots.website && slots.website().length) {
  hasWebsite.value = true
}
</script>

<style scoped>
.ion-card-content {
  width: 100%;
}

.flex-container {
  display: flex;
  padding-top: 4px;
}

.flex-child {
  flex: 1;
}
</style>