<template>
    <div class="container">
        <q-dialog v-model="dialog">
            <div style="background-color: whitesmoke;max-width: 90%; max-height: 90%" >
                <div style="height: 100% !important; width: 100% !important;"
                    class="style-dialog">
                    <q-card class="flat no-border no-outline no-box-shadow q-pa-xs cursor-pointer q-ma-xl bg-none"
                        style="overflow-y: auto; background: none; ">
                        <q-card-section class="row text-center align-center justify-center text-black">
                            <q-img class="col-12 style-image"
                                :src="Array.isArray(recipe?.image) ? recipe?.image[0] : recipe?.image"
                                style="max-width: 480px; max-height: 400px;">
                                <template v-slot:error>
                                    <div max-width="400px" class="absolute-full flex flex-center bg-white text-black">
                                        Image not available
                                    </div>
                                </template>
                            </q-img>
                            <div class="row text-center align-center justify-center text-black">
                                <div class="col-12 q-pa-md text-h1 text-center align-center justify-center text-bold"> {{
            recipe?.name }}
                                </div>
                                <div class="col-12 text-center align-center justify-center">by {{
            recipe?.author?.name }}
                                </div>
                                <div class="col-12  q-pa-lg  q-ma-md text-center align-center justify-center text-bold">
                                    {{
            recipe?.description }}</div>
                            </div>
                        </q-card-section>
                        <q-card-section class="text-black text-left">
                            <div class="col-12 text-subtitle2"> Duration : {{ recipe?.totalTime?.replace("PT",
            "").replace("M",
                "&nbspMinutes").replace("H", " Hours ") }}
                            </div>
                            <div class="col-12 text-subtitle2"> Preparation Time: {{ recipe?.prepTime?.replace("PT",
            "").replace("M", "&nbspMinutes").replace("H", " Hours ") }}</div>
                            <div class="col-12 text-subtitle2"> Cooking Time: {{ recipe?.cookTime?.replace("PT",
            "").replace("M",
                "&nbspMinutes").replace("H", " Hours ")
                                }}</div>
                        </q-card-section>
                        <q-card-section class="text-black">
                            <div class="row text-bold text-h6">Ingredients: </div>
                            <template v-for="(item, i) in recipe?.recipeIngredient">
                                <div class="row text-subtitle q-pa-xs">{{ item }}</div>
                            </template>

                        </q-card-section>

                        <q-card-section class="text-black">
                            <div class="row text-bold text-h6">Instructions: </div>
                            <template v-for="(item, i) in recipe?.recipeInstructions">
                                <div class="row text-subtitle q-pa-xs">{{ i + 1 }}. {{ item.text }}</div>
                            </template>

                        </q-card-section>
                    </q-card>
                </div>
            </div>



        </q-dialog>
    </div>
</template>

<script lang="ts">
// import { Dialog } from 'quasar';
import { defineComponent, ref, onUnmounted, onMounted } from 'vue';
import eventBus from '@/store/eventBus';


export default defineComponent({
    name: 'MyComponent',
    setup() {

        let recipe: any = ref({})
        let dialog = ref(false)

        onMounted(() => {
            // Register the event listener when the component is mounted
            eventBus.on(handleMessage);
        });

        onUnmounted(() => {
            // Remove the event listener when the component is unmounted
            eventBus.off(handleMessage);
        });
        
        const handleMessage = (event: string, val: any) => {
            if (event === 'displayRecipe') {
                recipe.value = val;
                dialog.value = true

                console.log("haa masuk", val);
                
                
            };
        };

        return {
            dialog,
            recipe,
            handleMessage,
        }
    }
});
</script>

<style scoped>
.container {
    padding: 20px;
}

h1 {
    color: #333;
}


.style-dialog {
    position: relative;
    width: 300px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    text-align: center;

}

.style-dialog::before {

    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/bg-details.jpg") !important;
    background-color: whitesmoke;
    background-size: cover;
    /* Ensures the background covers the card */
    background-position: center;
    /* Centers the background image */
    background-attachment: fixed;
    /* Makes the background fixed */
    z-index: 0;
    opacity: 0.07;
    /* Optional: Add transparency if needed */
}

.style-image {
    --s: 80px;
    /* control the size of the wave */
    --w: 500px;
    /* preferred image width */

    width: round(var(--w), var(--s));
    aspect-ratio: 1;
    padding: calc(var(--s)/2);
    box-sizing: border-box;
    background: conic-gradient(#CD8C52, #5E9FA3, #CD8C52);
    border-radius: calc(.866*var(--s));
    --_r: calc(var(--s)/(2*sqrt(2)));
    --_c: var(--_r), #000 100%, #0000 calc(100% + 1px);
    mask:
        radial-gradient(var(--_r), #000 calc(100% - 1px), #0000) 0 0/var(--s) var(--s),
        conic-gradient(#000 0 0) subtract no-repeat 50%/calc(100% - var(--s)/2) calc(100% - var(--s)/2),
        radial-gradient(var(--_r) at 50% var(--_c)) calc(var(--s)/2) calc(-1*var(--_r))/var(--s) 100%,
        radial-gradient(var(--_r) at var(--_c)) calc(-1*var(--_r)) calc(var(--s)/2)/100% var(--s);
}
</style>