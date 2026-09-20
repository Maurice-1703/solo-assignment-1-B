<script setup lang="ts">
import type { Todo } from "../models/todo.ts";

// Interface, das festlegt, welche Props diese Komponente von außen erwartet
//   nämlich: genau eine Property namens "todo", vom Typ Todo
interface Props {
    todo: Todo;
}

// Compiler-Makro (Vue erkennt diesen speziellen Aufruf beim Kompilieren und 
//   übersetzt ihn intern in echten JavaScript-Code, der die Props deklariert)
// Typisierung über <Props>: Props dieser Komponente sollen exakt der Form entsprechen, 
//   die ich in meinem Props-Interface definiert habe
// Zugriff über props.todo oder direkt im Template (z.B. todo.id, todo.text)
const props = defineProps<Props>();

// Compiler-Makro
// Deklariert nicht die eingehenden Props, sondern die ausgehenden Events
// Ergebnis: Funktion, um ein Event auszulösen
const emit = defineEmits<{
    (event: "toggled", id: number): void;   // Objekt-Typ, der aus mehreren Funktions-Signaturen besteht
    (event: "deleted", id: number): void;   // jede Zeile beschreibt eine erlaubte Art, emit(...) aufzurufen
}>();

</script>

<template>
    <li>
        {{ todo.id }}: "{{ todo.text }}"    <!-- todo kommt aus den Props (props.todo), im Template ohne "props." zugänglich -->
        <div class="interact">
            <label>
                <!-- "v-bind" bindet das checked-Attribut der Checkbox an den aktuellen Wert von todo.done -->
                    <!-- ein Kind darf ein Prop nicht selbst verändern, deswegen kein "v-model" (koppelt automatisch in beide Richtungen)-->
                <!-- "v-on:change" (@) ruft das Event "toggled" bei Zustandsänderung der Checkbox aus -->
                <input type="checkbox" v-bind:checked="todo.done" @change="emit('toggled', todo.id)">
                erledigt
            </label>
            <!-- analog führt "v-on:click" (@) emit("deleted", todo.id) aus -->
            <button @click="emit('deleted', todo.id)">Löschen</button>
        </div>
    </li>
</template>


<style scoped>
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        background-color: white;
        color: var(--indigo-800);
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(13, 2, 42, 0.15);
    }

    .interact {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    input[type="checkbox"] {
        width: 1.1rem;
        height: 1.1rem;
    }

    input[type="checkbox"]:not(:disabled) {
        cursor: pointer;
    }

    button {
        margin-left: 1.5rem;
        padding: 0.2rem 0.5rem;
        border: none;
        background: var(--indigo-300);
        color: var(--indigo-800);
        font: inherit;
        cursor: pointer;
    }

    button:hover {
        background: var(--indigo-600);
        color: white;
    }
</style>