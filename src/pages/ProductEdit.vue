<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-9">{{ productId === 0 ? 'Crear' : 'Modificar' }} Producto</div>
      </q-card-section>
      <q-card-section v-if="!product.id">
        <product-form :product="product" />
      </q-card-section>
      <q-list bordered class="rounded-borders" v-else>
        <q-expansion-item expand-separator label="Editar Producto">
          <product-form :product="product" />
        </q-expansion-item>
        <q-expansion-item expand-separator label="Imágenes">
          <div class="row justify-center">
            <image-uploader :product="product" @update-product="onImageUpdateProduct" />
          </div>
        </q-expansion-item>
        <q-expansion-item expand-separator label="Vista Previa">
          <div class="row justify-center">
            <product-widget style="width: 25rem;" :product="product" with-details />
          </div>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { injectStrict, IProduct, shopInjectionKey } from 'src/modules';
/**
 * ProductEditPage
 */
export default defineComponent({
  name: 'ProductEditPage',
  components: {
    'image-uploader': defineAsyncComponent(() => import('src/components/forms/Image.vue')),
    'product-form': defineAsyncComponent(() => import('src/components/forms/UpdateProduct.vue')),
    'product-widget': defineAsyncComponent(() => import('src/components/widgets/Product.vue'))
  },
  setup() {
    const $route = useRoute();
    const $shopStore = injectStrict(shopInjectionKey);

    onBeforeMount(() => {
      productId.value = $route.params && $route.params.id && !isNaN(Number($route.params.id)) ? Number($route.params.id) : 0;
      if (productId.value === 0) {
        product.value = {
          id: 0,
          description: '',
          image: '',
          name: '',
          price: 0,
          stock: 0,
          gallery: []
        }
      } else {
        if ($shopStore.findProductById(productId.value)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          product.value = $shopStore.findProductById(productId.value)
        }
      }
    });

    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const productId = ref(0);
    const product = ref<IProduct>({
      id: 0,
      description: '',
      image: '',
      name: '',
      price: 0,
      stock: 0,
      gallery: []
    });
    /**
     * onImageUpdateProduct
     */
    function onImageUpdateProduct(_p: IProduct) {
      $shopStore.updateProduct(Number(_p.id), _p);
    }
    return {
      product, productId,
      onImageUpdateProduct
    }

  }
});
</script>