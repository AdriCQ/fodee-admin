<template>
    <q-card class="text-grey-9">
        <q-card-section>
            <div class="text-body1">{{ user.name }}</div>
            <div class="text-caption">{{ user.email }}</div>
            <div class="text-caption">{{ user.type }}</div>
        </q-card-section>
    </q-card>
</template>

<script lang='ts'>
import { IUserProfile } from 'src/modules';
import { defineComponent, PropType } from 'vue'
/**
 * UserWidget
 */
export default defineComponent({
    name: 'UserWidget',
    props: {
        user: {
            type: Object as PropType<IUserProfile>,
            required: true
        }
    }
});
</script>