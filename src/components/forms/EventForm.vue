<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.title" type="text" label="Título" />
        <q-input v-model="form.date" type="text" label="Fecha" />
        <q-checkbox v-model="form.enable" label="Habilitado" />
        <q-input v-model="form.description" type="textarea" label="Detalles" />
      </q-card-section>

      <q-card-actions>
        <q-btn
          type="submit"
          class="full-width"
          label="Enviar"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { notificationHelper } from 'src/helpers';
import { IEvent, injectStrict, _event } from 'src/modules';
import { ref } from 'vue';
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
interface Props {
  mode: 'create' | 'update';
  event?: IEvent;
}
const $emits = defineEmits<{
  (e: 'created', p: IEvent): void;
  (e: 'updated', p: IEvent): void;
}>();
const $eventModule = injectStrict(_event);
const $props = defineProps<Props>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<IEvent>({
  date: '',
  description: '',
  enable: true,
  title: '',
  id: 0,
});
// Init Form

if ($props.mode === 'update' && $props.event) {
  form.value = {
    id: $props.event.id,
    date: $props.event.date,
    description: $props.event.description,
    enable: $props.event.enable,
    title: $props.event.title,
  };
}
async function onSubmit() {
  notificationHelper.loading();
  form.value.enable = Number(form.value.enable);
  try {
    if ($props.mode === 'update') {
      const resp = await $eventModule.update(Number(form.value.id), form.value);
      $emits('updated', resp.data);
    } else {
      const resp = await $eventModule.create(form.value);
      $emits('created', resp.data);
    }
  } catch (error) {
    notificationHelper.axiosError(error, ['Error en el formulario']);
  }
  notificationHelper.loading(false);
}
</script>
