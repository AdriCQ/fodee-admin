<template>
  <q-card>
    <q-card-section class="text-grey-9">
      <div class="text-h6">Configurar Imagenes</div>
    </q-card-section>
    <q-card-section class="q-gutter-y-sm q-pa-xs">
      <div class="row q-col-gutter-sm">
        <div
          class="col-xs-12 col-sm-6 col-md-4"
          v-for="(image, imgKey) in images"
          :key="`image-${image.id}-${imgKey}`"
        >
          <q-img
            :src="`${baseURL}/${image.path}`"
            spinner-color="primary"
            spinner-size="1rem"
            :ratio="16 / 9"
            @click="showFullImage(image)"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              {{ image.title }}
            </div>
          </q-img>
        </div>
      </div>
    </q-card-section>
    <q-dialog v-model="popup" v-if="fullImage">
      <div style="width: 80%">
        <q-img
          :src="`${baseURL}/${fullImage.path}`"
          spinner-color="primary"
          spinner-size="1rem"
        >
          <div
            class="absolute-bottom text-subtitle1 text-center"
            v-if="!changeImage"
          >
            {{ fullImage.title }}
            <q-btn
              flat
              color="primary"
              label="Cambiar"
              @click="changeImage = true"
            />
          </div>
          <div class="absolute-center" v-if="changeImage">
            <q-uploader
              style="min-width: 15rem"
              :factory="factoryFn"
              :url="`${baseURL}/api/images/${fullImage.id}`"
              label="Cambiar Imagen"
              accept=".jpg, image/*"
              @rejected="onUploadReject"
            />
          </div>
        </q-img>
      </div>
    </q-dialog>
  </q-card>
</template>

<script setup lang="ts">
import { injectStrict, _config, IImage, userInjectionKey } from 'src/modules';
import { ref } from 'vue';
import { baseURL } from 'src/boot/axios';
import { useQuasar } from 'quasar';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $config = injectStrict(_config);
const $q = useQuasar();
const $user = injectStrict(userInjectionKey);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const images = ref<IImage[]>([]);
const popup = ref(false);
const fullImage = ref<IImage | undefined>(undefined);
const changeImage = ref(false);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function showFullImage(img: IImage) {
  fullImage.value = img;
  changeImage.value = false;
  popup.value = true;
}
/**
 * loadImages
 */
async function loadImages() {
  const resp = await $config.listImages();
  images.value = resp.data;
}

function factoryFn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: `${baseURL}/api/images/${
          (fullImage.value as IImage).id as number
        }`,
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

function onUploadReject(rejectedEntries: unknown) {
  console.log(rejectedEntries);
  $q.notify({
    message: 'No se pudo subir la imagen',
    type: 'negative',
  });
}

void loadImages();
</script>
