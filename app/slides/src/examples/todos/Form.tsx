import { useState } from "react";
import { Todo } from "./types";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import "./todos.css";

interface FormProps {
	onAddTodo: (todo: Todo) => void;
	showRenders?: boolean;
}

export function Form({ onAddTodo, showRenders = false }: FormProps) {
	const formHighlight = useHighlightOnRender({ enabled: showRenders, color: "#06b6d4" });
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
		<div ref={formHighlight.ref} className="form-section" style={{ position: "relative" }}>
			<div className="form-container">
				<input
					type="text"
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && addTodo()}
					placeholder="Add a new todo..."
					className="form-input"
				/>
				<button onClick={addTodo} disabled={!newTodoText.trim()} className="form-button">
					Add
				</button>
			</div>
		</div>
	);
}
