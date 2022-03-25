<template>
  <q-card>
    <q-form @submit.prevent="createComment">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.name" type="text" label="Nombre" />
        <q-input v-model="form.email" type="email" label="Email" />
        <q-input v-model="form.message" type="textarea" label="Mensaje" />
      </q-card-section>

      <q-card-actions>
        <q-btn color="primary" icon="mdi-check" label="Guardar" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { notificationHelper } from 'src/helpers';
import { IComment, injectStrict, _comment } from 'src/modules';
import { ref } from 'vue';
/**
 * -----------------------------------------
 *	setup
 * -----------------------------------------
 */

const $comment = injectStrict(_comment);
const $emits = defineEmits<{
  (e: 'create-comment', p: IComment): void;
}>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<IComment>({
  email: '',
  message: '',
  name: '',
  visible: true,
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * createComment
 */
async function createComment() {
  notificationHelper.loading();
  try {
    const resp = await $comment.create(form.value);
    $emits('create-comment', resp.data);
    form.value = {
      email: '',
      message: '',
      name: '',
      visible: true,
    };
  } catch (error) {
    notificationHelper.axiosError(error, ['No se pudo crear']);
  }
  notificationHelper.loading(false);
}
</script>
