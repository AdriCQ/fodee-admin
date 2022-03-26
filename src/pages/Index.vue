<template>
  <q-page padding>
    <q-card class="no-box-shadow text-grey-9">
      <q-card-section class="q-gutter-y-sm">
        <div class="text-h6">Reservas</div>
        <div class="row q-col-gutter-sm q-mt-md">
          <div
            class="col-sm-6 col-md-4 col-lg-3"
            v-for="(res, key) in reserves"
            :key="`reserve-${res.id}-${key}`"
          >
            <reserve-widget
              :reserve="res"
              @reserve-removed="onReserveRemoved(key)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import ReserveWidget from 'src/components/widgets/ReserveWidget.vue';
import { ref } from 'vue';
import { injectStrict, IReserve, _reserve } from 'src/modules';
import { notificationHelper } from 'src/helpers';

const $reserve = injectStrict(_reserve);

const reserves = ref<IReserve[]>([]);

async function listReserves() {
  notificationHelper.loading();
  try {
    const resp = await $reserve.list();
    reserves.value = resp.data;
  } catch (error) {
    notificationHelper.axiosError(error, ['Error de conexion']);
  }
  notificationHelper.loading(false);
}

function onReserveRemoved(key: number) {
  reserves.value.splice(key, 1);
}

void listReserves();
</script>
