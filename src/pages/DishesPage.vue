<template>
  <q-page padding>
    <q-card class="no-box-shadow text-grey-9">
      <q-card-section class="q-gutter-y-sm">
        <div class="text-h6">Menu</div>
        <q-btn
          color="positive"
          icon="mdi-plus"
          label="Nuevo Plato"
          @click="createDish"
        />
        <div class="row q-col-gutter-sm" v-if="dishes.length">
          <div
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            v-for="(dish, dKey) in dishes"
            :key="`dish-${dish.id}-${dKey}`"
          >
            <dish-widget
              style="max-width: 25rem"
              :dish="dish"
              @dish-edit="editDish"
              @dish-remove="onRemove(dKey)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="popup">
      <dish-form
        style="min-width: 20rem"
        :dish="selectedDish"
        :key="`popup-${selectedDish?.id}`"
        @dish-created="onCreated"
        @dish-updated="onUpdated"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { notificationHelper } from 'src/helpers';
import { injectStrict, _dish, IDish } from 'src/modules';
import { ref } from 'vue';
import DishWidget from 'src/components/widgets/DishWidget.vue';
import DishForm from 'src/components/forms/DishForm.vue';
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
const selectedDish = ref<IDish | undefined>(undefined);
const popup = ref(false);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

function createDish() {
  selectedDish.value = undefined;
  popup.value = true;
}
/**
 * list
 */
async function list() {
  notificationHelper.loading();
  try {
    const resp = await $dish.list();
    dishes.value = resp.data;
  } catch (error) {
    notificationHelper.axiosError(error, ['No se pudo cargar los datos']);
  }
  notificationHelper.loading(false);
}

function editDish(d: IDish) {
  selectedDish.value = d;
  popup.value = true;
}

function onCreated(dish: IDish) {
  dishes.value.unshift(dish);
  popup.value = false;
}

function onRemove(key: number) {
  dishes.value.splice(key, 1);
}

function onUpdated(dish: IDish) {
  const key = dishes.value.findIndex((_d) => _d.id === dish.id);
  dishes.value[key] = dish;
  popup.value = false;
}
void list();
</script>
