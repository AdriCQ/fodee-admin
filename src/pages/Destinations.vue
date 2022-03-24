<template>
    <q-page padding class="q-gutter-y-xs">
        <q-card class="text-grey-9">
            <q-card-section>
                <q-btn
                    color="primary"
                    icon="mdi-plus"
                    class="full-width"
                    text-color="dark"
                    label="Añadir Destino"
                    @click="newDest"
                />
            </q-card-section>
            <q-card-section>
                <div class="row q-col-gutter-sm justify-center">
                    <div
                        class="col-xs-12 col-sm-3"
                        v-for="(dest, key) in destinations"
                        :key="`dest-${key}`"
                    >
                        <destination-widget
                            class="cursor-pointer"
                            :destination="dest"
                            @click="editDest(dest)"
                        />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <!-- POPUP form -->
        <q-dialog v-model="editDestinationPopup">
            <q-card style="min-width:20rem; width:30rem">
                <q-card-section class="q-pa-none q-ma-none" v-if="formMode === 'update'">
                    <q-chip
                        style="z-index: 100;"
                        clickable
                        class="float-right"
                        text-color="negative"
                        icon="mdi-delete"
                        label="Eliminar"
                        @click="remove(form.id)"
                    />
                </q-card-section>
                <q-form @submit.prevent="onSubmit" class="q-gutter-md">
                    <q-card-section>
                        <q-input
                            v-model="form.price"
                            type="number"
                            min="0"
                            step="0.01"
                            label="Precio"
                        />
                        <q-input v-model="form.name" type="text" label="Nombre" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn
                            :label="`${formMode === 'create' ? 'Crear' : 'Actualizar'}`"
                            type="submit"
                            color="primary"
                            text-color="dark"
                        />
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-dialog>
        <!-- / POPUP form -->
    </q-page>
</template>

<script lang='ts'>
import { computed, defineAsyncComponent, defineComponent, onBeforeMount, ref } from 'vue';
import { IDestination, injectStrict, shopInjectionKey } from 'src/modules';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { uiHelper } from 'src/helpers';

export default defineComponent({
    name: 'DestinationsPage',
    components: {
        'destination-widget': defineAsyncComponent(() => import('src/components/widgets/Destination.vue'))
    },
    setup() {
        const $shopStore = injectStrict(shopInjectionKey);
        const $q = useQuasar();
        const $router = useRouter();
        const { errorHandler, deleteDialog } = uiHelper($q, $router);

        onBeforeMount(() => {
            void $shopStore.listDestination();
        })
        /**
         * -----------------------------------------
         *	Data
         * -----------------------------------------
         */
        const destinations = computed(() => $shopStore.destinations);
        const editDestinationPopup = ref(false);
        const form = ref<IDestination>({
            name: '',
            price: 0
        });
        const formMode = ref<'create' | 'update'>('update');
        /**
         * -----------------------------------------
         *	Methods
         * -----------------------------------------
         */
        function editDest(_d: IDestination) {
            form.value = _d;
            formMode.value = 'update';
            editDestinationPopup.value = true;
        }
        function newDest() {
            form.value = {
                name: '',
                price: 0
            };
            formMode.value = 'create';
            editDestinationPopup.value = true;
        }
        /**
         * onSubmit
         */
        function onSubmit() {
            switch (formMode.value) {
                case 'create':
                    $shopStore.createDestination(form.value)
                        .catch(_e => { errorHandler(_e, 'Error al crear destino') })
                        .finally(() => {
                            editDestinationPopup.value = false;
                        })
                    break;
                case 'update':
                    $shopStore.updateDestination(Number(form.value.id), form.value)
                        .catch(_e => { errorHandler(_e, 'Error al actualizar destino') })
                        .finally(() => {
                            editDestinationPopup.value = false;
                        })
                    break;
            }
        }
        /**
         * remove
         */
        function remove(_id?: number) {
            if (_id) {
                deleteDialog({
                    title: 'Eliminar Destino',
                    message: '¿Está seguro que desea eliminar el destino?',
                    onOk: () => {
                        $shopStore.deleteDestination(_id)
                            .finally(() => { editDestinationPopup.value = false })
                    }
                });
            }
        }
        return {
            destinations, editDestinationPopup, form, formMode,
            // Methods
            editDest, newDest, onSubmit, remove
        }
    }
});
</script>