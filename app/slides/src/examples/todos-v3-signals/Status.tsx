import { Todo } from "./types";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import "./todos.css";
import { Signal } from "@preact/signals-core";
import { useSignals } from "@preact/signals-react/runtime";

interface StatusProps {
	todos: Signal<Todo[]>;
	completedTodos: Signal<Todo[]>;
	completionPercentage: Signal<number>;
	showRenders?: boolean;
}

export function Status({ todos, completedTodos, completionPercentage, showRenders = false }: StatusProps) {
	useSignals();
	const statusHighlight = useHighlightOnRender({ enabled: showRenders, color: "#f97316" });
	return (
		<div ref={statusHighlight.ref} className="status-section" style={{ position: "relative" }}>
			<h1 className="status-title">My Todos</h1>
			<div className="status-stats">
				<span>Total: {todos.value.length}</span>
				<span>Completed: {completedTodos.value.length}</span>
				<span>Progress: {completionPercentage}%</span>
			</div>
			<div className="progress-bar-container">
				<div className="progress-bar" style={{ width: `${completionPercentage}%` }} />
			</div>
		</div>
	);
}
