<template>
  <q-card>
    <q-img :src="`${baseURL}/${dish.image}`">
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
        <q-avatar size="md" icon="mdi-pencil" text-color="primary" />
      </div>
    </q-img>
    <q-card-section>
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
import { IDish } from 'src/modules';
import { baseURL } from 'src/boot/axios';

/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
interface Props {
  dish: IDish;
}
const $props = defineProps<Props>();
const { dish } = toRefs($props);
</script>
