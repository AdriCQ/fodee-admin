<template>
  <q-card>
    <q-card-section class="text-center text-grey-9">
      <div class="text-h6 text-center">Configurar Textos</div>
    </q-card-section>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <q-input
          v-model="form.home_subtitle"
          type="textarea"
          label="Subtitulo Principal"
        />
        <q-input
          v-model="form.about_us"
          type="textarea"
          label="Sobre Nosotros"
        />

        <q-input
          v-model="form.menu_subtitle"
          type="textarea"
          label="Subtitulo Menú"
        />

        <q-input
          v-model="form.events_subtitle"
          type="textarea"
          label="Subtitulo Eventos"
        />

        <q-input
          v-model="form.reserv_subtitle"
          type="textarea"
          label="Subtitulo Reserva"
        />
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
  about_us: '',
  events_subtitle: '',
  home_subtitle: '',
  menu_subtitle: '',
  reserv_subtitle: '',
});

/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function initData() {
  form.value = {
    about_us: config.value.about_us,
    events_subtitle: config.value.events_subtitle,
    home_subtitle: config.value.home_subtitle,
    menu_subtitle: config.value.menu_subtitle,
    reserv_subtitle: config.value.reserv_subtitle,
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
