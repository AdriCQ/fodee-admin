<template>
  <q-card>
    <q-card-section>
      <div class="float-right cursor-pointer text-negative" @click="remove">
        <q-icon name="mdi-delete" />
      </div>
      <div class="text-body2">Nombre: {{ $props.reserve.name }}</div>
      <div class="text-body2">Email: {{ $props.reserve.email }}</div>
      <div class="text-body2">Fecha: {{ $props.reserve.date }}</div>
      <div class="text-body2">Motivo: {{ $props.reserve.occation }}</div>
    </q-card-section>
    <q-card-section v-if="$props.reserve.message">
      {{ $props.reserve.message }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { notificationHelper } from 'src/helpers';
import { injectStrict, IReserve, _reserve } from 'src/modules';
interface Props {
  reserve: IReserve;
}
const $emits = defineEmits<{
  (e: 'reserve-removed'): void;
}>();
const $props = defineProps<Props>();
const $reserve = injectStrict(_reserve);
const $q = useQuasar();

function remove() {
  $q.dialog({
    title: 'Eliminar Reserva',
    message: 'Desea eliminar la reserva?',
    ok: true,
    cancel: true,
  }).onOk(() => {
    $reserve
      .remove(Number($props.reserve.id))
      .then(() => {
        $emits('reserve-removed');
      })
      .catch((e) => {
        notificationHelper.axiosError(e, ['Error eliminando reserva']);
      });
  });
}
</script>
