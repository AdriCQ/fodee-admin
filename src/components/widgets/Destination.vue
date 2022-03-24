<template>
    <q-card class="q-pa-none q-ma-none">
        <q-card-section class="text-grey-9">
            <div class="text-body2">{{ destination.name }}</div>
            <div class="text-caption">${{ Number(destination.price).toFixed(2) }}</div>
        </q-card-section>
    </q-card>
</template>

<script lang='ts'>
import { IDestination } from 'src/modules';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'DestinationWidget',
    props: {
        destination: {
            type: Object as PropType<IDestination>,
            required: true
        }
    }
});
</script>