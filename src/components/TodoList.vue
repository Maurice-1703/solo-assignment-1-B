<script setup lang="ts">
import type { Todo } from "../models/todo.ts";
import TodoItem from "./TodoItem.vue";

// siehe TodoItem.vue
// Komponente erwartet genau eine Prop "todoList", deren Typ ein Array von Todo-Objekten ist
interface Props {
    todoList: Todo[];
}
const props = defineProps<Props>();

// siehe TodoItem.vue
// Komponente darf ebenfalls zwei Events aussenden, gleicher Name und Payload (id: number)
const emit = defineEmits<{
    (e: "toggled", id: number): void;
    (e: "deleted", id: number): void;
}>();

</script>

<template>
    <ul>
        <!-- "v-for" erzeugt für jedes Element im Array props.todoList eine eigene Instanz von TodoItem -->
            <!-- "v-for" braucht eindeutigen key, um die einzelnen Listen-Elemente intern auseinanderzuhalten -->
        <!-- v-bind:todo="i": Props-Weitergabe an das Kind -->
            <!-- Todo der aktuellen Schleifeniteration (i) wird als Prop "todo" (siehe Props-Interface in Item.vue) an TodoItem übergeben -->
        <!-- @toggled / @deleted: Events werden empfangen, löst eigene Events über "defineEmits" aus -->
            <!-- gleicher Payload: "$event" als Vue-Variable, die den Wert enthält, den das Kind geschickt hat (todo.id) -->
        <todo-item v-for="i in todoList" v-bind:todo="i" v-bind:key="i.id" @toggled="emit('toggled', $event)" @deleted="emit('deleted', $event)"></todo-item>
    </ul>
</template>


<style scoped>
    ul {
        list-style: none; 
        padding: 0; 
        margin: 1rem; 
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
</style>