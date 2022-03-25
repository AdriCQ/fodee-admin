<template>
  <q-card>
    <q-card-section class="text-center text-grey-9">
      <div class="text-h6 text-center">Configurar Sitio</div>
    </q-card-section>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.title" type="text" label="Nombre del Sitio" />
        <q-input v-model="form.address" type="text" label="Dirección" />
        <q-input v-model="form.email" type="email" label="Email" />
        <q-input v-model="form.phone" type="tel" label="Teléfono" />
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
  title: '',
  address: '',
  email: '',
  phone: '',
});

/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function initData() {
  form.value = {
    title: config.value.title,
    address: config.value.address,
    email: config.value.email,
    phone: config.value.phone,
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
