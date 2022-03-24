<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <config-contact-form />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <config-social-form />
      </div>
      <div class="col-xs-12 col-md-4">
        <config-subtitles-form />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ConfigSubtitlesForm from 'src/components/forms/ConfigSubtitlesForm.vue';
import ConfigContactForm from 'src/components/forms/ConfigContactForm.vue';
import ConfigSocialForm from 'src/components/forms/ConfigSocialForm.vue';
</script>
