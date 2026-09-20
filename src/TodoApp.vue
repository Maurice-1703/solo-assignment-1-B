<script setup lang="ts">
import {ref, computed} from "vue";
import type { Status, Todo } from "./models/todo.ts";
import TodoList from './components/TodoList.vue';

const todoList = ref<Todo[]>([]);     // zentraler State der App (reaktives Array von Todos), Zugriff im Skript nur über ".value"
const status = ref<Status>("open");   // zweiter unabhängiger State-Wert (aktuell gewählter Filter)

function createTodo(id: number, text: string, done: boolean): Todo {
  return {
    id: id,
    text: text,
    done : done
  }
}

// Funktion wird über "toggled" Event aufgerufen (siehe Template)
function toggleTodo(id: number): void {
  const todo = todoList.value.find((t) => t.id === id);   // find(): geht Array von vorne nach hinten durch und führt für jedes Element die übergebene Funktion aus (t: aktuell betrachtetes Todo-Objekt)
  if (todo !== undefined) {                               // Prüfung, weil find() undefined zurück, wenn kein passendes Element gefunden
    todo.done = !todo.done;                               // todo als direkter Verweis auf genau das Objekt, das auch im todoList.value-Array steckt
  }
}

// Funktion wird über "deleted" Event aufgerufen (siehe Template)
function deleteTodo(id: number): void {
  const newTodoList = todoList.value.filter((t) => t.id !== id);  // filter(): erzeugt neues Array, bestehend aus allen Elementen, für die die Bedingung true ergibt (t: aktuell betrachtetes Todo-Objekt)
  todoList.value = newTodoList;                                   // -> behalte todo, wenn dessen id nicht der übergebenen id entspricht
}


// Todos zum Testen
const test1: Todo = createTodo(1, "Vue.js lernen", false);
const test2: Todo = createTodo(2, "Staubsaugen", false);
const test3: Todo = createTodo(3, "Wäsche waschen", false);
const test4: Todo = createTodo(4, "Semesterbeitrag zahlen", false);
const test5: Todo = createTodo(5, "Verzweifeln", false);
todoList.value.push(test1, test2, test3, test4, test5);

// computed() erzeugt abgeleiteten, reaktiven Wert
// Erwartet als Argument keinen manuellen Wert, sondern Funktion, 
//   die beschreibt, wie sich der abgeleitete Wert berechnet
const visibleTodos = computed<Todo[]>(() => {                   // Argument: Arrow Function ohne Parameter                 
  if (status.value === "open") {                               
    return todoList.value.filter((t) => !t.done);               // wenn Filter auf "Offen", return: neues Array, aus allen Elementen mit !t.done (= nicht erledigt)
  } else if (status.value === "done") {
    return todoList.value.filter((t) => t.done);                // wenn Filter auf "Erledigt", return: neues Array, aus allen Elementen mit t.done (= erledigt)
  }
  return todoList.value;                                        // wenn Filter auf "Alle", return: komplettes Array (ungefiltert)
});

</script>

<template>
    <h1>Meine Todos:</h1>
    <div class="filters">
        <!-- "v-on:click" (@) setzt status (Filter) -->
        <!-- "v-bind" fügt CSS-Klasse hinzu, wenn Bedingung true ist -->
        <button class="filter-btn" v-bind:class="{active: status === 'all'}" @click="status='all'">Alle</button>
        <button class="filter-btn" v-bind:class="{active: status === 'open'}" @click="status='open'">Offen</button>
        <button class="filter-btn" v-bind:class="{active: status === 'done'}" @click="status='done'">Erledigt</button>
    </div>

    <!-- "v-bind" für die Übergabe der Props (siehe Interface in TodoList.vue), hier das über computed() gefilterte Array -->
     <!-- Namenskonvention: im Template kebab-case (todo-list), im Skript camelCase (todoList)-->
    <!-- beide Event-Listener für "toggled" und "deleted", rufen die zugehörige Funktion auf -->
      <!-- Argument (todo.id) wird von Vue automatisch bei Funktionsauruf weitergereicht -->
    <todo-list v-bind:todo-list="visibleTodos" @toggled="toggleTodo" @deleted="deleteTodo"></todo-list>
</template>


<style scoped>
    .filters {
        display: flex;
        gap: 0.5rem;
    }

    .filter-btn {
        padding: 0.5rem 1.25rem;
        border: none;
        border-radius: 1000px;
        background: var(--indigo-300);
        color: var(--indigo-800);
        font: inherit;
        cursor: pointer;
    }

    .filter-btn:hover {
        background: var(--indigo-600);
        color: white;
    }

    .filter-btn.active {
        background: var(--indigo-800);
        color: white;
    }
</style>
