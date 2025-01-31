<template>
    <div class="row justify-center q-px-lg q-pa-lg">
        <q-input class="col-4 q-px-md" label="Search Recipe" filled type="search" @update:model-value="callFilter">
            <template v-slot:append>
                <q-icon name="mdi-magnify" />
            </template>
        </q-input>
        <q-btn class="col-2" label="Add new recipe!" @click="addRecipe"></q-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import eventBus from '@/store/eventBus';

export default defineComponent({
    name: 'Search', 
    setup() {
        
        function callFilter(val :any) {
            eventBus.emit('filter', val);

        }

        function addRecipe(val: any) {
            eventBus.emit('addRecipe', val);

        }

        return {
            callFilter,
            addRecipe,
        };
    },
});
</script>

<style scoped>
/* Add your styles here */
.component {
    font-size: 12px;;
}
</style>