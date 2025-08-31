import { useState, useMemo } from "react";
import { Todo as TodoType } from "./types";
import { Status } from "./Status";
import { Form } from "./Form";
import { List } from "./List";

export function Todo() {
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

	const addTodo = (newTodo: TodoType) => {
		setTodos((prev) => [...prev, newTodo]);
	};

	const toggleTodo = (id: number) => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const deleteTodo = (id: number) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white rounded-lg shadow-md p-6">
				<Status
					todos={todos}
					completedCount={completedTodos.length}
					completionPercentage={completionPercentage}
				/>

				<Form onAddTodo={addTodo} />

				<List
					todos={todos}
					completedTodos={completedTodos}
					incompleteTodos={incompleteTodos}
					onToggleTodo={toggleTodo}
					onDeleteTodo={deleteTodo}
				/>
			</div>
		</div>
	);
}
