<template>
  <q-card>
    <q-card-section>
      <div class="float-right cursor-pointer text-negative" @click="remove">
        <q-icon name="mdi-delete" />
      </div>
      <q-chip
        class="glossy"
        size="sm"
        :icon="`mdi-${$props.event.enable ? 'check' : 'cancel'}`"
        :color="`${$props.event.enable ? 'positive' : 'negative'}`"
        text-color="white"
        :label="`${$props.event.enable ? 'Habilitado' : 'Deshabilitado'}`"
      />
      <div @click="$emits('click-action')" class="cursor-pointer">
        <div class="text-h6">{{ $props.event.title }}</div>
        <div class="text-subtitle2">{{ $props.event.date }}</div>
      </div>
    </q-card-section>
    <q-card-section @click="$emits('click-action')" class="cursor-pointer">
      {{ $props.event.description }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IEvent } from 'src/modules/event/types';
import { notificationHelper } from 'src/helpers';
import { useQuasar } from 'quasar';
import { injectStrict, _event } from 'src/modules';
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */

interface Props {
  event: IEvent;
}
const $props = defineProps<Props>();
const $emits = defineEmits<{
  (event: 'remove', id: number): void;
  (event: 'click-action'): void;
}>();
const $q = useQuasar();
const $eventModule = injectStrict(_event);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function remove() {
  $q.dialog({
    title: 'Eliminar evento',
    message: 'Está seguro que desea eliminar el evento?',
    ok: true,
    cancel: true,
  }).onOk(() => {
    $eventModule
      .remove(Number($props.event.id))
      .then(() => {
        $emits('remove', Number($props.event.id));
      })
      .catch(() => notificationHelper.error(['No se pudo eliminar']));
  });
}
</script>
