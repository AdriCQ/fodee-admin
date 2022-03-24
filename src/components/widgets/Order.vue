<template>
  <q-card class="text-grey-9">
    <q-card-section>
      <div class="float-right cursor-pointer text-negative" @click="remove">
        <q-icon name="mdi-delete" />
      </div>
      <div class="text-body2">
        <q-chip
          v-if="!order.pay"
          class="glossy"
          text-color="white"
          color="negative"
          label="Sin Pagar"
          size="sm"
          icon="mdi-currency-usd"
        />
      </div>
      <div class="text-body2">
        <q-icon name="mdi-unity" />
        ID: {{ order.id }}
      </div>
      <div class="text-body2">
        <q-icon name="mdi-account" />
        {{ order.name }}
      </div>
      <div class="text-body2">
        <q-icon name="mdi-email-outline" />
        {{ order.email }}
      </div>
      <div class="text-body2">
        <q-icon name="mdi-phone" />
        {{ order.phone }}
      </div>
      <div class="text-body2">
        <q-icon name="mdi-map-marker" />
        {{ order.address }}
      </div>
      <div class="text-body2">
        <q-icon name="mdi-calendar-clock" />
        {{ new Date(order.created_at as string).toLocaleString() }}
      </div>
      <div class="text-body2 text-bold">
        <q-icon name="mdi-cash-usd" />
        ${{ Number(order.total_price).toFixed(2) }}
      </div>
    </q-card-section>
    <q-card-section>
      <q-card
        bordered
        v-for="(op, opKey) in order.order_products"
        :key="`order-product-${opKey}`"
      >
        <q-card-section class="q-py-xs">
          <div class="text-body2">
            <q-chip class="glossy" :label="`x${op.qty}`" />
            {{ op.product.name }}
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { uiHelper } from 'src/helpers';
import { injectStrict, IOrder, shopInjectionKey } from 'src/modules';
import { defineComponent, PropType, toRefs } from 'vue';

export default defineComponent({
  name: 'OrderWidget',
  props: {
    order: {
      type: Object as PropType<IOrder>,
      required: true,
    },
  },
  setup(_props) {
    const $storeModule = injectStrict(shopInjectionKey);
    const { order } = toRefs(_props);
    const $q = useQuasar();
    const { errorHandler } = uiHelper($q);

    function remove() {
      $q.dialog({
        title: 'Eliminar Orden',
        message: 'Está seguro que desea eliminar la orden?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        if (order.value.id)
          $storeModule.removeOrder(order.value.id).catch((_e) => {
            errorHandler(_e);
          });
      });
    }
    return { ..._props, remove };
  },
});
</script>
