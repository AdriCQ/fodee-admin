<template>
  <q-card class="text-grey-9">
    <q-card-section>
      <p class="text-italic">"{{ comment.message }}"</p>
    </q-card-section>
    <q-card-section class="text-right">
      <div class="float-left">
        <q-avatar
          size="sm"
          class="cursor-pointer"
          :color="`${comment.visible ? 'positive' : 'negative'}`"
          text-color="white"
          :icon="`${comment.visible ? 'mdi-eye' : 'mdi-eye-off'}`"
          @click="toggleVisible"
        />
        <q-avatar
          class="cursor-pointer"
          size="sm"
          color="negative"
          text-color="white"
          icon="mdi-delete"
          @click="remove"
        />
      </div>
      <div class="text-subtitle2">{{ comment.name }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { notificationHelper } from 'src/helpers';
import { IComment, injectStrict, _comment } from 'src/modules';
import { toRefs, defineProps } from 'vue';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */

interface Props {
  comment: IComment;
}
const $props = defineProps<Props>();
const $comment = injectStrict(_comment);
const $emits = defineEmits<{
  (e: 'comment-removed'): void;
  (e: 'comment-updated', p: IComment): void;
}>();
const $q = useQuasar();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const { comment } = toRefs($props);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

function remove() {
  $q.dialog({
    title: 'Eliminar Comentario',
    message: 'Está seguro que desea eliminar el comentario?',
    ok: true,
    cancel: true,
  }).onOk(() => {
    notificationHelper.loading();
    $comment
      .remove(Number(comment.value.id))
      .then(() => {
        $emits('comment-removed');
      })
      .catch((error) => {
        notificationHelper.axiosError(error, ['Error eliminando comentario']);
      })
      .finally(() => {
        notificationHelper.loading(false);
      });
  });
}

async function toggleVisible() {
  notificationHelper.loading();
  try {
    comment.value.visible = !comment.value.visible;
    await $comment.update(comment.value);
    $emits('comment-updated', comment.value);
  } catch (error) {
    notificationHelper.axiosError(error, ['Error Modificando comentario']);
  }
  notificationHelper.loading(false);
}
</script>
