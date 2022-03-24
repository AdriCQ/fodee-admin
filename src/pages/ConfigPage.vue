<template>
  <q-page padding>
    <q-tabs v-model="tab" class="bg-primary" align="justify" narrow-indicator>
      <q-tab name="contact" label="Contacto" />
      <q-tab name="password" label="Seguridad" />
      <q-tab name="social" label="Redes Sociales" />
      <q-tab name="texts" label="Textos" />
      <q-tab name="images" label="Imagenes" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="contact">
        <config-contact-form style="max-width: 25rem" />
      </q-tab-panel>

      <q-tab-panel name="password">
        <change-password style="max-width: 25rem" />
      </q-tab-panel>

      <q-tab-panel name="social">
        <config-social-form style="max-width: 45rem" />
      </q-tab-panel>

      <q-tab-panel name="texts">
        <config-subtitles-form style="max-width: 50rem" />
      </q-tab-panel>

      <q-tab-panel name="images">
        <config-images-form />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import ConfigSubtitlesForm from 'src/components/forms/ConfigSubtitlesForm.vue';
import ConfigContactForm from 'src/components/forms/ConfigContactForm.vue';
import ConfigSocialForm from 'src/components/forms/ConfigSocialForm.vue';
import ChangePassword from 'src/components/forms/ChangePassword.vue';
import ConfigImagesForm from 'src/components/forms/ConfigImages.vue';
import { ref } from 'vue';
const tab = ref('contact');
</script>
