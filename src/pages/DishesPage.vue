<template>
  <q-page padding>
    <q-card class="no-box-shadow text-grey-9">
      <q-card-section class="q-gutter-y-sm">
        <div class="text-h6">Menu</div>
        <q-btn color="positive" icon="mdi-plus" label="Nuevo Plato" />
        <div class="row q-col-gutter-sm" v-if="dishes.length">
          <div
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            v-for="(dish, dKey) in dishes"
            :key="`dish-${dish.id}-${dKey}`"
          >
            <dish-widget style="max-width: 25rem" :dish="dish" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { notificationHelper } from 'src/helpers';
import { injectStrict, _dish, IDish } from 'src/modules';
import { ref } from 'vue';
import DishWidget from 'src/components/widgets/DishWidget.vue';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $dish = injectStrict(_dish);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const dishes = ref<IDish[]>([]);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * list
 */
async function list() {
  notificationHelper.loading();
  try {
    const resp = await $dish.list();
    dishes.value = resp.data;
    console.log('List dishes', resp.data);
  } catch (error) {
    notificationHelper.axiosError(error, ['No se pudo cargar los datos']);
  }
  notificationHelper.loading(false);
}

void list();
</script>
