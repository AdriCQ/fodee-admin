<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <q-btn
                    color="primary"
                    icon="mdi-plus"
                    class="full-width"
                    text-color="dark"
                    label="Nuevo Producto"
                    @click="addProduct"
                />
            </q-card-section>
            <q-card-section>
                <div class="row q-col-gutter-sm justify-center">
                    <div
                        class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
                        v-for="(product, pKey) in products"
                        :key="`prod-${product.id}-${pKey}`"
                    >
                        <product-widget :product="product" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, onBeforeMount, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { injectStrict, shopInjectionKey } from 'src/modules';
import { uiHelper } from 'src/helpers';
import { ROUTE_NAME } from 'src/router';

/**
 * ProductPage
 */
export default defineComponent({
    name: 'ProductPage',
    components: {
        'product-widget': defineAsyncComponent(() => import('src/components/widgets/Product.vue'))
    },
    setup() {
        const $q = useQuasar();
        const $router = useRouter();
        const { errorHandler } = uiHelper($q, $router);
        const $shop = injectStrict(shopInjectionKey);

        onBeforeMount(() => {
            $shop.listProductsAction().catch(_e => { errorHandler(_e, 'No se encontraron productos') })
        });

        const products = computed(() => $shop.products);

        function addProduct() {
            void $router.push({ name: ROUTE_NAME.PRODUCT_EDIT, params: { id: 0 } })
        }

        return {
            products, addProduct
        }
    }
});
</script>