<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasting Notes</ion-title>
        <ion-buttons slot="primary">
          <ion-button id="open-modal" fill="solid" color="primary">
            <ion-icon slot="start" :icon="add" />
            New
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tasting Notes</ion-title>
        </ion-toolbar>
      </ion-header>
      <tasting-note-component
        v-for="note in tastingNotes"
        :key="note.beerName"
        :photoDataUrl="note.photoDataUrl"
      >
        <template #beerName>{{ note.beerName }}</template>
        <template #tastingNotes>{{ note.tastingNotes }}</template>
      </tasting-note-component>
    </ion-content>

    <ion-modal
      ref="modal"
      trigger="open-modal"
      @willDismiss="onWillDismiss"
    >
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Create Tasting Note</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="saveNote()">Save</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Beer Name</ion-label>
          <ion-input
            ref="beerNameInput"
            type="text"
            placeholder="Beer name"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Tasting Notes</ion-label>
          <ion-textarea
            ref="tastingNotesInput"
            placeholder="Bready? Balanced? Bitter? Bad?"
          ></ion-textarea>
        </ion-item>
        <ion-button color="primary" @click="takePicture()">Take Photo</ion-button>
      </ion-content>
    </ion-modal>
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
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from '@ionic/vue'
import { add } from 'ionicons/icons'
import { OverlayEventDetail } from '@ionic/core/components'
import { Camera, CameraResultType } from '@capacitor/camera'
import TastingNoteComponent from '@/components/TastingNoteComponent.vue'

const tastingNotes = ref([] as any[])
const modal = ref()
const beerNameInput = ref()
const tastingNotesInput = ref()
const photoDataUrl = ref()

const cancel = () => {
  modal.value.$el.dismiss(null, 'cancel')
}

const saveNote = () => {
  const beerName = beerNameInput.value.$el.value
  const notes = tastingNotesInput.value.$el.value

  tastingNotes.value.push(
    {
      beerName: beerName,
      tastingNotes: notes,
      photoDataUrl: photoDataUrl.value,
    }
  )

  modal.value.$el.dismiss('confirm')
}

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    console.log(ev.detail)
  }
}

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl
  })

  photoDataUrl.value = image.dataUrl
}
</script>
