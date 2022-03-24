<template>
    <q-layout view="hHh lpR lFf">
        <q-page-container class="bg-grey-9">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AuthLayout',
});
</script>