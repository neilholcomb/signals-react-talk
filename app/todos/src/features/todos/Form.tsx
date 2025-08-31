import { useState } from "react";
import { Todo } from "./types";

interface FormProps {
	onAddTodo: (todo: Todo) => void;
}

export function Form({ onAddTodo }: FormProps) {
	const [newTodoText, setNewTodoText] = useState("");

	const addTodo = () => {
		if (newTodoText.trim()) {
			const newTodo: Todo = {
				id: Date.now(),
				text: newTodoText.trim(),
				completed: false,
				createdAt: new Date(),
			};
			onAddTodo(newTodo);
			setNewTodoText("");
		}
	};

	return (
		<div className="mb-6">
			<div className="flex space-x-2">
				<input
					type="text"
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && addTodo()}
					placeholder="Add a new todo..."
					className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				<button
					onClick={addTodo}
					disabled={!newTodoText.trim()}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Add
				</button>
			</div>
		</div>
	);
}
