/* eslint-disable */
<template>


    <div class="q-pa-xl row items-start q-gutter-md q-pa-md align-center justify-center">
        <q-card v-for="(item, i) in data" class="my-card cursor-pointer q-ma-lg" :class="$q.screen.gt.md ? 'col-3' : 'col-12'" @click="expanded = []; expanded[i] = true">
            <!-- <img v-if="item.image != undefined" :src="Array.isArray(item.image) ? item?.image[0] : item.image"
                style="height: 140px; width: 150px" alt="alternative text" /> -->

            <q-img :src="Array.isArray(item.image) ? item?.image[0] : item.image"
                fit="fill">
                <template v-slot:error>
                    <div max-width="400px" class="absolute-full flex flex-center bg-white text-black">
                        Image not available
                    </div>
                </template>
                <!-- <template v-slot:props>
                    <div max-width="400px" class="absolute-full flex flex-center bg-white text-black">
                        Image not available
                    </div>
                </template> -->
            </q-img>
            <q-card-section>
                <div class="text-h6 text-center">{{ i }} {{ item.name }}</div>
                <div class="text-subtitle2"> Duration : {{ item.totalTime?.replace("PT", "").replace("M",
                    "&nbspMinutes").replace("H", " Hours ") }}
                </div>
                <div class="text-subtitle2"> Preparation Time: {{ item.prepTime?.replace("PT",
                    "").replace("M","&nbspMinutes").replace("H", " Hours ") }}</div>
                <div class="text-subtitle2"> Cooking Time: {{ item.cookTime?.replace("PT", "").replace("M",
                    "&nbspMinutes").replace("H", " Hours ")
                    }}</div>
            </q-card-section>

            <q-slide-transition>
                <div v-show="expanded[i]">
                    <q-separator />
                    <q-card-section class="text-subtitle2">
                        {{ item.description }}
                    </q-card-section>
                    <q-separator inline/>
                    <div class="q-pa-xs text-center bg-grey" @click="displayRecipe(item)">See more</div>
                </div>
            </q-slide-transition>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import {ref } from 'vue';
import axios from 'axios';
import eventBus from '@/store/eventBus';

export default defineComponent({
    name: 'MyComponent', // Change the name to your component's name
    setup() {
        // Add your component's logic here
        let data = ref()
        let allData :any[] = []
        let expanded = ref([])
        let searchText = ref("")


        onMounted(() => {
            // Register the event listener when the component is mounted
            eventBus.on(handleMessage);
        });

        onUnmounted(() => {
            // Remove the event listener when the component is unmounted
            eventBus.off(handleMessage);
        });

        const handleMessage = (event: string, val: any) => {
            if (event === 'filter') {
                    let needle = val;                  
                    data.value = allData.filter(item => item.name.toLowerCase().indexOf(needle) > -1)
            };
        };

        
        const fetchData = async () => {
            const response = await axios.get("https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json");
            const data = response.data;
            console.log(data);
            return data;
        };

        fetchData().then((response) => {
            console.log("respo", response);

            data.value = response
            allData = response


            console.log("here", data.value);
            
            loadFromLocalStorage();
            
        });

        const displayRecipe = (item: any) => {
            eventBus.emit('displayRecipe', item);
            console.log("click");
            
            
            
        };

        const loadFromLocalStorage = () => {
            const value = localStorage.getItem('recipe');
            let recipeLocal = value == null ? [] : JSON.parse(value)

            for(let i in recipeLocal){
                data.value.unshift(recipeLocal[i])
            }
            
            console.log("datss", data.value, value);
            
        };



        



        return {
            // Return any data or methods to use in the template
            fetchData,
            data,
            expanded,
            searchText,
            handleMessage,
            displayRecipe,
        };
    },
});
</script>

<style scoped>
/* Add your styles here */
.component {
    font-size: 12px;
}
</style>