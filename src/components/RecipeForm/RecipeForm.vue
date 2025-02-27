<template>
    <div class="container">
        <q-dialog v-model="dialog">
            <div style="background-color: whitesmoke;max-width: 90%; max-height: 90% width: 500px">
                <div style="height: 100% !important; width: 100% !important;" class="style-dialog">
                    <q-card class="flat no-border no-outline no-box-shadow q-pa-xs cursor-pointer q-ma-xl bg-none"
                        style="overflow-y: auto; background: none; ">

                        <q-card-section class="bg-green-5 " >
                            Add new recipe
                        </q-card-section>


                        <q-card-section>
                            <q-input dense class="q-pa-xs" v-model="recipe.name" outlined label="Name" />

                            <q-input dense class="q-pa-xs" v-model="recipe.description" outlined type="textarea"
                                label="Description" />

                            <q-input dense class="q-pa-xs" v-model="recipe.author" outlined label="Author" />

                            <q-input dense class="q-pa-xs" v-model="recipe.prepTime" outlined type="number"
                                :rules="[val => val && !isNaN(val) || 'Please enter a valid number']"
                                label="Preparation Time (In Minutes)" />

                            <q-input dense class="q-pa-xs" v-model="recipe.cookTime" outlined type="number"
                                :rules="[val => val && !isNaN(val) || 'Please enter a valid number']"
                                label="Cooking Time (In Minutes)" />
                        </q-card-section>

                        <q-card-section class="q-py-none q-ma-none">
                            <q-input class="q-pa-xs" @update:model-value="val => { img = val[0] }" filled type="file" />

                            <q-input dense class="q-pa-xs q-pb-md" outlined label="Ingredients" v-model="ing"
                                hint="Please click + to add ingredients">
                                <template v-slot:append>
                                    <q-icon class="cursor-pointer" name="mdi-plus" @click="addIngredients(ing)" />
                                </template>
                            </q-input>
                            <q-input v-show="arrIngredient.length > 0" dense class="q-pa-md" v-model="arrIngredient"
                                outlined type="textarea" label="Ingredients" />
                            <!-- <q-card v-if="arrIngredient !== []" flat class="q-ma-xs">
                                <div v-for="(item, i) in arrIngredient" class="text-black text-left q-pa-md">
                                    {{ i+1 }}. {{ item }}
                                </div>
                            </q-card> -->
                        </q-card-section>

                        <q-card-section>
                            <q-input dense class="col-10 q-pa-xs q-pt-none q-pb-lg" outlined label="Instructions" v-model="ins"
                                hint="Please click + to add instructions">
                                <template v-slot:append>
                                    <q-icon class="cursor-pointer" name="mdi-plus" @click="addIntruction(ins)" />
                                </template>
                            </q-input>
                            <q-input v-show="arrInstructions.length > 0" dense class="q-pa-xs" v-model="arrInstructions"
                                outlined type="textarea" label="Instructions" />
                            <!-- <q-card v-if="arrInstructions != []" flat>
                                <div v-for="(item, i) in arrInstructions" class="text-black text-left">
                                    {{ i + 1 }}. {{ item }}
                                </div>
                            </q-card> -->
                        </q-card-section>

                        <q-btn color="green-5" label="Add" @click="addRecipe" />

                    </q-card>
                </div>
            </div>



        </q-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import eventBus from '@/store/eventBus';

export default defineComponent({
    name: 'Form',
    setup() {


        let dialog = ref(false);
        let arrIngredient = ref<any[]>([]);
        let ing = ref("")
        let arrInstructions = ref<any[]>([]);
        let ins = ref("")
        let img = ref()
        let recipe = ref<{ [key: string]: any }>({})

        // localStorage.removeItem("recipe");

        onMounted(() => {
            // Register the event listener when the component is mounted
            eventBus.on(handleMessage);
        });

        onUnmounted(() => {
            // Remove the event listener when the component is unmounted
            eventBus.off(handleMessage);
        });

        const handleMessage = (event: string, val: any) => {
            if (event === 'addRecipe') {
                dialog.value = true;
            };
        };


        function callFilter(val: any) {
            eventBus.emit('filter', val);

        }

        const addIngredients = (val: any): void => {
            arrIngredient.value.push(val)
            ing.value = ""
            
        }

        const addIntruction = (val: string): void => {
            arrInstructions.value.push(val);
            ins.value = ""

        }
        

        function addRecipe() {

            console.log("img", img.value);

            const reader = new FileReader();
            reader.readAsDataURL(img.value);   
            reader.onload = function () {
                recipe.value["image"] = reader.result;

                recipe.value["recipeIngredient"] = arrIngredient.value;
                recipe.value["recipeInstructions"] = arrInstructions.value;
                recipe.value["totalTime"] = recipe.value.prepTime + recipe.value.cookTime

                console.log("reeeee", recipe.value);


                let value = localStorage.getItem('recipe');
                console.log("value", value);
                let recipeLocal = value == null ? [] : JSON.parse(value)

                recipeLocal.unshift(recipe.value)
                console.log("local", recipeLocal);

                localStorage.setItem('recipe', JSON.stringify(recipeLocal));
                dialog.value = false;
                alert('New Recipe Added!' +  recipeLocal);            

            }; 
            
            
        }

    

        

        return {
            dialog,
            callFilter,
            addIngredients,
            arrIngredient, 
            ing,
            addIntruction,
            arrInstructions,
            ins,
            recipe,
            addRecipe,
            img,
        };
    },
});
</script>

<style scoped>
/* Add your styles here */
.component {
    font-size: 12px;
    ;
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
</style>