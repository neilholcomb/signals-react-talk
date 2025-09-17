import { signal, computed } from "@preact/signals-core";
import { Todo as TodoType } from "./types";

export const todos = signal<TodoType[]>([
	{ id: 1, text: "Learn React", completed: true, createdAt: new Date() },
	{ id: 2, text: "Build a todo app", completed: false, createdAt: new Date() },
	{ id: 3, text: "Give a great talk", completed: false, createdAt: new Date() },
]);

export const completedTodos = computed(() => todos.value.filter((todo) => todo.completed));
export const incompleteTodos = computed(() => todos.value.filter((todo) => !todo.completed));
export const completionPercentage = computed(() =>
	todos.value.length > 0 ? Math.round((completedTodos.value.length / todos.value.length) * 100) : 0
);

export const addTodo = (newTodo: TodoType) => {
	todos.value.push(newTodo);
};

export const toggleTodo = (id: number) => {
	todos.value = todos.value.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
};

export const deleteTodo = (id: number) => {
	todos.value = todos.value.filter((todo) => todo.id !== id);
};
