<template>
  <q-card>
    <q-img :ratio="16 / 9" :src="`${baseURL}/${dish.image}`">
      <div class="absolute-bottom-right">
        ${{ Number(dish.sell_price).toFixed(2) }}
      </div>
      <div class="absolute-top-left cursor-pointer" style="padding: 0.2rem">
        <q-avatar
          size="md"
          :text-color="`${dish.feature ? 'yellow' : 'grey'}`"
          icon="mdi-star"
        />
      </div>
      <div class="absolute-top-right cursor-pointer" style="padding: 0.2rem">
        <q-avatar
          size="md"
          icon="mdi-pencil"
          text-color="primary"
          @click="$emits('dish-edit', dish)"
        />
      </div>
    </q-img>
    <q-card-section>
      <div class="float-right cursor-pointer text-negative" @click="remove">
        <q-icon name="mdi-delete" />
      </div>
      <div class="text-h6">{{ dish.name }}</div>
      <div class="text-subtitle2">
        {{ dish.category }}
      </div>
    </q-card-section>
    <q-card-section>
      {{ dish.description }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { IDish, injectStrict, _dish } from 'src/modules';
import { baseURL } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { notificationHelper } from 'src/helpers';

/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
interface Props {
  dish: IDish;
}
const $props = defineProps<Props>();
const $q = useQuasar();
const $emits = defineEmits<{
  (e: 'dish-edit', p: IDish): void;
  (e: 'dish-remove'): void;
}>();
const $dish = injectStrict(_dish);

const { dish } = toRefs($props);

function remove() {
  $q.dialog({
    title: 'Eliminar Plato',
    message: 'Desea eliminar el plato?',
    ok: true,
    cancel: true,
  }).onOk(() => {
    $dish
      .remove(Number(dish.value.id))
      .then(() => {
        $emits('dish-remove');
      })
      .catch((_e) => {
        notificationHelper.axiosError(_e, ['No se pudo eliminar']);
      });
  });
}
</script>
