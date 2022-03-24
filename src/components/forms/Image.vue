<template>
  <q-card>
    <q-card-section>
      <q-uploader
        :factory="factoryFn"
        label="Cambiar Imagen Principal"
        accept="image/*"
        @factory-failed="factoryFail"
        @failed="factoryFail"
        @uploaded="onUploaded"
      />
    </q-card-section>
    <q-card-section>
      <q-uploader
        :factory="galleryFactoryFn"
        label="Subir Galería"
        accept="image/*"
        multiple
        max-files="4"
        @factory-failed="factoryFail"
        @failed="factoryFail"
        @uploaded="onUploaded"
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        color="primary"
        class="full-width"
        text-color="dark"
        icon="mdi-delete"
        label="Eliminar Galería"
        @click="removeGallery"
      />
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRefs } from 'vue';
import { baseURL } from 'src/boot/axios';
import { IProduct, injectStrict, userInjectionKey, shopInjectionKey, } from 'src/modules';
import { LooseDictionary, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ROUTE_NAME } from 'src/router';

export default defineComponent({
  name: 'Imagesproduct',
  emits: ['update-product'],
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true
    }
  },
  setup($props, $ctx) {
    const { product } = toRefs($props);
    const $user = injectStrict(userInjectionKey);
    const $q = useQuasar();
    const $router = useRouter();
    const $shop = injectStrict(shopInjectionKey);
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    function factoryFn() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: `${baseURL}/api/products/${product.value.id as number}/image`,
            method: 'POST',
            headers: [
              {
                name: 'Authorization',
                value: `Bearer ${$user.apiToken as string}`,
              },
            ],
            fieldName: 'image',
          });
        }, 200);
      });
    }
    function galleryFactoryFn() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: `${baseURL}/api/products/${product.value.id as number}/gallery`,
            method: 'POST',
            headers: [
              {
                name: 'Authorization',
                value: `Bearer ${$user.apiToken as string}`,
              },
            ],
            fieldName: 'image'
          });
        }, 200);
      });
    }
    function onUploaded(_resp: { files: unknown[]; xhr: LooseDictionary }) {
      const xmlHttpReq = (_resp.xhr as XMLHttpRequest);
      if (xmlHttpReq.response && (xmlHttpReq.response as IProduct).id) {
        $ctx.emit('update-product', xmlHttpReq.response);
      }
      $q.notify({
        message: 'Imagen Guardada',
        type: 'positive',
        position: 'center',
        actions: [
          { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
        ]
      });
      void $router.push({ name: ROUTE_NAME.PRODUCTS });
    }
    function factoryFail(p: unknown) { console.log(p) }
    /**
     * removeGallery
     */
    function removeGallery() {
      $shop.deleteProductGallery(Number(product.value.id)).then(() => {
        $q.notify({
          message: 'Galería Eliminada',
          type: 'positive',
          position: 'center',
          actions: [
            { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
          ]
        });
      }).catch(() => {
        $q.notify({
          message: 'No se pudo eliminar',
          type: 'negative',
          position: 'center',
          actions: [
            { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
          ]
        });
      })
    }
    return {
      ...$props, baseURL,
      // Methods
      factoryFn, factoryFail, onUploaded, galleryFactoryFn, removeGallery
    }
  }
});
</script>