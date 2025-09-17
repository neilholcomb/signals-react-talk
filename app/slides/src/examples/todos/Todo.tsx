import { useState, useMemo, useCallback } from "react";
import { Todo as TodoType } from "./types";
import { Status } from "./Status";
import { Form } from "./Form";
import { List } from "./List";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import "./todos.css";

interface TodoProps {
	showRenders?: boolean;
}

export function useTodo() {
	const [todos, setTodos] = useState<TodoType[]>([
		{ id: 1, text: "Learn React", completed: true, createdAt: new Date() },
		{
			id: 2,
			text: "Build a todo app",
			completed: false,
			createdAt: new Date(),
		},
		{
			id: 3,
			text: "Give a great talk",
			completed: false,
			createdAt: new Date(),
		},
	]);

	const { completedTodos, incompleteTodos, completionPercentage } = useMemo(() => {
		const completed = todos.filter((todo) => todo.completed);
		const incomplete = todos.filter((todo) => !todo.completed);
		const percentage = todos.length > 0 ? Math.round((completed.length / todos.length) * 100) : 0;

		return {
			completedTodos: completed,
			incompleteTodos: incomplete,
			completionPercentage: percentage,
		};
	}, [todos]);

	const addTodo = useCallback((newTodo: TodoType) => {
		setTodos((prev) => [...prev, newTodo]);
	}, []);

	const toggleTodo = useCallback((id: number) => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	}, []);

	const deleteTodo = useCallback((id: number) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	}, []);

	return {
		todos,
		completedTodos,
		incompleteTodos,
		completionPercentage,
		addTodo,
		toggleTodo,
		deleteTodo,
	};
}

export function Todo({ showRenders = false }: TodoProps) {
	const todoHighlight = useHighlightOnRender({ enabled: showRenders, color: "#8b5cf6" });
	const { todos, completedTodos, incompleteTodos, completionPercentage, addTodo, toggleTodo, deleteTodo } = useTodo();

	return (
		<div className="todo-container">
			<div ref={todoHighlight.ref} className="todo-card" style={{ position: "relative" }}>
				<Status
					todos={todos}
					completedCount={completedTodos.length}
					completionPercentage={completionPercentage}
					showRenders={showRenders}
				/>

				<Form onAddTodo={addTodo} showRenders={showRenders} />

				<List
					todos={todos}
					completedTodos={completedTodos}
					incompleteTodos={incompleteTodos}
					onToggleTodo={toggleTodo}
					onDeleteTodo={deleteTodo}
					showRenders={showRenders}
				/>
			</div>
		</div>
	);
}
