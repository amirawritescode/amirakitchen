import { reactive } from 'vue';

const eventBus = reactive({
    events: [] as Array<Function>, // Array to store the event listeners

    // Method to emit events
    emit(event: string, ...args: any[]) {
        this.events.forEach(callback => callback(event, ...args));
    },

    // Method to listen for events
    on(callback: Function) {
        this.events.push(callback);
    },

    // Method to remove listeners
    off(callback: Function) {
        this.events = this.events.filter(cb => cb !== callback);
    }
});

export default eventBus;
