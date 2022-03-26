<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.name" type="text" label="Nombre" />
        <q-input
          v-model="form.description"
          type="textarea"
          label="Descripción"
        />
        <q-input v-model="form.category" type="text" label="Categoría" />
        <q-input
          v-model="form.sell_price"
          type="number"
          step="0.01"
          label="Precio"
          prefix="$"
        />
        <q-checkbox v-model="form.feature" label="Destacado" />
        <q-file
          v-model="image"
          label="Seleccionar Imagen"
          use-chips
          accept=".jpg, image/*"
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
import { ref, toRefs } from 'vue';
import { IDish, injectStrict, _dish } from 'src/modules';
import { notificationHelper } from 'src/helpers';
/**
 * -----------------------------------------
 *	setup
 * -----------------------------------------
 */
interface Prop {
  dish?: IDish;
}
const $dish = injectStrict(_dish);
const $emits = defineEmits<{
  (e: 'dish-created', p: IDish): void;
  (e: 'dish-updated', p: IDish): void;
}>();
const $props = defineProps<Prop>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const { dish } = toRefs($props);
const form = ref<IDish>({
  category: '',
  description: '',
  feature: false,
  image: '',
  name: '',
  sell_price: 0,
  id: 0,
});
const image = ref<File>();
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function init() {
  if (dish?.value) form.value = dish.value;
}
async function onSubmit() {
  notificationHelper.loading();

  try {
    const formData = new FormData();
    formData.append('category', form.value.category);
    formData.append('description', form.value.description);
    formData.append('feature', Number(form.value.feature).toString());
    formData.append('name', form.value.name);
    formData.append('sell_price', form.value.sell_price.toString());
    if (image.value) formData.append('image', image.value);
    if (form.value.id && form.value.id > 0)
      formData.append('id', form.value.id.toString());
    if (form.value.id && form.value.id > 0) {
      const resp = await $dish.update(form.value.id, formData);
      $emits('dish-updated', resp.data);
    } else {
      const resp = await $dish.create(formData);
      $emits('dish-created', resp.data);
    }
  } catch (error) {
    notificationHelper.axiosError(error, ['No se pudo guardar el plato']);
  }
  notificationHelper.loading(false);
}
init();
</script>
