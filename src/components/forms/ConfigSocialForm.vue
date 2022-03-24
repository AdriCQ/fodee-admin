<template>
  <q-card>
    <q-card-section class="text-center text-grey-9">
      <div class="text-h6 text-center">Configurar Redes Sociales</div>
    </q-card-section>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.social_fb" type="text" label="Facebook" />
        <q-input v-model="form.social_in" type="text" label="Instagram" />
        <q-input v-model="form.social_tw" type="text" label="Twitter" />
        <q-input v-model="form.social_yt" type="text" label="Youtube" />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          icon="mdi-check"
          label="Guardar"
          type="submit"
          class="full-width"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue';
import { injectStrict, _config, IConfig } from 'src/modules';
import { notificationHelper } from 'src/helpers';
/**
 * -----------------------------------------
 *	Global
 * -----------------------------------------
 */
const Config = injectStrict(_config);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const config = computed(() => Config.config);

const form = ref<Partial<IConfig>>({
  social_fb: '',
  social_tw: '',
  social_yt: '',
  social_in: '',
});

/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function initData() {
  form.value = {
    social_fb: config.value.social_fb,
    social_tw: config.value.social_tw,
    social_yt: config.value.social_yt,
    social_in: config.value.social_in,
  };
}
/**
 * onSubmit
 */
async function onSubmit() {
  notificationHelper.loading();
  try {
    await Config.update(form.value);
    notificationHelper.success(['Configuracion guardada']);
  } catch (error) {
    notificationHelper.axiosError(error, ['No se pudo actualizar']);
  }
  notificationHelper.loading(false);
}
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
onBeforeMount(() => initData());
</script>
