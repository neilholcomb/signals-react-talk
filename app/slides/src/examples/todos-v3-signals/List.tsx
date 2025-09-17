import { Todo } from "./types";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import "./todos.css";
import { Signal } from "@preact/signals-core";
import { useSignals } from "@preact/signals-react/runtime";

interface ListProps {
	todos: Signal<Todo[]>;
	completedTodos: Signal<Todo[]>;
	incompleteTodos: Signal<Todo[]>;
	onToggleTodo: (id: number) => void;
	onDeleteTodo: (id: number) => void;
	showRenders?: boolean;
}

export function List({
	todos,
	completedTodos,
	incompleteTodos,
	onToggleTodo,
	onDeleteTodo,
	showRenders = false,
}: ListProps) {
	useSignals();
	const listHighlight = useHighlightOnRender({ enabled: showRenders, color: "#84cc16" });
	return (
		<div ref={listHighlight.ref} className="list-container" style={{ position: "relative" }}>
			{incompleteTodos.value.length > 0 && (
				<div>
					<h3 className="section-title">Pending</h3>
					{incompleteTodos.value.map((todo) => (
						<div key={todo.id} className="todo-item pending">
							<input
								id={`todo-${todo.id}`}
								type="checkbox"
								checked={todo.completed}
								onChange={() => onToggleTodo(todo.id)}
								className="todo-checkbox"
							/>
							<label htmlFor={`todo-${todo.id}`} className="todo-text pending">
								{todo.text}
							</label>
							<button onClick={() => onDeleteTodo(todo.id)} className="delete-button">
								Delete
							</button>
						</div>
					))}
				</div>
			)}

			{completedTodos.value.length > 0 && (
				<div className="section-container">
					<h3 className="section-title">Completed</h3>
					{completedTodos.value.map((todo) => (
						<div key={todo.id} className="todo-item completed">
							<input
								id={`todo-${todo.id}`}
								type="checkbox"
								checked={todo.completed}
								onChange={() => onToggleTodo(todo.id)}
								className="todo-checkbox completed"
							/>
							<label htmlFor={`todo-${todo.id}`} className="todo-text completed">
								{todo.text}
							</label>
							<button onClick={() => onDeleteTodo(todo.id)} className="delete-button">
								Delete
							</button>
						</div>
					))}
				</div>
			)}

			{todos.value.length === 0 && (
				<div className="empty-state">
					<p>No todos yet. Add one above!</p>
				</div>
			)}
		</div>
	);
}
