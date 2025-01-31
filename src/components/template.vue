<template>
    <div class="container">
        <h1>My Empty Component</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MyComponent',
    setup() {
        // Component setup logic can go here
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
</style>