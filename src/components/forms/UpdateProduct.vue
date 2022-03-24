<template>
  <q-card>
    <q-card-section>
      <q-form class="q-gutter-md" @submit.prevent="onSubmit">
        <q-card>
          <q-card-section class="q-gutter-y-sm">
            <q-input v-model="form.name" type="text" label="Nombre" />
            <div class="text-body2 q-mt-lg">Descripción</div>
            <q-editor v-model="form.description" min-height="10rem" />
            <div class="row q-col-gutter-sm">
              <!-- <div class="col-6">
                <q-input v-model="form.stock" type="number" min="0" label="Inventario" />
              </div>-->
              <div class="col-12">
                <q-input v-model="form.price" type="number" min="0" label="Precio" step="0.01" />
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              color="primary"
              text-color="dark"
              type="submit"
              icon="mdi-check"
              label="Guardar"
              :loading="loading"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, onBeforeMount, toRefs } from 'vue'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { uiHelper } from 'src/helpers';
import { IProduct, injectStrict, shopInjectionKey } from 'src/modules';
import { ROUTE_NAME } from 'src/router';

export default defineComponent({
  name: 'UpdateProductForm',
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: false
    }
  },
  setup(_props) {
    const $props = toRefs(_props);
    const $q = useQuasar();
    const $router = useRouter();
    const { errorHandler } = uiHelper($q, $router);
    const $shop = injectStrict(shopInjectionKey);

    onBeforeMount(() => {
      if ($props.product && $props.product.value)
        form.value = $props.product.value;
    });

    const form = ref<IProduct>({
      id: 0,
      description: '',
      image: '',
      name: '',
      price: 0,
      stock: 0,
      gallery: []
    });
    const loading = ref(false);

    function onSubmit() {
      loading.value = true;
      if (form.value.id === 0) {
        $shop.createProductAction(form.value).then(() => {
          $q.notify({
            message: 'Producto Creado',
            type: 'positive',
            position: 'center',
            actions: [
              { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
            ]
          });
          void $router.push({ name: ROUTE_NAME.PRODUCTS })
        }).catch(_e => { errorHandler(_e, 'Error creando producto') })
          .finally(() => { loading.value = false })
      } else {
        $shop.updateProductAction(form.value).then(() => {
          $q.notify({
            message: 'Producto actualizado',
            type: 'positive',
            position: 'center',
            actions: [
              { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
            ]
          });
          void $router.push({ name: ROUTE_NAME.PRODUCTS })
        }).catch(_e => { errorHandler(_e, 'Error actualizando producto') })
          .finally(() => { loading.value = false })
      }
    }

    return {
      form, loading, onSubmit
    }
  }
});
</script>